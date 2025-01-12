export const CONDITIONAL_QUESTION_REGEX = /q\d+:\d+/;

export const isConditionalQuestion = (questionId: string) =>
  CONDITIONAL_QUESTION_REGEX.test(questionId);
