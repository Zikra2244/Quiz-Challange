export const API_BASE_URL = "https://opentdb.com";
export const API_TIMEOUT = 10000;
export const DEFAULT_QUIZ_CONFIG = {
  amount: 5,
  category: 9,
  difficulty: "easy",
  type: "multiple",
};

export const APP_NAME = "QuizFlow";
export const APP_VERSION = "1.0.0";
export const SESSION_TIMEOUT = 30 * 60 * 1000;

export const QUIZ_DIFFICULTIES = ["easy", "medium", "hard"];
export const QUIZ_TYPES = ["multiple", "boolean"];
export const QUIZ_CATEGORIES = {
  9: "General Knowledge",
  10: "Entertainment: Books",
  11: "Entertainment: Film",
  12: "Entertainment: Music",
  13: "Entertainment: Musicals & Theatres",
  14: "Entertainment: Television",
  15: "Entertainment: Video Games",
  16: "Entertainment: Board Games",
  17: "Science & Nature",
  18: "Science: Computers",
  19: "Science: Mathematics",
  20: "Mythology",
  21: "Sports",
  22: "Geography",
  23: "History",
  24: "Politics",
  25: "Art",
  26: "Celebrities",
  27: "Animals",
  28: "Vehicles",
  29: "Entertainment: Comics",
  30: "Science: Gadgets",
  31: "Entertainment: Japanese Anime & Manga",
  32: "Entertainment: Cartoon & Animations",
};

export const POINTS_PER_DIFFICULTY = {
  easy: 10,
  medium: 20,
  hard: 30,
};

export const ACHIEVEMENTS = {
  FIRST_QUIZ: "first_quiz",
  QUIZ_MASTER: "quiz_master",
  PERFECT_SCORE: "perfect_score",
  HIGH_ACHIEVER: "high_achiever",
  STREAK_3: "streak_3",
  STREAK_7: "streak_7",
  STREAK_30: "streak_30",
  SPEED_DEMON: "speed_demon",
  SHARPSHOOTER: "sharpshooter",
  CATEGORY_EXPLORER: "category_explorer",
  SOCIAL_BUTTERFLY: "social_butterfly",
};

export const STORAGE_KEYS = {
  USER: "quiz_user",
  QUIZ_STATE: "quiz_state",
  QUIZ_HISTORY: "quiz_history",
  ACHIEVEMENTS: "achievements",
  ACHIEVEMENT_STATS: "achievement_stats",
  USER_PROFILE: "user_profile",
  USER_SETTINGS: "user_settings",
  THEME: "theme",
};

export const ROUTES = {
  HOME: "/",
  LOGIN: "/login",
  DASHBOARD: "/dashboard",
  QUIZ: "/quiz",
  RESULT: "/result",
  HISTORY: "/history",
  PROFILE: "/profile",
  ACHIEVEMENTS: "/achievements",
  LEADERBOARD: "/leaderboard",
  SETTINGS: "/settings",
};

export const THEMES = {
  DARK: "dark",
  LIGHT: "light",
  PURPLE: "purple",
  BLUE: "blue",
  GREEN: "green",
};

export const ANIMATION_DURATIONS = {
  FAST: 200,
  NORMAL: 300,
  SLOW: 500,
  VERY_SLOW: 800,
};
