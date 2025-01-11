"use client";

import { useRowLabel } from "@payloadcms/ui";
import { type Survey } from "@/payload-types";

export default function QuestionRowLabel() {
  const { data } = useRowLabel<NonNullable<Survey["questions"]>[number]>();

  const customLabel = `${data.text ?? "New Question"}`;
  const hasQId = data.questionId !== undefined;

  if (hasQId) {
    return <div>{data.questionId + " - " + customLabel}</div>;
  }

  return <div>{customLabel}</div>;
}
