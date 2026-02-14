import { useState, useEffect, useCallback, useMemo } from "react";
import useLocalStorage from "./useLocalStorage";

const ACHIEVEMENTS = {
  FIRST_QUIZ: {
    id: "first_quiz",
    title: "First Step",
    description: "Selesaikan kuis pertamamu",
    icon: "",
    xp: 50,
    category: "quiz",
    condition: (stats) => stats.totalQuizzes >= 1,
  },
  QUIZ_MASTER: {
    id: "quiz_master",
    title: "Quiz Master",
    description: "Selesaikan 50 kuis",
    icon: "",
    xp: 500,
    category: "quiz",
    condition: (stats) => stats.totalQuizzes >= 50,
  },
  CENTURY_CLUB: {
    id: "century_club",
    title: "Century Club",
    description: "Selesaikan 100 kuis",
    icon: "",
    xp: 1000,
    category: "quiz",
    condition: (stats) => stats.totalQuizzes >= 100,
  },

  PERFECT_SCORE: {
    id: "perfect_score",
    title: "Perfect!",
    description: "Dapatkan skor 100% dalam satu kuis",
    icon: "",
    xp: 100,
    category: "score",
    condition: (stats) => stats.perfectScores >= 1,
  },
  HIGH_ACHIEVER: {
    id: "high_achiever",
    title: "High Achiever",
    description: "Dapatkan skor di atas 90% sebanyak 10 kali",
    icon: "",
    xp: 200,
    category: "score",
    condition: (stats) => stats.highScores >= 10,
  },

  STREAK_3: {
    id: "streak_3",
    title: "Getting Started",
    description: "3 hari berturut-turut mengerjakan kuis",
    icon: "",
    xp: 100,
    category: "streak",
    condition: (stats) => stats.currentStreak >= 3,
  },
  STREAK_7: {
    id: "streak_7",
    title: "Consistency",
    description: "7 hari berturut-turut mengerjakan kuis",
    icon: "",
    xp: 300,
    category: "streak",
    condition: (stats) => stats.currentStreak >= 7,
  },
  STREAK_30: {
    id: "streak_30",
    title: "Dedication",
    description: "30 hari berturut-turut mengerjakan kuis",
    icon: "",
    xp: 1000,
    category: "streak",
    condition: (stats) => stats.currentStreak >= 30,
  },

  SPEED_DEMON: {
    id: "speed_demon",
    title: "Speed Demon",
    description: "Selesaikan kuis dalam waktu di bawah 2 menit",
    icon: "",
    xp: 150,
    category: "speed",
    condition: (stats) => stats.fastestQuiz < 120,
  },
  LIGHTNING: {
    id: "lightning",
    title: "Lightning Fast",
    description: "Selesaikan kuis dalam waktu di bawah 1 menit",
    icon: "",
    xp: 300,
    category: "speed",
    condition: (stats) => stats.fastestQuiz < 60,
  },

  EXPLORER: {
    id: "explorer",
    title: "Explorer",
    description: "Coba 5 kategori berbeda",
    icon: "",
    xp: 150,
    category: "category",
    condition: (stats) => stats.categoriesPlayed >= 5,
  },
  SPECIALIST: {
    id: "specialist",
    title: "Specialist",
    description: "Selesaikan 20 kuis dalam satu kategori",
    icon: "",
    xp: 400,
    category: "category",
    condition: (stats) => stats.maxCategoryCount >= 20,
  },

  ACCURATE: {
    id: "accurate",
    title: "Accurate",
    description: "Akurasi rata-rata di atas 80%",
    icon: "",
    xp: 200,
    category: "accuracy",
    condition: (stats) => stats.averageAccuracy >= 80,
  },
  PRECISE: {
    id: "precise",
    title: "Precise",
    description: "Akurasi rata-rata di atas 90%",
    icon: "",
    xp: 500,
    category: "accuracy",
    condition: (stats) => stats.averageAccuracy >= 90,
  },

  XP_1000: {
    id: "xp_1000",
    title: "Point Collector",
    description: "Kumpulkan 1,000 XP",
    icon: "",
    xp: 100,
    category: "xp",
    condition: (stats) => stats.totalXP >= 1000,
  },
  XP_5000: {
    id: "xp_5000",
    title: "XP Hunter",
    description: "Kumpulkan 5,000 XP",
    icon: "",
    xp: 500,
    category: "xp",
    condition: (stats) => stats.totalXP >= 5000,
  },
  XP_10000: {
    id: "xp_10000",
    title: "XP Master",
    description: "Kumpulkan 10,000 XP",
    icon: "",
    xp: 1000,
    category: "xp",
    condition: (stats) => stats.totalXP >= 10000,
  },
};

