import React from "react";
import { motion } from "framer-motion";
import { FiAward } from "react-icons/fi";

const TopThree = ({ topUsers }) => {
  const podiumHeights = {
    1: "h-40",
    2: "h-32",
    3: "h-24",
  };

  if (!topUsers || topUsers.length < 3) {
    return null;
  }

  return (
    <div className="flex justify-center items-end space-x-4 md:space-x-8 mb-12">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="relative"
      >
        <div className="flex flex-col items-center">
          <div className="relative mb-4">
            <div className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-gradient-to-r from-gray-300 to-gray-500 p-1">
              <div className="w-full h-full bg-dark-400 rounded-full flex items-center justify-center">
                <span className="text-3xl md:text-4xl">
                  {topUsers[1]?.avatar || ""}
                </span>
              </div>
            </div>
            <div className="absolute -top-2 -right-2 w-8 h-8 bg-gray-400 rounded-full flex items-center justify-center">
              <span className="text-white font-bold">2</span>
            </div>
          </div>
          <div className="text-center">
            <h3 className="text-lg font-semibold text-white mb-1">
              {topUsers[1]?.username}
            </h3>
            <p className="text-sm text-yellow-400">
              {topUsers[1]?.xp?.toLocaleString() || 0} XP
            </p>
          </div>
        </div>
        <div
          className={`w-32 md:w-40 ${podiumHeights[2]} mt-4 bg-gradient-to-t from-gray-300/20 to-gray-500/20 rounded-t-2xl flex items-center justify-center`}
        >
          <span className="text-3xl opacity-50"></span>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="relative"
      >
        <div className="flex flex-col items-center">
          <div className="relative mb-4">
            <div className="absolute -top-6 left-1/2 transform -translate-x-1/2">
              <FiAward className="w-8 h-8 text-yellow-400" />
            </div>
            <div className="w-24 h-24 md:w-32 md:h-32 rounded-full bg-gradient-to-r from-yellow-400 to-amber-600 p-1 animate-pulse">
              <div className="w-full h-full bg-dark-400 rounded-full flex items-center justify-center border-4 border-yellow-400/30">
                <span className="text-4xl md:text-5xl">
                  {topUsers[0]?.avatar || ""}
                </span>
              </div>
            </div>
            <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 px-3 py-1 glass rounded-full">
              <span className="text-xs font-bold text-yellow-400">#1</span>
            </div>
          </div>
          <div className="text-center">
            <h3 className="text-xl font-bold text-white mb-1">
              {topUsers[0]?.username}
            </h3>
            <p className="text-lg font-semibold text-yellow-400">
              {topUsers[0]?.xp?.toLocaleString() || 0} XP
            </p>
          </div>
        </div>
        <div
          className={`w-36 md:w-48 ${podiumHeights[1]} mt-4 bg-gradient-to-t from-yellow-400/20 to-amber-600/20 rounded-t-2xl flex items-center justify-center`}
        >
          <span className="text-4xl opacity-50"></span>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="relative"
      >
        <div className="flex flex-col items-center">
          <div className="relative mb-4">
            <div className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-gradient-to-r from-amber-600 to-orange-700 p-1">
              <div className="w-full h-full bg-dark-400 rounded-full flex items-center justify-center">
                <span className="text-3xl md:text-4xl">
                  {topUsers[2]?.avatar || ""}
                </span>
              </div>
            </div>
            <div className="absolute -top-2 -right-2 w-8 h-8 bg-amber-600 rounded-full flex items-center justify-center">
              <span className="text-white font-bold">3</span>
            </div>
          </div>
          <div className="text-center">
            <h3 className="text-lg font-semibold text-white mb-1">
              {topUsers[2]?.username}
            </h3>
            <p className="text-sm text-yellow-400">
              {topUsers[2]?.xp?.toLocaleString() || 0} XP
            </p>
          </div>
        </div>
        <div
          className={`w-32 md:w-40 ${podiumHeights[3]} mt-4 bg-gradient-to-t from-amber-600/20 to-orange-700/20 rounded-t-2xl flex items-center justify-center`}
        >
          <span className="text-3xl opacity-50"></span>
        </div>
      </motion.div>
    </div>
  );
};

export default TopThree;
