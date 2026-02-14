import React from "react";
import { motion } from "framer-motion";
import { FiCheck } from "react-icons/fi";
import { useTheme } from "../../../../contexts/ThemeContext";

const ThemeSettings = () => {
  const { theme, setTheme, themeList, currentTheme } = useTheme();

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-display font-bold text-[var(--color-text)] mb-2">
          Theme Preferences
        </h2>
        <p className="text-sm text-[var(--color-textSecondary)] mb-6">
          Pilih tema yang sesuai dengan preferensimu
        </p>
      </div>

      <div className="p-4 glass rounded-lg mb-6">
        <div className="flex items-center justify-between">
          <div>
            <span className="text-sm text-[var(--color-textSecondary)]">
              Active Theme
            </span>
            <div className="flex items-center space-x-2 mt-1">
              <span className="text-2xl">{currentTheme.icon}</span>
              <span className="text-lg font-semibold text-[var(--color-text)]">
                {currentTheme.name}
              </span>
            </div>
          </div>
          <div
            className="w-12 h-12 rounded-full"
            style={{ backgroundColor: currentTheme.colors.primary }}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {themeList.map((t) => {
          const isActive = theme === t.id;

          return (
            <motion.button
              key={t.id}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setTheme(t.id)}
              className={`
                relative p-1 rounded-2xl transition-all
                ${isActive ? "ring-2 ring-[var(--color-primary)]" : ""}
              `}
            >
              <div
                className="rounded-xl p-5"
                style={{
                  backgroundColor: t.colors.surface,
                  border: `1px solid ${t.colors.border}`,
                }}
              >
                <div className="flex items-center justify-between mb-4">
                  <span
                    className="text-lg font-medium"
                    style={{ color: t.colors.text }}
                  >
                    {t.name}
                  </span>
                  <span className="text-3xl">{t.icon}</span>
                </div>

                <div className="flex space-x-2 mb-4">
                  <div
                    className="w-8 h-8 rounded-full"
                    style={{ backgroundColor: t.colors.background }}
                  />
                  <div
                    className="w-8 h-8 rounded-full"
                    style={{ backgroundColor: t.colors.surface }}
                  />
                  <div
                    className="w-8 h-8 rounded-full"
                    style={{ backgroundColor: t.colors.primary }}
                  />
                  <div
                    className="w-8 h-8 rounded-full"
                    style={{ backgroundColor: t.colors.secondary }}
                  />
                </div>

                <div className="space-y-1">
                  <div
                    className="h-2 w-3/4 rounded"
                    style={{ backgroundColor: t.colors.text }}
                  />
                  <div
                    className="h-2 w-1/2 rounded"
                    style={{ backgroundColor: t.colors.textSecondary }}
                  />
                </div>

                {isActive && (
                  <div
                    className="absolute top-3 right-3 w-7 h-7 rounded-full flex items-center justify-center"
                    style={{ backgroundColor: t.colors.primary }}
                  >
                    <FiCheck className="w-4 h-4 text-white" />
                  </div>
                )}
              </div>
            </motion.button>
          );
        })}
      </div>

      <div className="mt-8 p-6 glass rounded-xl">
        <h3 className="text-lg font-medium text-[var(--color-text)] mb-4">
          Quick Toggle
        </h3>
        <div className="flex items-center space-x-4">
          <button
            onClick={() => setTheme("dark")}
            className={`
              flex-1 flex items-center justify-center space-x-3 p-4 rounded-xl transition-all
              ${
                theme === "dark"
                  ? "bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-secondary)] text-white"
                  : "glass text-[var(--color-textSecondary)] hover:text-[var(--color-text)] hover:bg-[var(--color-glass-hover)]"
              }
            `}
          >
            <span className="text-2xl">🌙</span>
            <span className="font-medium">Dark Mode</span>
          </button>

          <button
            onClick={() => setTheme("light")}
            className={`
              flex-1 flex items-center justify-center space-x-3 p-4 rounded-xl transition-all
              ${
                theme === "light"
                  ? "bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-secondary)] text-white"
                  : "glass text-[var(--color-textSecondary)] hover:text-[var(--color-text)] hover:bg-[var(--color-glass-hover)]"
              }
            `}
          >
            <span className="text-2xl">☀️</span>
            <span className="font-medium">Light Mode</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ThemeSettings;
