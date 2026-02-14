import { useState, useEffect, useCallback, useRef } from "react";

/**
 * @param {any} value
 * @param {number} delay
 * @returns {any}
 */
export const useDebounce = (value, delay = 500) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(timer);
    };
  }, [value, delay]);

  return debouncedValue;
};

/**
 *
 * @param {Function} callback
 * @param {number} delay
 * @param {Array} deps
 * @returns {Function}
 */
export const useDebouncedCallback = (callback, delay = 500, deps = []) => {
  const timeoutRef = useRef(null);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return useCallback(
    (...args) => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      timeoutRef.current = setTimeout(() => {
        callback(...args);
      }, delay);
    },
    [callback, delay, ...deps],
  );
};

export default useDebounce;
