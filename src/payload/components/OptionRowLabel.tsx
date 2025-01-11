"use client";

import { useRowLabel } from "@payloadcms/ui";
import { type Survey } from "@/payload-types";

export default function OptionRowLabel() {
  const { data } =
    useRowLabel<
      NonNullable<NonNullable<Survey["questions"]>[number]["options"]>[number]
    >();

  const customLabel = `${data.text ?? "New Option"}`;
  const hasOptionId = data.optionId !== undefined;

  if (hasOptionId) {
    return <div>{data.optionId + " - " + customLabel}</div>;
  }

  return <div>{customLabel}</div>;
}
