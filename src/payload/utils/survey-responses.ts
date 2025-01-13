import config from "@/payload.config";
import { getPayload } from "payload";
import {
  type SurveyResponseQuestionResponse,
  type SurveyResponseUserInfo,
} from "../types";

export const createSurveyResponse = async (
  userInfo: SurveyResponseUserInfo,
) => {
  const payload = await getPayload({ config });

  const surveyResponseData = await payload.create({
    collection: "survey-responses",
    data: {
      userInfo,
      hasCompleted: false,
    },
  });

  return surveyResponseData.id;
};

export const updateSurveyAddResponse = async (
  surveyResponseID: number,
  data: SurveyResponseQuestionResponse,
  hasCompleted: boolean,
) => {
  const payload = await getPayload({ config });

  const surveyResponse = await payload.findByID({
    collection: "survey-responses",
    id: surveyResponseID,
  });

  const filteredResponses = surveyResponse.responses?.filter(
    (response) => response.questionId !== data.questionId,
  );

  const updatedSurveyResponse = await payload.update({
    collection: "survey-responses",
    id: surveyResponseID,
    data: {
      responses: [
        ...(filteredResponses ?? []),
        {
          questionId: data.questionId,
          questionText: data.questionText,
          type: data.type,
          selectedOptions: data.selectedOptions,
        },
      ],
      lastCompletedQuestion: data.questionId,
      hasCompleted,
    },
  });

  return updatedSurveyResponse;
};

export const updateSurveyRemoveResponse = async (
  surveyResponseID: number,
  questionId: string,
) => {
  const payload = await getPayload({ config });

  const surveyResponse = await payload.findByID({
    collection: "survey-responses",
    id: surveyResponseID,
  });

  const filteredResponses = surveyResponse.responses?.filter(
    (response) => response.questionId !== questionId,
  );

  const updatedSurveyResponse = await payload.update({
    collection: "survey-responses",
    id: surveyResponseID,
    data: {
      responses: filteredResponses,
    },
  });

  return updatedSurveyResponse;
};
