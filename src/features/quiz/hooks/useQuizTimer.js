import { useState, useEffect, useCallback, useRef } from "react";

/**
 * @param {number} initialTime
 * @param {Function} onTimeOut
 * @returns {Object}
 */
export const useQuizTimer = (initialTime = 300, onTimeOut) => {
  const [timeLeft, setTimeLeft] = useState(initialTime);
  const [isRunning, setIsRunning] = useState(true);
  const [isPaused, setIsPaused] = useState(false);
  const timerRef = useRef(null);

  const start = useCallback(() => {
    setIsRunning(true);
    setIsPaused(false);
  }, []);

  const pause = useCallback(() => {
    setIsPaused(true);
    setIsRunning(false);
  }, []);

  const resume = useCallback(() => {
    setIsPaused(false);
    setIsRunning(true);
  }, []);

  const reset = useCallback(
    (newTime = initialTime) => {
      setTimeLeft(newTime);
      setIsRunning(true);
      setIsPaused(false);
    },
    [initialTime],
  );

  const addTime = useCallback((seconds) => {
    setTimeLeft((prev) => prev + seconds);
  }, []);

  const subtractTime = useCallback((seconds) => {
    setTimeLeft((prev) => Math.max(0, prev - seconds));
  }, []);

  useEffect(() => {
    if (!isRunning || isPaused || timeLeft <= 0) {
      if (timeLeft === 0 && onTimeOut) {
        onTimeOut();
      }
      return;
    }

    timerRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timerRef.current);
          if (onTimeOut) onTimeOut();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [isRunning, isPaused, timeLeft, onTimeOut]);

  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, []);

  const formatTime = useCallback((seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  }, []);

  const getStatus = useCallback(() => {
    if (timeLeft <= 0) return "expired";
    if (timeLeft <= 30) return "danger";
    if (timeLeft <= 60) return "warning";
    return "normal";
  }, [timeLeft]);

  const progress = (timeLeft / initialTime) * 100;

  return {
    timeLeft,
    formattedTime: formatTime(timeLeft),
    isRunning,
    isPaused,
    status: getStatus(),
    progress,
    start,
    pause,
    resume,
    reset,
    addTime,
    subtractTime,
    formatTime,
  };
};

export default useQuizTimer;
