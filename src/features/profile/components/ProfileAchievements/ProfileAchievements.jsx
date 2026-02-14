import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FiAward, FiArrowRight } from "react-icons/fi";

const ProfileAchievements = ({
  achievements,
  totalUnlocked,
  totalAchievements,
}) => {
  return (
    <div className="glass-card p-6">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-semibold text-white flex items-center">
          <FiAward className="mr-2 text-yellow-400" />
          Recent Achievements
        </h3>
        <Link
          to="/achievements"
          className="text-sm text-primary-400 hover:text-primary-300 flex items-center group"
        >
          View All
          <FiArrowRight className="ml-1 group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>

      <div className="glass p-4 rounded-xl mb-6">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm text-gray-400">Completion Progress</span>
          <span className="text-sm font-medium text-white">
            {totalUnlocked}/{totalAchievements}
          </span>
        </div>
        <div className="w-full h-2 bg-white/5 rounded-full overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${(totalUnlocked / totalAchievements) * 100}%` }}
            transition={{ duration: 1 }}
            className="h-full bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full"
          />
        </div>
      </div>

      <div className="space-y-3">
        {achievements.length > 0 ? (
          achievements.map((achievement, index) => (
            <motion.div
              key={achievement.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05 }}
              className="flex items-center space-x-3 p-3 glass rounded-lg group hover:bg-white/5 transition-all"
            >
              <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-yellow-400 to-orange-400 flex items-center justify-center text-xl">
                {achievement.icon}
              </div>
              <div className="flex-1">
                <h4 className="text-white text-sm font-medium mb-1">
                  {achievement.title}
                </h4>
                <p className="text-xs text-gray-400">
                  {achievement.description}
                </p>
              </div>
              <div className="text-right">
                <span className="text-xs text-primary-400">
                  +{achievement.xp} XP
                </span>
              </div>
            </motion.div>
          ))
        ) : (
          <div className="text-center py-8">
            <div className="w-16 h-16 mx-auto mb-4 glass rounded-2xl flex items-center justify-center">
              <FiAward className="w-8 h-8 text-gray-500" />
            </div>
            <p className="text-gray-400 mb-2">Belum ada achievement</p>
            <Link
              to="/quiz"
              className="text-primary-400 hover:text-primary-300 text-sm font-medium"
            >
              Mulai kuis sekarang →
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfileAchievements;
