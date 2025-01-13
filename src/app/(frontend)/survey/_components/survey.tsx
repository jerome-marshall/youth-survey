"use client";

import { Question } from "@/components/question";
import { SurveyLayout } from "@/components/survey-layout";
import { Button } from "@/components/ui/button";
import { type Survey } from "@/payload-types";
import { useSurveyQuestions } from "@/hooks/useSurveyQuestions";
import { UserInfoForm } from "./user-info-form";
import { useState } from "react";

export interface UserInfo {
  age: string;
  gender: string;
  profession: string;
  section: string;
  state: string;
}

type Step = "intro" | "userInfo" | "questions";

export default function Survey({ survey }: { survey: Survey }) {
  const [step, setStep] = useState<Step>("intro");
  const [userInfo, setUserInfo] = useState<UserInfo | null>({
    age: "12",
    gender: "male",
    profession: "Test",
    section: "testt",
    state: "Karnataka",
  });
  const {
    questions,
    currentQuestion,
    currentQuestionIndex,
    isCompleted,
    answers,
    selectedOptions,
    customAnswers,
    setCustomAnswers,
    handleBack,
    handleNext,
    handleOptionChange,
  } = useSurveyQuestions(survey);

  const hasSelectedOptions = selectedOptions.length > 0;

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
            {JSON.stringify({ userInfo, answers, customAnswers }, null, 2)}
          </pre>
        </div>
      </div>
    );
  }

  if (step === "intro") {
    return (
      <SurveyLayout title="Welcome" hideProgress>
        <div className="space-y-6">
          <div className="space-y-4">
            <h2 className="text-lg font-semibold text-purple-600 sm:text-xl">
              Hi there! 👋
            </h2>
            <p className="text-sm text-gray-600 sm:text-base">
              We&apos;d love to hear your thoughts on faith and the Bible in
              this quick, anonymous survey! 😊
            </p>
          </div>

          <div className="rounded-xl bg-purple-50 p-3 ring-1 ring-purple-200 sm:p-4">
            <h3 className="mb-2 text-sm font-medium text-purple-700 sm:text-base">
              Quick Tip
            </h3>
            <p className="text-xs text-purple-600 sm:text-sm">
              The best answers are honest ones! Just share what&apos;s true for
              you right now - there&apos;s no right or wrong here. Think of it
              like chatting with a friend about your real thoughts and
              experiences.
            </p>
          </div>

          <Button
            onClick={() => setStep("userInfo")}
            className="mt-6 w-full bg-gradient-to-r from-purple-600 to-pink-600 py-2 text-sm text-white shadow-md hover:from-purple-700 hover:to-pink-700 sm:mt-10 sm:py-3 sm:text-base"
          >
            Begin Survey
          </Button>
        </div>
      </SurveyLayout>
    );
  }

  if (step === "userInfo") {
    return (
      <SurveyLayout
        title="User Information"
        hideProgress
        onBack={() => setStep("intro")}
      >
        <UserInfoForm
          onSubmit={(data) => {
            setUserInfo(data);
            setStep("questions");
          }}
          initialData={userInfo ?? undefined}
        />
      </SurveyLayout>
    );
  }

  if (!currentQuestion) {
    return null;
  }

  return (
    <SurveyLayout
      title={currentQuestion.sectionTitle ?? "Youth Survey"}
      currentQuestion={currentQuestionIndex + 1}
      totalQuestions={questions.length}
      onBack={
        currentQuestionIndex === 0 ? () => setStep("userInfo") : handleBack
      }
    >
      <Question
        question={currentQuestion}
        selectedOptions={selectedOptions}
        handleOptionChange={handleOptionChange}
        customAnswers={customAnswers}
        setCustomAnswers={setCustomAnswers}
      />

      <Button
        onClick={handleNext}
        className="mt-10 w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-md hover:from-purple-700 hover:to-pink-700"
        disabled={!hasSelectedOptions}
      >
        Next
      </Button>
    </SurveyLayout>
  );
}
