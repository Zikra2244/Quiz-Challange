/**
 * @param {string} html
 * @returns {string}
 */
export const decodeHtml = (html) => {
  if (!html) return "";
  const txt = document.createElement("textarea");
  txt.innerHTML = html;
  return txt.value;
};

/**
 * @param {Array} array
 * @returns {Array}
 */
export const shuffleArray = (array) => {
  if (!array || !Array.isArray(array)) return [];
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

/**
 * @param {number} seconds
 * @returns {string}
 */
export const formatTime = (seconds) => {
  if (!seconds && seconds !== 0) return "0:00";
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins}:${secs.toString().padStart(2, "0")}`;
};

/**
 * @param {string|Date} date
 * @returns {string}
 */
export const formatRelativeTime = (date) => {
  if (!date) return "";

  const now = new Date();
  const past = new Date(date);
  const diffMs = now - past;
  const diffSec = Math.floor(diffMs / 1000);
  const diffMin = Math.floor(diffSec / 60);
  const diffHour = Math.floor(diffMin / 60);
  const diffDay = Math.floor(diffHour / 24);
  const diffWeek = Math.floor(diffDay / 7);
  const diffMonth = Math.floor(diffDay / 30);
  const diffYear = Math.floor(diffDay / 365);

  if (diffSec < 60) return `${diffSec} detik yang lalu`;
  if (diffMin < 60) return `${diffMin} menit yang lalu`;
  if (diffHour < 24) return `${diffHour} jam yang lalu`;
  if (diffDay < 7) return `${diffDay} hari yang lalu`;
  if (diffWeek < 4) return `${diffWeek} minggu yang lalu`;
  if (diffMonth < 12) return `${diffMonth} bulan yang lalu`;
  return `${diffYear} tahun yang lalu`;
};

/**
 * @param {string|Date} date
 * @param {Object} options
 * @returns {string}
 */
export const formatDate = (date, options = {}) => {
  if (!date) return "";

  const defaultOptions = {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  };

  return new Date(date).toLocaleDateString("id-ID", {
    ...defaultOptions,
    ...options,
  });
};

/**
 * @param {number} xp
 * @returns {number}
 */
export const calculateLevel = (xp) => {
  if (!xp && xp !== 0) return 1;
  return Math.floor(xp / 400) + 1;
};

/**
 * @param {number} level
 * @returns {number}
 */
export const xpForNextLevel = (level) => {
  return level * 400;
};

/**
 * @param {number} xp
 * @returns {number}
 */
export const calculateLevelProgress = (xp) => {
  if (!xp && xp !== 0) return 0;
  const level = calculateLevel(xp);
  const currentLevelXP = (level - 1) * 400;
  const xpEarned = xp - currentLevelXP;
  return (xpEarned / 400) * 100;
};

/**
 * @returns {string}
 */
export const generateId = () => {
  return Date.now().toString(36) + Math.random().toString(36).substring(2);
};

/**
 * @param {string} text
 * @param {number} length
 * @returns {string}
 */
export const truncateText = (text, length = 50) => {
  if (!text) return "";
  if (text.length <= length) return text;
  return text.substring(0, length) + "...";
};

/**
 * @param {string} text
 * @returns {string}
 */
export const capitalizeFirst = (text) => {
  if (!text) return "";
  return text.charAt(0).toUpperCase() + text.slice(1);
};

/**
 * @param {number} score
 * @returns {string}
 */
export const getScoreColor = (score) => {
  if (score >= 80) return "text-green-400";
  if (score >= 60) return "text-yellow-400";
  return "text-red-400";
};

/**
 * @param {string} difficulty
 * @returns {string}
 */
export const getDifficultyColor = (difficulty) => {
  switch (difficulty?.toLowerCase()) {
    case "easy":
      return "from-green-400 to-emerald-400";
    case "medium":
      return "from-yellow-400 to-orange-400";
    case "hard":
      return "from-red-400 to-pink-400";
    default:
      return "from-blue-400 to-cyan-400";
  }
};

/**
 * @param {string} difficulty
 * @returns {string}
 */
export const getDifficultyLabel = (difficulty) => {
  switch (difficulty?.toLowerCase()) {
    case "easy":
      return "Mudah";
    case "medium":
      return "Sedang";
    case "hard":
      return "Sulit";
    default:
      return difficulty || "General";
  }
};

/**
 * @param {Function} func
 * @param {number} wait
 * @returns {Function}
 */
export const debounce = (func, wait = 300) => {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};

/**
 * @param {Function} func
 * @param {number} limit
 * @returns {Function}
 */
export const throttle = (func, limit = 300) => {
  let inThrottle;
  return function (...args) {
    if (!inThrottle) {
      func.apply(this, args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
};

/**
 * @param {Array} array
 * @param {string} key
 * @returns {Object}
 */
export const groupBy = (array, key) => {
  return array.reduce((result, item) => {
    const groupKey = item[key];
    if (!result[groupKey]) {
      result[groupKey] = [];
    }
    result[groupKey].push(item);
    return result;
  }, {});
};

/**
 * @param {Array<number>} array
 * @returns {number}
 */
export const average = (array) => {
  if (!array || array.length === 0) return 0;
  return array.reduce((a, b) => a + b, 0) / array.length;
};

/**
 * @returns {boolean}
 */
export const isMobile = () => {
  return window.innerWidth <= 768;
};

/**
 * @param {string} text
 * @returns {Promise<boolean>}
 */
export const copyToClipboard = async (text) => {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch (err) {
    console.error("Failed to copy:", err);
    return false;
  }
};
