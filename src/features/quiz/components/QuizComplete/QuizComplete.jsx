import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { FiCheckCircle, FiBarChart2, FiRefreshCw } from "react-icons/fi";
import Button from "../../../../components/ui/Button/Button";  // ✅ Path benar: ../../../../components/ui/Button/Button
import GradientText from "../../../../components/ui/GradientText/GradientText";

const QuizComplete = ({ stats, onRestart }) => {
  const navigate = useNavigate();

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="glass-card p-8 max-w-2xl mx-auto text-center"
    >
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", duration: 0.6 }}
        className="w-24 h-24 mx-auto mb-6 rounded-full bg-gradient-to-r from-green-400 to-emerald-400 flex items-center justify-center"
      >
        <FiCheckCircle className="w-12 h-12 text-white" />
      </motion.div>

      <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
        <GradientText gradient="primary" animate>
          Quiz Completed!
        </GradientText>
      </h2>
      
      <p className="text-gray-400 mb-8">
        Selamat! Kamu telah menyelesaikan kuis dengan baik.
      </p>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <div className="glass p-4 rounded-xl">
          <div className="text-2xl font-bold text-white mb-1">
            {stats?.total || 0}
          </div>
          <div className="text-xs text-gray-400">Total Soal</div>
        </div>
        
        <div className="glass p-4 rounded-xl">
          <div className="text-2xl font-bold text-green-400 mb-1">
            {stats?.correct || 0}
          </div>
          <div className="text-xs text-gray-400">Benar</div>
        </div>
        
        <div className="glass p-4 rounded-xl">
          <div className="text-2xl font-bold text-red-400 mb-1">
            {stats?.wrong || 0}
          </div>
          <div className="text-xs text-gray-400">Salah</div>
        </div>
        
        <div className="glass p-4 rounded-xl">
          <div className="text-2xl font-bold text-primary-400 mb-1">
            {stats?.score || 0}%
          </div>
          <div className="text-xs text-gray-400">Skor</div>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Button
          variant="primary"
          size="lg"
          onClick={() => navigate("/result")}
          className="flex items-center"
        >
          <FiBarChart2 className="mr-2" />
          Lihat Detail
        </Button>
        
        <Button
          variant="outline"
          size="lg"
          onClick={onRestart}
          className="flex items-center"
        >
          <FiRefreshCw className="mr-2" />
          Kerjakan Lagi
        </Button>
      </div>
    </motion.div>
  );
};

export default QuizComplete;
