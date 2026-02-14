import React from "react";
import { motion } from "framer-motion";
import {
  FiMapPin,
  FiLink,
  FiTwitter,
  FiGithub,
  FiLinkedin,
  FiEdit2,
  FiAward,
  FiTrendingUp,
  FiCalendar,
} from "react-icons/fi";
import Button from "../../../../components/ui/Button/Button";

const ProfileHeader = ({
  profile,
  level,
  totalXP,
  currentStreak,
  longestStreak,
  userRank,
  percentile,
  onEdit,
}) => {
  const joinDate = profile?.joinDate
    ? new Date(profile.joinDate).toLocaleDateString("id-ID", {
        month: "long",
        year: "numeric",
      })
    : "2024";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass-card p-8 relative overflow-hidden"
    >
      <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-primary-500/10 to-purple-500/10 rounded-full blur-3xl" />

      <div className="relative z-10">
        <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
          <div className="relative group">
            <div className="w-28 h-28 md:w-32 md:h-32 rounded-3xl bg-gradient-to-r from-primary-500 to-purple-600 p-1">
              <div className="w-full h-full bg-dark-400 rounded-3xl flex items-center justify-center">
                <span className="text-6xl">
                  {profile?.avatar?.icon || "👤"}
                </span>
              </div>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={onEdit}
              className="absolute -bottom-2 -right-2 w-10 h-10 glass rounded-lg flex items-center justify-center hover:bg-white/10 transition-all group-hover:scale-110"
            >
              <FiEdit2 className="w-5 h-5 text-primary-400" />
            </Button>
          </div>

          <div className="flex-1">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
              <div>
                <h2 className="text-3xl md:text-4xl font-display font-bold text-white mb-2">
                  {profile?.displayName || profile?.username}
                </h2>
                <div className="flex flex-wrap items-center gap-3 text-gray-400">
                  <span className="flex items-center">
                    <FiAward className="w-4 h-4 mr-1 text-yellow-400" />
                    Level {level}
                  </span>
                  <span className="flex items-center">
                    <FiTrendingUp className="w-4 h-4 mr-1 text-green-400" />
                    {totalXP.toLocaleString()} XP
                  </span>
                  <span className="flex items-center">
                    <FiCalendar className="w-4 h-4 mr-1 text-primary-400" />
                    Joined {joinDate}
                  </span>
                </div>
              </div>

              <div className="mt-4 md:mt-0 flex items-center space-x-3">
                <div className="text-right">
                  <div className="text-sm text-gray-400">Global Rank</div>
                  <div className="text-2xl font-bold text-white">
                    #{userRank || "-"}
                  </div>
                </div>
                <div className="px-3 py-1 glass rounded-full">
                  <span className="text-sm text-primary-400">
                    Top {Math.round(percentile || 0)}%
                  </span>
                </div>
              </div>
            </div>

            {profile?.bio && (
              <p className="text-gray-300 mt-4 max-w-2xl">{profile.bio}</p>
            )}

            <div className="flex flex-wrap items-center gap-4 mt-4 text-sm text-gray-400">
              {profile?.location && (
                <span className="flex items-center">
                  <FiMapPin className="w-4 h-4 mr-1" />
                  {profile.location}
                </span>
              )}
              {profile?.website && (
                <a
                  href={profile.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center hover:text-primary-400 transition-colors"
                >
                  <FiLink className="w-4 h-4 mr-1" />
                  {profile.website.replace(/^https?:\/\//, "")}
                </a>
              )}
            </div>

            <div className="flex items-center space-x-3 mt-4">
              {profile?.social?.twitter && (
                <a
                  href={`https://twitter.com/${profile.social.twitter}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 glass rounded-lg flex items-center justify-center hover:bg-white/10 transition-colors"
                >
                  <FiTwitter className="w-4 h-4 text-blue-400" />
                </a>
              )}
              {profile?.social?.github && (
                <a
                  href={`https://github.com/${profile.social.github}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 glass rounded-lg flex items-center justify-center hover:bg-white/10 transition-colors"
                >
                  <FiGithub className="w-4 h-4 text-gray-300" />
                </a>
              )}
              {profile?.social?.linkedin && (
                <a
                  href={`https://linkedin.com/in/${profile.social.linkedin}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 glass rounded-lg flex items-center justify-center hover:bg-white/10 transition-colors"
                >
                  <FiLinkedin className="w-4 h-4 text-blue-500" />
                </a>
              )}
            </div>
          </div>

          <div className="hidden lg:block ml-auto">
            <div className="glass p-4 rounded-xl text-center">
              <div className="text-sm text-gray-400 mb-1">Current Streak</div>
              <div className="flex items-center justify-center space-x-2">
                <span className="text-4xl font-bold text-orange-400">
                  {currentStreak}
                </span>
                <span className="text-2xl">🔥</span>
              </div>
              <div className="text-xs text-gray-500 mt-1">
                Best: {longestStreak} days
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ProfileHeader;
