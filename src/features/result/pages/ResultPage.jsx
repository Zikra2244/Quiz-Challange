import React, { useEffect, useState, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { useQuiz } from "../../../app/providers/QuizProvider";
import { useAuth } from "../../../app/providers/AuthProvider";
import ScoreCard from "../components/ScoreCard/ScoreCard";
import AnswerReview from "../components/AnswerReview/AnswerReview";
import Statistics from "../components/Statistics/Statistics";
import PerformanceChart from "../components/PerformanceChart/PerformanceChart";
import ShareResult from "../components/ShareResult/ShareResult";
import RecommendedActions from "../components/RecommendedActions/RecommendedActions";
import Button from "../../../components/ui/Button/Button";
import { FiHome, FiRefreshCw } from "react-icons/fi";

const ResultPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useAuth();
  const { state, stats, restartQuiz } = useQuiz();

  const [resultData, setResultData] = useState(null);
  const hasSaved = useRef(false);

  useEffect(() => {
    if (!state?.completed && !location.state?.fromQuiz) {
      navigate("/dashboard");
      return;
    }

    console.log("Questions from state:", state?.questions);
    console.log("User answers from state:", state?.userAnswers);

    setResultData({
      ...stats,
      questions: state?.questions || [],
      userAnswers: state?.userAnswers || [],
      timeSpent:
        state?.startTime && state?.endTime
          ? Math.floor((state.endTime - state.startTime) / 1000)
          : 0,
      completedAt: new Date().toISOString(),
      username: user?.username,
    });

    if (!hasSaved.current) {
      saveToHistory();
      hasSaved.current = true;
    }
  }, []);

  const saveToHistory = () => {
    try {
      const history = JSON.parse(localStorage.getItem("quiz_history") || "[]");

      const questionsToSave =
        state?.questions?.map((q) => ({
          id: q.id,
          question: q.question,
          correct_answer: q.correct_answer,
          incorrect_answers: q.incorrect_answers,
          all_answers: q.all_answers,
          category: q.category,
          difficulty: q.difficulty,
          points: q.points,
        })) || [];

      const newResult = {
        id: Date.now(),
        timestamp: new Date().toISOString(),
        ...stats,
        questions: questionsToSave,
        userAnswers:
          state?.userAnswers?.map((a) => ({
            questionId: a.questionId,
            question: a.question,
            userAnswer: a.userAnswer,
            correctAnswer: a.correctAnswer,
            isCorrect: a.isCorrect,
            timestamp: a.timestamp,
          })) || [],
        category: state?.questions?.[0]?.category || "General Knowledge",
        difficulty: state?.difficulty || "easy",
        timeSpent:
          state?.startTime && state?.endTime
            ? Math.floor((state.endTime - state.startTime) / 1000)
            : 0,
        score: stats?.score || 0,
        correct: stats?.correct || 0,
        wrong: stats?.wrong || 0,
        total: stats?.total || 0,
      };

      console.log("Saving to history:", {
        questionsCount: newResult.questions.length,
        firstQuestion: newResult.questions[0],
        answersCount: newResult.userAnswers.length,
      });

      const isDuplicate = history.some(
        (item) =>
          item.timestamp === newResult.timestamp &&
          item.score === newResult.score,
      );

      if (!isDuplicate) {
        history.unshift(newResult);
        if (history.length > 50) history.pop();
        localStorage.setItem("quiz_history", JSON.stringify(history));
        console.log("✅ Quiz saved to history with full questions data");
      } else {
        console.log("⚠️ Duplicate quiz detected, not saving");
      }
    } catch (error) {
      console.error("Failed to save history:", error);
    }
  };

  if (!resultData) {
    return (
      <div className="min-h-screen bg-[var(--color-background)] flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-[var(--color-primary)] border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-[var(--color-textSecondary)]">
            Memuat hasil kuis...
          </p>
        </div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-[var(--color-background)] pt-8 pb-16"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl md:text-4xl font-display font-bold text-[var(--color-text)] mb-2">
              Hasil Quiz
            </h1>
            <p className="text-[var(--color-textSecondary)]">
              Lihat seberapa baik performamu dalam kuis ini
            </p>
          </div>

          <div className="flex items-center space-x-4">
            <Button
              variant="outline"
              size="sm"
              onClick={() => navigate("/dashboard")}
            >
              <FiHome className="mr-2" />
              Dashboard
            </Button>
          </div>
        </div>

        <ScoreCard result={resultData} />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8">
          <div className="lg:col-span-2 space-y-8">
            <Statistics stats={resultData} />
            <PerformanceChart
              questions={state?.questions || []}
              answers={state?.userAnswers || []}
            />
          </div>

          <div className="space-y-8">
            <RecommendedActions
              score={resultData.score}
              wrongAnswers={resultData.wrong}
            />
            <ShareResult result={resultData} />
          </div>
        </div>

        <div className="mt-12">
          <h2 className="text-2xl font-display font-bold text-[var(--color-text)] mb-6">
            Review Jawaban
          </h2>
          <AnswerReview
            questions={state?.questions || []}
            userAnswers={state?.userAnswers || []}
          />
        </div>

        <div className="flex justify-center space-x-4 mt-12">
          <Button
            variant="primary"
            size="lg"
            onClick={() => {
              restartQuiz();
              navigate("/quiz");
            }}
            className="flex items-center"
          >
            <FiRefreshCw className="mr-2" />
            Kerjakan Lagi
          </Button>

          <Button
            variant="outline"
            size="lg"
            onClick={() => navigate("/history")}
          >
            Lihat Riwayat
          </Button>
        </div>
      </div>
    </motion.div>
  );
};

export default ResultPage;
