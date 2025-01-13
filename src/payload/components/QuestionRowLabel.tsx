"use client";

import { useRowLabel } from "@payloadcms/ui";
import { type SurveyQuestion } from "../types";

export default function QuestionRowLabel() {
  const { data } = useRowLabel<SurveyQuestion>();

  const customLabel = `${data.text ?? "New Question"}`;
  const hasQId = data.questionId !== undefined;

  if (hasQId) {
    return <div>{data.questionId + " - " + customLabel}</div>;
  }

  return <div>{customLabel}</div>;
}
