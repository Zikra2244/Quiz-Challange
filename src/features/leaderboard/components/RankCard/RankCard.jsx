import React from "react";
import { motion } from "framer-motion";
import { FiAward, FiTrendingUp, FiStar } from "react-icons/fi";

const RankCard = ({
  rank,
  user,
  userStats,
  rankColor,
  rankIcon,
  level,
  xp,
  isUnranked,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`glass-card p-6 mb-8 relative overflow-hidden ${
        isUnranked ? "border border-yellow-500/30" : ""
      }`}
    >
      <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-yellow-500/10 to-orange-500/10 rounded-full blur-3xl" />

      <div className="relative z-10">
        <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
          {!isUnranked && rank ? (
            <div
              className={`
              w-24 h-24 rounded-2xl bg-gradient-to-br ${rankColor}
              flex flex-col items-center justify-center text-white shadow-xl
            `}
            >
              <span className="text-4xl font-bold">#{rank}</span>
              <span className="text-xs opacity-90 mt-1">Rank</span>
            </div>
          ) : (
            <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-gray-500 to-gray-700 flex flex-col items-center justify-center text-white opacity-70 shadow-xl">
              <span className="text-4xl font-bold">-</span>
              <span className="text-xs opacity-90 mt-1">Unranked</span>
            </div>
          )}

          <div className="flex-1">
            <div className="flex items-center space-x-2 mb-2">
              <h3 className="text-2xl font-display font-bold text-[var(--color-text)]">
                {user?.username}
              </h3>
              <span className="text-2xl">{rankIcon}</span>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <div className="flex items-center space-x-2 bg-[var(--color-glass)] px-3 py-1.5 rounded-full">
                <FiStar className="w-4 h-4 text-yellow-400" />
                <span className="text-sm font-medium text-[var(--color-text)]">
                  Level {level}
                </span>
              </div>

              <div className="flex items-center space-x-2 bg-[var(--color-glass)] px-3 py-1.5 rounded-full">
                <FiAward className="w-4 h-4 text-[var(--color-primary)]" />
                <span className="text-sm font-medium text-[var(--color-text)]">
                  {xp.toLocaleString()} XP
                </span>
              </div>

              <div className="flex items-center space-x-2 bg-[var(--color-glass)] px-3 py-1.5 rounded-full">
                <FiTrendingUp className="w-4 h-4 text-green-400" />
                <span className="text-sm font-medium text-[var(--color-text)]">
                  {userStats?.quizzes || 0} kuis • Akurasi{" "}
                  {userStats?.accuracy || 0}%
                </span>
              </div>
            </div>

            {!isUnranked && rank && rank > 1 && (
              <div className="mt-4">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-xs text-[var(--color-textSecondary)]">
                    Progress to next rank
                  </span>
                  <span className="text-xs font-medium text-[var(--color-primary)]">
                    #{Math.max(1, rank - 1)}
                  </span>
                </div>
                <div className="w-full h-2 bg-[var(--color-border)] rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: "75%" }}
                    transition={{ duration: 1 }}
                    className="h-full bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-secondary)] rounded-full"
                  />
                </div>
              </div>
            )}
            {xp === 0 && (
              <div className="mt-4 p-3 bg-yellow-500/10 rounded-lg border border-yellow-500/20">
                <p className="text-sm text-yellow-400 flex items-center">
                  <span className="mr-2">✨</span>
                  Kerjakan quiz untuk mendapatkan XP dan naik peringkat!
                </p>
              </div>
            )}
          </div>

          <div className="hidden lg:block">
            <div className="glass p-4 rounded-xl text-center">
              <FiAward
                className={`w-8 h-8 mx-auto mb-2 ${
                  xp === 0 ? "text-gray-500" : "text-yellow-400"
                }`}
              />
              <p className="text-xs text-[var(--color-textSecondary)]">
                Highest Rank
              </p>
              <p
                className={`text-lg font-bold ${
                  xp === 0 ? "text-gray-500" : "text-[var(--color-text)]"
                }`}
              >
                {xp === 0 ? "Unranked" : rank ? `#${rank}` : "-"}
              </p>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default RankCard;
