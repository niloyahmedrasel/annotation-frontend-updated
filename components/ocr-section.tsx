import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"

interface OCRSectionProps {
  onComplete: () => void
}

export function OCRSection({ onComplete }: OCRSectionProps) {
  const [isProcessing, setIsProcessing] = useState(false)
  const [progress, setProgress] = useState(0)

  const handleOCR = () => {
    setIsProcessing(true)
    setProgress(0)

    const interval = setInterval(() => {
      setProgress((prevProgress) => {
        if (prevProgress >= 100) {
          clearInterval(interval)
          setIsProcessing(false)
          // Call onComplete after the progress is complete
          onComplete()
          return 100
        }
        return prevProgress + 10
      })
    }, 500)
  }

  return (
    <div className="text-center py-8">
      <h2 className="text-2xl font-semibold mb-4">OCR Processing</h2>
      <p className="mb-4">Click the button below to start the OCR process for this book.</p>
      <Button onClick={handleOCR} disabled={isProcessing}>
        {isProcessing ? "Processing..." : "Start OCR"}
      </Button>
      {isProcessing && (
        <div className="mt-4">
          <Progress value={progress} className="w-full" />
          <p className="mt-2">{progress}% complete</p>
        </div>
      )}
    </div>
  )
}

