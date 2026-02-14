import React, { useState } from "react";
import { motion } from "framer-motion";
import { FiLock, FiCheckCircle, FiClock, FiAward } from "react-icons/fi";

const AchievementCard = ({ achievement, viewMode, index }) => {
  const [isHovered, setIsHovered] = useState(false);

  const getRarityColor = (rarity) => {
    switch (rarity) {
      case "legendary":
        return "from-yellow-400 to-amber-600";
      case "epic":
        return "from-purple-400 to-pink-500";
      case "rare":
        return "from-blue-400 to-cyan-500";
      default:
        return "from-gray-400 to-gray-500";
    }
  };

  const getRarityLabel = (rarity) => {
    switch (rarity) {
      case "legendary":
        return "Legendary";
      case "epic":
        return "Epic";
      case "rare":
        return "Rare";
      default:
        return "Common";
    }
  };

  if (viewMode === "list") {
    return (
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: index * 0.05 }}
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
        className={`
          glass-card p-4 flex items-center space-x-4 transition-all
          ${
            achievement.unlocked
              ? "border-l-4 border-green-500"
              : "border-l-4 border-gray-600 opacity-75"
          }
          ${isHovered && "scale-[1.02] bg-white/5"}
        `}
      >
        <div
          className={`
          w-16 h-16 rounded-2xl bg-gradient-to-r ${getRarityColor(achievement.rarity)} 
          flex items-center justify-center text-3xl flex-shrink-0
          ${!achievement.unlocked && "filter grayscale"}
        `}
        >
          {achievement.icon}
        </div>

        <div className="flex-1">
          <div className="flex justify-between items-start mb-2">
            <div>
              <h3 className="text-lg font-semibold text-white mb-1">
                {achievement.title}
              </h3>
              <p className="text-sm text-gray-400">{achievement.description}</p>
            </div>
            <div className="text-right">
              <span
                className={`
                px-2 py-1 rounded-full text-xs font-medium
                ${
                  achievement.unlocked
                    ? "bg-green-500/20 text-green-400"
                    : "bg-gray-500/20 text-gray-400"
                }
              `}
              >
                {achievement.unlocked ? "Unlocked" : "Locked"}
              </span>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <span className="text-xs text-gray-500">
                {getRarityLabel(achievement.rarity)}
              </span>
              <span className="text-xs text-yellow-400">
                +{achievement.xp} XP
              </span>
            </div>

            {!achievement.unlocked && (
              <div className="flex items-center space-x-2">
                <div className="w-24 h-1.5 bg-white/5 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${achievement.percentage}%` }}
                    className="h-full bg-gradient-to-r from-primary-500 to-purple-600 rounded-full"
                  />
                </div>
                <span className="text-xs text-gray-400">
                  {achievement.percentage}%
                </span>
              </div>
            )}
          </div>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className={`
        glass-card p-6 relative overflow-hidden group cursor-pointer
        ${!achievement.unlocked && "opacity-75"}
        ${isHovered && "scale-[1.02]"}
        transition-all duration-300
      `}
    >
      {achievement.unlocked && (
        <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/5 to-orange-500/5 opacity-0 group-hover:opacity-100 transition-opacity" />
      )}

      <div
        className={`
        relative w-20 h-20 mx-auto mb-4 rounded-2xl bg-gradient-to-r ${getRarityColor(achievement.rarity)} 
        p-0.5 group-hover:scale-110 transition-transform duration-300
        ${!achievement.unlocked && "filter grayscale"}
      `}
      >
        <div className="w-full h-full bg-dark-300 rounded-2xl flex items-center justify-center text-4xl">
          {achievement.icon}
        </div>

        <div className="absolute -top-2 -right-2">
          {achievement.unlocked ? (
            <div className="w-8 h-8 bg-gradient-to-r from-green-400 to-emerald-400 rounded-full flex items-center justify-center">
              <FiCheckCircle className="w-4 h-4 text-white" />
            </div>
          ) : (
            <div className="w-8 h-8 glass rounded-full flex items-center justify-center">
              <FiLock className="w-4 h-4 text-gray-400" />
            </div>
          )}
        </div>
      </div>

      <div className="text-center">
        <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-primary-400 group-hover:to-purple-400">
          {achievement.title}
        </h3>
        <p className="text-sm text-gray-400 mb-4 line-clamp-2">
          {achievement.description}
        </p>

        <div className="inline-flex items-center px-3 py-1 glass rounded-full mb-4">
          <FiAward className="w-3 h-3 text-yellow-400 mr-1" />
          <span className="text-xs font-medium text-yellow-400">
            +{achievement.xp} XP
          </span>
        </div>

        {!achievement.unlocked ? (
          <div className="space-y-2">
            <div className="w-full h-2 bg-white/5 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${achievement.percentage}%` }}
                transition={{ duration: 1, delay: index * 0.1 }}
                className="h-full bg-gradient-to-r from-primary-500 to-purple-600 rounded-full"
              />
            </div>
            <div className="flex justify-between text-xs">
              <span className="text-gray-500">Progress</span>
              <span className="text-primary-400 font-medium">
                {achievement.progress}/{achievement.maxProgress}
              </span>
            </div>
          </div>
        ) : (
          <div className="text-xs text-green-400 font-medium">✓ Unlocked</div>
        )}
      </div>

      <div className="absolute top-4 left-4">
        <span
          className={`
          px-2 py-1 rounded-full text-[10px] font-medium
          bg-gradient-to-r ${getRarityColor(achievement.rarity)} bg-opacity-20 text-white
        `}
        >
          {getRarityLabel(achievement.rarity)}
        </span>
      </div>
    </motion.div>
  );
};

export default AchievementCard;
