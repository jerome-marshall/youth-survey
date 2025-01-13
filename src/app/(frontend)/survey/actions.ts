"use server";

import {
  type SurveyResponseQuestionResponse,
  type SurveyResponseUserInfo,
} from "@/payload/types";
import {
  createSurveyResponse,
  updateSurveyAddResponse,
  updateSurveyRemoveResponse,
  updateSurveyResponseUserInfo,
} from "@/payload/utils/survey-responses";

export async function createSurvey(userInfo: SurveyResponseUserInfo) {
  const surveyResponseID = await createSurveyResponse(userInfo);

  return surveyResponseID;
}

export async function addResponseAction(
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

export async function removeResponseAction(
  surveyResponseID: number,
  questionId: string,
) {
  const surveyResponse = await updateSurveyRemoveResponse(
    surveyResponseID,
    questionId,
  );

  return surveyResponse;
}

export const updateUserInfoAction = async (
  surveyResponseID: number,
  userInfo: SurveyResponseUserInfo,
) => {
  const surveyResponse = await updateSurveyResponseUserInfo(
    surveyResponseID,
    userInfo,
  );

  return surveyResponse;
};
