import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  FiAward,
  FiUsers,
  FiGlobe,
  FiClock,
  FiSearch,
  FiChevronLeft,
  FiChevronRight,
} from "react-icons/fi";
import { useAuth } from "../../../app/providers/AuthProvider";
import GradientText from "../../../components/ui/GradientText/GradientText";
import LeaderboardTable from "../components/LeaderboardTable/LeaderboardTable";
import RankCard from "../components/RankCard/RankCard";
import TopThree from "../components/TopThree/TopThree";
import FilterBar from "../components/FilterBar/FilterBar";
import LeaderboardStats from "../components/LeaderboardStats/LeaderboardStats";
import Button from "../../../components/ui/Button/Button";

const MOCK_USERS = [
  {
    id: 1,
    username: "quizmaster",
    xp: 15420,
    avatar: "",
    quizzes: 156,
    accuracy: 92,
    joinDate: "2023-01-15",
  },
  {
    id: 2,
    username: "brainiac",
    xp: 12350,
    avatar: "",
    quizzes: 134,
    accuracy: 88,
    joinDate: "2023-02-20",
  },
  {
    id: 3,
    username: "speedster",
    xp: 10980,
    avatar: "",
    quizzes: 112,
    accuracy: 85,
    joinDate: "2023-03-10",
  },
  {
    id: 4,
    username: "scholar",
    xp: 8760,
    avatar: "",
    quizzes: 98,
    accuracy: 82,
    joinDate: "2023-04-05",
  },
  {
    id: 5,
    username: "genius",
    xp: 7650,
    avatar: "",
    quizzes: 87,
    accuracy: 79,
    joinDate: "2023-05-12",
  },
  {
    id: 6,
    username: "learner",
    xp: 6540,
    avatar: "",
    quizzes: 76,
    accuracy: 76,
    joinDate: "2023-06-18",
  },
  {
    id: 7,
    username: "thinker",
    xp: 5430,
    avatar: "",
    quizzes: 65,
    accuracy: 74,
    joinDate: "2023-07-22",
  },
  {
    id: 8,
    username: "wizard",
    xp: 4320,
    avatar: "",
    quizzes: 54,
    accuracy: 71,
    joinDate: "2023-08-30",
  },
  {
    id: 9,
    username: "pioneer",
    xp: 3210,
    avatar: "",
    quizzes: 43,
    accuracy: 68,
    joinDate: "2023-09-14",
  },
  {
    id: 10,
    username: "rookie",
    xp: 2100,
    avatar: "",
    quizzes: 32,
    accuracy: 65,
    joinDate: "2023-10-25",
  },
];

