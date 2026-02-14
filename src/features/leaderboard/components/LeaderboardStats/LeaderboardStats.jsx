import React from "react";
import { motion } from "framer-motion";
import { FiUsers, FiAward, FiBarChart2, FiTarget } from "react-icons/fi";
import CountUp from "react-countup";

const LeaderboardStats = ({ leaderboard, userRank, totalUsers }) => {
  const usersWithXP = leaderboard.filter((u) => u.xp > 0);
  const averageXP =
    usersWithXP.length > 0
      ? Math.round(
          usersWithXP.reduce((acc, curr) => acc + (curr.xp || 0), 0) /
            usersWithXP.length,
        )
      : 0;

  const top1XP = leaderboard[0]?.xp || 0;
  const top1User = leaderboard[0]?.username || "-";

  const stats = [
    {
      icon: <FiUsers className="w-6 h-6" />,
      label: "Total Players",
      value: totalUsers,
      suffix: "",
      color: "from-blue-500 to-cyan-500",
      description: "Pemain terdaftar",
    },
    {
      icon: <FiAward className="w-6 h-6" />,
      label: "Your Rank",
      value: userRank ? `#${userRank}` : "-",
      suffix: "",
      color: "from-yellow-400 to-orange-400",
      description: userRank ? `Peringkat ${userRank}` : "Belum memiliki rank",
    },
    {
      icon: <FiBarChart2 className="w-6 h-6" />,
      label: "Average XP",
      value: averageXP,
      suffix: "",
      color: "from-green-500 to-emerald-500",
      description: "Rata-rata XP pemain",
    },
    {
      icon: <FiTarget className="w-6 h-6" />,
      label: "Top 1 XP",
      value: top1XP,
      suffix: "",
      color: "from-purple-500 to-pink-500",
      description: `Oleh ${top1User}`,
    },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
      {stats.map((stat, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.05 }}
          whileHover={{ y: -4 }}
          className="glass-card p-4"
        >
          <div className="flex items-center space-x-3">
            <div
              className={`w-10 h-10 rounded-lg bg-gradient-to-r ${stat.color} p-2`}
            >
              <div className="w-full h-full text-white">{stat.icon}</div>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs text-[var(--color-textSecondary)] truncate">
                {stat.label}
              </p>
              <p className="text-xl font-display font-bold text-[var(--color-text)]">
                {typeof stat.value === "number" ? (
                  <CountUp end={stat.value} duration={2} separator="," />
                ) : (
                  stat.value
                )}
                {stat.suffix}
              </p>
              <p className="text-[10px] text-[var(--color-textMuted)] truncate">
                {stat.description}
              </p>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default LeaderboardStats;