export const useAchievements = () => {
  const [achievements, setAchievements] = useLocalStorage("achievements", {});
  const [stats, setStats] = useLocalStorage("achievement_stats", {
    totalQuizzes: 0,
    totalXP: 0,
    currentStreak: 0,
    longestStreak: 0,
    highScores: 0,
    perfectScores: 0,
    fastestQuiz: Infinity,
    averageAccuracy: 0,
    categoriesPlayed: 0,
    maxCategoryCount: 0,
    lastQuizDate: null,
  });

  const [recentUnlocks, setRecentUnlocks] = useState([]);

  useEffect(() => {
    try {
      const history = JSON.parse(localStorage.getItem("quiz_history") || "[]");

      const quizXP = history.reduce((acc, quiz) => {
        return acc + (quiz.correct || 0) * 10;
      }, 0);

      const achievementXP = Object.values(achievements).reduce((acc, a) => {
        console.log(
          `  Achievement: ${a.achievement?.title}, XP: ${a.achievement?.xp}`,
        );
        return acc + (a.achievement?.xp || 0);
        return acc + (a.achievement?.xp || 0);
      }, 0);

      const totalXP = quizXP + achievementXP;

      setStats((prev) => ({
        ...prev,
        totalXP,
      }));

      console.log(" XP Calculation:", { quizXP, achievementXP, totalXP });
    } catch (error) {
      console.error("Failed to calculate XP:", error);
    }
  }, [achievements]);

  const updateStats = useCallback(
    (quizResult) => {
      setStats((prev) => {
        const newStats = { ...prev };

        newStats.totalQuizzes = (prev.totalQuizzes || 0) + 1;

        if (quizResult.score === 100) {
          newStats.perfectScores = (prev.perfectScores || 0) + 1;
        }

        if (quizResult.score >= 90) {
          newStats.highScores = (prev.highScores || 0) + 1;
        }

        if (quizResult.timeSpent < prev.fastestQuiz) {
          newStats.fastestQuiz = quizResult.timeSpent;
        }

        const today = new Date().toDateString();
        const lastQuiz = prev.lastQuizDate
          ? new Date(prev.lastQuizDate).toDateString()
          : null;

        if (lastQuiz === today) {
          newStats.currentStreak = prev.currentStreak;
        } else if (
          lastQuiz === new Date(Date.now() - 86400000).toDateString()
        ) {
          newStats.currentStreak = (prev.currentStreak || 0) + 1;
          newStats.longestStreak = Math.max(
            newStats.currentStreak,
            prev.longestStreak || 0,
          );
        } else {
          newStats.currentStreak = 1;
        }

        newStats.lastQuizDate = new Date().toISOString();

        return newStats;
      });
    },
    [setStats],
  );

  const checkAchievements = useCallback(() => {
    const newlyUnlocked = [];

    Object.entries(ACHIEVEMENTS).forEach(([key, achievement]) => {
      if (achievements[achievement.id]?.unlocked) return;

      if (achievement.condition(stats)) {
        setAchievements((prev) => ({
          ...prev,
          [achievement.id]: {
            unlocked: true,
            unlockedAt: new Date().toISOString(),
            achievement,
          },
        }));

        setStats((prev) => ({
          ...prev,
          totalXP: (prev.totalXP || 0) + achievement.xp,
        }));

        newlyUnlocked.push(achievement);
      }
    });

    if (newlyUnlocked.length > 0) {
      setRecentUnlocks((prev) => [...newlyUnlocked, ...prev].slice(0, 5));
    }

    return newlyUnlocked;
  }, [achievements, stats, setAchievements, setStats]);

  useEffect(() => {
    checkAchievements();
  }, [stats, checkAchievements]);

  const resetAchievements = useCallback(() => {
    setAchievements({});
    setStats({
      totalQuizzes: 0,
      totalXP: 0,
      currentStreak: 0,
      longestStreak: 0,
      highScores: 0,
      perfectScores: 0,
      fastestQuiz: Infinity,
      averageAccuracy: 0,
      categoriesPlayed: 0,
      maxCategoryCount: 0,
      lastQuizDate: null,
    });
    setRecentUnlocks([]);
  }, [setAchievements, setStats]);

  const getProgress = useCallback(
    (achievementId) => {
      const achievement = ACHIEVEMENTS[achievementId];
      if (!achievement) return 0;

      if (achievementId === "quiz_master") {
        return Math.min(100, ((stats.totalQuizzes || 0) / 50) * 100);
      }
      if (achievementId === "streak_30") {
        return Math.min(100, ((stats.currentStreak || 0) / 30) * 100);
      }
      if (achievementId === "century_club") {
        return Math.min(100, ((stats.totalQuizzes || 0) / 100) * 100);
      }
      if (achievementId === "xp_10000") {
        return Math.min(100, ((stats.totalXP || 0) / 10000) * 100);
      }
      if (achievementId === "xp_5000") {
        return Math.min(100, ((stats.totalXP || 0) / 5000) * 100);
      }
      if (achievementId === "xp_1000") {
        return Math.min(100, ((stats.totalXP || 0) / 1000) * 100);
      }

      return 0;
    },
    [stats],
  );

  const allAchievements = useMemo(() => {
    return Object.entries(ACHIEVEMENTS).map(([key, achievement]) => ({
      ...achievement,
      key,
      unlocked: achievements[achievement.id]?.unlocked || false,
      unlockedAt: achievements[achievement.id]?.unlockedAt,
      progress: getProgress(key),
    }));
  }, [achievements, getProgress]);

  const unlockedAchievements = useMemo(() => {
    return allAchievements.filter((a) => a.unlocked);
  }, [allAchievements]);

  const lockedAchievements = useMemo(() => {
    return allAchievements.filter((a) => !a.unlocked);
  }, [allAchievements]);

  const getAchievement = useCallback(
    (id) => {
      return allAchievements.find((a) => a.id === id);
    },
    [allAchievements],
  );

  return {
    achievements: allAchievements,
    unlockedAchievements,
    lockedAchievements,
    recentUnlocks,
    stats,
    updateStats,
    checkAchievements,
    resetAchievements,
    getProgress,
    getAchievement,
    totalXP: stats.totalXP || 0,
    totalUnlocked: unlockedAchievements.length,
    totalAchievements: allAchievements.length,
    completionPercentage:
      (unlockedAchievements.length / allAchievements.length) * 100,
    currentStreak: stats.currentStreak || 0,
    longestStreak: stats.longestStreak || 0,
  };
};

export default useAchievements;
