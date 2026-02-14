import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  FiClock,
  FiCheckCircle,
  FiXCircle,
  FiArrowRight,
} from "react-icons/fi";

const RecentQuizzes = () => {
  const [quizzes, setQuizzes] = useState([]);

  useEffect(() => {
    try {
      const history = JSON.parse(localStorage.getItem("quiz_history") || "[]");
      const recent = history.slice(0, 3);
      setQuizzes(recent);
    } catch (error) {
      console.error("Failed to load recent quizzes:", error);
    }
  }, []);

  const formatDuration = (seconds) => {
    if (!seconds) return "0:00";
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  const formatDate = (timestamp) => {
    if (!timestamp) return "Tidak ada tanggal";

    const date = new Date(timestamp);
    const now = new Date();

    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);
    const quizDate = new Date(
      date.getFullYear(),
      date.getMonth(),
      date.getDate(),
    );

    const diffTime = today.getTime() - quizDate.getTime();
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 0) {
      return "Hari ini";
    } else if (diffDays === 1) {
      return "Kemarin";
    } else if (diffDays < 7) {
      return `${diffDays} hari lalu`;
    } else {
      return date.toLocaleDateString("id-ID", {
        day: "numeric",
        month: "short",
        year: "numeric",
      });
    }
  };

  const getScoreColor = (score) => {
    if (score >= 80) return "text-green-400";
    if (score >= 60) return "text-yellow-400";
    return "text-red-400";
  };

  if (!quizzes || quizzes.length === 0) {
    return (
      <div className="glass-card p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-white flex items-center">
            <FiClock className="mr-2 text-primary-400" />
            Quiz Terbaru
          </h2>
          <Link
            to="/history"
            className="text-sm text-primary-400 hover:text-primary-300 flex items-center group"
          >
            Lihat Riwayat
            <FiArrowRight className="ml-1 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
        <div className="text-center py-8">
          <p className="text-gray-400 mb-2">Belum ada quiz yang dikerjakan</p>
          <Link
            to="/quiz"
            className="text-primary-400 hover:text-primary-300 text-sm font-medium"
          >
            Mulai quiz sekarang
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="glass-card p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-white flex items-center">
          <FiClock className="mr-2 text-primary-400" />
          Quiz Terbaru
        </h2>
        <Link
          to="/history"
          className="text-sm text-primary-400 hover:text-primary-300 flex items-center group"
        >
          Lihat Riwayat
          <FiArrowRight className="ml-1 group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>

      <div className="space-y-4">
        {quizzes.map((quiz, index) => (
          <motion.div
            key={quiz.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ scale: 1.02, x: 4 }}
            className="group"
          >
            <Link to={`/result/${quiz.id}`}>
              <div className="p-4 glass rounded-xl hover:bg-white/5 transition-all">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="font-medium text-white mb-1">
                      {quiz.category || "General Knowledge"}
                    </h3>
                    <div className="flex items-center space-x-3 text-xs text-gray-400">
                      <span className="flex items-center">
                        <FiClock className="w-3 h-3 mr-1" />
                        {formatDuration(quiz.timeSpent)}
                      </span>
                      <span>
                        {quiz.correct || 0}/{quiz.total || 0} benar
                      </span>
                    </div>
                  </div>

                  <div
                    className={`text-xl font-bold ${getScoreColor(quiz.score)}`}
                  >
                    {quiz.score || 0}%
                  </div>
                </div>

                <div className="w-full h-1.5 bg-white/5 rounded-full mt-3">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${quiz.score || 0}%` }}
                    transition={{ delay: index * 0.1, duration: 0.8 }}
                    className={`h-full rounded-full ${
                      quiz.score >= 80
                        ? "bg-gradient-to-r from-green-400 to-emerald-400"
                        : quiz.score >= 60
                          ? "bg-gradient-to-r from-yellow-400 to-orange-400"
                          : "bg-gradient-to-r from-red-400 to-pink-400"
                    }`}
                  />
                </div>

                <div className="flex justify-between items-center mt-3">
                  <span className="text-xs text-gray-500">
                    {formatDate(quiz.timestamp)}
                  </span>
                  <span className="text-xs text-gray-400">
                    {quiz.difficulty || "General"}
                  </span>
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>

      {quizzes.length >= 3 && (
        <div className="mt-4 text-center">
          <Link
            to="/history"
            className="text-sm text-primary-400 hover:text-primary-300 flex items-center justify-center group"
          >
            Lihat semua riwayat
            <FiArrowRight className="ml-1 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      )}
    </div>
  );
};

export default RecentQuizzes;
