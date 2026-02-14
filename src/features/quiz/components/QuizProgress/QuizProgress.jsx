import React from "react";
import { motion } from "framer-motion";

const QuizProgress = ({ currentIndex, totalQuestions, userAnswers }) => {
  const progress = ((currentIndex + 1) / totalQuestions) * 100;

  return (
    <div className="glass-card p-6 mb-8">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold text-white">
          Progress Kuis
        </h3>
        <div className="text-right">
          <span className="text-2xl font-display font-bold text-white">
            {Math.round(progress)}%
          </span>
        </div>
      </div>

      <div className="relative w-full h-3 bg-white/5 rounded-full mb-6 overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.5 }}
          className="absolute top-0 left-0 h-full bg-gradient-to-r from-primary-500 to-purple-600 rounded-full"
        />
      </div>

      <div className="flex items-center justify-between">
        {Array.from({ length: totalQuestions }).map((_, index) => (
          <div
            key={index}
            className={`
              w-8 h-8 rounded-xl flex items-center justify-center
              ${index === currentIndex 
                ? "bg-gradient-to-r from-primary-500 to-purple-600 text-white" 
                : index < currentIndex
                ? "bg-green-500/20 text-green-400"
                : "bg-white/10 text-gray-400"
              }
            `}
          >
            <span className="text-sm font-semibold">{index + 1}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default QuizProgress;
