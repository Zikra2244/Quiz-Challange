import React, { useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import DOMPurify from "dompurify";
import { FiCheckCircle, FiXCircle } from "react-icons/fi";
import Button from "../../../../components/ui/Button/Button";  // ✅ Path benar: ../../../../components/ui/Button/Button

const QuestionCard = ({
  question,
  currentIndex,
  totalQuestions,
  onAnswerSelect,
  selectedAnswer,
  showFeedback,
  isCorrect,
  disabled
}) => {
  const sanitizedQuestion = useMemo(() => ({
    __html: DOMPurify.sanitize(question?.question || "")
  }), [question?.question]);

  const getDifficultyColor = (difficulty) => {
    switch (difficulty?.toLowerCase()) {
      case "easy": return "from-green-400 to-emerald-400";
      case "medium": return "from-yellow-400 to-orange-400";
      case "hard": return "from-red-400 to-pink-400";
      default: return "from-blue-400 to-cyan-400";
    }
  };

  const getDifficultyLabel = (difficulty) => {
    switch (difficulty?.toLowerCase()) {
      case "easy": return "Mudah";
      case "medium": return "Sedang";
      case "hard": return "Sulit";
      default: return difficulty || "General";
    }
  };

  if (!question) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      className="glass-card p-6 md:p-8 relative overflow-hidden"
    >
      <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-primary-500/5 to-purple-500/5 rounded-full blur-3xl" />
      
      <div className="relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
          <div className="flex items-center space-x-3 mb-4 md:mb-0">
            <span className="px-4 py-2 glass rounded-full text-sm font-medium text-primary-400">
              Soal {currentIndex + 1} / {totalQuestions}
            </span>
            {question.category && (
              <span className="px-4 py-2 glass rounded-full text-sm font-medium text-gray-300">
                {question.category}
              </span>
            )}
          </div>
          
          {question.difficulty && (
            <div className={`px-4 py-2 rounded-full text-sm font-medium bg-gradient-to-r ${getDifficultyColor(question.difficulty)} bg-opacity-20 text-white`}>
              {getDifficultyLabel(question.difficulty)}
            </div>
          )}
        </div>

        <h2 
          className="text-xl md:text-2xl lg:text-3xl font-display font-semibold text-white mb-8 leading-relaxed"
          dangerouslySetInnerHTML={sanitizedQuestion}
        />

        <div className="space-y-4">
          {question.all_answers?.map((answer, idx) => {
            const isSelected = selectedAnswer === answer;
            const isCorrectAnswer = answer === question.correct_answer;
            
            let buttonVariant = "outline";
            if (showFeedback) {
              if (isCorrectAnswer) {
                buttonVariant = "success";
              } else if (isSelected && !isCorrectAnswer) {
                buttonVariant = "danger";
              }
            } else if (isSelected) {
              buttonVariant = "primary";
            }

            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.1 }}
              >
                <Button
                  variant={buttonVariant}
                  size="lg"
                  fullWidth
                  onClick={() => onAnswerSelect(answer)}
                  disabled={disabled || showFeedback}
                  className="justify-start text-left p-4 relative overflow-hidden"
                >
                  <span className="flex items-center w-full">
                    <span className="flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-full bg-white/10 mr-4">
                      {String.fromCharCode(65 + idx)}
                    </span>
                    <span 
                      className="flex-1"
                      dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(answer) }}
                    />
                    {showFeedback && isCorrectAnswer && (
                      <FiCheckCircle className="w-6 h-6 text-green-400 ml-2 flex-shrink-0" />
                    )}
                    {showFeedback && isSelected && !isCorrectAnswer && (
                      <FiXCircle className="w-6 h-6 text-red-400 ml-2 flex-shrink-0" />
                    )}
                  </span>
                </Button>
              </motion.div>
            );
          })}
        </div>

        <AnimatePresence>
          {showFeedback && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className={`mt-6 p-4 rounded-lg ${
                isCorrect 
                  ? "bg-green-500/20 border border-green-500/30" 
                  : "bg-red-500/20 border border-red-500/30"
              }`}
            >
              <div className="flex items-center">
                {isCorrect ? (
                  <>
                    <FiCheckCircle className="w-5 h-5 text-green-400 mr-2 flex-shrink-0" />
                    <div>
                      <p className="text-white font-medium">Jawaban Benar! 🎉</p>
                      <p className="text-sm text-gray-300 mt-1">
                        +{question.points || 10} poin
                      </p>
                    </div>
                  </>
                ) : (
                  <>
                    <FiXCircle className="w-5 h-5 text-red-400 mr-2 flex-shrink-0" />
                    <div>
                      <p className="text-white font-medium">Jawaban Salah</p>
                      <p className="text-sm text-gray-300 mt-1">
                        Jawaban benar:{" "}
                        <span 
                          className="text-green-400 font-medium"
                          dangerouslySetInnerHTML={{ 
                            __html: DOMPurify.sanitize(question.correct_answer) 
                          }}
                        />
                      </p>
                    </div>
                  </>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="mt-6 pt-4 border-t border-white/10 flex justify-between items-center text-sm text-gray-400">
          <span>Points: {question.points || 10}</span>
          {!showFeedback && !disabled && (
            <span className="text-primary-400">
              Pilih jawaban untuk melanjutkan
            </span>
          )}
          {showFeedback && (
            <span className="text-gray-500">
              Memuat soal berikutnya...
            </span>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default QuestionCard;
