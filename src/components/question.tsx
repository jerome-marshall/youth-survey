"use client";

import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { type Survey } from "@/payload-types";
import { motion } from "framer-motion";
import { type Question } from "types/survey";

interface QuestionProps {
  question: NonNullable<Survey["questions"]>[number];
  selectedOptions: string[];
  handleOptionChange: (optionId: string) => void;
}

export function Question({
  question,
  selectedOptions,
  handleOptionChange,
}: QuestionProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-6"
    >
      <div className="space-y-2">
        <h2 className="text-xl font-medium leading-tight text-gray-900">
          {question.text}
        </h2>
        {/* {question.subText && (
          <p className="text-sm text-gray-500">{question.subText}</p>
        )} */}
      </div>
      {question.type === "single" ? (
        <RadioGroup
          value={selectedOptions[0]}
          onValueChange={(value) => handleOptionChange(value)}
          className="space-y-3"
        >
          {question.options.map((option, index) => (
            <motion.div
              key={option.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              <Label
                htmlFor={option.optionId.toString()}
                className={`flex cursor-pointer items-center space-x-3 rounded-xl border-2 p-4 transition-all duration-200 ease-in-out ${
                  selectedOptions.includes(option.optionId.toString())
                    ? "border-purple-500 bg-purple-50"
                    : "border-gray-200 hover:border-purple-200 hover:bg-purple-50/50"
                }`}
              >
                <RadioGroupItem
                  value={option.optionId.toString()}
                  id={option.optionId.toString()}
                  className="border-purple-300 text-purple-600"
                />
                <span className="text-sm font-medium text-gray-700">
                  {option.text}
                </span>
              </Label>
            </motion.div>
          ))}
        </RadioGroup>
      ) : (
        <div className="space-y-3">
          {question.options.map((option, index) => (
            <motion.div
              key={option.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              <Label
                htmlFor={option.optionId.toString()}
                className={`flex cursor-pointer items-center space-x-3 rounded-xl border-2 p-4 transition-all duration-200 ease-in-out ${
                  selectedOptions.includes(option.optionId.toString())
                    ? "border-purple-500 bg-purple-50"
                    : "border-gray-200 hover:border-purple-200 hover:bg-purple-50/50"
                }`}
              >
                <Checkbox
                  id={option.optionId.toString()}
                  checked={selectedOptions.includes(option.optionId.toString())}
                  onCheckedChange={() =>
                    handleOptionChange(option.optionId.toString())
                  }
                  className="border-purple-300 text-purple-600"
                />
                <span className="text-sm font-medium text-gray-700">
                  {option.text}
                </span>
              </Label>
            </motion.div>
          ))}
        </div>
      )}
    </motion.div>
  );
}
