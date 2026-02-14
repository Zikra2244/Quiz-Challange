import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  FiBookOpen,
  FiRefreshCw,
  FiBarChart2,
  FiArrowRight,
} from "react-icons/fi";
import Button from "../../../../components/ui/Button/Button";

const RecommendedActions = ({ score, wrongAnswers }) => {
  const recommendations = [];

  if (score < 60) {
    recommendations.push({
      icon: <FiBookOpen className="w-5 h-5" />,
      title: "Pelajari Kembali",
      description: "Skormu masih di bawah 60%.",
      action: "Mulai Belajar",
      link: "/learn",
      color: "from-yellow-400 to-orange-400",
    });
  }

  if (wrongAnswers > 0) {
    recommendations.push({
      icon: <FiRefreshCw className="w-5 h-5" />,
      title: "Latihan Soal Serupa",
      description: `${wrongAnswers} jawaban salah.`,
      action: "Kerjakan Lagi",
      link: "/quiz",
      color: "from-blue-400 to-cyan-400",
    });
  }

  recommendations.push({
    icon: <FiBarChart2 className="w-5 h-5" />,
    title: "Lihat Statistik",
    description: "Analisis performa belajarmu.",
    action: "Lihat Statistik",
    link: "/dashboard",
    color: "from-green-400 to-emerald-400",
  });

  return (
    <div className="glass-card p-6">
      <h2 className="text-xl font-semibold text-white mb-4">Rekomendasi</h2>

      <div className="space-y-4">
        {recommendations.map((rec, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className="group"
          >
            <Link to={rec.link}>
              <div className="p-4 glass rounded-xl hover:bg-white/5 transition-all">
                <div className="flex items-start space-x-3">
                  <div
                    className={`w-10 h-10 rounded-lg bg-gradient-to-r ${rec.color} p-2 flex-shrink-0`}
                  >
                    <div className="w-full h-full text-white">{rec.icon}</div>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-white font-medium mb-1 group-hover:text-primary-400 transition-colors">
                      {rec.title}
                    </h3>
                    <p className="text-xs text-gray-400 mb-2">
                      {rec.description}
                    </p>
                    <span className="text-xs text-primary-400 flex items-center group-hover:translate-x-1 transition-transform">
                      {rec.action}
                      <FiArrowRight className="w-3 h-3 ml-1" />
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default RecommendedActions;
