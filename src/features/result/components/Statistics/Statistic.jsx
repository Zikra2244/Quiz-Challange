import React from "react";
import { motion } from "framer-motion";
import {
  FiBarChart2,
  FiTarget,
  FiTrendingUp,
  FiAlertCircle,
  FiClock,
  FiZap,
} from "react-icons/fi";

const Statistics = ({ stats }) => {
  const accuracy =
    stats.total > 0 ? ((stats.correct / stats.total) * 100).toFixed(1) : 0;

  const wrongPercentage =
    stats.total > 0 ? ((stats.wrong / stats.total) * 100).toFixed(1) : 0;

  const averageTimePerQuestion =
    stats.timeSpent && stats.total
      ? (stats.timeSpent / stats.total).toFixed(0)
      : 0;

  const statCards = [
    {
      icon: <FiTarget className="w-6 h-6" />,
      label: "Akurasi",
      value: `${accuracy}%`,
      subValue: `${stats.correct}/${stats.total} soal`,
      color: "from-blue-500 to-cyan-500",
      progress: accuracy,
    },
    {
      icon: <FiTrendingUp className="w-6 h-6" />,
      label: "Skor Akhir",
      value: `${stats.score}%`,
      subValue: `${stats.correct} benar • ${stats.wrong} salah`,
      color: "from-green-500 to-emerald-500",
      progress: stats.score,
    },
    {
      icon: <FiClock className="w-6 h-6" />,
      label: "Waktu Pengerjaan",
      value: `${Math.floor(stats.timeSpent / 60)}:${(stats.timeSpent % 60).toString().padStart(2, "0")}`,
      subValue: `Rata-rata ${averageTimePerQuestion} detik/soal`,
      color: "from-purple-500 to-pink-500",
      progress: (stats.timeSpent / 300) * 100,
    },
    {
      icon: <FiZap className="w-6 h-6" />,
      label: "Kecepatan",
      value: `${averageTimePerQuestion}s`,
      subValue: "per soal",
      color: "from-yellow-500 to-orange-500",
      progress: Math.max(0, 100 - averageTimePerQuestion * 3),
    },
  ];

  return (
    <div className="glass-card p-6">
      <h2 className="text-xl font-semibold text-white mb-6 flex items-center">
        <FiBarChart2 className="mr-2 text-primary-400" />
        Statistik Detail
      </h2>

      <div className="space-y-6">
        {statCards.map((stat, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className="relative"
          >
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center space-x-3">
                <div
                  className={`w-10 h-10 rounded-lg bg-gradient-to-r ${stat.color} p-2`}
                >
                  <div className="w-full h-full text-white">{stat.icon}</div>
                </div>
                <div>
                  <p className="text-sm text-gray-400">{stat.label}</p>
                  <p className="text-xl font-display font-bold text-white">
                    {stat.value}
                  </p>
                </div>
              </div>
              <p className="text-xs text-gray-500">{stat.subValue}</p>
            </div>

            <div className="w-full h-2 bg-white/5 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${Math.min(stat.progress, 100)}%` }}
                transition={{ delay: index * 0.1 + 0.3, duration: 0.8 }}
                className={`h-full bg-gradient-to-r ${stat.color} rounded-full`}
              />
            </div>
          </motion.div>
        ))}
      </div>

      <div className="mt-6 pt-6 border-t border-white/10">
        <div className="flex items-start space-x-3">
          <div className="flex-shrink-0">
            <FiAlertCircle className="w-5 h-5 text-primary-400" />
          </div>
          <div>
            <h4 className="text-sm font-medium text-white mb-1">
              Performance Insight
            </h4>
            <p className="text-xs text-gray-400">
              {accuracy >= 80
                ? "Excellent! Kamu menunjukkan pemahaman yang sangat baik. Pertahankan konsistensimu!"
                : accuracy >= 60
                  ? "Good job! Beberapa area masih perlu ditingkatkan. Coba pelajari ulang jawaban yang salah."
                  : "Masih perlu banyak latihan. Fokus pada soal-soal yang salah dan pelajari konsep dasarnya."}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Statistics;
