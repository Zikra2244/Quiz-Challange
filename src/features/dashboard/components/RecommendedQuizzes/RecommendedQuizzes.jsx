import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { 
  FiUsers, 
  FiStar, 
  FiBarChart2,
  FiArrowRight
} from "react-icons/fi";
import Button from "../../../../components/ui/Button/Button";

const RecommendedQuizzes = ({ quizzes }) => {
  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case "easy": return "from-green-400 to-emerald-400";
      case "medium": return "from-yellow-400 to-orange-400";
      case "hard": return "from-red-400 to-pink-400";
      default: return "from-blue-400 to-cyan-400";
    }
  };

  const getDifficultyLabel = (difficulty) => {
    switch (difficulty) {
      case "easy": return "Mudah";
      case "medium": return "Sedang";
      case "hard": return "Sulit";
      default: return difficulty;
    }
  };

  if (!quizzes || quizzes.length === 0) {
    return (
      <div className="glass-card p-6">
        <h2 className="text-xl font-semibold text-white mb-4">
          Rekomendasi Kuis
        </h2>
        <p className="text-gray-400">Belum ada rekomendasi kuis.</p>
      </div>
    );
  }

  return (
    <div className="glass-card p-6">
      <h2 className="text-xl font-semibold text-white mb-6 flex items-center">
        <FiBarChart2 className="mr-2 text-primary-400" />
        Rekomendasi untukmu
      </h2>

      <div className="space-y-4">
        {quizzes?.map((quiz, index) => (
          <motion.div
            key={quiz.id}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ scale: 1.02 }}
            className="group"
          >
            <div className="p-4 glass rounded-xl hover:bg-white/5 transition-all">
              <div className="flex justify-between items-start mb-3">
                <h3 className="font-medium text-white">
                  {quiz.category}
                </h3>
                <div className={`px-2 py-1 rounded-full text-xs font-medium bg-gradient-to-r ${getDifficultyColor(quiz.difficulty)} bg-opacity-20 text-white`}>
                  {getDifficultyLabel(quiz.difficulty)}
                </div>
              </div>

              <div className="flex items-center justify-between text-sm mb-4">
                <span className="text-gray-400 flex items-center">
                  <FiUsers className="w-4 h-4 mr-1" />
                  {quiz.participants?.toLocaleString() || 0} peserta
                </span>
                <span className="text-gray-400 flex items-center">
                  <FiStar className="w-4 h-4 mr-1 text-yellow-400" />
                  {quiz.rating || 4.5}
                </span>
              </div>

              <Link to={`/quiz?category=${quiz.id}&difficulty=${quiz.difficulty}`}>
                <Button
                  variant="outline"
                  size="sm"
                  fullWidth
                  className="group"
                >
                  Mulai Quiz
                  <FiArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="mt-6 text-center">
        <Link 
          to="/quiz" 
          className="text-sm text-primary-400 hover:text-primary-300 flex items-center justify-center group"
        >
          Lihat semua kuis
          <FiArrowRight className="ml-1 group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>
    </div>
  );
};

export default RecommendedQuizzes;
