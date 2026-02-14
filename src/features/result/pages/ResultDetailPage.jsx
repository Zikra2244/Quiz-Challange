import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import ScoreCard from "../components/ScoreCard/ScoreCard";
import AnswerReview from "../components/AnswerReview/AnswerReview";
import Button from "../../../components/ui/Button/Button";
import { FiArrowLeft } from "react-icons/fi";

const ResultDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    try {
      const history = JSON.parse(localStorage.getItem("quiz_history") || "[]");
      const found = history.find((item) => item.id === parseInt(id));

      console.log("Loading result detail:", {
        id,
        found: found
          ? {
              id: found.id,
              questionsCount: found.questions?.length,
              firstQuestion: found.questions?.[0]?.question?.substring(0, 30),
              answersCount: found.userAnswers?.length,
            }
          : "not found",
      });

      if (found) {
        setResult(found);
      } else {
        console.error("Result not found for id:", id);
        navigate("/history");
      }
    } catch (error) {
      console.error("Failed to load result:", error);
      navigate("/history");
    } finally {
      setLoading(false);
    }
  }, [id, navigate]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[var(--color-background)] flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-[var(--color-primary)] border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-[var(--color-textSecondary)]">
            Memuat detail hasil...
          </p>
        </div>
      </div>
    );
  }

  if (!result) {
    return null;
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-[var(--color-background)] pt-8 pb-16"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
        <button
          onClick={() => navigate("/history")}
          className="flex items-center text-[var(--color-textSecondary)] hover:text-[var(--color-text)] transition-colors mb-6 group"
        >
          <FiArrowLeft className="mr-2 group-hover:-translate-x-1 transition-transform" />
          Kembali ke Riwayat
        </button>
        <ScoreCard result={result} />

        <div className="mt-12">
          <h2 className="text-2xl font-display font-bold text-[var(--color-text)] mb-6">
            Review Jawaban
          </h2>
          <AnswerReview
            questions={result.questions || []}
            userAnswers={result.userAnswers || []}
          />
        </div>

        <div className="flex justify-center mt-12">
          <Button variant="primary" size="lg" onClick={() => navigate("/quiz")}>
            Kerjakan Quiz Lagi
          </Button>
        </div>
      </div>
    </motion.div>
  );
};

export default ResultDetailPage;
