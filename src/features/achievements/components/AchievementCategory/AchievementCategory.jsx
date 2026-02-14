import React from "react";
import { motion } from "framer-motion";
import {
  FiBook,
  FiStar,
  FiClock,
  FiZap,
  FiUsers,
  FiAward,
  FiTarget,
  FiTrendingUp,
} from "react-icons/fi";

const AchievementCategory = ({
  categories,
  selectedCategory,
  onSelectCategory,
  categoryStats,
}) => {
  const getCategoryIcon = (categoryId) => {
    switch (categoryId) {
      case "quiz":
        return <FiBook className="w-5 h-5" />;
      case "score":
        return <FiStar className="w-5 h-5" />;
      case "streak":
        return <FiClock className="w-5 h-5" />;
      case "speed":
        return <FiZap className="w-5 h-5" />;
      case "social":
        return <FiUsers className="w-5 h-5" />;
      case "accuracy":
        return <FiTarget className="w-5 h-5" />;
      case "milestone":
        return <FiTrendingUp className="w-5 h-5" />;
      default:
        return <FiAward className="w-5 h-5" />;
    }
  };

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-3">
      {categories.map((category) => {
        const isSelected = selectedCategory === category.id;
        const stats = categoryStats?.[category.id] || { unlocked: 0, total: 0 };
        const progress =
          stats.total > 0 ? (stats.unlocked / stats.total) * 100 : 0;

        return (
          <motion.button
            key={category.id}
            whileHover={{ scale: 1.02, y: -2 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => onSelectCategory(category.id)}
            className={`
              relative p-4 glass rounded-xl transition-all overflow-hidden
              ${
                isSelected
                  ? "ring-2 ring-primary-500 bg-gradient-to-br from-primary-500/20 to-purple-500/20"
                  : "hover:bg-white/5"
              }
            `}
          >
            <div
              className="absolute bottom-0 left-0 h-1 bg-white/5"
              style={{ width: "100%" }}
            />

            <motion.div
              className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-primary-500 to-purple-600"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.5 }}
            />

            <div className="relative z-10">
              <div
                className={`
                w-12 h-12 mx-auto mb-3 rounded-xl 
                ${
                  isSelected
                    ? "bg-gradient-to-r from-primary-500 to-purple-600 text-white"
                    : "glass text-gray-400"
                } 
                flex items-center justify-center transition-all
              `}
              >
                {getCategoryIcon(category.id)}
              </div>

              <h3
                className={`
                text-sm font-medium mb-1
                ${isSelected ? "text-white" : "text-gray-400"}
              `}
              >
                {category.name}
              </h3>

              <div className="flex items-center justify-center space-x-2 text-xs">
                <span
                  className={isSelected ? "text-primary-400" : "text-gray-500"}
                >
                  {stats.unlocked || 0}/{stats.total || 0}
                </span>
                <span className="text-gray-600">•</span>
                <span className="text-gray-500">{Math.round(progress)}%</span>
              </div>

              {isSelected && (
                <motion.div
                  layoutId="activeCategory"
                  className="absolute inset-0 ring-2 ring-primary-500 rounded-xl"
                  transition={{ type: "spring", duration: 0.5 }}
                />
              )}
            </div>
          </motion.button>
        );
      })}
    </div>
  );
};

export default AchievementCategory;
