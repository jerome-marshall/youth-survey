"use client"

import { useState, useEffect } from "react"
import { SurveyLayout } from "@/components/survey-layout"
import { Question } from "@/components/question"
import { Survey, Question as QuestionType } from "@/types/survey"

const survey: Survey = {
  questions: [
    {
      id: "q1",
      text: "Have you ever shared your faith with someone?",
      type: "single",
      options: [
        { id: "1", text: "Yes" },
        { id: "2", text: "No" },
      ],
    },
    {
      id: "q1a",
      text: "Why haven't you shared your faith? Select all that apply.",
      type: "multiple",
      options: [
        { id: "1", text: "I have no motivation." },
        { id: "2", text: "I have doubts myself." },
        { id: "3", text: "I don't have enough knowledge." },
        { id: "4", text: "I'm fearful to share." },
        { id: "5", text: "I'm afraid I might lose a relationship." },
        { id: "6", text: "I know the truth, and want to share, but don't have confidence." },
        { id: "7", text: "I don't have anyone to mentor or guide me." },
      ],
      condition: {
        parentId: "q1",
        triggerOptionId: "2",
      },
    },
    // Add more questions here...
  ],
}

export default function SurveyPage() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [answers, setAnswers] = useState<Record<string, string | string[]>>({})
  const [isCompleted, setIsCompleted] = useState(false)

  const getCurrentQuestion = (): QuestionType | null => {
    if (currentQuestionIndex >= survey.questions.length) {
      setIsCompleted(true)
      return null
    }

    const currentQuestion = survey.questions[currentQuestionIndex]
    if ('condition' in currentQuestion) {
      const parentAnswer = answers[currentQuestion.condition.parentId]
      if (parentAnswer === currentQuestion.condition.triggerOptionId) {
        return currentQuestion
      }
      // Skip this question if condition is not met
      setCurrentQuestionIndex(prev => prev + 1)
      return getCurrentQuestion()
    }
    return currentQuestion
  }

  const handleAnswer = (questionId: string, answer: string | string[]) => {
    setAnswers(prev => ({ ...prev, [questionId]: answer }))
    setCurrentQuestionIndex(prev => prev + 1)
  }

  const handleBack = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1)
    }
  }

  const currentQuestion = getCurrentQuestion()

  if (isCompleted) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-purple-400 via-pink-500 to-red-500">
        <div className="bg-white p-8 rounded-lg shadow-xl">
          <h1 className="text-3xl font-bold mb-4">Survey Completed</h1>
          <p className="text-lg mb-4">Thank you for participating in our survey!</p>
          <pre className="bg-gray-100 p-4 rounded overflow-auto max-w-lg">
            {JSON.stringify(answers, null, 2)}
          </pre>
        </div>
      </div>
    )
  }

  if (!currentQuestion) {
    return null // or a loading state if needed
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
        onAnswer={handleAnswer}
        previousAnswer={answers[currentQuestion.id]}
      />
    </SurveyLayout>
  )
}

