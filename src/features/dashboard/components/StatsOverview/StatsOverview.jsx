import React from "react";
import { motion } from "framer-motion";
import CountUp from "react-countup";
import { 
  FiActivity, 
  FiTarget, 
  FiClock, 
  FiAward,
  FiTrendingUp,
  FiStar
} from "react-icons/fi";

const StatsOverview = ({ stats }) => {
  const statCards = [
    {
      icon: <FiActivity className="w-6 h-6" />,
      label: "Total Quiz",
      value: stats?.totalQuizzes || 0,
      suffix: "",
      color: "from-blue-500 to-cyan-500",
      change: "+3 minggu ini"
    },
    {
      icon: <FiTarget className="w-6 h-6" />,
      label: "Rata-rata Skor",
      value: stats?.averageScore || 0,
      suffix: "%",
      color: "from-green-500 to-emerald-500",
      change: "+5% vs minggu lalu"
    },
    {
      icon: <FiClock className="w-6 h-6" />,
      label: "Waktu Belajar",
      value: stats?.studyTime || 0,
      suffix: "m",
      color: "from-purple-500 to-pink-500",
      change: "Hari ini"
    },
    {
      icon: <FiAward className="w-6 h-6" />,
      label: "Achievements",
      value: stats?.achievements || 0,
      suffix: "",
      color: "from-yellow-500 to-orange-500",
      change: "2 lagi ke next"
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 100
      }
    }
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
    >
      {statCards.map((stat, index) => (
        <motion.div
          key={index}
          variants={itemVariants}
          whileHover={{ y: -5 }}
          className="glass-card p-6 relative overflow-hidden group"
        >
          <div className={`absolute inset-0 bg-gradient-to-br ${stat.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500`} />
          
          <div className="flex justify-between items-start mb-4">
            <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${stat.color} p-2.5 group-hover:scale-110 transition-transform duration-300`}>
              <div className="w-full h-full text-white">
                {stat.icon}
              </div>
            </div>
            <span className="text-xs font-medium text-green-400">
              {stat.change}
            </span>
          </div>

          <div className="text-3xl font-display font-bold text-white mb-1">
            <CountUp
              end={stat.value}
              duration={2}
              separator=","
              suffix={stat.suffix}
            />
          </div>

          <p className="text-sm text-gray-400">
            {stat.label}
          </p>

          <div className="absolute bottom-0 left-0 w-full h-0.5 bg-white/5">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${Math.min(stat.value, 100)}%` }}
              transition={{ delay: index * 0.1, duration: 1 }}
              className={`h-full bg-gradient-to-r ${stat.color}`}
            />
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
};

export default StatsOverview;
