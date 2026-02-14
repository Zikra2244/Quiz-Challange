import React from "react";
import { motion } from "framer-motion";
import { 
  FiAward, 
  FiClock, 
  FiCheckCircle, 
  FiXCircle
} from "react-icons/fi";
import GradientText from "../../../../components/ui/GradientText/GradientText";

const ScoreCard = ({ result }) => {
  const getScoreColor = (score) => {
    if (score >= 80) return "from-green-400 to-emerald-400";
    if (score >= 60) return "from-yellow-400 to-orange-400";
    return "from-red-400 to-pink-400";
  };

  const getScoreMessage = (score) => {
    if (score >= 80) return "Excellent! 🎉";
    if (score >= 60) return "Good Job! 👍";
    if (score >= 40) return "Keep Learning! 💪";
    return "Try Again! 🎯";
  };

  const scoreColor = getScoreColor(result?.score || 0);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass-card p-8 relative overflow-hidden"
    >
      <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-primary-500/10 to-purple-500/10 rounded-full blur-3xl" />

      <div className="relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div className="flex items-center space-x-4 mb-4 md:mb-0">
            <div className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${scoreColor} p-3`}>
              <FiAward className="w-full h-full text-white" />
            </div>
            <div>
              <GradientText gradient="primary" className="text-2xl font-display font-bold">
                {getScoreMessage(result?.score || 0)}
              </GradientText>
            </div>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row items-center justify-between">
          <div className="relative w-48 h-48 mb-6 lg:mb-0">
            <svg className="w-full h-full" viewBox="0 0 100 100">
              <circle
                cx="50"
                cy="50"
                r="45"
                fill="none"
                stroke="rgba(255,255,255,0.1)"
                strokeWidth="8"
              />
              <motion.circle
                cx="50"
                cy="50"
                r="45"
                fill="none"
                stroke="url(#scoreGradient)"
                strokeWidth="8"
                strokeLinecap="round"
                strokeDasharray={2 * Math.PI * 45}
                strokeDashoffset={2 * Math.PI * 45 * (1 - (result?.score || 0) / 100)}
                initial={{ strokeDashoffset: 2 * Math.PI * 45 }}
                animate={{ strokeDashoffset: 2 * Math.PI * 45 * (1 - (result?.score || 0) / 100) }}
                transition={{ duration: 1, delay: 0.3 }}
              />
              <defs>
                <linearGradient id="scoreGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#3B82F6" />
                  <stop offset="100%" stopColor="#8B5CF6" />
                </linearGradient>
              </defs>
            </svg>
            
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-5xl font-display font-bold text-white">
                {result?.score || 0}%
              </span>
              <span className="text-sm text-gray-400 mt-1">Final Score</span>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 lg:gap-8">
            <div className="text-center">
              <div className="text-3xl font-bold text-white mb-1">
                {result?.total || 0}
              </div>
              <div className="text-sm text-gray-400">Total Soal</div>
            </div>
            
            <div className="text-center">
              <div className="text-3xl font-bold text-green-400 mb-1">
                {result?.correct || 0}
              </div>
              <div className="text-sm text-gray-400 flex items-center justify-center">
                <FiCheckCircle className="w-4 h-4 mr-1 text-green-400" />
                Benar
              </div>
            </div>
            
            <div className="text-center">
              <div className="text-3xl font-bold text-red-400 mb-1">
                {result?.wrong || 0}
              </div>
              <div className="text-sm text-gray-400 flex items-center justify-center">
                <FiXCircle className="w-4 h-4 mr-1 text-red-400" />
                Salah
              </div>
            </div>
            
            <div className="text-center">
              <div className="text-3xl font-bold text-primary-400 mb-1">
                {Math.floor((result?.timeSpent || 0) / 60)}:{(result?.timeSpent || 0) % 60}
              </div>
              <div className="text-sm text-gray-400 flex items-center justify-center">
                <FiClock className="w-4 h-4 mr-1" />
                Durasi
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ScoreCard;
