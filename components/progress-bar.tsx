import type React from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Check } from "lucide-react"

interface Step {
  id: string
  title: string
  icon: React.ReactNode
}

interface ProgressBarProps {
  steps: Step[]
  currentStep: number
  completedSteps: number[]
  onStepClick: (step: number) => void
}

const ProgressBar: React.FC<ProgressBarProps> = ({ steps, currentStep, completedSteps, onStepClick }) => {
  return (
    <div className="w-full py-6">
      <div className="flex justify-between">
        {steps.map((step, index) => {
          const isCompleted = completedSteps.includes(index)
          const isActive = index === currentStep

          return (
            <div key={step.id} className="flex flex-col items-center w-1/5">
              <motion.div
                className={`relative flex items-center justify-center w-12 h-12 rounded-full border-2 cursor-pointer ${
                  isCompleted ? "bg-green-500 border-green-500" : isActive ? "border-yellow-400" : "border-gray-300"
                }`}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => onStepClick(index)}
              >
                <AnimatePresence>
                  {isCompleted ? (
                    <motion.div
                      key="check"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      exit={{ scale: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <Check className="w-6 h-6 text-white" />
                    </motion.div>
                  ) : (
                    <motion.div
                      key="icon"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      exit={{ scale: 0 }}
                      transition={{ duration: 0.3 }}
                      className={`${isActive ? "text-yellow-400" : "text-gray-500"}`}
                    >
                      {step.icon}
                    </motion.div>
                  )}
                </AnimatePresence>
                {isActive && !isCompleted && (
                  <motion.div
                    className="absolute w-full h-full rounded-full border-2 border-yellow-400"
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY }}
                  />
                )}
              </motion.div>
              <div className="mt-2 text-xs font-medium text-center">{step.title}</div>
            </div>
          )
        })}
      </div>
      <div className="relative mt-4">
        <div className="absolute top-0 left-0 w-full h-1 bg-gray-200 rounded"></div>
        <motion.div
          className="absolute top-0 left-0 h-1 bg-green-500 rounded"
          initial={{ width: "0%" }}
          animate={{ width: `${((Math.max(...completedSteps, 0) + 1) / steps.length) * 100}%` }}
          transition={{ duration: 0.5 }}
        />
      </div>
    </div>
  )
}

export default ProgressBar