const LeaderboardPage = () => {
  const { user } = useAuth();
  const [timeframe, setTimeframe] = useState("all");
  const [category, setCategory] = useState("global");
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [leaderboard, setLeaderboard] = useState([]);
  const [userData, setUserData] = useState({
    xp: 0,
    quizzes: 0,
    accuracy: 0,
    level: 1,
  });
  const [loading, setLoading] = useState(true);

  const itemsPerPage = 10;

  useEffect(() => {
    try {
      console.log(" MEMBACA DATA USER UNTUK LEADERBOARD");

      const achievements = JSON.parse(
        localStorage.getItem("achievements") || "{}",
      );
      console.log(" Achievements data:", achievements);

      let achievementXP = 0;
      Object.values(achievements).forEach((ach) => {
        if (ach?.achievement?.xp) {
          achievementXP += ach.achievement.xp;
          console.log(`   ${ach.achievement.title}: ${ach.achievement.xp} XP`);
        }
      });
      console.log(" XP dari achievements:", achievementXP);

      const history = JSON.parse(localStorage.getItem("quiz_history") || "[]");
      let quizXP = 0;
      history.forEach((quiz) => {
        quizXP += (quiz.correct || 0) * 10;
      });
      console.log(" XP dari quiz:", quizXP);

      const totalXP = achievementXP + quizXP;
      console.log(" TOTAL XP USER:", totalXP);

      const totalQuizzes = history.length;

      let totalCorrect = 0;
      let totalQuestions = 0;
      history.forEach((quiz) => {
        totalCorrect += quiz.correct || 0;
        totalQuestions += quiz.total || 0;
      });
      const accuracy =
        totalQuestions > 0
          ? Math.round((totalCorrect / totalQuestions) * 100)
          : 0;

      const level = Math.floor(totalXP / 100) + 1;

      console.log(" Data user lengkap:", {
        xp: totalXP,
        quizzes: totalQuizzes,
        accuracy,
        level,
      });

      setUserData({
        xp: totalXP,
        quizzes: totalQuizzes,
        accuracy,
        level,
      });
    } catch (error) {
      console.error(" Error membaca data user:", error);
    }
  }, []);

  useEffect(() => {
    let allUsers = [...MOCK_USERS];

    if (user) {
      allUsers.push({
        id: "current_user",
        username: user.username,
        xp: userData.xp,
        avatar: userData.xp === 0 ? "" : "",
        quizzes: userData.quizzes,
        accuracy: userData.accuracy,
        joinDate: new Date().toISOString().split("T")[0],
        isCurrentUser: true,
      });
    }

    const sortedUsers = [...allUsers].sort((a, b) => b.xp - a.xp);

    const rankedUsers = sortedUsers.map((user, index) => ({
      ...user,
      rank: index + 1,
      rankChange: user.isCurrentUser ? 0 : Math.floor(Math.random() * 7) - 3,
    }));

    setLeaderboard(rankedUsers);
    setLoading(false);

    const currentUserRank = rankedUsers.find((u) => u.isCurrentUser);
    console.log(" Posisi user di leaderboard:", {
      rank: currentUserRank?.rank,
      xp: currentUserRank?.xp,
      username: currentUserRank?.username,
    });
  }, [user, userData]);

  const filteredUsers = leaderboard.filter((u) =>
    u.username.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const paginatedUsers = filteredUsers.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );

  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);

  const userRank = leaderboard.find((u) => u.isCurrentUser)?.rank || null;
  const isUnranked = userData.xp === 0;

  const timeframes = [
    { id: "all", label: "All Time", icon: <FiGlobe /> },
    { id: "month", label: "This Month", icon: <FiClock /> },
    { id: "week", label: "This Week", icon: <FiClock /> },
  ];

  const categories = [
    { id: "global", label: "Global", icon: <FiGlobe /> },
    { id: "friends", label: "Friends", icon: <FiUsers /> },
  ];

  const getRankColor = (rank) => {
    if (rank === 1) return "from-yellow-400 to-amber-600";
    if (rank === 2) return "from-gray-300 to-gray-500";
    if (rank === 3) return "from-amber-600 to-orange-700";
    return "from-gray-500 to-gray-700";
  };

  const getRankIcon = (rank) => {
    if (rank === 1) return "";
    if (rank === 2) return "";
    if (rank === 3) return "";
    return "";
  };

  const calculateLevel = (xp) => {
    return Math.floor(xp / 100) + 1;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[var(--color-background)] flex items-center justify-center">
        <div className="text-center">
          <div className="relative">
            <div className="w-20 h-20 border-4 border-[var(--color-primary)]/30 border-t-[var(--color-primary)] rounded-full animate-spin mx-auto mb-4" />
            <div className="absolute inset-0 flex items-center justify-center">
              <FiAward className="w-8 h-8 text-[var(--color-primary)] animate-pulse" />
            </div>
          </div>
          <p className="text-[var(--color-textSecondary)] animate-pulse">
            Memuat leaderboard...
          </p>
        </div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-[var(--color-background)] pt-8 pb-16"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h1 className="text-3xl md:text-4xl font-display font-bold mb-2">
              <GradientText gradient="primary" animate>
                Leaderboard
              </GradientText>
            </h1>
            <p className="text-[var(--color-textSecondary)]">
              Lihat peringkatmu dan bersaing dengan pengguna lainnya
            </p>
          </div>

          <div className="mt-4 md:mt-0 flex items-center space-x-3">
            <div className="glass px-4 py-2 rounded-xl">
              <span className="text-sm text-[var(--color-textSecondary)] mr-2">
                Total Players:
              </span>
              <span className="text-xl font-bold text-[var(--color-text)]">
                {leaderboard.length}
              </span>
            </div>
          </div>
        </div>

        <LeaderboardStats
          leaderboard={leaderboard}
          userRank={userRank}
          totalUsers={leaderboard.length}
        />

        {user && (
          <RankCard
            rank={userRank}
            user={user}
            userStats={{
              xp: userData.xp,
              quizzes: userData.quizzes,
              accuracy: userData.accuracy,
              level: userData.level,
            }}
            rankColor={getRankColor(userRank || 999)}
            rankIcon={isUnranked ? "" : getRankIcon(userRank || 999)}
            level={userData.level}
            xp={userData.xp}
            isUnranked={isUnranked}
          />
        )}
        {leaderboard.filter((u) => u.xp > 0).length >= 3 && (
          <TopThree
            topUsers={leaderboard.filter((u) => u.xp > 0).slice(0, 3)}
          />
        )}

        <FilterBar
          timeframes={timeframes}
          selectedTimeframe={timeframe}
          onTimeframeChange={setTimeframe}
          categories={categories}
          selectedCategory={category}
          onCategoryChange={setCategory}
        />

        <div className="relative mb-6">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <FiSearch className="h-5 w-5 text-[var(--color-textMuted)]" />
          </div>
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1);
            }}
            placeholder="Cari pemain berdasarkan username..."
            className="block w-full pl-10 pr-3 py-3 glass rounded-xl text-[var(--color-text)] placeholder-[var(--color-textMuted)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
          />
        </div>

        <div className="glass-card overflow-hidden">
          <LeaderboardTable
            users={paginatedUsers}
            currentUser={user}
            userRank={userRank}
            startRank={(currentPage - 1) * itemsPerPage + 1}
            getRankColor={getRankColor}
            getRankIcon={getRankIcon}
            calculateLevel={calculateLevel}
          />

          {totalPages > 1 && (
            <div className="flex justify-center items-center space-x-2 p-6 border-t border-[var(--color-border)]">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
                disabled={currentPage === 1}
              >
                <FiChevronLeft className="w-4 h-4" />
              </Button>

              <div className="flex items-center space-x-2">
                {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                  let pageNum;
                  if (totalPages <= 5) {
                    pageNum = i + 1;
                  } else if (currentPage <= 3) {
                    pageNum = i + 1;
                  } else if (currentPage >= totalPages - 2) {
                    pageNum = totalPages - 4 + i;
                  } else {
                    pageNum = currentPage - 2 + i;
                  }

                  return (
                    <button
                      key={i}
                      onClick={() => setCurrentPage(pageNum)}
                      className={`
                        w-10 h-10 rounded-lg font-medium transition-all
                        ${
                          currentPage === pageNum
                            ? "bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-secondary)] text-white"
                            : "glass text-[var(--color-textSecondary)] hover:text-[var(--color-text)] hover:bg-[var(--color-glass-hover)]"
                        }
                      `}
                    >
                      {pageNum}
                    </button>
                  );
                })}
              </div>

              <Button
                variant="outline"
                size="sm"
                onClick={() =>
                  setCurrentPage((prev) => Math.min(totalPages, prev + 1))
                }
                disabled={currentPage === totalPages}
              >
                <FiChevronRight className="w-4 h-4" />
              </Button>
            </div>
          )}
        </div>

        {filteredUsers.length === 0 && (
          <div className="text-center py-16">
            <div className="w-24 h-24 mx-auto mb-6 glass rounded-3xl flex items-center justify-center">
              <FiUsers className="w-12 h-12 text-[var(--color-textMuted)]" />
            </div>
            <h3 className="text-xl font-semibold text-[var(--color-text)] mb-2">
              No players found
            </h3>
            <p className="text-[var(--color-textSecondary)]">
              Tidak ada pemain dengan username "{searchTerm}"
            </p>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default LeaderboardPage;
