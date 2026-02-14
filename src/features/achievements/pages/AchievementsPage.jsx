import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  FiAward,
  FiFilter,
  FiSearch,
  FiGrid,
  FiList,
  FiClock,
  FiStar,
  FiZap,
  FiBook,
  FiUsers,
  FiTarget,
  FiTrendingUp,
  FiChevronRight,
} from "react-icons/fi";
import { useAuth } from "../../../app/providers/AuthProvider";
import GradientText from "../../../components/ui/GradientText/GradientText";
import AchievementCard from "../components/AchievementCard/AchievementCard";
import AchievementProgress from "../components/AchievementProgress/AchievementProgress";
import RecentUnlocks from "../components/RecentUnlocks/RecentUnlocks";

// Achievement data
const ACHIEVEMENTS_DATA = [
  // Quiz Completion
  {
    id: "first_quiz",
    title: "First Step",
    description: "Selesaikan kuis pertamamu",
    icon: "",
    xp: 50,
    category: "quiz",
    rarity: "common",
    condition: "Selesaikan 1 kuis",
    progress: 0,
    maxProgress: 1,
  },
  {
    id: "quiz_master",
    title: "Quiz Master",
    description: "Selesaikan 50 kuis",
    icon: "",
    xp: 500,
    category: "quiz",
    rarity: "legendary",
    condition: "Selesaikan 50 kuis",
    progress: 0,
    maxProgress: 50,
  },
  {
    id: "century_club",
    title: "Century Club",
    description: "Selesaikan 100 kuis",
    icon: "",
    xp: 1000,
    category: "quiz",
    rarity: "legendary",
    condition: "Selesaikan 100 kuis",
    progress: 0,
    maxProgress: 100,
  },

  // Score Achievements
  {
    id: "perfect_score",
    title: "Perfect!",
    description: "Dapatkan skor 100% dalam satu kuis",
    icon: "",
    xp: 100,
    category: "score",
    rarity: "epic",
    condition: "Skor sempurna 100%",
    progress: 0,
    maxProgress: 1,
  },
  {
    id: "high_achiever",
    title: "High Achiever",
    description: "Dapatkan skor di atas 90% sebanyak 10 kali",
    icon: "",
    xp: 200,
    category: "score",
    rarity: "epic",
    condition: "10 kali skor 90%",
    progress: 0,
    maxProgress: 10,
  },
  {
    id: "sharpshooter",
    title: "Sharpshooter",
    description: "Akurasi 100% dalam satu kuis",
    icon: "",
    xp: 100,
    category: "score",
    rarity: "epic",
    condition: "Akurasi 100%",
    progress: 0,
    maxProgress: 1,
  },

  // Streak Achievements
  {
    id: "streak_3",
    title: "Getting Started",
    description: "3 hari berturut-turut mengerjakan kuis",
    icon: "",
    xp: 100,
    category: "streak",
    rarity: "common",
    condition: "Streak 3 hari",
    progress: 0,
    maxProgress: 3,
  },
  {
    id: "streak_7",
    title: "Consistency",
    description: "7 hari berturut-turut mengerjakan kuis",
    icon: "",
    xp: 300,
    category: "streak",
    rarity: "rare",
    condition: "Streak 7 hari",
    progress: 0,
    maxProgress: 7,
  },
  {
    id: "streak_30",
    title: "Dedication",
    description: "30 hari berturut-turut mengerjakan kuis",
    icon: "",
    xp: 1000,
    category: "streak",
    rarity: "legendary",
    condition: "Streak 30 hari",
    progress: 0,
    maxProgress: 30,
  },

  {
    id: "speed_demon",
    title: "Speed Demon",
    description: "Selesaikan kuis dalam waktu di bawah 2 menit",
    icon: "",
    xp: 150,
    category: "speed",
    rarity: "rare",
    condition: "Kuis < 2 menit",
    progress: 0,
    maxProgress: 1,
  },
  {
    id: "lightning",
    title: "Lightning Fast",
    description: "Selesaikan kuis dalam waktu di bawah 1 menit",
    icon: "",
    xp: 300,
    category: "speed",
    rarity: "epic",
    condition: "Kuis < 1 menit",
    progress: 0,
    maxProgress: 1,
  },

  {
    id: "explorer",
    title: "Explorer",
    description: "Coba 5 kategori berbeda",
    icon: "",
    xp: 150,
    category: "category",
    rarity: "rare",
    condition: "5 kategori",
    progress: 0,
    maxProgress: 5,
  },
  {
    id: "specialist",
    title: "Specialist",
    description: "Selesaikan 20 kuis dalam satu kategori",
    icon: "",
    xp: 400,
    category: "category",
    rarity: "epic",
    condition: "20 kuis 1 kategori",
    progress: 0,
    maxProgress: 20,
  },

  {
    id: "social",
    title: "Social Butterfly",
    description: "Bagikan hasil kuis 5 kali",
    icon: "",
    xp: 150,
    category: "social",
    rarity: "rare",
    condition: "5 share",
    progress: 0,
    maxProgress: 5,
  },

  {
    id: "accurate",
    title: "Accurate",
    description: "Akurasi rata-rata di atas 80%",
    icon: "",
    xp: 200,
    category: "accuracy",
    rarity: "epic",
    condition: "Akurasi 80%",
    progress: 0,
    maxProgress: 1,
  },
  {
    id: "precise",
    title: "Precise",
    description: "Akurasi rata-rata di atas 90%",
    icon: "",
    xp: 500,
    category: "accuracy",
    rarity: "legendary",
    condition: "Akurasi 90%",
    progress: 0,
    maxProgress: 1,
  },

  {
    id: "points_1000",
    title: "Point Collector",
    description: "Kumpulkan 1,000 XP",
    icon: "",
    xp: 100,
    category: "milestone",
    rarity: "common",
    condition: "1,000 XP",
    progress: 0,
    maxProgress: 1000,
  },
  {
    id: "points_5000",
    title: "XP Hunter",
    description: "Kumpulkan 5,000 XP",
    icon: "",
    xp: 500,
    category: "milestone",
    rarity: "rare",
    condition: "5,000 XP",
    progress: 0,
    maxProgress: 5000,
  },
  {
    id: "points_10000",
    title: "XP Master",
    description: "Kumpulkan 10,000 XP",
    icon: "",
    xp: 1000,
    category: "milestone",
    rarity: "legendary",
    condition: "10,000 XP",
    progress: 0,
    maxProgress: 10000,
  },
];

