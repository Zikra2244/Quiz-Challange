import { STORAGE_KEYS } from "./constants";

/**
 * @param {string} key
 * @param {any} defaultValue
 * @returns {any}
 */
export const getStorageItem = (key, defaultValue = null) => {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : defaultValue;
  } catch (error) {
    console.error(`Error getting item ${key} from localStorage:`, error);
    return defaultValue;
  }
};

/**
 * @param {string} key
 * @param {any} value
 * @returns {boolean}
 */
export const setStorageItem = (key, value) => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
    return true;
  } catch (error) {
    console.error(`Error setting item ${key} in localStorage:`, error);
    return false;
  }
};

/**
 * @param {string} key
 * @returns {boolean}
 */
export const removeStorageItem = (key) => {
  try {
    localStorage.removeItem(key);
    return true;
  } catch (error) {
    console.error(`Error removing item ${key} from localStorage:`, error);
    return false;
  }
};

/**
 * @returns {boolean}
 */
export const clearAppData = () => {
  try {
    Object.values(STORAGE_KEYS).forEach((key) => {
      localStorage.removeItem(key);
    });
    return true;
  } catch (error) {
    console.error("Error clearing app data:", error);
    return false;
  }
};

/**
 * @returns {Object|null}
 */
export const getUser = () => {
  return getStorageItem(STORAGE_KEYS.USER);
};

/**
 * @param {Object} user
 * @returns {boolean}
 */
export const setUser = (user) => {
  return setStorageItem(STORAGE_KEYS.USER, user);
};

/**
 * @returns {boolean}
 */
export const removeUser = () => {
  return removeStorageItem(STORAGE_KEYS.USER);
};

/**
 * @returns {Array}
 */
export const getQuizHistory = () => {
  return getStorageItem(STORAGE_KEYS.QUIZ_HISTORY, []);
};

/**
 * @param {Object} quizResult
 * @returns {boolean}
 */
export const addQuizToHistory = (quizResult) => {
  const history = getQuizHistory();
  const newHistory = [quizResult, ...history].slice(0, 50);
  return setStorageItem(STORAGE_KEYS.QUIZ_HISTORY, newHistory);
};

/**
 * @returns {boolean}
 */
export const clearQuizHistory = () => {
  return setStorageItem(STORAGE_KEYS.QUIZ_HISTORY, []);
};
