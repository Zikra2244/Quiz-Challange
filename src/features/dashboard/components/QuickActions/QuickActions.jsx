import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  FiPlay,
  FiRefreshCw,
  FiBarChart2,
  FiAward,
  FiUser,
  FiClock,
  FiActivity,
  FiArrowRight,
} from "react-icons/fi";

import Button from "../../../../components/ui/Button/Button";

const QuickActions = () => {
  const actions = [
    {
      icon: <FiPlay className="w-5 h-5" />,
      label: "Start Quiz",
      description: "Mulai kuis baru",
      color: "from-primary-500 to-purple-600",
      path: "/quiz",
      primary: true,
      stats: "5-10 menit",
    },
    {
      icon: <FiRefreshCw className="w-5 h-5" />,
      label: "Retry Last",
      description: "Ulang kuis terakhir",
      color: "from-blue-500 to-cyan-500",
      path: "/quiz?retry=last",
      primary: false,
      stats: "Latihan",
    },
    {
      icon: <FiAward className="w-5 h-5" />,
      label: "Achievements",
      description: "Lihat pencapaian",
      color: "from-yellow-500 to-orange-500",
      path: "/achievements",
      primary: false,
      stats: "Badges",
    },
    {
      icon: <FiAward className="w-5 h-5" />,
      label: "Leaderboard",
      description: "Peringkat global",
      color: "from-green-500 to-emerald-500",
      path: "/leaderboard",
      primary: false,
      stats: "Top players",
    },
    {
      icon: <FiUser className="w-5 h-5" />,
      label: "Profile",
      description: "Lihat profil",
      color: "from-purple-500 to-pink-500",
      path: "/profile",
      primary: false,
      stats: "Akun",
    },
    {
      icon: <FiClock className="w-5 h-5" />,
      label: "History",
      description: "Riwayat kuis",
      color: "from-indigo-500 to-purple-500",
      path: "/history",
      primary: false,
      stats: "Lihat semua",
    },
    {
      icon: <FiActivity className="w-5 h-5" />,
      label: "Statistics",
      description: "Statistik detail",
      color: "from-red-400 to-pink-500",
      path: "/statistics",
      primary: false,
      stats: "Analisis",
    },
    {
      icon: <FiBarChart2 className="w-5 h-5" />,
      label: "Settings",
      description: "Pengaturan",
      color: "from-gray-500 to-gray-600",
      path: "/settings",
      primary: false,
      stats: "Preferensi",
    },
  ];

  const primaryAction = actions.find((action) => action.primary);
  const secondaryActions = actions.filter((action) => !action.primary);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 100,
      },
    },
  };

  return (
    <div className="mt-8">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-white">Quick Actions</h2>
        <Link
          to="/quiz"
          className="text-sm text-primary-400 hover:text-primary-300 flex items-center group"
        >
          Lihat semua
          <FiArrowRight className="ml-1 group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>

      {primaryAction && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
          className="mb-4"
        >
          <Link to={primaryAction.path}>
            <div
              className={`
              relative p-6 rounded-2xl overflow-hidden group cursor-pointer
              bg-gradient-to-r ${primaryAction.color}
              hover:shadow-xl hover:shadow-primary-500/30 transition-all duration-300
            `}
            >
              <div className="relative z-10 flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="w-14 h-14 bg-white/20 backdrop-blur-lg rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                    <div className="text-white text-2xl">
                      {primaryAction.icon}
                    </div>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white mb-1">
                      {primaryAction.label}
                    </h3>
                    <p className="text-white/80 text-sm">
                      {primaryAction.description}
                    </p>
                  </div>
                </div>
                <div className="bg-white/20 backdrop-blur-lg p-3 rounded-xl group-hover:translate-x-1 transition-transform">
                  <FiArrowRight className="w-6 h-6 text-white" />
                </div>
              </div>
            </div>
          </Link>
        </motion.div>
      )}

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3"
      >
        {secondaryActions.map((action, index) => (
          <motion.div
            key={index}
            variants={itemVariants}
            whileHover={{ y: -4 }}
            whileTap={{ scale: 0.98 }}
          >
            <Link to={action.path}>
              <div className="glass-card p-4 h-full flex flex-col items-center text-center hover:bg-white/5 transition-all duration-300 group">
                <div
                  className={`
                  w-12 h-12 rounded-xl bg-gradient-to-r ${action.color} 
                  p-2.5 mb-3 group-hover:scale-110 group-hover:rotate-3 
                  transition-all duration-300 shadow-lg
                `}
                >
                  <div className="w-full h-full text-white">{action.icon}</div>
                </div>
                <h3 className="text-sm font-semibold text-white mb-1">
                  {action.label}
                </h3>
                <p className="text-xs text-gray-400 mb-2 line-clamp-2">
                  {action.description}
                </p>
                <span className="mt-auto inline-block px-2 py-0.5 glass rounded-full text-[10px] text-gray-300">
                  {action.stats}
                </span>
              </div>
            </Link>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default QuickActions;
