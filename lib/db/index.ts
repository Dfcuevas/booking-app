import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import { schemaRelations } from "@/lib/db/schema";

const sql = neon(process.env.DATABASE_URL!);

export const db = drizzle({ client: sql, relations: schemaRelations });
