"use server";

import {
  type SurveyResponseQuestionResponse,
  type SurveyResponseUserInfo,
} from "@/payload/types";
import {
  createSurveyResponse,
  updateSurveyAddResponse,
  updateSurveyRemoveResponse,
} from "@/payload/utils/survey-responses";

export async function createSurvey(userInfo: SurveyResponseUserInfo) {
  const surveyResponseID = await createSurveyResponse(userInfo);

  return surveyResponseID;
}

export async function addResponse(
  surveyResponseID: number,
  data: SurveyResponseQuestionResponse,
  hasCompleted: boolean,
) {
  const surveyResponse = await updateSurveyAddResponse(
    surveyResponseID,
    data,
    hasCompleted,
  );

  return surveyResponse;
}

export async function removeResponse(
  surveyResponseID: number,
  questionId: string,
) {
  const surveyResponse = await updateSurveyRemoveResponse(
    surveyResponseID,
    questionId,
  );

  return surveyResponse;
}
