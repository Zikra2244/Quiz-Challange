import React from "react";
import { motion } from "framer-motion";
import CountUp from "react-countup";
import { 
  FiBarChart2, 
  FiCheckCircle, 
  FiXCircle, 
  FiClock,
  FiTarget,
  FiStar
} from "react-icons/fi";

const ProfileStats = ({ stats }) => {
  const statCards = [
    {
      icon: <FiBarChart2 className="w-6 h-6" />,
      label: "Total Quizzes",
      value: stats?.totalQuizzes || 0,
      color: "from-blue-500 to-cyan-500"
    },
    {
      icon: <FiTarget className="w-6 h-6" />,
      label: "Average Score",
      value: stats?.averageScore || 0,
      suffix: "%",
      color: "from-green-500 to-emerald-500"
    },
    {
      icon: <FiCheckCircle className="w-6 h-6" />,
      label: "Correct Answers",
      value: stats?.totalCorrect || 0,
      color: "from-green-400 to-emerald-400"
    },
    {
      icon: <FiXCircle className="w-6 h-6" />,
      label: "Wrong Answers",
      value: (stats?.totalQuestions || 0) - (stats?.totalCorrect || 0),
      color: "from-red-400 to-pink-400"
    },
    {
      icon: <FiClock className="w-6 h-6" />,
      label: "Total Time",
      value: Math.floor((stats?.totalTime || 0) / 60),
      suffix: "m",
      color: "from-purple-500 to-pink-500"
    },
    {
      icon: <FiStar className="w-6 h-6" />,
      label: "Perfect Scores",
      value: stats?.perfectScores || 0,
      color: "from-yellow-400 to-orange-400"
    }
  ];

  return (
    <div className="glass-card p-6">
      <h3 className="text-lg font-semibold text-white mb-6 flex items-center">
        <FiBarChart2 className="mr-2 text-primary-400" />
        Quiz Statistics
      </h3>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {statCards.map((stat, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            className="glass p-4 rounded-xl text-center"
          >
            <div className={`w-10 h-10 mx-auto mb-3 rounded-lg bg-gradient-to-r ${stat.color} p-2`}>
              <div className="w-full h-full text-white">
                {stat.icon}
              </div>
            </div>
            <div className="text-2xl font-display font-bold text-white mb-1">
              <CountUp
                end={stat.value}
                duration={2}
                separator=","
                suffix={stat.suffix || ""}
              />
            </div>
            <div className="text-xs text-gray-400">
              {stat.label}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default ProfileStats;
