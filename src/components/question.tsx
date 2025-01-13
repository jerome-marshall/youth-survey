"use client";

import { QuestionOption } from "@/components/question-option";
import { RadioGroup } from "@/components/ui/radio-group";
import { type SurveyQuestionWithSection } from "@/payload/types";
import { hasCustomText } from "@/utils/question";
import { motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import { Textarea } from "./ui/textarea";
import { type QuestionType } from "@/payload/utils/question-type";

interface QuestionProps {
  question: SurveyQuestionWithSection;
  selectedOptions: string[];
  handleOptionChange: (optionId: string) => void;
  customAnswers: Record<string, string>;
  setCustomAnswers: (answers: Record<string, string>) => void;
}

const CUSTOM_TEXT = "custom_text";
const CustomTextOption = React.memo(
  ({
    question,
    selectedOptions,
    handleOptionChange,
    customAnswers,
    setCustomAnswers,
  }: {
    question: SurveyQuestionWithSection;
    selectedOptions: string[];
    handleOptionChange: (optionId: string) => void;
    type: QuestionType;
    customAnswers: Record<string, string>;
    setCustomAnswers: (answers: Record<string, string>) => void;
  }) => {
    const [showInput, setShowInput] = useState(false);

    useEffect(() => {
      setShowInput(selectedOptions.includes(CUSTOM_TEXT));
    }, [selectedOptions]);

    if (!hasCustomText(question) || !question.options) return null;

    return (
      <>
        <QuestionOption
          option={{
            id: question.id + "_custom_text",
            text: "Other",
            optionId: CUSTOM_TEXT,
          }}
          index={question.options.length}
          selectedOptions={selectedOptions}
          handleOptionChange={handleOptionChange}
          type={question.type}
        />
        {showInput && (
          <Textarea
            value={customAnswers[question.questionId] ?? ""}
            onChange={(e) =>
              setCustomAnswers({
                ...customAnswers,
                [question.questionId]: e.target.value,
              })
            }
            placeholder="Write your answer here"
          />
        )}
      </>
    );
  },
);

CustomTextOption.displayName = "CustomTextOption";

export function Question({
  question,
  selectedOptions,
  handleOptionChange,
  customAnswers,
  setCustomAnswers,
}: QuestionProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      layout
      layoutRoot
      className="space-y-6"
    >
      <div className="space-y-2">
        <h2 className="text-xl font-medium leading-tight text-gray-900">
          {question.text}
        </h2>
      </div>
      {question.type === "single" && (
        <RadioGroup
          value={selectedOptions[0]}
          onValueChange={(value) => handleOptionChange(value)}
          className="space-y-3"
        >
          {question.options?.map((option, index) => (
            <QuestionOption
              key={option.id}
              option={option}
              index={index}
              selectedOptions={selectedOptions}
              type={question.type}
              handleOptionChange={handleOptionChange}
            />
          ))}
          <CustomTextOption
            question={question}
            selectedOptions={selectedOptions}
            handleOptionChange={handleOptionChange}
            type={question.type}
            customAnswers={customAnswers}
            setCustomAnswers={setCustomAnswers}
            key={question.id + "_custom_text"}
          />
        </RadioGroup>
      )}
      {question.type === "multiple" && (
        <div className="space-y-3">
          {question.options?.map((option, index) => (
            <QuestionOption
              key={option.id}
              option={option}
              index={index}
              selectedOptions={selectedOptions}
              handleOptionChange={handleOptionChange}
              type={question.type}
            />
          ))}
          <CustomTextOption
            question={question}
            selectedOptions={selectedOptions}
            handleOptionChange={handleOptionChange}
            type={question.type}
            customAnswers={customAnswers}
            setCustomAnswers={setCustomAnswers}
            key={question.id + "_custom_text"}
          />
        </div>
      )}
      {question.type === "text" && (
        <div className="space-y-3">
          <Textarea
            value={customAnswers[question.questionId] ?? ""}
            onChange={(e) => {
              setCustomAnswers({
                ...customAnswers,
                [question.questionId]: e.target.value,
              });
              if (!selectedOptions.includes(CUSTOM_TEXT)) {
                handleOptionChange(CUSTOM_TEXT);
              }
            }}
            placeholder="Write your answer here"
          />
        </div>
      )}
    </motion.div>
  );
}
