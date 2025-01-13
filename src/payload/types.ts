import { type Survey } from "@/payload-types";
import { type Color } from "./utils/colors";

type Maybe<T> = T | null | undefined;

export type SurveySection = NonNullable<Survey["sections"]>[number];
export type SurveyQuestion = NonNullable<SurveySection["questions"]>[number];
export type SurveyOption = NonNullable<SurveyQuestion["options"]>[number];

export type SurveyQuestionWithSection = SurveyQuestion & {
  sectionTitle: Maybe<string>;
  sectionColor: Maybe<Color>;
  sectionId: Maybe<string>;
};
