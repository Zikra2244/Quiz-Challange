import React from "react";
import { motion } from "framer-motion";
import {
  FiClock,
  FiCheckCircle,
  FiXCircle,
  FiArrowRight,
} from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import GradientText from "../../../../components/ui/GradientText/GradientText";

const HistoryTimeline = ({ history }) => {
  const navigate = useNavigate();

  const formatTime = (timestamp) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffMs = now - date;
    const diffMins = Math.floor(diffMs / 60000);

    if (diffMins < 60) return `${diffMins} menit yang lalu`;
    if (diffMins < 1440) return `${Math.floor(diffMins / 60)} jam yang lalu`;
    return date.toLocaleDateString("id-ID", {
      day: "numeric",
      month: "short",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  if (history.length === 0) {
    return (
      <div className="glass-card p-6">
        <h2 className="text-xl font-semibold text-white mb-4">
          Aktivitas Terbaru
        </h2>
        <div className="text-center py-8">
          <div className="w-16 h-16 mx-auto mb-4 glass rounded-2xl flex items-center justify-center">
            <FiClock className="w-8 h-8 text-gray-500" />
          </div>
          <p className="text-gray-400 mb-2">Belum ada aktivitas</p>
          <button
            onClick={() => navigate("/quiz")}
            className="text-primary-400 hover:text-primary-300 text-sm font-medium"
          >
            Mulai kuis sekarang →
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="glass-card p-6">
      <h2 className="text-xl font-semibold text-white mb-4 flex items-center">
        <FiClock className="mr-2 text-primary-400" />
        Aktivitas Terbaru
      </h2>

      <div className="space-y-4">
        {history.map((item, index) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className="relative pl-6 pb-4 border-l-2 border-primary-500/30 last:border-0 last:pb-0 group"
          >
            <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-gradient-to-r from-primary-500 to-purple-600 group-hover:scale-125 transition-transform" />

            <div
              className="glass rounded-lg p-4 hover:bg-white/5 transition-all cursor-pointer"
              onClick={() => navigate(`/result/${item.id}`)}
            >
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-medium text-white">
                  {item.category || "General Knowledge"}
                </h3>
                <span
                  className={`px-2 py-1 rounded-full text-xs font-medium ${
                    item.score >= 80
                      ? "bg-green-500/20 text-green-400"
                      : item.score >= 60
                        ? "bg-yellow-500/20 text-yellow-400"
                        : "bg-red-500/20 text-red-400"
                  }`}
                >
                  {item.score || 0}%
                </span>
              </div>

              <div className="flex items-center space-x-4 text-xs text-gray-400">
                <span className="flex items-center">
                  <FiCheckCircle className="w-3 h-3 mr-1 text-green-400" />
                  {item.correct || 0} benar
                </span>
                <span className="flex items-center">
                  <FiXCircle className="w-3 h-3 mr-1 text-red-400" />
                  {item.wrong || 0} salah
                </span>
                <span className="flex items-center">
                  <FiClock className="w-3 h-3 mr-1" />
                  {formatTime(item.timestamp)}
                </span>
              </div>

              <div className="mt-2 flex justify-end">
                <span className="text-xs text-primary-400 flex items-center group-hover:translate-x-1 transition-transform">
                  Lihat detail
                  <FiArrowRight className="w-3 h-3 ml-1" />
                </span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {history.length >= 5 && (
        <div className="mt-4 text-center">
          <button
            onClick={() => navigate("/history")}
            className="text-sm text-primary-400 hover:text-primary-300 flex items-center justify-center mx-auto group"
          >
            Lihat semua riwayat
            <FiArrowRight className="ml-1 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      )}
    </div>
  );
};

export default HistoryTimeline;
