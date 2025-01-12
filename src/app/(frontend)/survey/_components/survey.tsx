"use client";

import { Question } from "@/components/question";
import { SurveyLayout } from "@/components/survey-layout";
import { Button } from "@/components/ui/button";
import { type Survey } from "@/payload-types";
import { useSurveyQuestions } from "@/hooks/useSurveyQuestions";

export default function Survey({ survey }: { survey: Survey }) {
  const {
    questions,
    currentQuestion,
    currentQuestionIndex,
    isCompleted,
    answers,
    selectedOptions,
    handleBack,
    handleNext,
    handleOptionChange,
  } = useSurveyQuestions(survey);

  if (!questions) return null;

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
    return null;
  }

  return (
    <SurveyLayout
      title="Youth Survey"
      currentQuestion={currentQuestionIndex + 1}
      totalQuestions={questions.length}
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
