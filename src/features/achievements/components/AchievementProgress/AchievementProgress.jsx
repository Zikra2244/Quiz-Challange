import React from "react";
import { motion } from "framer-motion";
import { FiAward, FiTarget, FiStar, FiZap } from "react-icons/fi";
import CountUp from "react-countup";

const AchievementProgress = ({
  unlocked,
  total,
  percentage,
  totalXP,
  userProgress,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass-card p-6 mb-8"
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="flex items-center space-x-6">
          <div className="relative w-28 h-28 flex-shrink-0">
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
                stroke="url(#achievementGradient)"
                strokeWidth="8"
                strokeLinecap="round"
                strokeDasharray={2 * Math.PI * 45}
                strokeDashoffset={2 * Math.PI * 45 * (1 - percentage / 100)}
                initial={{ strokeDashoffset: 2 * Math.PI * 45 }}
                animate={{
                  strokeDashoffset: 2 * Math.PI * 45 * (1 - percentage / 100),
                }}
                transition={{ duration: 1, delay: 0.3 }}
              />
              <defs>
                <linearGradient
                  id="achievementGradient"
                  x1="0%"
                  y1="0%"
                  x2="100%"
                  y2="0%"
                >
                  <stop offset="0%" stopColor="#3B82F6" />
                  <stop offset="100%" stopColor="#8B5CF6" />
                </linearGradient>
              </defs>
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-2xl font-bold text-white">
                <CountUp end={percentage} duration={2} suffix="%" />
              </span>
            </div>
          </div>

          <div>
            <h3 className="text-xl font-display font-bold text-white mb-2">
              Achievement Progress
            </h3>
            <p className="text-sm text-gray-400">
              Kamu telah membuka{" "}
              <span className="text-primary-400 font-medium">{unlocked}</span>{" "}
              dari <span className="text-white font-medium">{total}</span>{" "}
              achievements
            </p>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4">
          <div className="glass p-3 rounded-xl">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-r from-blue-500 to-cyan-500 p-1.5">
                <FiAward className="w-full h-full text-white" />
              </div>
              <div>
                <p className="text-xs text-gray-400">Unlocked</p>
                <p className="text-lg font-bold text-white">
                  <CountUp end={unlocked} duration={2} />
                  <span className="text-xs text-gray-400 ml-1">/{total}</span>
                </p>
              </div>
            </div>
          </div>

          <div className="glass p-3 rounded-xl">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-r from-yellow-400 to-orange-400 p-1.5">
                <FiStar className="w-full h-full text-white" />
              </div>
              <div>
                <p className="text-xs text-gray-400">Total XP</p>
                <p className="text-lg font-bold text-yellow-400">
                  <CountUp end={totalXP} duration={2} />
                </p>
              </div>
            </div>
          </div>

          <div className="glass p-3 rounded-xl">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-r from-green-400 to-emerald-400 p-1.5">
                <FiZap className="w-full h-full text-white" />
              </div>
              <div>
                <p className="text-xs text-gray-400">Streak</p>
                <p className="text-lg font-bold text-green-400">
                  <CountUp
                    end={userProgress?.currentStreak || 0}
                    duration={2}
                  />
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6 pt-6 border-t border-white/10">
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-400">Next Milestone</span>
          <span className="text-sm font-medium text-white">
            {unlocked >= total
              ? "Completed!"
              : `${total - unlocked} achievements left`}
          </span>
        </div>
        <div className="w-full h-2 bg-white/5 rounded-full mt-2 overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${percentage}%` }}
            transition={{ duration: 1 }}
            className="h-full bg-gradient-to-r from-primary-500 to-purple-600 rounded-full"
          />
        </div>
      </div>
    </motion.div>
  );
};

export default AchievementProgress;
