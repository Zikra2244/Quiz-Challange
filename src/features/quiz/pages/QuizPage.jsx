import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useQuiz } from "../../../app/providers/QuizProvider";
import { useAuth } from "../../../app/providers/AuthProvider";
import QuestionCard from "../components/QuestionCard/QuestionCard";
import QuizTimer from "../components/QuizTimer/QuizTimer";
import QuizProgress from "../components/QuizProgress/QuizProgress";
import QuizSkeleton from "../components/QuizSkeleton/QuizSkeleton";
import { quizService } from "../services/quizService";
import Button from "../../../components/ui/Button/Button";
import { FiAlertCircle, FiRefreshCw } from "react-icons/fi";

const QuizPage = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const {
    state,
    setQuestions,
    setLoading,
    setError,
    answerQuestion,
    nextQuestion,
    setTime,
    completeQuiz,
    restartQuiz,
  } = useQuiz();

  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [isAnswerCorrect, setIsAnswerCorrect] = useState(false);

  useEffect(() => {
    const fetchQuestions = async () => {
      if (state?.questions?.length > 0) return;

      setLoading(true);
      try {
        const questions = await quizService.fetchQuestions({
          amount: 5,
          category: 9,
          difficulty: "easy",
        });
        setQuestions(questions);
      } catch (error) {
        setError(error.message || "Gagal memuat soal");
      }
    };

    fetchQuestions();
  }, [state?.questions?.length, setQuestions, setLoading, setError]);

  useEffect(() => {
    if (!state) return;
    if (state.completed || state.loading || state.questions?.length === 0)
      return;

    const timer = setInterval(() => {
      if (state.timeLeft > 0) {
        setTime(state.timeLeft - 1);
      } else {
        clearInterval(timer);
        handleTimeOut();
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [
    state?.timeLeft,
    state?.completed,
    state?.loading,
    state?.questions?.length,
  ]);

  const handleAnswerSelect = (answer) => {
    if (!state) return;
    if (
      selectedAnswer ||
      state.userAnswers?.some((a) => a?.questionId === state.currentIndex)
    ) {
      return;
    }

    setSelectedAnswer(answer);

    const currentQ = state.questions[state.currentIndex];
    const isCorrect = answer === currentQ.correct_answer;
    setIsAnswerCorrect(isCorrect);
    setShowFeedback(true);

    answerQuestion({
      questionId: state.currentIndex,
      question: currentQ.question,
      userAnswer: answer,
      correctAnswer: currentQ.correct_answer,
      isCorrect,
      timestamp: Date.now(),
    });

    setTimeout(() => {
      setShowFeedback(false);
      setSelectedAnswer(null);

      if (state.currentIndex + 1 < state.questions.length) {
        nextQuestion();
      } else {
        completeQuiz();
      }
    }, 1500);
  };

  const handleTimeOut = () => {
    if (!state) return;
    completeQuiz();
  };

  const handleRestart = () => {
    restartQuiz();
    setSelectedAnswer(null);
    setShowFeedback(false);
  };

  useEffect(() => {
    if (state?.completed) {
      navigate("/result", {
        state: {
          fromQuiz: true,
          timestamp: Date.now(),
        },
      });
    }
  }, [state?.completed, navigate]);

  if (state?.loading) {
    return <QuizSkeleton />;
  }
  if (state?.error) {
    return (
      <div className="min-h-screen bg-dark-400 flex items-center justify-center p-4">
        <div className="glass-card p-8 max-w-md text-center">
          <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-red-500/20 flex items-center justify-center">
            <FiAlertCircle className="w-10 h-10 text-red-400" />
          </div>
          <h2 className="text-2xl font-display font-bold text-white mb-4">
            Oops! Something went wrong
          </h2>
          <p className="text-gray-400 mb-6">{state.error}</p>
          <Button
            variant="primary"
            onClick={handleRestart}
            className="flex items-center mx-auto"
          >
            <FiRefreshCw className="mr-2" />
            Try Again
          </Button>
        </div>
      </div>
    );
  }

  if (!state || !state.questions || state.questions.length === 0) {
    return (
      <div className="min-h-screen bg-dark-400 flex items-center justify-center">
        <QuizSkeleton />
      </div>
    );
  }

  const currentQuestion = state.questions[state.currentIndex];
  const hasAnswered = state.userAnswers?.some(
    (a) => a?.questionId === state.currentIndex,
  );

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-dark-400 pt-8 pb-16"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-2xl md:text-3xl font-display font-bold text-white mb-2">
              Quiz Challenge
            </h1>
            <p className="text-gray-400">
              Good luck, {user?.username || "User"}! 👋
            </p>
          </div>
          <QuizTimer
            timeLeft={state.timeLeft || 300}
            totalTime={state.totalTime || 300}
          />
        </div>

        <QuizProgress
          currentIndex={state.currentIndex}
          totalQuestions={state.questions.length}
          userAnswers={state.userAnswers || []}
        />

        <AnimatePresence mode="wait">
          <QuestionCard
            key={state.currentIndex}
            question={currentQuestion}
            currentIndex={state.currentIndex}
            totalQuestions={state.questions.length}
            onAnswerSelect={handleAnswerSelect}
            selectedAnswer={selectedAnswer}
            showFeedback={showFeedback}
            isCorrect={isAnswerCorrect}
            disabled={hasAnswered || showFeedback}
          />
        </AnimatePresence>

        <div className="mt-8 text-center">
          <div className="inline-flex items-center space-x-6 glass px-6 py-3 rounded-full">
            <div className="flex items-center">
              <span className="text-sm text-gray-400 mr-2">Dikerjakan:</span>
              <span className="text-white font-semibold">
                {state.userAnswers?.length || 0}/{state.questions.length}
              </span>
            </div>
            <div className="w-px h-4 bg-white/10" />
            <div className="flex items-center">
              <span className="text-sm text-gray-400 mr-2">Benar:</span>
              <span className="text-green-400 font-semibold">
                {state.userAnswers?.filter((a) => a?.isCorrect).length || 0}
              </span>
            </div>
            <div className="w-px h-4 bg-white/10" />
            <div className="flex items-center">
              <span className="text-sm text-gray-400 mr-2">Skor:</span>
              <span className="text-primary-400 font-semibold">
                {state.questions.length > 0
                  ? Math.round(
                      ((state.userAnswers?.filter((a) => a?.isCorrect).length ||
                        0) /
                        state.questions.length) *
                        100,
                    )
                  : 0}
                %
              </span>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default QuizPage;
