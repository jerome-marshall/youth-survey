import { type Survey } from "@/payload-types";
import type { FieldHook } from "payload";
import type { GlobalAfterChangeHook } from "payload";
import { revalidateTag } from "next/cache";
import { type SurveyOption, type SurveyQuestion } from "../types";
import { flattenQuestions } from "@/utils/question";

export const generateQuestionId: FieldHook<
  Survey,
  string | undefined,
  SurveyQuestion
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
  SurveyOption
> = ({ data, siblingData, value }) => {
  if (!data) return value;
  const questions = flattenQuestions(data);

  const question = questions?.find((q) =>
    q.options?.find((o) => o.id === siblingData.id),
  );
  console.log("🚀 ~ question:", question, value);
  return value;
};

export const revalidateSurvey: GlobalAfterChangeHook = ({
  doc,
  req: { payload, context },
}) => {
  if (!context.disableRevalidate) {
    payload.logger.info(`Revalidating survey`);

    revalidateTag("global_survey");
  }

  return doc as Survey;
};
