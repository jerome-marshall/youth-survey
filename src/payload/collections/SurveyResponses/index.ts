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
          type: "row",
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
          ],
        },
        {
          type: "row",
          fields: [
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
      ],
    },
    {
      type: "row",
      fields: [
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
    },
    {
      name: "responses",
      type: "array",
      admin: {
        components: {
          RowLabel: "@/payload/components/ResponseQuestionRowLabel",
        },
      },
      fields: [
        {
          type: "row",
          fields: [
            {
              name: "questionId",
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
              name: "area",
              type: "text",
            },
          ],
        },
        {
          name: "questionText",
          type: "text",
          required: true,
        },

        {
          name: "selectedOptions",
          type: "array",
          admin: {
            components: {
              RowLabel: "@/payload/components/ResponseOptionRowLabel",
            },
          },
          fields: [
            {
              type: "row",
              fields: [
                {
                  name: "optionId",
                  type: "text",
                  required: true,
                  admin: {
                    width: "20%",
                  },
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
      ],
    },
  ],
  timestamps: true,
};
