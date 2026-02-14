import React, { createContext, useContext, useEffect, useState } from "react";

export const THEMES = {
  dark: {
    id: "dark",
    name: "Dark Mode",
    icon: "",
    colors: {
      background: "#0C0C14",
      surface: "#1E1E2F",
      surface2: "#12121C",
      primary: "#3B82F6",
      primaryHover: "#2563EB",
      secondary: "#8B5CF6",
      secondaryHover: "#7C3AED",
      text: "#FFFFFF",
      textSecondary: "#9CA3AF",
      textMuted: "#6B7280",
      border: "rgba(255,255,255,0.1)",
      borderHover: "rgba(255,255,255,0.2)",
      success: "#10B981",
      warning: "#F59E0B",
      error: "#EF4444",
      glass: "rgba(255,255,255,0.05)",
      glassHover: "rgba(255,255,255,0.1)",
    },
  },
  light: {
    id: "light",
    name: "Light Mode",
    icon: "",
    colors: {
      background: "#F9FAFB",
      surface: "#FFFFFF",
      surface2: "#F3F4F6",
      primary: "#2563EB",
      primaryHover: "#1D4ED8",
      secondary: "#7C3AED",
      secondaryHover: "#6D28D9",
      text: "#111827",
      textSecondary: "#4B5563",
      textMuted: "#6B7280",
      border: "rgba(0,0,0,0.1)",
      borderHover: "rgba(0,0,0,0.2)",
      success: "#059669",
      warning: "#D97706",
      error: "#DC2626",
      glass: "rgba(255,255,255,0.8)",
      glassHover: "rgba(255,255,255,0.9)",
    },
  },
  purple: {
    id: "purple",
    name: "Purple Haze",
    icon: "",
    colors: {
      background: "#1a1a2e",
      surface: "#16213e",
      surface2: "#0f0f1f",
      primary: "#9d4edd",
      primaryHover: "#8b3dcc",
      secondary: "#c77dff",
      secondaryHover: "#b66eff",
      text: "#FFFFFF",
      textSecondary: "#e0b3ff",
      textMuted: "#c084fc",
      border: "rgba(255,255,255,0.1)",
      borderHover: "rgba(255,255,255,0.2)",
      success: "#10B981",
      warning: "#F59E0B",
      error: "#EF4444",
      glass: "rgba(157,78,221,0.1)",
      glassHover: "rgba(157,78,221,0.2)",
    },
  },
  blue: {
    id: "blue",
    name: "Ocean Blue",
    icon: "",
    colors: {
      background: "#0f172a",
      surface: "#1e293b",
      surface2: "#0b1120",
      primary: "#38bdf8",
      primaryHover: "#0ea5e9",
      secondary: "#818cf8",
      secondaryHover: "#6366f1",
      text: "#FFFFFF",
      textSecondary: "#cbd5e1",
      textMuted: "#94a3b8",
      border: "rgba(255,255,255,0.1)",
      borderHover: "rgba(255,255,255,0.2)",
      success: "#10B981",
      warning: "#F59E0B",
      error: "#EF4444",
      glass: "rgba(56,189,248,0.1)",
      glassHover: "rgba(56,189,248,0.2)",
    },
  },
  green: {
    id: "green",
    name: "Forest",
    icon: "",
    colors: {
      background: "#0f2f1f",
      surface: "#1a4731",
      surface2: "#0a1f14",
      primary: "#4ade80",
      primaryHover: "#22c55e",
      secondary: "#86efac",
      secondaryHover: "#4ade80",
      text: "#FFFFFF",
      textSecondary: "#bbf7d0",
      textMuted: "#86efac",
      border: "rgba(255,255,255,0.1)",
      borderHover: "rgba(255,255,255,0.2)",
      success: "#10B981",
      warning: "#F59E0B",
      error: "#EF4444",
      glass: "rgba(74,222,128,0.1)",
      glassHover: "rgba(74,222,128,0.2)",
    },
  },
};

const ThemeContext = createContext();

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within ThemeProvider");
  }
  return context;
};

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(() => {
    const savedTheme = localStorage.getItem("theme");
    return savedTheme && THEMES[savedTheme] ? savedTheme : "dark";
  });

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    localStorage.setItem("theme", theme);

    const root = document.documentElement;
    const themeColors = THEMES[theme].colors;

    Object.entries(themeColors).forEach(([key, value]) => {
      root.style.setProperty(`--color-${key}`, value);
    });

    root.setAttribute("data-theme", theme);

    const metaThemeColor = document.querySelector('meta[name="theme-color"]');
    if (metaThemeColor) {
      metaThemeColor.setAttribute("content", themeColors.background);
    }

    window.dispatchEvent(
      new CustomEvent("themechange", {
        detail: { theme, colors: themeColors },
      }),
    );
  }, [theme, mounted]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  };

  const setThemeById = (themeId) => {
    if (THEMES[themeId]) {
      setTheme(themeId);
    }
  };

  const value = {
    theme,
    setTheme: setThemeById,
    toggleTheme,
    currentTheme: THEMES[theme],
    themes: THEMES,
    themeList: Object.values(THEMES),
    mounted,
    colors: THEMES[theme].colors,
  };

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
};

export default ThemeProvider;
