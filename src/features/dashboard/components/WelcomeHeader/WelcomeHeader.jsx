import React from "react";
import { motion } from "framer-motion";
import { FiSun, FiMoon, FiAward } from "react-icons/fi";
import GradientText from "../../../../components/ui/GradientText/GradientText";

const WelcomeHeader = ({ user, stats }) => {
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good Morning";
    if (hour < 18) return "Good Afternoon";
    return "Good Evening";
  };

  const getRandomMotivation = () => {
    const quotes = [
      "Siap tantang diri hari ini?",
      "Setiap kuis adalah langkah maju!",
      "Pengetahuan adalah kekuatan. Terus belajar!",
      "Kamu hebat! Pertahankan!",
      "Hari ini adalah hari yang sempurna untuk belajar!"
    ];
    return quotes[Math.floor(Math.random() * quotes.length)];
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass-card p-8 mb-8 relative overflow-hidden"
    >
      <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-primary-500/10 to-purple-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
      
      <div className="relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
          <div className="flex items-start space-x-4">
            <div className="relative">
              <div className="w-16 h-16 md:w-20 md:h-20 bg-gradient-to-r from-primary-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-2xl">
                <span className="text-3xl md:text-4xl font-bold text-white">
                  {user?.username?.[0]?.toUpperCase() || "U"}
                </span>
              </div>
              <div className="absolute -bottom-2 -right-2 px-2 py-1 glass rounded-full text-xs font-medium text-primary-400 border border-primary-500/30">
                {stats?.rank || "Bronze"}
              </div>
            </div>

            <div className="flex-1">
              <div className="flex items-center space-x-2 mb-2">
                {getGreeting() === "Good Morning" ? (
                  <FiSun className="w-5 h-5 text-yellow-400" />
                ) : (
                  <FiMoon className="w-5 h-5 text-indigo-400" />
                )}
                <span className="text-gray-400">{getGreeting()},</span>
              </div>
              <h1 className="text-3xl md:text-4xl font-display font-bold mb-2">
                <GradientText gradient="primary" animate>
                  {user?.username || "User"}
                </GradientText>
              </h1>
              <p className="text-gray-400 flex items-center">
                <span className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse" />
                {getRandomMotivation()}
              </p>
            </div>
          </div>

          <div className="mt-4 md:mt-0 flex items-center space-x-3 px-6 py-3 glass rounded-2xl">
            <div className="relative">
              <FiAward className="w-8 h-8 text-orange-400" />
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-gradient-to-r from-orange-400 to-red-500 rounded-full flex items-center justify-center">
                <span className="text-xs font-bold text-white">🔥</span>
              </div>
            </div>
            <div>
              <div className="text-2xl font-bold text-white">
                {stats?.streak || 0}
              </div>
              <div className="text-xs text-gray-400">Day Streak</div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default WelcomeHeader;
