"use client";

import { useRowLabel } from "@payloadcms/ui";
import { type SurveyResponseQuestionResponse } from "../types";

export default function ResponseQuestionRowLabel() {
  const { data } = useRowLabel<SurveyResponseQuestionResponse>();

  return <div>{data.questionId + " - " + data.questionText}</div>;
}
