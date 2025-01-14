import {
  addResponseAction,
  removeResponseAction,
} from "@/app/(frontend)/survey/actions";
import { CUSTOM_TEXT } from "@/components/question";
import { type Survey } from "@/payload-types";
import { flattenQuestions, isConditionalQuestion } from "@/utils/question";
import { useState } from "react";

export function useSurveyQuestions(survey: Survey) {
  const questions = flattenQuestions(survey);
  const [isCompleted, setIsCompleted] = useState(false);
  const [answers, setAnswers] = useState<Record<string, string | string[]>>({});
  const [customAnswers, setCustomAnswers] = useState<Record<string, string>>(
    {},
  );
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
  const [surveyResponseID, setSurveyResponseID] = useState<number | null>(null);

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

          if (!surveyResponseID) return;
          removeResponseAction(surveyResponseID, id)
            .then(() => {
              console.log("🚀 ~ removeResponse");
            })
            .catch((error) => {
              console.error("🚀 ~ removeResponse ~ error:", error);
            });
        }
      });
      return newAnswers;
    });

    // Update index
    setCurrentQuestionIndex(prevIndex);

    setTimeout(() => {
      window?.scrollTo({ top: 0, behavior: "smooth" });
    }, 100);
  };

  const handleNext = () => {
    if (!currentQuestion || !questions) return;

    // For ranking questions, filter out unranked options before saving
    let optionsToSave = selectedOptions;
    if (currentQuestion.type === "ranking") {
      optionsToSave = selectedOptions.filter((option) => option !== "");
    }

    // Save current answers first
    const answersToSave = {
      ...answers,
      [currentQuestion.questionId]: optionsToSave,
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

    // Update index and reset selected options for new questions
    let hasCompleted = false;
    if (nextIndex < questions.length) {
      const nextQuestion = questions[nextIndex];
      if (!nextQuestion) return;

      // Only load previous answers if this question was already answered
      if (answers[nextQuestion.questionId]) {
        const nextAnswer = answers[nextQuestion.questionId];
        setSelectedOptions(
          nextAnswer
            ? Array.isArray(nextAnswer)
              ? nextAnswer
              : [nextAnswer]
            : [],
        );
      } else {
        // Reset selected options for new questions
        setSelectedOptions([]);
      }

      setCurrentQuestionIndex(nextIndex);
    } else {
      hasCompleted = true;
      setIsCompleted(hasCompleted);
    }

    // transform selected options to the format required by the backend
    const selectedOptionsData = selectedOptions.map((option) => {
      if (option === CUSTOM_TEXT) {
        return {
          optionId: option,
          optionText: customAnswers[currentQuestion.questionId] ?? "",
        };
      }

      setTimeout(() => {
        window?.scrollTo({ top: 0, behavior: "smooth" });
      }, 100);

      const options = currentQuestion.options;
      const optionData = options?.find(
        (opt) => opt.optionId === Number(option),
      );
      return {
        optionId: option,
        optionText: optionData?.text ?? "",
      };
    });

    // Add response to survey response
    if (!surveyResponseID) return;
    addResponseAction(
      surveyResponseID,
      {
        questionId: currentQuestion.questionId,
        questionText: currentQuestion.text,
        type: currentQuestion.type,
        selectedOptions: selectedOptionsData,
        area: currentQuestion.sectionTitle,
      },
      hasCompleted,
    )
      .then(() => {
        console.log("🚀 ~ added response");
      })
      .catch((error) => {
        console.error("🚀 ~ addResponse ~ error:", error);
      });
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

  const resetSurvey = () => {
    setAnswers({});
    setSelectedOptions([]);
    setCustomAnswers({});
    setCurrentQuestionIndex(0);
    setIsCompleted(false);
    setSurveyResponseID(null);
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
    surveyResponseID,
    setSurveyResponseID,
    resetSurvey,
  };
}
