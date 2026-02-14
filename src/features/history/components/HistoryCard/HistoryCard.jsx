import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  FiCheckCircle,
  FiXCircle,
  FiClock,
  FiCalendar,
  FiCheckSquare,
  FiSquare,
} from "react-icons/fi";

const HistoryCard = ({
  item,
  index,
  viewMode = "grid",
  isSelected,
  onSelect,
}) => {
  const navigate = useNavigate();

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
    } else if (diffDays < 30) {
      const weeks = Math.floor(diffDays / 7);
      return `${weeks} minggu lalu`;
    } else {
      return date.toLocaleDateString("id-ID", {
        day: "numeric",
        month: "short",
        year: "numeric",
      });
    }
  };

  const formatDuration = (seconds) => {
    if (!seconds) return "0:00";
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  const getScoreColor = (score) => {
    if (score >= 80) return "text-green-400";
    if (score >= 60) return "text-yellow-400";
    return "text-red-400";
  };

  const handleClick = (e) => {
    if (e.target.closest(".checkbox")) return;
    navigate(`/result/${item.id}`);
  };

  console.log(
    "Timestamp:",
    item.timestamp,
    "Formatted:",
    formatDate(item.timestamp),
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
      whileHover={{ y: -4 }}
      className={`glass-card p-6 cursor-pointer hover:bg-white/5 transition-all ${
        viewMode === "list" ? "flex items-start space-x-6" : ""
      }`}
      onClick={handleClick}
    >
      <div
        className="checkbox flex-shrink-0"
        onClick={(e) => {
          e.stopPropagation();
          onSelect(item.id);
        }}
      >
        <div
          className={`w-6 h-6 rounded-lg border-2 flex items-center justify-center transition-all cursor-pointer ${
            isSelected
              ? "bg-primary-500 border-primary-500"
              : "border-white/20 hover:border-primary-400"
          }`}
        >
          {isSelected && <FiCheckSquare className="w-4 h-4 text-white" />}
        </div>
      </div>

      <div className="flex-1">
        <div className="flex justify-between items-start mb-3">
          <div>
            <h3 className="text-lg font-semibold text-white mb-1">
              {item.category || "General Knowledge"}
            </h3>
            <div className="flex items-center space-x-3 text-xs text-gray-400">
              <span className="flex items-center">
                <FiCalendar className="w-3 h-3 mr-1" />
                {formatDate(item.timestamp)}
              </span>
              <span className="flex items-center">
                <FiClock className="w-3 h-3 mr-1" />
                {formatDuration(item.timeSpent)}
              </span>
            </div>
          </div>

          <div className={`text-2xl font-bold ${getScoreColor(item.score)}`}>
            {item.score || 0}%
          </div>
        </div>

        <div className="flex items-center space-x-4 mt-2">
          <span className="text-sm text-gray-400 flex items-center">
            <FiCheckCircle className="w-4 h-4 mr-1 text-green-400" />
            {item.correct || 0} benar
          </span>
          <span className="text-sm text-gray-400 flex items-center">
            <FiXCircle className="w-4 h-4 mr-1 text-red-400" />
            {item.wrong || 0} salah
          </span>
          <span className="text-sm text-gray-400">{item.total || 0} soal</span>
        </div>
      </div>
    </motion.div>
  );
};

export default HistoryCard;
