import React from "react";
import { motion } from "framer-motion";
import { FiAward, FiTrendingUp, FiTrendingDown, FiMinus } from "react-icons/fi";

const LeaderboardTable = ({
  users,
  currentUser,
  userRank,
  startRank,
  getRankColor,
  getRankIcon,
  calculateLevel,
}) => {
  const getRankChangeIcon = (change) => {
    if (change > 0) return <FiTrendingUp className="w-3 h-3 text-green-400" />;
    if (change < 0) return <FiTrendingDown className="w-3 h-3 text-red-400" />;
    return <FiMinus className="w-3 h-3 text-gray-400" />;
  };

  const getRankChangeColor = (change) => {
    if (change > 0) return "text-green-400";
    if (change < 0) return "text-red-400";
    return "text-gray-400";
  };

  if (!users || users.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-400">No players found</p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead className="bg-white/5">
          <tr>
            <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
              Rank
            </th>
            <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
              Player
            </th>
            <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
              Level
            </th>
            <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
              XP
            </th>
            <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
              Quizzes
            </th>
            <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
              Accuracy
            </th>
            <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
              Change
            </th>
          </tr>
        </thead>

        <tbody className="divide-y divide-white/10">
          {users.map((user, index) => {
            const rank = startRank + index;
            const isCurrentUser =
              currentUser && user.username === currentUser.username;
            const rankColor = getRankColor(rank);
            const rankIcon = getRankIcon(rank);
            const level = calculateLevel(user.xp || 0);

            return (
              <motion.tr
                key={user.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className={`
                  transition-colors
                  ${isCurrentUser ? "bg-primary-500/10 hover:bg-primary-500/20" : "hover:bg-white/5"}
                `}
              >
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    {rank <= 3 ? (
                      <div
                        className={`
                        w-8 h-8 rounded-lg bg-gradient-to-r ${rankColor}
                        flex items-center justify-center text-white font-bold
                      `}
                      >
                        {rankIcon}
                      </div>
                    ) : (
                      <span className="text-lg font-bold text-gray-400">
                        #{rank}
                      </span>
                    )}
                  </div>
                </td>

                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 w-10 h-10">
                      <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-primary-500 to-purple-600 flex items-center justify-center">
                        <span className="text-lg font-bold text-white">
                          {user.avatar || user.username.charAt(0).toUpperCase()}
                        </span>
                      </div>
                    </div>
                    <div className="ml-4">
                      <div className="text-sm font-medium text-white flex items-center">
                        {user.username}
                        {isCurrentUser && (
                          <span className="ml-2 px-2 py-0.5 text-xs bg-primary-500/20 text-primary-400 rounded-full">
                            You
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </td>

                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center space-x-2">
                    <span className="text-sm font-bold text-white">
                      {level}
                    </span>
                    <div className="w-16 h-1.5 bg-white/5 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-primary-500 to-purple-600 rounded-full"
                        style={{ width: `${((user.xp || 0) % 400) / 4}%` }}
                      />
                    </div>
                  </div>
                </td>

                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="text-sm font-medium text-yellow-400">
                    {(user.xp || 0).toLocaleString()}
                  </span>
                </td>

                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="text-sm text-gray-300">
                    {user.quizzes || 0}
                  </span>
                </td>

                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="text-sm text-green-400">
                    {user.accuracy || 0}%
                  </span>
                </td>

                <td className="px-6 py-4 whitespace-nowrap">
                  <div
                    className={`flex items-center space-x-1 ${getRankChangeColor(user.rankChange)}`}
                  >
                    {getRankChangeIcon(user.rankChange)}
                    <span className="text-sm">
                      {Math.abs(user.rankChange || 0)}
                    </span>
                  </div>
                </td>
              </motion.tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default LeaderboardTable;
