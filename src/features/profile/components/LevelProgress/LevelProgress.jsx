import React from "react";
import { motion } from "framer-motion";
import { FiZap, FiTrendingUp } from "react-icons/fi";
import GradientText from "../../../../components/ui/GradientText/GradientText";

const LevelProgress = ({ level, currentXP, nextLevelXP, progress }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 }}
      className="glass-card p-6 mt-6"
    >
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4">
        <div className="flex items-center space-x-4">
          <div className="w-14 h-14 rounded-xl bg-gradient-to-r from-primary-500 to-purple-600 flex items-center justify-center">
            <FiZap className="w-7 h-7 text-white" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <h3 className="text-xl font-display font-bold text-white">
                Level {level}
              </h3>
              <span className="px-2 py-1 glass rounded-full text-xs text-primary-400">
                <GradientText gradient="primary">
                  {currentXP.toLocaleString()} / {nextLevelXP.toLocaleString()}{" "}
                  XP
                </GradientText>
              </span>
            </div>
            <p className="text-sm text-gray-400 mt-1">
              {(nextLevelXP - currentXP).toLocaleString()} XP lagi menuju Level{" "}
              {level + 1}
            </p>
          </div>
        </div>

        <div className="mt-4 md:mt-0 flex items-center space-x-2">
          <FiTrendingUp className="w-4 h-4 text-green-400" />
          <span className="text-sm text-gray-400">
            +{Math.round(progress)}% to next level
          </span>
        </div>
      </div>

      <div className="relative w-full h-4 bg-white/5 rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 1, delay: 0.3 }}
          className="absolute top-0 left-0 h-full bg-gradient-to-r from-primary-500 to-purple-600 rounded-full"
        />

        <div className="absolute inset-0 flex items-center justify-between px-1">
          {Array.from({ length: 10 }).map((_, i) => (
            <div
              key={i}
              className="w-0.5 h-2 bg-white/10"
              style={{ marginLeft: i === 0 ? 0 : "10%" }}
            />
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default LevelProgress;
