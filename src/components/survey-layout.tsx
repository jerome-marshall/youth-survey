import { ArrowLeft } from 'lucide-react'
import { Button } from "@/components/ui/button"

interface SurveyLayoutProps {
  children: React.ReactNode
  title: string
  currentQuestion: number
  totalQuestions: number
  onBack?: () => void
  timeLeft?: string
}

export function SurveyLayout({
  children,
  title,
  currentQuestion,
  totalQuestions,
  onBack,
  timeLeft,
}: SurveyLayoutProps) {
  return (
    <div className="min-h-screen bg-[conic-gradient(at_top_right,_var(--tw-gradient-stops))] from-purple-200 via-purple-100 to-pink-100">
      <div className="mx-auto max-w-md px-4 py-8">
        <div className="overflow-hidden rounded-2xl bg-white/80 backdrop-blur-xl shadow-xl ring-1 ring-black/5">
          <div className="border-b border-purple-100 bg-gradient-to-r from-purple-50 to-pink-50 p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Button 
                  variant="ghost" 
                  size="icon" 
                  onClick={onBack}
                  className="hover:bg-purple-100/50"
                >
                  <ArrowLeft className="h-4 w-4 text-purple-600" />
                </Button>
                <h1 className="text-lg font-semibold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                  {title}
                </h1>
              </div>
              {timeLeft && (
                <span className="rounded-full bg-purple-100 px-3 py-1 text-sm font-medium text-purple-600">
                  {timeLeft}
                </span>
              )}
            </div>
            <div className="mt-4">
              <div className="flex justify-between text-sm text-purple-600 mb-2">
                <span>Question {currentQuestion} of {totalQuestions}</span>
                <span>{Math.round((currentQuestion / totalQuestions) * 100)}%</span>
              </div>
              <div className="h-1 w-full rounded-full bg-purple-100">
                <div 
                  className="h-1 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 transition-all duration-300 ease-in-out"
                  style={{ width: `${(currentQuestion / totalQuestions) * 100}%` }}
                />
              </div>
            </div>
          </div>
          <div className="p-6">{children}</div>
        </div>
      </div>
    </div>
  )
}

