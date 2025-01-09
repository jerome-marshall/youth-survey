"use client";

import { Question } from "@/components/question";
import { SurveyLayout } from "@/components/survey-layout";
import { Button } from "@/components/ui/button";
import { survey } from "@/data/survey";
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
    // go to previous question
    setCurrentQuestionIndex((prevIndex) => {
      if (prevIndex > 0) {
        return prevIndex - 1;
      }
      return prevIndex;
    });

    // set selected options to previous question's answers
    if (currentQuestion) {
      const prevQuestion = survey.questions[currentQuestionIndex - 1];

      if (prevQuestion) {
        const prevAnswer = answers[prevQuestion.id];
        console.log("🚀 ~ handleBack ~ prevAnswer:", prevAnswer);
        setSelectedOptions(
          prevAnswer
            ? Array.isArray(prevAnswer)
              ? prevAnswer
              : [prevAnswer]
            : [],
        );
      }
    }
  };

  const handleNext = () => {
    // go to next question
    setCurrentQuestionIndex((prevIndex) => {
      if (prevIndex < survey.questions.length - 1) {
        return prevIndex + 1;
      }
      return prevIndex;
    });

    if (!currentQuestion) return;

    // save answers
    setAnswers((prevAnswers) => ({
      ...prevAnswers,
      [currentQuestion.id]: selectedOptions,
    }));

    // set selected options
    const nextQuestion = survey.questions[currentQuestionIndex + 1];
    if (nextQuestion) {
      const nextAnswer = answers[nextQuestion.id];
      setSelectedOptions(
        nextAnswer
          ? Array.isArray(nextAnswer)
            ? nextAnswer
            : [nextAnswer]
          : [],
      );
    }

    // if last question, set isCompleted to true
    if (currentQuestionIndex === survey.questions.length - 1) {
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
