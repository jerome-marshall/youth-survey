export const questionTypes = ["single", "multiple", "ranking", "text"] as const;

export type QuestionType = (typeof questionTypes)[number];

export const questionTypesOptions: { label: string; value: QuestionType }[] = [
  { label: "Single Choice", value: "single" },
  { label: "Multiple Choice", value: "multiple" },
  { label: "Ranking", value: "ranking" },
  { label: "Text", value: "text" },
];
