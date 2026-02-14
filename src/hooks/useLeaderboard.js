import { useState, useEffect, useCallback, useMemo } from "react";
import useLocalStorage from "./useLocalStorage";

const MOCK_USERS = [
  { id: 1, username: "quizmaster", xp: 15420, level: 42, avatar: "👑" },
  { id: 2, username: "brainiac", xp: 12350, level: 38, avatar: "🧠" },
  { id: 3, username: "speedster", xp: 10980, level: 35, avatar: "⚡" },
  { id: 4, username: "scholar", xp: 8760, level: 31, avatar: "📚" },
  { id: 5, username: "genius", xp: 7650, level: 28, avatar: "💡" },
  { id: 6, username: "learner", xp: 6540, level: 25, avatar: "🎓" },
  { id: 7, username: "thinker", xp: 5430, level: 22, avatar: "🤔" },
  { id: 8, username: "wizard", xp: 4320, level: 19, avatar: "🧙" },
  { id: 9, username: "pioneer", xp: 3210, level: 16, avatar: "🚀" },
  { id: 10, username: "rookie", xp: 2100, level: 13, avatar: "🌱" },
];

export const useLeaderboard = () => {
  const [leaderboard, setLeaderboard] = useState([]);
  const [userRank, setUserRank] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [timeframe, setTimeframe] = useState("all");
  const [category, setCategory] = useState("global");

  const [user] = useLocalStorage("quiz_user", null);
  const [achievements] = useLocalStorage("achievements", {});
  const [stats] = useLocalStorage("achievement_stats", {});

  const fetchLeaderboard = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));

      let data = [...MOCK_USERS];

      if (user && !data.find((u) => u.username === user.username)) {
        const userXP = stats.totalXP || 0;
        const userLevel = Math.floor(userXP / 400) + 1;

        data.push({
          id: "current_user",
          username: user.username,
          xp: userXP,
          level: userLevel,
          avatar: getAvatarByLevel(userLevel),
          isCurrentUser: true,
        });
      }
      data.sort((a, b) => b.xp - a.xp);

      data = data.map((user, index) => ({
        ...user,
        rank: index + 1,
        rankChange: getRandomRankChange(),
      }));

      setLeaderboard(data);

      if (user) {
        const rank = data.findIndex((u) => u.username === user.username) + 1;
        setUserRank(rank > 0 ? rank : null);
      }
    } catch (err) {
      setError("Failed to load leaderboard");
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [user, stats]);

  const getAvatarByLevel = (level) => {
    if (level >= 40) return "👑";
    if (level >= 30) return "🏆";
    if (level >= 20) return "⭐";
    if (level >= 10) return "🌱";
    return "🎯";
  };

  const getRandomRankChange = () => {
    const changes = [-3, -2, -1, 0, 1, 2, 3, 5];
    return changes[Math.floor(Math.random() * changes.length)];
  };

  useEffect(() => {
    fetchLeaderboard();
  }, [fetchLeaderboard, timeframe, category]);

  const getTopUsers = useCallback(
    (count = 10) => {
      return leaderboard.slice(0, count);
    },
    [leaderboard],
  );

  const getUserNeighborhood = useCallback(
    (radius = 2) => {
      if (!user || userRank === null) return [];

      const start = Math.max(0, userRank - radius - 1);
      const end = Math.min(leaderboard.length, userRank + radius);

      return leaderboard.slice(start, end);
    },
    [leaderboard, user, userRank],
  );

  const getRankColor = useCallback((rank) => {
    if (rank === 1) return "from-yellow-400 to-amber-600";
    if (rank === 2) return "from-gray-300 to-gray-500";
    if (rank === 3) return "from-amber-600 to-orange-700";
    if (rank <= 10) return "from-blue-400 to-blue-600";
    return "from-gray-500 to-gray-700";
  }, []);

  const getRankIcon = useCallback((rank) => {
    if (rank === 1) return "👑";
    if (rank === 2) return "🥈";
    if (rank === 3) return "🥉";
    if (rank <= 10) return "🏅";
    return "🎯";
  }, []);

  const calculateLevel = useCallback((xp) => {
    return Math.floor(xp / 400) + 1;
  }, []);

  const xpForNextLevel = useCallback((level) => {
    return level * 400;
  }, []);

  const getLevelProgress = useCallback(
    (xp) => {
      const level = calculateLevel(xp);
      const currentLevelXP = (level - 1) * 400;
      const nextLevelXP = level * 400;
      const xpNeeded = nextLevelXP - currentLevelXP;
      const xpEarned = xp - currentLevelXP;

      return {
        currentXP: xpEarned,
        requiredXP: xpNeeded,
        percentage: (xpEarned / xpNeeded) * 100,
        xpNeeded: nextLevelXP - xp,
      };
    },
    [calculateLevel],
  );

  const getPercentile = useCallback(() => {
    if (!user || leaderboard.length === 0 || userRank === null) return 0;
    return ((leaderboard.length - userRank) / leaderboard.length) * 100;
  }, [leaderboard, user, userRank]);

  return {
    leaderboard,
    userRank,
    loading,
    error,
    timeframe,
    setTimeframe,
    category,
    setCategory,

    topUsers: getTopUsers(10),
    userNeighborhood: getUserNeighborhood(),

    fetchLeaderboard,
    getTopUsers,
    getUserNeighborhood,
    getRankColor,
    getRankIcon,
    calculateLevel,
    getLevelProgress,
    getPercentile,
    xpForNextLevel,

    totalUsers: leaderboard.length,
    userPercentile: getPercentile(),
    topThree: leaderboard.slice(0, 3),
  };
};

export default useLeaderboard;