const AchievementsPage = () => {
  const { user } = useAuth();
  const [achievements, setAchievements] = useState([]);
  const [userProgress, setUserProgress] = useState({
    totalQuizzes: 0,
    totalXP: 0,
    currentStreak: 0,
    highScores: 0,
    perfectScores: 0,
    fastestQuiz: 999,
    averageAccuracy: 0,
    shares: 0,
    categoriesPlayed: [],
  });
  const [viewMode, setViewMode] = useState("grid");
  const [filter, setFilter] = useState("all");
  const [category, setCategory] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [recentUnlocks, setRecentUnlocks] = useState([]);

  useEffect(() => {
    try {
      const history = JSON.parse(localStorage.getItem("quiz_history") || "[]");

      const totalQuizzes = history.length;
      const totalXP = history.reduce(
        (acc, curr) => acc + (curr.score || 0) * 10,
        0,
      );

      let streak = 0;
      if (history.length > 0) {
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        const sortedHistory = [...history].sort(
          (a, b) => new Date(b.timestamp) - new Date(a.timestamp),
        );

        let currentDate = today;
        for (let i = 0; i < sortedHistory.length; i++) {
          const quizDate = new Date(sortedHistory[i].timestamp);
          quizDate.setHours(0, 0, 0, 0);

          if (quizDate.getTime() === currentDate.getTime()) {
            streak++;
            currentDate.setDate(currentDate.getDate() - 1);
          } else {
            break;
          }
        }
      }

      const highScores = history.filter((q) => q.score >= 90).length;
      const perfectScores = history.filter((q) => q.score === 100).length;

      const fastestQuiz =
        history.length > 0
          ? Math.min(...history.map((q) => q.timeSpent || 999))
          : 999;

      const totalCorrect = history.reduce(
        (acc, curr) => acc + (curr.correct || 0),
        0,
      );
      const totalQuestions = history.reduce(
        (acc, curr) => acc + (curr.total || 0),
        0,
      );
      const averageAccuracy =
        totalQuestions > 0
          ? Math.round((totalCorrect / totalQuestions) * 100)
          : 0;

      const categoriesPlayed = [...new Set(history.map((q) => q.category))];

      setUserProgress({
        totalQuizzes,
        totalXP,
        currentStreak: streak,
        highScores,
        perfectScores,
        fastestQuiz,
        averageAccuracy,
        shares: 0,
        categoriesPlayed,
      });

      const updatedAchievements = ACHIEVEMENTS_DATA.map((achievement) => {
        let progress = 0;
        let unlocked = false;

        switch (achievement.id) {
          case "first_quiz":
            progress = Math.min(totalQuizzes, 1);
            unlocked = totalQuizzes >= 1;
            break;
          case "quiz_master":
            progress = Math.min(totalQuizzes, 50);
            unlocked = totalQuizzes >= 50;
            break;
          case "century_club":
            progress = Math.min(totalQuizzes, 100);
            unlocked = totalQuizzes >= 100;
            break;
          case "perfect_score":
            progress = Math.min(perfectScores, 1);
            unlocked = perfectScores >= 1;
            break;
          case "high_achiever":
            progress = Math.min(highScores, 10);
            unlocked = highScores >= 10;
            break;
          case "sharpshooter":
            progress = Math.min(perfectScores, 1);
            unlocked = perfectScores >= 1;
            break;
          case "streak_3":
            progress = Math.min(streak, 3);
            unlocked = streak >= 3;
            break;
          case "streak_7":
            progress = Math.min(streak, 7);
            unlocked = streak >= 7;
            break;
          case "streak_30":
            progress = Math.min(streak, 30);
            unlocked = streak >= 30;
            break;
          case "speed_demon":
            progress = fastestQuiz < 120 ? 1 : 0;
            unlocked = fastestQuiz < 120;
            break;
          case "lightning":
            progress = fastestQuiz < 60 ? 1 : 0;
            unlocked = fastestQuiz < 60;
            break;
          case "explorer":
            progress = Math.min(categoriesPlayed.length, 5);
            unlocked = categoriesPlayed.length >= 5;
            break;
          case "specialist":
            const categoryCounts = {};
            history.forEach((q) => {
              if (q.category) {
                categoryCounts[q.category] =
                  (categoryCounts[q.category] || 0) + 1;
              }
            });
            const maxCategory = Math.max(...Object.values(categoryCounts), 0);
            progress = Math.min(maxCategory, 20);
            unlocked = maxCategory >= 20;
            break;
          case "accurate":
            progress = averageAccuracy >= 80 ? 1 : 0;
            unlocked = averageAccuracy >= 80;
            break;
          case "precise":
            progress = averageAccuracy >= 90 ? 1 : 0;
            unlocked = averageAccuracy >= 90;
            break;
          case "points_1000":
            progress = Math.min(totalXP, 1000);
            unlocked = totalXP >= 1000;
            break;
          case "points_5000":
            progress = Math.min(totalXP, 5000);
            unlocked = totalXP >= 5000;
            break;
          case "points_10000":
            progress = Math.min(totalXP, 10000);
            unlocked = totalXP >= 10000;
            break;
          default:
            progress = 0;
            unlocked = false;
        }

        return {
          ...achievement,
          progress,
          unlocked,
          percentage:
            achievement.maxProgress > 0
              ? Math.min(
                  100,
                  Math.round((progress / achievement.maxProgress) * 100),
                )
              : unlocked
                ? 100
                : 0,
        };
      });

      setAchievements(updatedAchievements);

      const unlocks = updatedAchievements
        .filter((a) => a.unlocked)
        .sort((a, b) => 0.5 - Math.random())
        .slice(0, 5);
      setRecentUnlocks(unlocks);
    } catch (error) {
      console.error("Failed to load achievements:", error);
    }
  }, []);

  const filteredAchievements = achievements.filter((achievement) => {
    if (filter === "unlocked" && !achievement.unlocked) return false;
    if (filter === "locked" && achievement.unlocked) return false;

    if (category !== "all" && achievement.category !== category) return false;

    if (searchTerm) {
      return (
        achievement.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        achievement.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    return true;
  });

  const totalAchievements = achievements.length;
  const unlockedCount = achievements.filter((a) => a.unlocked).length;
  const totalXP = achievements
    .filter((a) => a.unlocked)
    .reduce((acc, curr) => acc + curr.xp, 0);
  const completionPercentage =
    totalAchievements > 0
      ? Math.round((unlockedCount / totalAchievements) * 100)
      : 0;

  const categories = [
    { id: "all", name: "All", icon: "", count: achievements.length },
    {
      id: "quiz",
      name: "Quiz Master",
      icon: "",
      count: achievements.filter((a) => a.category === "quiz").length,
    },
    {
      id: "score",
      name: "High Scores",
      icon: "",
      count: achievements.filter((a) => a.category === "score").length,
    },
    {
      id: "streak",
      name: "Streaks",
      icon: "",
      count: achievements.filter((a) => a.category === "streak").length,
    },
    {
      id: "speed",
      name: "Speed",
      icon: "",
      count: achievements.filter((a) => a.category === "speed").length,
    },
    {
      id: "category",
      name: "Categories",
      icon: "",
      count: achievements.filter((a) => a.category === "category").length,
    },
    {
      id: "accuracy",
      name: "Accuracy",
      icon: "",
      count: achievements.filter((a) => a.category === "accuracy").length,
    },
    {
      id: "milestone",
      name: "Milestones",
      icon: "",
      count: achievements.filter((a) => a.category === "milestone").length,
    },
  ];

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
            <div className="flex items-center space-x-3 mb-2">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-r from-yellow-400 to-orange-500 p-2.5">
                <FiAward className="w-full h-full text-white" />
              </div>
              <div>
                <h1 className="text-3xl md:text-4xl font-display font-bold">
                  <GradientText gradient="primary" animate>
                    Achievements
                  </GradientText>
                </h1>
                <p className="text-gray-400">
                  Kumpulkan semua pencapaian dan dapatkan XP rewards
                </p>
              </div>
            </div>
          </div>

          <div className="mt-4 md:mt-0 flex items-center space-x-3">
            <div className="glass px-4 py-2 rounded-xl">
              <span className="text-sm text-gray-400 mr-2">Total XP:</span>
              <span className="text-xl font-bold text-yellow-400">
                {totalXP.toLocaleString()}
              </span>
            </div>
          </div>
        </div>

        <AchievementProgress
          unlocked={unlockedCount}
          total={totalAchievements}
          percentage={completionPercentage}
          totalXP={totalXP}
          userProgress={userProgress}
        />

        {recentUnlocks.length > 0 && <RecentUnlocks unlocks={recentUnlocks} />}

        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-3 my-8">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setCategory(cat.id)}
              className={`
                p-4 glass rounded-xl transition-all relative group
                ${
                  category === cat.id
                    ? "bg-gradient-to-r from-primary-500 to-purple-600 text-white"
                    : "hover:bg-white/5 text-gray-400"
                }
              `}
            >
              <div className="text-2xl mb-1">{cat.icon}</div>
              <div className="text-xs font-medium truncate">{cat.name}</div>
              <div
                className={`text-[10px] mt-1 ${
                  category === cat.id ? "text-white/80" : "text-gray-500"
                }`}
              >
                {cat.count}
              </div>
            </button>
          ))}
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
              className="block w-full pl-10 pr-3 py-3 glass rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
          </div>

          <div className="flex items-center space-x-3 w-full md:w-auto">
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="px-4 py-3 glass rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
            >
              <option value="all">All Achievements</option>
              <option value="unlocked">Unlocked</option>
              <option value="locked">Locked</option>
            </select>

            <div className="flex glass rounded-xl p-1">
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
              <button
                onClick={() => {
                  setFilter("all");
                  setSearchTerm("");
                  setCategory("all");
                }}
                className="px-6 py-3 glass rounded-xl text-white hover:bg-white/5 transition-all"
              >
                Clear Filters
              </button>
            )}
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default AchievementsPage;
