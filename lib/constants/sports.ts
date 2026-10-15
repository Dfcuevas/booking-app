export const SPORT_LABELS = {
  football: "Fútbol",
  padel: "Pádel",
  tennis: "Tenis",
  basketball: "Baloncesto",
  volleyball: "Vóley",
} as const;

export type SportType = keyof typeof SPORT_LABELS;

export const SPORT_TYPES = Object.keys(SPORT_LABELS) as SportType[];
