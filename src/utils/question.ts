import { type SurveyQuestion } from "@/payload/types";

export const CONDITIONAL_QUESTION_REGEX = /q\d+:\d+/;

export const isConditionalQuestion = (questionId: string) =>
  CONDITIONAL_QUESTION_REGEX.test(questionId);

export const hasCustomText = (question: SurveyQuestion) =>
  question.customText === "true";

export const questionPostfix = (question: SurveyQuestion) => {
  let postfix = "";

  switch (question.type) {
    case "multiple":
      postfix = "Select all that apply";
      break;
    case "ranking":
      postfix = "Rank the following options";
      break;
  }

  return postfix;
};
