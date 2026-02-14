import React, {
  createContext,
  useContext,
  useReducer,
  useCallback,
  useEffect,
  useMemo,
} from "react";
import PropTypes from "prop-types";
import useLocalStorage from "../../hooks/useLocalStorage";

export const QUIZ_ACTIONS = {
  SET_QUESTIONS: "SET_QUESTIONS",
  SET_LOADING: "SET_LOADING",
  SET_ERROR: "SET_ERROR",
  ANSWER_QUESTION: "ANSWER_QUESTION",
  NEXT_QUESTION: "NEXT_QUESTION",
  SET_TIME: "SET_TIME",
  COMPLETE_QUIZ: "COMPLETE_QUIZ",
  RESTART_QUIZ: "RESTART_QUIZ",
  CLEAR_QUIZ: "CLEAR_QUIZ",
};

const initialState = {
  questions: [],
  currentIndex: 0,
  userAnswers: [],
  loading: false,
  error: null,
  completed: false,
  timeLeft: 300,
  totalTime: 300,
  startTime: null,
  endTime: null,
  difficulty: "easy",
  category: 9,
  amount: 5,
};

const quizReducer = (state, action) => {
  switch (action.type) {
    case QUIZ_ACTIONS.SET_QUESTIONS:
      return {
        ...state,
        questions: action.payload,
        loading: false,
        startTime: Date.now(),
      };

    case QUIZ_ACTIONS.SET_LOADING:
      return { ...state, loading: action.payload, error: null };

    case QUIZ_ACTIONS.SET_ERROR:
      return { ...state, error: action.payload, loading: false };

    case QUIZ_ACTIONS.ANSWER_QUESTION:
      const existingIndex = state.userAnswers.findIndex(
        (a) => a.questionId === action.payload.questionId,
      );

      let updatedAnswers;
      if (existingIndex >= 0) {
        updatedAnswers = [...state.userAnswers];
        updatedAnswers[existingIndex] = action.payload;
      } else {
        updatedAnswers = [...state.userAnswers, action.payload];
      }

      return { ...state, userAnswers: updatedAnswers };

    case QUIZ_ACTIONS.NEXT_QUESTION:
      return {
        ...state,
        currentIndex: Math.min(
          state.currentIndex + 1,
          state.questions.length - 1,
        ),
      };

    case QUIZ_ACTIONS.SET_TIME:
      return { ...state, timeLeft: action.payload };

    case QUIZ_ACTIONS.COMPLETE_QUIZ:
      return {
        ...state,
        completed: true,
        endTime: Date.now(),
      };

    case QUIZ_ACTIONS.RESTART_QUIZ:
      return {
        ...initialState,
        questions: state.questions,
        difficulty: state.difficulty,
        category: state.category,
        amount: state.amount,
      };

    case QUIZ_ACTIONS.CLEAR_QUIZ:
      return { ...initialState };

    default:
      return state;
  }
};

const QuizContext = createContext(null);

export const useQuiz = () => {
  const context = useContext(QuizContext);
  if (!context) {
    throw new Error("useQuiz must be used within QuizProvider");
  }
  return context;
};

