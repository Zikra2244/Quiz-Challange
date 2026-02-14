import { useState, useCallback, useMemo } from "react";

/**
 * @returns {Object}
 */
export const useQuizAnswers = () => {
  const [answers, setAnswers] = useState([]);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showFeedback, setShowFeedback] = useState(false);

  const addAnswer = useCallback((answer) => {
    setAnswers((prev) => {
      const index = prev.findIndex((a) => a.questionId === answer.questionId);
      if (index >= 0) {
        const updated = [...prev];
        updated[index] = answer;
        return updated;
      }
      return [...prev, answer];
    });
  }, []);

  const removeAnswer = useCallback((questionId) => {
    setAnswers((prev) => prev.filter((a) => a.questionId !== questionId));
  }, []);

  const clearAnswers = useCallback(() => {
    setAnswers([]);
  }, []);

  const getAnswer = useCallback(
    (questionId) => {
      return answers.find((a) => a.questionId === questionId);
    },
    [answers],
  );

  const isAnswered = useCallback(
    (questionId) => {
      return answers.some((a) => a.questionId === questionId);
    },
    [answers],
  );

  const stats = useMemo(() => {
    const total = answers.length;
    const correct = answers.filter((a) => a.isCorrect).length;
    const wrong = total - correct;
    const score = total > 0 ? (correct / total) * 100 : 0;

    return {
      total,
      correct,
      wrong,
      score: Math.round(score * 10) / 10,
      answeredQuestions: answers,
    };
  }, [answers]);

  const handleAnswerSelect = useCallback(
    (answer, questionId, isCorrect) => {
      setSelectedAnswer(answer);
      setShowFeedback(true);

      addAnswer({
        questionId,
        userAnswer: answer,
        isCorrect,
        timestamp: Date.now(),
      });

      setTimeout(() => {
        setShowFeedback(false);
        setSelectedAnswer(null);
      }, 1500);
    },
    [addAnswer],
  );

  return {
    answers,
    selectedAnswer,
    showFeedback,
    stats,
    addAnswer,
    removeAnswer,
    clearAnswers,
    getAnswer,
    isAnswered,
    handleAnswerSelect,
    setSelectedAnswer,
    setShowFeedback,
  };
};

export default useQuizAnswers;
