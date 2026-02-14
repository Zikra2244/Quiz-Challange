import React from "react";
import { motion } from "framer-motion";
import { FiShield, FiEye, FiUsers, FiGlobe, FiLock } from "react-icons/fi";

const PrivacySettings = ({ settings = {}, onUpdate }) => {
  const privacyOptions = [
    {
      id: "showOnlineStatus",
      label: "Online Status",
      description: "Show when you are online to other users",
      icon: <FiEye className="w-5 h-5" />,
      color: "from-blue-400 to-cyan-400",
    },
    {
      id: "showLeaderboard",
      label: "Leaderboard Visibility",
      description: "Show your rank and stats on leaderboard",
      icon: <FiGlobe className="w-5 h-5" />,
      color: "from-green-400 to-emerald-400",
    },
    {
      id: "allowFriendRequests",
      label: "Friend Requests",
      description: "Allow other users to send you friend requests",
      icon: <FiUsers className="w-5 h-5" />,
      color: "from-purple-400 to-pink-400",
    },
    {
      id: "showAchievements",
      label: "Public Achievements",
      description: "Display your achievements on your profile",
      icon: <FiEye className="w-5 h-5" />,
      color: "from-yellow-400 to-orange-400",
    },
  ];

  const handleToggle = (id) => {
    onUpdate({ [id]: !settings[id] });
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold text-white mb-2">
          Privacy Settings
        </h2>
        <p className="text-sm text-gray-400 mb-6">
          Control your privacy and data visibility
        </p>
      </div>

      <div className="p-4 glass rounded-lg bg-gradient-to-r from-primary-500/10 to-purple-500/10 mb-4">
        <div className="flex items-start space-x-3">
          <div className="w-8 h-8 rounded-full bg-primary-500/20 flex items-center justify-center flex-shrink-0">
            <FiShield className="w-4 h-4 text-primary-400" />
          </div>
          <div>
            <h3 className="text-sm font-medium text-white mb-1">
              Privacy Checkup
            </h3>
            <p className="text-xs text-gray-400">
              Review your privacy settings to ensure your data is protected.
            </p>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        {privacyOptions.map((option) => (
          <motion.div
            key={option.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center justify-between p-4 glass rounded-lg hover:bg-white/5 transition-all"
          >
            <div className="flex items-center space-x-3">
              <div
                className={`w-10 h-10 rounded-lg bg-gradient-to-r ${option.color} p-2`}
              >
                <div className="w-full h-full text-white">{option.icon}</div>
              </div>
              <div>
                <h3 className="text-sm font-medium text-white">
                  {option.label}
                </h3>
                <p className="text-xs text-gray-400">{option.description}</p>
              </div>
            </div>

            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                className="sr-only peer"
                checked={settings[option.id] || false}
                onChange={() => handleToggle(option.id)}
              />
              <div className="w-11 h-6 bg-white/10 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-500"></div>
            </label>
          </motion.div>
        ))}
      </div>

      <div className="mt-8 p-6 glass rounded-lg border border-red-500/20">
        <div className="flex items-start space-x-3">
          <div className="w-10 h-10 rounded-lg bg-red-500/20 flex items-center justify-center">
            <FiLock className="w-5 h-5 text-red-400" />
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-medium text-white mb-2">
              Request Data Deletion
            </h3>
            <p className="text-sm text-gray-400 mb-4">
              You can request to delete all your personal data. This action is
              irreversible and will permanently remove all your quiz history,
              achievements, and profile data.
            </p>
            <button className="px-4 py-2 bg-red-500/20 text-red-400 rounded-lg hover:bg-red-500/30 transition-all text-sm font-medium">
              Request Deletion
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacySettings;
