import React from "react";
import { FiClock } from "react-icons/fi";

const QuizTimer = ({ timeLeft, totalTime = 300 }) => {
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  const isDanger = timeLeft <= 30;
  const isWarning = timeLeft <= 60 && timeLeft > 30;

  return (
    <div className={`flex items-center space-x-2 px-4 py-2 rounded-xl ${
      isDanger ? "bg-red-500/20" : isWarning ? "bg-yellow-500/20" : "bg-white/10"
    }`}>
      <FiClock className={`w-5 h-5 ${
        isDanger ? "text-red-400" : isWarning ? "text-yellow-400" : "text-primary-400"
      }`} />
      <span className={`font-mono text-xl font-bold ${
        isDanger ? "text-red-400" : isWarning ? "text-yellow-400" : "text-white"
      }`}>
        {formatTime(timeLeft)}
      </span>
    </div>
  );
};

export default QuizTimer;
