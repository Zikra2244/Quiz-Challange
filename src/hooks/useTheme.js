import { useState, useEffect, useCallback } from "react";
import useLocalStorage from "./useLocalStorage";
import useMediaQuery from "./useMediaQuery";

const THEMES = {
  dark: {
    id: "dark",
    name: "Dark Mode",
    icon: "🌙",
    colors: {
      background: "#0C0C14",
      surface: "#1E1E2F",
      primary: "#3B82F6",
      secondary: "#8B5CF6",
      text: "#FFFFFF",
      textSecondary: "#9CA3AF",
    },
  },
  light: {
    id: "light",
    name: "Light Mode",
    icon: "☀️",
    colors: {
      background: "#F9FAFB",
      surface: "#FFFFFF",
      primary: "#2563EB",
      secondary: "#7C3AED",
      text: "#111827",
      textSecondary: "#6B7280",
    },
  },
  purple: {
    id: "purple",
    name: "Purple Haze",
    icon: "💜",
    colors: {
      background: "#1a1a2e",
      surface: "#16213e",
      primary: "#9d4edd",
      secondary: "#c77dff",
      text: "#FFFFFF",
      textSecondary: "#e0b3ff",
    },
  },
  blue: {
    id: "blue",
    name: "Ocean Blue",
    icon: "🌊",
    colors: {
      background: "#0f172a",
      surface: "#1e293b",
      primary: "#38bdf8",
      secondary: "#818cf8",
      text: "#FFFFFF",
      textSecondary: "#cbd5e1",
    },
  },
  green: {
    id: "green",
    name: "Forest",
    icon: "🌳",
    colors: {
      background: "#0f2f1f",
      surface: "#1a4731",
      primary: "#4ade80",
      secondary: "#86efac",
      text: "#FFFFFF",
      textSecondary: "#bbf7d0",
    },
  },
};

export const useTheme = () => {
  const [theme, setTheme] = useLocalStorage("theme", "dark");
  const [mounted, setMounted] = useState(false);
  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    const savedTheme = localStorage.getItem("theme");
    if (savedTheme && THEMES[savedTheme]) {
      applyTheme(savedTheme);
    } else {
      const systemTheme = prefersDarkMode ? "dark" : "light";
      applyTheme(systemTheme);
      setTheme(systemTheme);
    }
  }, [mounted, prefersDarkMode, setTheme]);

  const applyTheme = useCallback((themeId) => {
    const themeObj = THEMES[themeId];
    if (!themeObj) return;

    const root = document.documentElement;

    Object.entries(themeObj.colors).forEach(([key, value]) => {
      root.style.setProperty(`--color-${key}`, value);
    });

    root.setAttribute("data-theme", themeId);

    const metaThemeColor = document.querySelector('meta[name="theme-color"]');
    if (metaThemeColor) {
      metaThemeColor.setAttribute("content", themeObj.colors.background);
    }
  }, []);

  const changeTheme = useCallback(
    (themeId) => {
      if (THEMES[themeId]) {
        setTheme(themeId);
        applyTheme(themeId);

        window.dispatchEvent(
          new CustomEvent("themechange", {
            detail: { theme: themeId },
          }),
        );
      }
    },
    [setTheme, applyTheme],
  );

  const toggleTheme = useCallback(() => {
    const newTheme = theme === "dark" ? "light" : "dark";
    changeTheme(newTheme);
  }, [theme, changeTheme]);

  const currentTheme = THEMES[theme] || THEMES.dark;

  const getAllThemes = useCallback(() => {
    return Object.values(THEMES);
  }, []);

  const isDarkMode = useCallback(() => {
    return (
      currentTheme.id === "dark" ||
      currentTheme.id === "purple" ||
      currentTheme.id === "blue" ||
      currentTheme.id === "green"
    );
  }, [currentTheme]);

  return {
    theme,
    currentTheme,
    mounted,

    changeTheme,
    toggleTheme,
    getAllThemes,
    isDarkMode,

    themes: THEMES,
    themeList: Object.values(THEMES),
  };
};

export default useTheme;
