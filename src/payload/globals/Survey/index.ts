/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  generateQuestionId,
  revalidateSurvey,
} from "@/payload/hooks/questionHooks";
import { type Field, type GlobalConfig } from "payload";

const optionFields: Field = {
  name: "options",
  type: "array",
  required: true,
  admin: {
    components: {
      RowLabel: "@/payload/components/OptionRowLabel",
    },
  },
  fields: [
    {
      type: "row",
      fields: [
        {
          name: "optionId",
          type: "number",
          required: true,
          admin: {
            width: "20%",
          },
        },
        {
          name: "text",
          type: "text",
          required: true,
        },
      ],
    },
  ],
};

export const Survey: GlobalConfig = {
  slug: "survey",
  access: {
    read: () => true,
  },
  hooks: {
    afterChange: [revalidateSurvey],
  },
  fields: [
    {
      name: "title",
      type: "text",
    },
    {
      name: "questions",
      type: "array",
      admin: {
        components: {
          RowLabel: "@/payload/components/QuestionRowLabel",
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
              hooks: {
                beforeChange: [generateQuestionId],
              },
            },
            {
              name: "type",
              type: "select",
              required: true,
              defaultValue: "single",
              options: [
                { label: "Single Choice", value: "single" },
                { label: "Multiple Choice", value: "multiple" },
                { label: "Ranking", value: "ranking" },
                { label: "Text", value: "text" },
              ],
            },
          ],
        },

        {
          name: "text",
          type: "text",
          required: true,
        },

        optionFields,
        {
          name: "condition",
          type: "group",
          fields: [
            {
              type: "row",
              fields: [
                {
                  name: "parentQuestionId",
                  type: "text",
                },
                {
                  name: "optionId",
                  type: "number",
                },
              ],
            },
          ],
        },
      ],
    },
  ],
};
