import React from "react";
import { motion } from "framer-motion";
import { FiBarChart2 } from "react-icons/fi";

const PerformanceChart = ({ questions, answers }) => {
  if (!questions || questions.length === 0) {
    return (
      <div className="glass-card p-6">
        <h2 className="text-xl font-semibold text-white mb-4">
          Performa per Soal
        </h2>
        <p className="text-gray-400">Belum ada data performa.</p>
      </div>
    );
  }

  const chartData = questions.map((q, index) => {
    const answer = answers?.find(a => a?.questionId === index);
    return {
      question: index + 1,
      correct: answer?.isCorrect ? 1 : 0
    };
  });

  const correctCount = answers?.filter(a => a?.isCorrect).length || 0;
  const wrongCount = (answers?.length || 0) - correctCount;

  return (
    <div className="glass-card p-6">
      <h2 className="text-xl font-semibold text-white mb-6 flex items-center">
        <FiBarChart2 className="mr-2 text-primary-400" />
        Performa per Soal
      </h2>

      <div className="flex items-end justify-around h-40 mb-6">
        {chartData.map((data, index) => (
          <div key={index} className="flex flex-col items-center w-full max-w-[30px]">
            <motion.div
              initial={{ height: 0 }}
              animate={{ height: data.correct ? 40 : 20 }}
              transition={{ delay: index * 0.05, duration: 0.5 }}
              className={`w-6 rounded-t-lg ${
                data.correct 
                  ? "bg-gradient-to-t from-green-400 to-emerald-400" 
                  : "bg-gradient-to-t from-red-400 to-pink-400"
              }`}
              style={{ height: data.correct ? 40 : 20 }}
            />
            <span className="text-xs text-gray-500 mt-2">
              {data.question}
            </span>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-2 gap-4 mt-4">
        <div className="glass p-4 rounded-xl">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-400">Jawaban Benar</span>
            <span className="text-lg font-bold text-green-400">
              {correctCount}
            </span>
          </div>
          <div className="w-full h-2 bg-white/5 rounded-full">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${(correctCount / questions.length) * 100}%` }}
              transition={{ duration: 0.8 }}
              className="h-full bg-gradient-to-r from-green-400 to-emerald-400 rounded-full"
            />
          </div>
        </div>
        
        <div className="glass p-4 rounded-xl">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-400">Jawaban Salah</span>
            <span className="text-lg font-bold text-red-400">
              {wrongCount}
            </span>
          </div>
          <div className="w-full h-2 bg-white/5 rounded-full">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${(wrongCount / questions.length) * 100}%` }}
              transition={{ duration: 0.8 }}
              className="h-full bg-gradient-to-r from-red-400 to-pink-400 rounded-full"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PerformanceChart;
