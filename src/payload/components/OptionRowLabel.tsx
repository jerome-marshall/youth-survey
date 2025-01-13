"use client";

import { useRowLabel } from "@payloadcms/ui";
import { type SurveyOption } from "../types";

export default function OptionRowLabel() {
  const { data } = useRowLabel<SurveyOption>();

  const customLabel = `${data.text ?? "New Option"}`;
  const hasOptionId = data.optionId !== undefined;

  if (hasOptionId) {
    return <div>{data.optionId + " - " + customLabel}</div>;
  }

  return <div>{customLabel}</div>;
}
