"use client";

import { Question } from "@/components/question";
import { SurveyLayout } from "@/components/survey-layout";
import { Button } from "@/components/ui/button";
import { type Survey } from "@/payload-types";
import { useSurveyQuestions } from "@/hooks/useSurveyQuestions";
import { UserInfoForm } from "./user-info-form";
import { useState } from "react";
import { createSurvey, updateUserInfoAction } from "../actions";
import { Input } from "@/components/ui/input";

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
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
  const [contactSubmitted, setContactSubmitted] = useState(false);
  const [contactInfo, setContactInfo] = useState({ email: "", phone: "" });
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
    setSurveyResponseID,
    surveyResponseID,
    resetSurvey,
  } = useSurveyQuestions(survey);

  const hasSelectedOptions = selectedOptions.length > 0;

  let satisfiesRanking = false;
  if (currentQuestion?.type === "ranking") {
    satisfiesRanking =
      selectedOptions.length === currentQuestion.options?.length;
  }

  if (!questions) return null;

  if (isCompleted) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 p-4">
        <div className="w-full max-w-lg rounded-lg bg-white p-4 shadow-xl sm:p-8">
          <h1 className="mb-4 text-2xl font-bold text-purple-600 sm:text-3xl">
            Thank You!
          </h1>
          <p className="mb-6 text-base text-gray-600 sm:text-lg">
            We really appreciate you taking the time to share your thoughts with
            us.
          </p>

          {!contactSubmitted ? (
            <div className="mb-6 space-y-4 sm:mb-8 sm:space-y-6">
              <div className="rounded-xl bg-purple-50 p-3 ring-1 ring-purple-200 sm:p-4">
                <h3 className="mb-2 text-base font-semibold text-purple-600 sm:text-lg">
                  Stay Connected
                </h3>
                <p className="text-sm text-purple-600 sm:text-base">
                  We have some exciting programs coming up. If you want to stay
                  updated, please leave your phone number or email:
                </p>
              </div>

              <div className="space-y-4">
                <div className="flex flex-col gap-3 sm:flex-row sm:gap-4">
                  <div className="w-full">
                    <Input
                      type="email"
                      placeholder="Email (optional)"
                      value={contactInfo.email}
                      onChange={(e) =>
                        setContactInfo((prev) => ({
                          ...prev,
                          email: e.target.value,
                        }))
                      }
                    />
                  </div>
                  <div className="w-full">
                    <Input
                      type="tel"
                      placeholder="Phone number (optional)"
                      value={contactInfo.phone}
                      onChange={(e) =>
                        setContactInfo((prev) => ({
                          ...prev,
                          phone: e.target.value,
                        }))
                      }
                    />
                  </div>
                </div>
                <Button
                  disabled={!contactInfo.email || !contactInfo.phone}
                  className="w-full bg-gradient-to-r from-purple-600 to-pink-600 py-2 text-white shadow-md hover:from-purple-700 hover:to-pink-700 disabled:cursor-not-allowed disabled:opacity-50"
                  onClick={() => {
                    setContactSubmitted(true);

                    if (!surveyResponseID) return;
                    updateUserInfoAction(surveyResponseID, contactInfo)
                      .then(() => {
                        console.log("🚀 ~ saved contact info");
                      })
                      .catch((error) => {
                        console.log("🚀 ~ error saving contact info", error);
                      });
                  }}
                >
                  Keep Me Updated!
                </Button>
              </div>
            </div>
          ) : (
            <div className="flex flex-col gap-4">
              <div className="rounded-xl bg-green-50 p-4 ring-1 ring-green-200">
                <p className="text-sm text-green-600">
                  Thanks for sharing your contact information! We&apos;ll keep
                  you updated about our upcoming programs.
                </p>
              </div>
              <Button
                className="w-full bg-gradient-to-r from-purple-600 to-pink-600 py-2 text-white shadow-md hover:from-purple-700 hover:to-pink-700 disabled:cursor-not-allowed disabled:opacity-50"
                onClick={() => {
                  resetSurvey();
                  setStep("intro");
                }}
              >
                Start Over
              </Button>
            </div>
          )}
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

            createSurvey(data)
              .then((id) => {
                setSurveyResponseID(id);
                console.log("🚀 ~ user info added");
              })
              .catch((error) => {
                console.log("🚀 ~ createSurvey ~ error:", error);
              });
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
        disabled={
          !hasSelectedOptions ||
          (currentQuestion.type === "ranking" && !satisfiesRanking)
        }
      >
        Next
      </Button>
    </SurveyLayout>
  );
}
