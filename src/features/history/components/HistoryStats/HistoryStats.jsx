import React from "react";
import { motion } from "framer-motion";
import CountUp from "react-countup";
import {
  FiBarChart2,
  FiTarget,
  FiCheckCircle,
  FiAward,
  FiTrendingUp,
  FiCalendar,
} from "react-icons/fi";

const HistoryStats = ({ stats }) => {
  const safeStats = {
    totalQuizzes: stats?.totalQuizzes || 0,
    averageScore: stats?.averageScore || 0,
    totalCorrect: stats?.totalCorrect || 0,
    totalQuestions: stats?.totalQuestions || 0,
    bestScore: stats?.bestScore || 0,
    worstScore: stats?.worstScore || 0,
    streak: stats?.streak || 0,
    categoriesCount: stats?.categoriesCount || {},
  };

  const accuracy =
    safeStats.totalQuestions > 0
      ? Math.round((safeStats.totalCorrect / safeStats.totalQuestions) * 100)
      : 0;

  const statsCards = [
    {
      icon: <FiBarChart2 className="w-6 h-6" />,
      label: "Total Kuis",
      value: safeStats.totalQuizzes,
      suffix: "",
      color: "from-blue-500 to-cyan-500",
      description: "Kuis yang pernah dikerjakan",
    },
    {
      icon: <FiTarget className="w-6 h-6" />,
      label: "Rata-rata Skor",
      value: safeStats.averageScore,
      suffix: "%",
      color: "from-green-500 to-emerald-500",
      description: "Rata-rata dari semua kuis",
    },
    {
      icon: <FiCheckCircle className="w-6 h-6" />,
      label: "Akurasi",
      value: accuracy,
      suffix: "%",
      color: "from-yellow-400 to-orange-400",
      description: `${safeStats.totalCorrect} benar dari ${safeStats.totalQuestions} soal`,
    },
    {
      icon: <FiAward className="w-6 h-6" />,
      label: "Skor Tertinggi",
      value: safeStats.bestScore,
      suffix: "%",
      color: "from-purple-500 to-pink-500",
      description: "Pencapaian terbaikmu",
    },
    {
      icon: <FiTrendingUp className="w-6 h-6" />,
      label: "Streak",
      value: safeStats.streak,
      suffix: safeStats.streak === 1 ? " hari" : " hari",
      color: "from-red-400 to-rose-500",
      description:
        safeStats.streak > 0
          ? `${safeStats.streak} hari berturut-turut`
          : "Mulai streak hari ini",
    },
    {
      icon: <FiCalendar className="w-6 h-6" />,
      label: "Kategori",
      value: Object.keys(safeStats.categoriesCount).length,
      suffix: "",
      color: "from-indigo-400 to-purple-500",
      description: `${Object.keys(safeStats.categoriesCount).length} kategori berbeda`,
    },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
      {statsCards.map((stat, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.05 }}
          whileHover={{ y: -4, scale: 1.02 }}
          className="glass-card p-4 relative overflow-hidden group"
        >
          <div
            className={`absolute inset-0 bg-gradient-to-br ${stat.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}
          />

          <div className="relative z-10">
            <div
              className={`w-10 h-10 rounded-xl bg-gradient-to-r ${stat.color} p-2 mb-3 group-hover:scale-110 transition-transform duration-300`}
            >
              <div className="w-full h-full text-white">{stat.icon}</div>
            </div>
            <div className="text-2xl font-display font-bold text-[var(--color-text)] mb-1">
              <CountUp
                end={stat.value}
                duration={2}
                separator=","
                suffix={stat.suffix}
              />
            </div>

            <p className="text-xs font-medium text-[var(--color-textSecondary)] mb-1">
              {stat.label}
            </p>

            <p className="text-[10px] text-[var(--color-textMuted)] leading-tight">
              {stat.description}
            </p>
          </div>

          {index < 3 && (
            <div className="absolute bottom-0 left-0 w-full h-1 bg-[var(--color-border)]">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${Math.min(stat.value, 100)}%` }}
                transition={{ delay: index * 0.1 + 0.5, duration: 1 }}
                className={`h-full bg-gradient-to-r ${stat.color} rounded-full`}
              />
            </div>
          )}
        </motion.div>
      ))}
    </div>
  );
};

export default HistoryStats;
