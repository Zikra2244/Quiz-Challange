import { useEffect, useRef } from "react";

/**
 * @param {Function} handler
 * @param {Array} excludeRefs
 * @returns {Object}
 */
export const useClickOutside = (handler, excludeRefs = []) => {
  const ref = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        const isExcluded = excludeRefs.some(
          (excludeRef) =>
            excludeRef.current && excludeRef.current.contains(event.target),
        );

        if (!isExcluded) {
          handler(event);
        }
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("touchstart", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
    };
  }, [handler, excludeRefs]);

  return ref;
};

export default useClickOutside;
