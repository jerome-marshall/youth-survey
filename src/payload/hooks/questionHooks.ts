import { type Survey } from "@/payload-types";
import type { FieldHook } from "payload";

export const generateQuestionId: FieldHook<
  Survey,
  string | undefined,
  NonNullable<Survey["questions"]>[number]
> = ({ siblingData, value }) => {
  let qId = value;

  // const questions = data?.questions ?? [];
  // if (siblingData.questionId) {
  //   qId = siblingData.questionId;
  // } else {
  //   qId = `q${questions.length}`;
  // }

  const parentQId = siblingData.condition?.parentQuestionId;
  const triggerOptionId = siblingData.condition?.optionId;

  if (parentQId && triggerOptionId) {
    qId = `${parentQId}:${triggerOptionId}`;
  }

  return qId;
};

export const generateOptionId: FieldHook<
  Survey,
  number | undefined,
  NonNullable<NonNullable<Survey["questions"]>[number]["options"]>[number]
> = ({ data, siblingData, value }) => {
  const question = data?.questions?.find((q) =>
    q.options?.find((o) => o.id === siblingData.id),
  );
  console.log("🚀 ~ question:", question, value);
  return value;
};
