import React, { useState, useMemo } from "react";
import { motion } from "framer-motion";
import {
  FiAward,
  FiFilter,
  FiSearch,
  FiGrid,
  FiList,
  FiChevronDown,
} from "react-icons/fi";
import useAchievements from "../../../hooks/useAchievements";
import GradientText from "../../../components/ui/GradientText/GradientText";
import AchievementCard from "../components/AchievementCard/AchievementCard";
import AchievementCategory from "../components/AchievementCategory/AchievementCategory";
import AchievementProgress from "../components/AchievementProgress/AchievementProgress";
import RecentUnlocks from "../components/RecentUnlocks/RecentUnlocks";
import Button from "/../../components/ui/Button/Button";

const AchievementsPage = () => {
  const {
    achievements,
    unlockedAchievements,
    lockedAchievements,
    recentUnlocks,
    stats,
    totalXP,
    totalUnlocked,
    totalAchievements,
    completionPercentage,
  } = useAchievements();

  const [viewMode, setViewMode] = useState("grid");
  const [filter, setFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  const categories = [
    { id: "all", name: "All Achievements", icon: "🏆" },
    { id: "quiz", name: "Quiz Master", icon: "📚" },
    { id: "score", name: "High Scores", icon: "💯" },
    { id: "streak", name: "Streaks", icon: "🔥" },
    { id: "speed", name: "Speed", icon: "⚡" },
    { id: "accuracy", name: "Accuracy", icon: "🎯" },
    { id: "milestone", name: "Milestone", icon: "🎉" },
    { id: "social", name: "Social", icon: "👥" },
  ];

  const categoryStats = useMemo(() => {
    const stats = {};

    categories.forEach((category) => {
      if (category.id === "all") return;

      const categoryAchievements = achievements.filter((a) =>
        a.id.includes(category.id),
      );

      const unlocked = categoryAchievements.filter((a) => a.unlocked).length;

      stats[category.id] = {
        total: categoryAchievements.length,
        unlocked,
        percentage:
          categoryAchievements.length > 0
            ? (unlocked / categoryAchievements.length) * 100
            : 0,
      };
    });

    return stats;
  }, [achievements, categories]);

  const filteredAchievements = achievements.filter((achievement) => {
    if (filter === "unlocked" && !achievement.unlocked) return false;
    if (filter === "locked" && achievement.unlocked) return false;

    if (
      selectedCategory !== "all" &&
      !achievement.id.includes(selectedCategory)
    )
      return false;

    if (searchTerm) {
      return (
        achievement.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        achievement.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    return true;
  });

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-dark-400 pt-8 pb-16"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h1 className="text-3xl md:text-4xl font-display font-bold mb-2">
              <GradientText gradient="primary" animate>
                Achievements
              </GradientText>
            </h1>
            <p className="text-gray-400">
              Kumpulkan semua achievement dan dapatkan XP rewards
            </p>
          </div>

          <div className="mt-4 md:mt-0 flex items-center space-x-3">
            <div className="glass px-4 py-2 rounded-xl">
              <span className="text-sm text-gray-400 mr-2">Total XP:</span>
              <span className="text-xl font-bold text-yellow-400">
                {totalXP}
              </span>
            </div>
          </div>
        </div>

        <AchievementProgress
          unlocked={totalUnlocked}
          total={totalAchievements}
          percentage={completionPercentage}
          totalXP={totalXP}
        />
        {recentUnlocks.length > 0 && <RecentUnlocks unlocks={recentUnlocks} />}

        <div className="my-8">
          <AchievementCategory
            categories={categories}
            selectedCategory={selectedCategory}
            onSelectCategory={setSelectedCategory}
            categoryStats={categoryStats}
          />
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-6">
          <div className="relative w-full md:w-64">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FiSearch className="h-5 w-5 text-gray-500" />
            </div>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Cari achievement..."
              className="block w-full pl-10 pr-3 py-2 glass rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
          </div>

          <div className="flex items-center space-x-3 w-full md:w-auto">
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="px-4 py-2 glass rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
            >
              <option value="all">All Achievements</option>
              <option value="unlocked">Unlocked</option>
              <option value="locked">Locked</option>
            </select>
            <div className="flex glass rounded-lg p-1">
              <button
                onClick={() => setViewMode("grid")}
                className={`p-2 rounded-lg transition-all ${
                  viewMode === "grid"
                    ? "bg-primary-500 text-white"
                    : "text-gray-400 hover:text-white"
                }`}
              >
                <FiGrid className="w-5 h-5" />
              </button>
              <button
                onClick={() => setViewMode("list")}
                className={`p-2 rounded-lg transition-all ${
                  viewMode === "list"
                    ? "bg-primary-500 text-white"
                    : "text-gray-400 hover:text-white"
                }`}
              >
                <FiList className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        <div
          className={`
          grid gap-6
          ${
            viewMode === "grid"
              ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
              : "grid-cols-1"
          }
        `}
        >
          {filteredAchievements.map((achievement, index) => (
            <AchievementCard
              key={achievement.id}
              achievement={achievement}
              viewMode={viewMode}
              index={index}
            />
          ))}
        </div>

        {filteredAchievements.length === 0 && (
          <div className="text-center py-16">
            <div className="w-24 h-24 mx-auto mb-6 glass rounded-3xl flex items-center justify-center">
              <FiAward className="w-12 h-12 text-gray-500" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">
              No achievements found
            </h3>
            <p className="text-gray-400 mb-6">
              {filter === "unlocked"
                ? "Kamu belum memiliki achievement. Selesaikan kuis untuk mendapatkannya!"
                : "Tidak ada achievement yang sesuai dengan filter."}
            </p>
            {filter !== "all" && (
              <Button
                variant="outline"
                onClick={() => {
                  setFilter("all");
                  setSearchTerm("");
                  setSelectedCategory("all");
                }}
              >
                Clear Filters
              </Button>
            )}
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default AchievementsPage;
