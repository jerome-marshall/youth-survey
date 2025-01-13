import { useState } from "react";
import { type Survey } from "@/payload-types";
import { flattenQuestions, isConditionalQuestion } from "@/utils/question";
import { type SurveyQuestionWithSection } from "@/payload/types";

export function useSurveyQuestions(survey: Survey) {
  const questions = flattenQuestions(survey);
  const [isCompleted, setIsCompleted] = useState(false);
  const [answers, setAnswers] = useState<Record<string, string | string[]>>({});
  const [customAnswers, setCustomAnswers] = useState<Record<string, string>>(
    {},
  );
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);

  const currentQuestion = questions?.[currentQuestionIndex];

  const handleBack = () => {
    let prevIndex = currentQuestionIndex - 1;
    if (prevIndex < 0) return;

    let prevQuestion = questions?.[prevIndex];
    while (
      prevQuestion &&
      isConditionalQuestion(prevQuestion.questionId) &&
      prevIndex >= 0
    ) {
      prevIndex--;
      prevQuestion = questions?.[prevIndex];
    }
    if (prevIndex < 0 || !prevQuestion) return;

    // Load previous answer
    const prevAnswer = answers[prevQuestion.questionId];
    setSelectedOptions(
      prevAnswer ? (Array.isArray(prevAnswer) ? prevAnswer : [prevAnswer]) : [],
    );

    // Clean up answers for skipped conditional questions
    const skippedQuestions = questions
      ?.slice(prevIndex + 1, currentQuestionIndex + 1)
      .map((q) => q.questionId);
    setAnswers((prev) => {
      const newAnswers = { ...prev };
      skippedQuestions?.forEach((id) => {
        if (isConditionalQuestion(id)) {
          delete newAnswers[id];
        }
      });
      return newAnswers;
    });

    // Update index
    setCurrentQuestionIndex(prevIndex);
  };

  const handleNext = () => {
    if (!currentQuestion || !questions) return;

    // Save current answers first
    const answersToSave = {
      ...answers,
      [currentQuestion.questionId]: selectedOptions,
    };
    setAnswers(answersToSave);

    // Find next question index considering conditions
    let nextIndex = currentQuestionIndex + 1;
    while (nextIndex < questions.length) {
      const nextQuestion = questions[nextIndex];

      if (!nextQuestion) return;

      // Skip conditional questions if condition not met
      if (
        isConditionalQuestion(nextQuestion.questionId) &&
        "condition" in nextQuestion
      ) {
        const parentQuestionId = nextQuestion.condition?.parentQuestionId;
        if (!parentQuestionId) continue;

        const requiredOptionId = nextQuestion.condition?.optionId?.toString();
        if (!requiredOptionId) continue;

        const parentAnswer = answersToSave[parentQuestionId];

        const isMultipleChoice = Array.isArray(parentAnswer);
        const shouldSkipQuestion =
          !parentAnswer || // Skip if no answer
          (isMultipleChoice
            ? !parentAnswer.includes(requiredOptionId) // For multiple choice, skip if option not selected
            : parentAnswer !== requiredOptionId); // For single choice, skip if different option selected

        if (shouldSkipQuestion) {
          nextIndex++;
          continue;
        }
      }
      break;
    }

    // Update index and load next question's answers
    if (nextIndex < questions.length) {
      const nextQuestion = questions[nextIndex];
      if (!nextQuestion) return;
      const nextAnswer = answers[nextQuestion.questionId];
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

  return {
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
  };
}
