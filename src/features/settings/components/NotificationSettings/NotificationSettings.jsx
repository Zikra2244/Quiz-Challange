import React from "react";
import { motion } from "framer-motion";
import {
  FiBell,
  FiAward,
  FiUsers,
  FiCalendar,
  FiMail,
  FiTrendingUp,
  FiClock,
} from "react-icons/fi";

const NotificationSettings = ({ settings = {}, onUpdate }) => {
  const notificationOptions = [
    {
      id: "achievements",
      label: "Achievement Unlocks",
      description: "Get notified when you unlock new achievements",
      icon: <FiAward className="w-5 h-5" />,
      color: "from-yellow-400 to-orange-400",
    },
    {
      id: "leaderboard",
      label: "Leaderboard Changes",
      description: "Get notified when your rank changes",
      icon: <FiTrendingUp className="w-5 h-5" />,
      color: "from-blue-400 to-cyan-400",
    },
    {
      id: "weekly_report",
      label: "Weekly Report",
      description: "Receive weekly summary of your progress",
      icon: <FiCalendar className="w-5 h-5" />,
      color: "from-green-400 to-emerald-400",
    },
    {
      id: "quiz_reminders",
      label: "Quiz Reminders",
      description: "Daily reminders to practice quizzes",
      icon: <FiClock className="w-5 h-5" />,
      color: "from-purple-400 to-pink-400",
    },
    {
      id: "email_notifications",
      label: "Email Notifications",
      description: "Receive notifications via email",
      icon: <FiMail className="w-5 h-5" />,
      color: "from-red-400 to-pink-400",
    },
  ];

  const handleToggle = (id) => {
    onUpdate({ [id]: !settings[id] });
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold text-white mb-2">
          Notification Preferences
        </h2>
        <p className="text-sm text-gray-400 mb-6">
          Choose what notifications you want to receive
        </p>
      </div>

      <div className="flex items-center justify-between p-4 glass rounded-lg mb-4">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-primary-500 to-purple-600 p-2">
            <FiBell className="w-full h-full text-white" />
          </div>
          <div>
            <h3 className="text-white font-medium">All Notifications</h3>
            <p className="text-xs text-gray-400">
              Enable or disable all notifications
            </p>
          </div>
        </div>
        <label className="relative inline-flex items-center cursor-pointer">
          <input
            type="checkbox"
            className="sr-only peer"
            checked={Object.values(settings).every(Boolean)}
            onChange={() => {
              const newState = !Object.values(settings).every(Boolean);
              notificationOptions.forEach((opt) => {
                onUpdate({ [opt.id]: newState });
              });
            }}
          />
          <div className="w-11 h-6 bg-white/10 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-500"></div>
        </label>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {notificationOptions.map((option) => (
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
    </div>
  );
};

export default NotificationSettings;
