import React from "react";
import { motion } from "framer-motion";
import { FiClock, FiAward } from "react-icons/fi";

const RecentUnlocks = ({ unlocks }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass-card p-6 mb-8"
    >
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-semibold text-white flex items-center">
          <FiClock className="mr-2 text-primary-400" />
          Recent Unlocks
        </h3>
        <span className="text-xs text-gray-400">
          Last {unlocks.length} achievements
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        {unlocks.map((achievement, index) => (
          <motion.div
            key={achievement.id}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.1 }}
            className="glass p-4 rounded-xl text-center group hover:bg-white/5 transition-all"
          >
            <div className="relative mb-3">
              <div className="w-16 h-16 mx-auto rounded-xl bg-gradient-to-r from-yellow-400 to-orange-400 p-0.5 group-hover:scale-110 transition-transform">
                <div className="w-full h-full bg-dark-300 rounded-xl flex items-center justify-center text-3xl">
                  {achievement.icon}
                </div>
              </div>
              <div className="absolute -top-2 -right-2 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center animate-pulse">
                <FiAward className="w-3 h-3 text-white" />
              </div>
            </div>
            
            <h4 className="text-sm font-medium text-white mb-1 truncate">
              {achievement.title}
            </h4>
            <span className="text-[10px] text-yellow-400">
              +{achievement.xp} XP
            </span>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default RecentUnlocks;
