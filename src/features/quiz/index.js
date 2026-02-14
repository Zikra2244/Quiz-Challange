export { default as QuizPage } from "./pages/QuizPage";
export { default as QuestionCard } from "./components/QuestionCard/QuestionCard";
export { default as QuizTimer } from "./components/QuizTimer/QuizTimer";
export { default as QuizProgress } from "./components/QuizProgress/QuizProgress";
export { default as QuizSkeleton } from "./components/QuizSkeleton/QuizSkeleton";
export { default as QuizComplete } from "./components/QuizComplete/QuizComplete";
export { quizService } from "./services/quizService";
export { default as useQuizTimer } from "./hooks/useQuizTimer";
export { default as useQuizAnswers } from "./hooks/useQuizAnswers";

export const QUIZ_DIFFICULTIES = ["easy", "medium", "hard"];
export const QUIZ_TYPES = ["multiple", "boolean"];
export const DEFAULT_QUIZ_CONFIG = {
  amount: 5,
  category: 9,
  difficulty: "easy",
  type: "multiple",
};
