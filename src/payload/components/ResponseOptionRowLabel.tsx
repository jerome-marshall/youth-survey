"use client";

import { useRowLabel } from "@payloadcms/ui";
import { type SurveyResponseOptionResponse } from "../types";

export default function ResponseOptionRowLabel() {
  const { data } = useRowLabel<SurveyResponseOptionResponse>();

  return <div>{data.optionId + " - " + data.optionText}</div>;
}
