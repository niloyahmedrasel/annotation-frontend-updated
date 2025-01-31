"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { OCRSection } from "@/components/ocr-section"
import { ReviewSection } from "@/components/review-section"
import ProgressBar from "@/components/progress-bar"
import { ChevronLeft, ChevronRight, BookOpen, FileText, Tag, Type, CheckCircle } from "lucide-react"

const processingSteps = [
  { id: "OCR", title: "OCR", icon: <BookOpen className="w-6 h-6" /> },
  { id: "ChapterFootnote", title: "Chapter & Footnote", icon: <FileText className="w-6 h-6" /> },
  { id: "NER", title: "NER", icon: <Tag className="w-6 h-6" /> },
  { id: "Diacritics", title: "Diacritics", icon: <Type className="w-6 h-6" /> },
  { id: "Review", title: "Review", icon: <CheckCircle className="w-6 h-6" /> },
]

export default function ProcessBookPage({ params }: { params: { id: string } }) {
  const [currentStep, setCurrentStep] = useState(0)
  const [completedSteps, setCompletedSteps] = useState<number[]>([])
  const router = useRouter()

  const handleStepClick = (step: number) => {
    if (step <= Math.max(...completedSteps, 0) + 1) {
      setCurrentStep(step)
    }
  }

  const handlePreviousStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
      setCompletedSteps((prev) => prev.filter((step) => step < currentStep - 1))
    }
  }

  const handleNextStep = () => {
    if (currentStep < processingSteps.length - 1) {
      setCompletedSteps((prev) => [...prev, currentStep])
      setCurrentStep((prev) => prev + 1)
    }
  }

  const isReviewStep = currentStep === processingSteps.length - 1

  useEffect(() => {
    // Reset completed steps when navigating back to a previous step
    setCompletedSteps((prev) => prev.filter((step) => step < currentStep))
  }, [currentStep])

  if (isReviewStep) {
    return <ReviewSection onBack={handlePreviousStep} bookId={params.id} />
  }

  return (
    <div className="h-screen flex flex-col">
      <div className="flex-grow overflow-y-auto">
        <div className="container mx-auto px-4 py-8">
          <Button variant="ghost" onClick={() => router.push("/dashboard/books")} className="mb-4">
            <ChevronLeft className="mr-2 h-4 w-4" />
            Back to All Books
          </Button>
          <h1 className="text-3xl font-bold mb-6">Process Book: {params.id}</h1>
          <ProgressBar
            steps={processingSteps}
            currentStep={currentStep}
            completedSteps={completedSteps}
            onStepClick={handleStepClick}
          />
          <Separator className="my-8" />

          <div className="mt-8">
            {currentStep === 0 && (
              <OCRSection
                onComplete={() => {
                  setCompletedSteps((prev) => [...prev, currentStep])
                  setCurrentStep((prev) => prev + 1)
                }}
              />
            )}
            {(currentStep === 1 || currentStep === 2 || currentStep === 3) && (
              <div className="text-center py-8">
                <h2 className="text-2xl font-semibold mb-4">{processingSteps[currentStep].title}</h2>
                <p>This feature is not yet implemented.</p>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="bg-gray-800 p-4 flex justify-between">
        <Button onClick={handlePreviousStep} disabled={currentStep === 0}>
          <ChevronLeft className="mr-2 h-4 w-4" />
          Previous
        </Button>
        <Button onClick={handleNextStep} disabled={currentStep === processingSteps.length - 1}>
          Next
          <ChevronRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </div>
  )
}

