import {
  questionTypes,
  questionTypesOptions,
} from "@/payload/utils/question-type";
import type { CollectionConfig } from "payload";

export const SurveyResponses: CollectionConfig = {
  slug: "survey-responses",
  admin: {
    useAsTitle: "id",
  },
  fields: [
    {
      name: "userInfo",
      type: "group",
      fields: [
        {
          name: "age",
          type: "text",
        },
        {
          name: "gender",
          type: "text",
        },
        {
          name: "profession",
          type: "text",
        },
        {
          name: "section",
          type: "text",
        },
        {
          name: "state",
          type: "text",
        },
      ],
    },
    {
      name: "responses",
      type: "array",
      fields: [
        {
          name: "questionId",
          type: "text",
          required: true,
        },
        {
          name: "questionText",
          type: "text",
          required: true,
        },
        {
          name: "type",
          type: "select",
          options: questionTypesOptions,
          required: true,
        },
        {
          name: "selectedOptions",
          type: "array",
          fields: [
            {
              name: "optionId",
              type: "text",
              required: true,
            },
            {
              name: "optionText",
              type: "text",
              required: true,
            },
          ],
        },
      ],
    },
    {
      name: "lastCompletedQuestion",
      type: "text",
    },
    {
      name: "hasCompleted",
      type: "checkbox",
      defaultValue: false,
    },
  ],
  timestamps: true,
};
