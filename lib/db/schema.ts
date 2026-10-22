import {
  index,
  pgEnum,
  pgTable,
  integer,
  text,
  boolean,
  timestamp,
  uuid,
  check,
  uniqueIndex,
} from "drizzle-orm/pg-core";
import { sql, defineRelations } from "drizzle-orm";

// enums

export const bookingStatus = pgEnum("booking_status", [
  "pending",
  "confirmed",
  "cancelled",
]);

// users: espejo mínimo de Clerk (se crea bajo demanda)

export const users = pgTable("users", {
  id: uuid("id").primaryKey().defaultRandom(),
  clerkId: text("clerk_id").notNull().unique(),
  email: text("email").notNull(),
  name: text("name").notNull(),
  createdAt: timestamp("created_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
});

// businesses : el negocio (complejo deportivo, club, etc.)

export const businesses = pgTable(
  "businesses",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    ownerId: uuid("owner_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    name: text("name").notNull(),
    slug: text("slug").notNull().unique(), // para URLs: /book/complejo-los-pinos
    description: text("description"),
    address: text("address"),
    phone: text("phone"),
    timezone: text("timezone").notNull().default("America/Bogota"),
    createdAt: timestamp("created_at", { withTimezone: true })
      .notNull()
      .defaultNow(),
  },
  (table) => [index("businesses_owner_idx").on(table.ownerId)],
);

// resources: lo que se reserva (cancha, mesa, silla...)

export const resources = pgTable(
  "resources",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    businessId: uuid("business_id")
      .notNull()
      .references(() => businesses.id, { onDelete: "cascade" }),
    name: text("name").notNull(),
    sport: text("sport").notNull(), // se valida con zod, no con enum de DB
    capacity: integer("capacity").notNull(),
    pricePerHour: integer("price_per_hour").notNull(),
    isActive: boolean("is_active").notNull().default(true),
    createdAt: timestamp("created_at", { withTimezone: true })
      .notNull()
      .defaultNow(),
  },
  (table) => [
    index("resources_business_idx").on(table.businessId),
    check("resources_capacity_positive", sql`${table.capacity} > 0`),
    check("resources_price_non_negative", sql`${table.pricePerHour} >= 0`),
  ],
);

/*
 availability_rules: horario semanal de cada recurso
 dayOfWeek: integer("day_of_week").notNull(), // 0 = domingo, 6 = sábado
*/

export const availabilityRules = pgTable(
  "availability_rules",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    resourceId: uuid("resource_id")
      .notNull()
      .references(() => resources.id, { onDelete: "cascade" }),
    dayOfWeek: integer("day_of_week").notNull(), // 0 = domingo, 6 = sábado
    openTime: text("start_time").notNull(), // formato "HH:MM"
    closeTime: text("end_time").notNull(), // formato "HH:MM"
  },
  (table) => [
    uniqueIndex("availability_resource_day_idx").on(
      table.resourceId,
      table.dayOfWeek,
    ),
    check("availability_day_range", sql`${table.dayOfWeek} BETWEEN 0 AND 6`),
    check(
      "availability_close_after_open",
      sql`${table.closeTime} > ${table.openTime}`,
    ),
  ],
);

/*
bookings: una fila = un slot de 1 hora reservado
El fin de la reserva siempre es startsAt + 1 (no se guarda)
*/

export const bookings = pgTable(
  "bookings",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    resourceId: uuid("resource_id")
      .notNull()
      .references(() => resources.id, { onDelete: "restrict" }),
    userId: uuid("user_id")
      .notNull()
      .references(() => users.id, { onDelete: "restrict" }),
    startsAt: timestamp("starts_at", { withTimezone: true }).notNull(),
    status: bookingStatus("status").notNull().default("confirmed"),
    priceAtBooking: integer("price_at_booking").notNull(), // copia del precio
    createdAt: timestamp("created_at", { withTimezone: true })
      .notNull()
      .defaultNow(),
  },
  (table) => [
    uniqueIndex("bookings_active_slot_idx")
      .on(table.resourceId, table.startsAt)
      .where(sql`${table.status} <> 'cancelled'`),
    // Para la pantalla "Mis reservas",
    index("bookings_user_idx").on(table.userId, table.startsAt),
  ],
);

/*
Relaciones para las consultas relacionales de Drizzle.
*/

export const schemaRelations = defineRelations(
  { users, businesses, resources, availabilityRules, bookings },
  ({
    one,
    many,
    users,
    businesses,
    resources,
    availabilityRules,
    bookings,
  }) => ({
    users: {
      businesses: many.businesses({
        from: users.id,
        to: businesses.ownerId,
      }),
      bookings: many.bookings({
        from: users.id,
        to: bookings.userId,
      }),
    },
    businesses: {
      owner: one.users({
        from: businesses.ownerId,
        to: users.id,
      }),
      resources: many.resources({
        from: businesses.id,
        to: resources.businessId,
      }),
    },
    resources: {
      business: one.businesses({
        from: resources.businessId,
        to: businesses.id,
      }),
      availabilityRules: many.availabilityRules({
        from: resources.id,
        to: availabilityRules.resourceId,
      }),
      bookings: many.bookings({
        from: resources.id,
        to: bookings.resourceId,
      }),
    },
    availabilityRules: {
      resource: one.resources({
        from: availabilityRules.resourceId,
        to: resources.id,
      }),
    },
    bookings: {
      resource: one.resources({
        from: bookings.resourceId,
        to: resources.id,
      }),
      user: one.users({
        from: bookings.userId,
        to: users.id,
      }),
    },
  }),
);

/* 
/* Tipos inferidos
*/

export type User = typeof users.$inferSelect;
export type Business = typeof businesses.$inferSelect;
export type Resource = typeof resources.$inferSelect;
export type AvailabilityRule = typeof availabilityRules.$inferSelect;
export type Booking = typeof bookings.$inferSelect;
export type NewBooking = typeof bookings.$inferInsert;
