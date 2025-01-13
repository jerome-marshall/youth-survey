"use client";

import { useRowLabel } from "@payloadcms/ui";
import { type SurveySection } from "../types";

export default function SectionRowLabel() {
  const { data } = useRowLabel<SurveySection>();

  const customLabel = data?.title ?? "New Section";

  return <div>{customLabel}</div>;
}
