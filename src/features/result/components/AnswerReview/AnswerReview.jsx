import React, { useState } from "react";
import { motion } from "framer-motion";
import DOMPurify from "dompurify";
import { 
  FiCheckCircle, 
  FiXCircle, 
  FiChevronDown,
  FiChevronUp,
  FiFilter
} from "react-icons/fi";

const AnswerReview = ({ questions, userAnswers }) => {
  const [filter, setFilter] = useState("all");
  const [expandedId, setExpandedId] = useState(null);

  if (!questions || !userAnswers || userAnswers.length === 0) {
    return (
      <div className="glass-card p-6">
        <p className="text-gray-400">Belum ada jawaban untuk direview.</p>
      </div>
    );
  }

  const filteredAnswers = userAnswers.filter(answer => {
    if (filter === "correct") return answer?.isCorrect;
    if (filter === "wrong") return !answer?.isCorrect;
    return true;
  });

  const sanitizeHTML = (html) => ({
    __html: DOMPurify.sanitize(html || "")
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center space-x-2">
          <FiFilter className="w-4 h-4 text-gray-400" />
          <span className="text-sm text-gray-400">Filter:</span>
          <div className="flex space-x-2">
            <button
              onClick={() => setFilter("all")}
              className={`px-3 py-1 rounded-full text-xs font-medium transition-all ${
                filter === "all"
                  ? "bg-primary-500 text-white"
                  : "glass text-gray-400 hover:text-white"
              }`}
            >
              Semua ({userAnswers.length})
            </button>
            <button
              onClick={() => setFilter("correct")}
              className={`px-3 py-1 rounded-full text-xs font-medium transition-all ${
                filter === "correct"
                  ? "bg-green-500 text-white"
                  : "glass text-gray-400 hover:text-white"
              }`}
            >
              Benar ({userAnswers.filter(a => a?.isCorrect).length})
            </button>
            <button
              onClick={() => setFilter("wrong")}
              className={`px-3 py-1 rounded-full text-xs font-medium transition-all ${
                filter === "wrong"
                  ? "bg-red-500 text-white"
                  : "glass text-gray-400 hover:text-white"
              }`}
            >
              Salah ({userAnswers.filter(a => a && !a.isCorrect).length})
            </button>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        {filteredAnswers.map((answer, index) => {
          const question = questions[answer?.questionId];
          const isExpanded = expandedId === answer?.questionId;
          
          return (
            <motion.div
              key={answer?.questionId}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className={`glass-card p-6 overflow-hidden ${
                answer?.isCorrect 
                  ? "border-l-4 border-green-500" 
                  : "border-l-4 border-red-500"
              }`}
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-3">
                    <span className="text-sm font-medium text-gray-400">
                      Soal #{answer?.questionId + 1}
                    </span>
                  </div>
                  
                  <h3 
                    className="text-lg font-medium text-white mb-4"
                    dangerouslySetInnerHTML={sanitizeHTML(answer?.question)}
                  />
                </div>
                
                <button
                  onClick={() => setExpandedId(isExpanded ? null : answer?.questionId)}
                  className="ml-4 p-2 glass rounded-lg hover:bg-white/5 transition-colors"
                >
                  {isExpanded ? (
                    <FiChevronUp className="w-5 h-5 text-gray-400" />
                  ) : (
                    <FiChevronDown className="w-5 h-5 text-gray-400" />
                  )}
                </button>
              </div>

              <div className="flex items-center space-x-4 mb-4">
                <div className={`flex items-center ${
                  answer?.isCorrect ? "text-green-400" : "text-red-400"
                }`}>
                  {answer?.isCorrect ? (
                    <FiCheckCircle className="w-5 h-5 mr-2" />
                  ) : (
                    <FiXCircle className="w-5 h-5 mr-2" />
                  )}
                  <span className="text-sm font-medium">
                    {answer?.isCorrect ? "Jawaban Benar" : "Jawaban Salah"}
                  </span>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div className={`p-4 rounded-lg ${
                  answer?.isCorrect 
                    ? "bg-green-500/10 border border-green-500/30" 
                    : "bg-red-500/10 border border-red-500/30"
                }`}>
                  <p className="text-xs text-gray-400 mb-1">Jawaban Anda:</p>
                  <p 
                    className="text-white font-medium"
                    dangerouslySetInnerHTML={sanitizeHTML(answer?.userAnswer)}
                  />
                </div>
                
                {!answer?.isCorrect && (
                  <div className="p-4 rounded-lg bg-green-500/10 border border-green-500/30">
                    <p className="text-xs text-gray-400 mb-1">Jawaban Benar:</p>
                    <p 
                      className="text-white font-medium"
                      dangerouslySetInnerHTML={sanitizeHTML(answer?.correctAnswer)}
                    />
                  </div>
                )}
              </div>
            </motion.div>
          );
        })}
      </div>

      {filteredAnswers.length === 0 && (
        <div className="glass-card p-12 text-center">
          <p className="text-gray-400">
            {filter === "correct" 
              ? "Belum ada jawaban benar" 
              : filter === "wrong"
              ? "Belum ada jawaban salah"
              : "Belum ada jawaban"}
          </p>
        </div>
      )}
    </div>
  );
};

export default AnswerReview;
