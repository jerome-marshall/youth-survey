"use client";

import { Question } from "@/components/question";
import { SurveyLayout } from "@/components/survey-layout";
import { Button } from "@/components/ui/button";
import { survey } from "@/data/survey";
import { isConditionalQuestion } from "@/utils/question";
import { useState } from "react";

export default function SurveyPage() {
  const [isCompleted, setIsCompleted] = useState(false);
  const [answers, setAnswers] = useState<Record<string, string | string[]>>({});
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
  console.log(
    "🚀 ~ SurveyPage ~ currentQuestionIndex:",
    currentQuestionIndex,
    selectedOptions,
    answers,
  );

  const currentQuestion = survey.questions[currentQuestionIndex];

  const handleBack = () => {
    let prevIndex = currentQuestionIndex - 1;
    if (prevIndex < 0) return;

    let prevQuestion = survey.questions[prevIndex];
    while (
      prevQuestion &&
      isConditionalQuestion(prevQuestion.id) &&
      prevIndex >= 0
    ) {
      prevIndex--;
      prevQuestion = survey.questions[prevIndex];
    }
    if (prevIndex < 0 || !prevQuestion) return;

    // Load previous answer
    const prevAnswer = answers[prevQuestion.id];
    setSelectedOptions(
      prevAnswer ? (Array.isArray(prevAnswer) ? prevAnswer : [prevAnswer]) : [],
    );

    // Clean up answers for skipped conditional questions
    const skippedQuestions = survey.questions
      .slice(prevIndex + 1, currentQuestionIndex + 1)
      .map((q) => q.id);
    setAnswers((prev) => {
      const newAnswers = { ...prev };
      skippedQuestions.forEach((id) => delete newAnswers[id]);
      return newAnswers;
    });

    // Update index
    setCurrentQuestionIndex(prevIndex);
  };

  const handleNext = () => {
    if (!currentQuestion) return;

    // Save current answers first
    setAnswers((prevAnswers) => ({
      ...prevAnswers,
      [currentQuestion.id]: selectedOptions,
    }));

    // Find next question index considering conditions
    let nextIndex = currentQuestionIndex + 1;
    while (nextIndex < survey.questions.length) {
      const nextQuestion = survey.questions[nextIndex];

      if (!nextQuestion) return;

      // Skip conditional questions if condition not met
      if (
        isConditionalQuestion(nextQuestion.id) &&
        "condition" in nextQuestion
      ) {
        const parentAnswer = answers[nextQuestion.condition.parentId];
        if (
          !parentAnswer ||
          (Array.isArray(parentAnswer)
            ? !parentAnswer.includes(nextQuestion.condition.triggerOptionId)
            : parentAnswer !== nextQuestion.condition.triggerOptionId)
        ) {
          nextIndex++;
          continue;
        }
      }
      break;
    }

    // Update index and load next question's answers
    if (nextIndex < survey.questions.length) {
      const nextQuestion = survey.questions[nextIndex];
      if (!nextQuestion) return;
      const nextAnswer = answers[nextQuestion.id];
      setSelectedOptions(
        nextAnswer
          ? Array.isArray(nextAnswer)
            ? nextAnswer
            : [nextAnswer]
          : [],
      );
      setCurrentQuestionIndex(nextIndex);
    } else {
      setIsCompleted(true);
    }
  };

  const handleOptionChange = (optionId: string) => {
    if (!currentQuestion) return;

    if (currentQuestion.type === "single") {
      if (selectedOptions.includes(optionId)) {
        setSelectedOptions([]);
      } else {
        setSelectedOptions([optionId]);
      }
    } else {
      if (selectedOptions.includes(optionId)) {
        setSelectedOptions((prevOptions) =>
          prevOptions.filter((id) => id !== optionId),
        );
      } else {
        setSelectedOptions((prevOptions) => [...prevOptions, optionId]);
      }
    }
  };

  if (isCompleted) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gradient-to-r from-purple-400 via-pink-500 to-red-500">
        <div className="rounded-lg bg-white p-8 shadow-xl">
          <h1 className="mb-4 text-3xl font-bold">Survey Completed</h1>
          <p className="mb-4 text-lg">
            Thank you for participating in our survey!
          </p>
          <pre className="max-w-lg overflow-auto rounded bg-gray-100 p-4">
            {JSON.stringify(answers, null, 2)}
          </pre>
        </div>
      </div>
    );
  }

  if (!currentQuestion) {
    return null; // or a loading state if needed
  }

  return (
    <SurveyLayout
      title="Youth Survey"
      currentQuestion={currentQuestionIndex + 1}
      totalQuestions={survey.questions.length}
      onBack={handleBack}
    >
      <Question
        question={currentQuestion}
        selectedOptions={selectedOptions}
        handleOptionChange={handleOptionChange}
      />

      <Button
        onClick={handleNext}
        className="mt-10 w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-md hover:from-purple-700 hover:to-pink-700"
      >
        Next
      </Button>
    </SurveyLayout>
  );
}