export const QuizProvider = ({ children }) => {
  const [state, dispatch] = useReducer(quizReducer, initialState);
  const [savedState, setSavedState] = useLocalStorage("quiz_state", null);

  useEffect(() => {
    if (
      savedState &&
      !state.completed &&
      !state.loading &&
      state.questions.length === 0
    ) {
      const shouldResume = window.confirm(
        "You have an unfinished quiz. Would you like to continue?",
      );
      if (shouldResume) {
        dispatch({
          type: QUIZ_ACTIONS.SET_QUESTIONS,
          payload: savedState.questions || [],
        });

        if (savedState.userAnswers) {
          savedState.userAnswers.forEach((answer) => {
            dispatch({ type: QUIZ_ACTIONS.ANSWER_QUESTION, payload: answer });
          });
        }

        dispatch({
          type: QUIZ_ACTIONS.SET_TIME,
          payload: savedState.timeLeft || 300,
        });

        if (savedState.currentIndex) {
          for (let i = 0; i < savedState.currentIndex; i++) {
            dispatch({ type: QUIZ_ACTIONS.NEXT_QUESTION });
          }
        }
      } else {
        setSavedState(null);
      }
    }
  }, [
    savedState,
    state.completed,
    state.loading,
    state.questions.length,
    setSavedState,
  ]);

  useEffect(() => {
    if (!state.completed && state.questions.length > 0 && !state.loading) {
      const timeoutId = setTimeout(() => {
        setSavedState({
          questions: state.questions,
          userAnswers: state.userAnswers,
          currentIndex: state.currentIndex,
          timeLeft: state.timeLeft,
          difficulty: state.difficulty,
          category: state.category,
          timestamp: Date.now(),
        });
      }, 1000);

      return () => clearTimeout(timeoutId);
    }
  }, [state, setSavedState]);

  const setQuestions = useCallback((questions) => {
    dispatch({ type: QUIZ_ACTIONS.SET_QUESTIONS, payload: questions });
  }, []);

  const setLoading = useCallback((loading) => {
    dispatch({ type: QUIZ_ACTIONS.SET_LOADING, payload: loading });
  }, []);

  const setError = useCallback((error) => {
    dispatch({ type: QUIZ_ACTIONS.SET_ERROR, payload: error });
  }, []);

  const answerQuestion = useCallback((answer) => {
    dispatch({ type: QUIZ_ACTIONS.ANSWER_QUESTION, payload: answer });
  }, []);

  const nextQuestion = useCallback(() => {
    dispatch({ type: QUIZ_ACTIONS.NEXT_QUESTION });
  }, []);

  const setTime = useCallback((time) => {
    dispatch({ type: QUIZ_ACTIONS.SET_TIME, payload: time });
  }, []);

  const completeQuiz = useCallback(() => {
    dispatch({ type: QUIZ_ACTIONS.COMPLETE_QUIZ });
    setSavedState(null);
  }, [setSavedState]);

  const restartQuiz = useCallback(() => {
    dispatch({ type: QUIZ_ACTIONS.RESTART_QUIZ });
    setSavedState(null);
  }, [setSavedState]);

  const clearQuiz = useCallback(() => {
    dispatch({ type: QUIZ_ACTIONS.CLEAR_QUIZ });
    setSavedState(null);
  }, [setSavedState]);

  const currentQuestion = useMemo(() => {
    return state.questions[state.currentIndex] || null;
  }, [state.questions, state.currentIndex]);

  const stats = useMemo(() => {
    const total = state.questions.length;
    const answered = state.userAnswers.length;
    const correct = state.userAnswers.filter((a) => a?.isCorrect).length;
    const wrong = answered - correct;
    const score = total > 0 ? (correct / total) * 100 : 0;

    return {
      total,
      answered,
      correct,
      wrong,
      score: Math.round(score * 10) / 10,
      remaining: total - answered,
    };
  }, [state.questions.length, state.userAnswers]);

  const progress = useMemo(() => {
    return state.questions.length > 0
      ? ((state.currentIndex + 1) / state.questions.length) * 100
      : 0;
  }, [state.currentIndex, state.questions.length]);

  const contextValue = useMemo(
    () => ({
      state,
      currentQuestion,
      stats,
      progress,
      setQuestions,
      setLoading,
      setError,
      answerQuestion,
      nextQuestion,
      setTime,
      completeQuiz,
      restartQuiz,
      clearQuiz,
    }),
    [
      state,
      currentQuestion,
      stats,
      progress,
      setQuestions,
      setLoading,
      setError,
      answerQuestion,
      nextQuestion,
      setTime,
      completeQuiz,
      restartQuiz,
      clearQuiz,
    ],
  );

  return (
    <QuizContext.Provider value={contextValue}>{children}</QuizContext.Provider>
  );
};

QuizProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default QuizProvider;
