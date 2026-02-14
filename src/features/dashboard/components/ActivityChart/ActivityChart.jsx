import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FiBarChart2, FiCalendar } from "react-icons/fi";

const ActivityChart = () => {
  const [chartData, setChartData] = useState([]);
  const [stats, setStats] = useState({
    averageScore: 0,
    totalQuizzes: 0,
  });

  useEffect(() => {
    loadActivityData();
  }, []);

  const loadActivityData = () => {
    try {
      const history = JSON.parse(localStorage.getItem("quiz_history") || "[]");

      const last7Days = [];
      const today = new Date();

      const dayNames = ["Min", "Sen", "Sel", "Rab", "Kam", "Jum", "Sab"];

      for (let i = 6; i >= 0; i--) {
        const date = new Date(today);
        date.setDate(date.getDate() - i);

        const dateStr = date.toISOString().split("T")[0];
        const dayIndex = date.getDay();

        const dayQuizzes = history.filter((item) => {
          const itemDate = new Date(item.timestamp).toISOString().split("T")[0];
          return itemDate === dateStr;
        });

        let avgScore = 0;
        if (dayQuizzes.length > 0) {
          const totalScore = dayQuizzes.reduce(
            (sum, q) => sum + (q.score || 0),
            0,
          );
          avgScore = Math.round(totalScore / dayQuizzes.length);
        }

        last7Days.push({
          date: dateStr,
          label: dayNames[dayIndex],
          score: avgScore,
          quizzes: dayQuizzes.length,
          fullDate: date.toLocaleDateString("id-ID", {
            weekday: "long",
            day: "numeric",
            month: "short",
          }),
        });
      }

      const totalQuizzes = history.length;
      const quizzesWithScore = last7Days.filter((d) => d.score > 0);
      const averageScore =
        quizzesWithScore.length > 0
          ? Math.round(
              quizzesWithScore.reduce((sum, d) => sum + d.score, 0) /
                quizzesWithScore.length,
            )
          : 0;

      setChartData(last7Days);
      setStats({
        averageScore,
        totalQuizzes,
      });

      console.log(" Activity chart data:", last7Days);
    } catch (error) {
      console.error("Failed to load activity data:", error);
      const emptyData = generateEmptyData();
      setChartData(emptyData);
    }
  };

  const generateEmptyData = () => {
    const today = new Date();
    const dayNames = ["Min", "Sen", "Sel", "Rab", "Kam", "Jum", "Sab"];
    const emptyData = [];

    for (let i = 6; i >= 0; i--) {
      const date = new Date(today);
      date.setDate(date.getDate() - i);
      const dayIndex = date.getDay();

      emptyData.push({
        label: dayNames[dayIndex],
        score: 0,
        quizzes: 0,
        fullDate: date.toLocaleDateString("id-ID", {
          weekday: "long",
          day: "numeric",
          month: "short",
        }),
      });
    }

    return emptyData;
  };

  const maxScore = Math.max(...chartData.map((d) => d.score), 100);

  if (chartData.length === 0) {
    return (
      <div className="glass-card p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-[var(--color-text)] flex items-center">
            <FiBarChart2 className="mr-2 text-[var(--color-primary)]" />
            Aktivitas Minggu Ini
          </h2>
          <div className="flex items-center space-x-2 text-sm text-[var(--color-textSecondary)]">
            <FiCalendar className="w-4 h-4" />
            <span>7 Hari Terakhir</span>
          </div>
        </div>

        <div className="text-center py-12">
          <div className="w-16 h-16 mx-auto mb-4 glass rounded-2xl flex items-center justify-center">
            <FiBarChart2 className="w-8 h-8 text-[var(--color-textMuted)]" />
          </div>
          <p className="text-[var(--color-textSecondary)] mb-2">
            Belum ada aktivitas quiz
          </p>
          <p className="text-sm text-[var(--color-textMuted)]">
            Kerjakan quiz untuk melihat statistikmu
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="glass-card p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-[var(--color-text)] flex items-center">
          <FiBarChart2 className="mr-2 text-[var(--color-primary)]" />
          Aktivitas Minggu Ini
        </h2>
        <div className="flex items-center space-x-2 text-sm text-[var(--color-textSecondary)]">
          <FiCalendar className="w-4 h-4" />
          <span>7 Hari Terakhir</span>
        </div>
      </div>

      <div className="flex items-end justify-between h-40 mb-4">
        {chartData.map((day, index) => (
          <div
            key={index}
            className="flex flex-col items-center w-full max-w-[50px] group"
          >
            <motion.div
              initial={{ height: 0 }}
              animate={{
                height: day.score > 0 ? `${(day.score / maxScore) * 100}%` : 20,
              }}
              transition={{ delay: index * 0.05, duration: 0.5 }}
              className={`w-10 rounded-t-lg ${
                day.score > 0
                  ? "bg-gradient-to-t from-[var(--color-primary)] to-[var(--color-secondary)]"
                  : "bg-[var(--color-border)]"
              }`}
              style={{
                height: day.score > 0 ? `${(day.score / maxScore) * 100}%` : 20,
              }}
            >
              {day.score > 0 && (
                <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-[var(--color-surface)] text-[var(--color-text)] text-xs rounded-lg px-2 py-1 whitespace-nowrap border border-[var(--color-border)]">
                  {day.fullDate}: {day.score}% ({day.quizzes} quiz)
                </div>
              )}
            </motion.div>

            <span className="text-xs text-[var(--color-textSecondary)] mt-2 font-medium">
              {day.label}
            </span>

            <span
              className={`text-xs font-bold mt-1 ${
                day.score > 0
                  ? "text-[var(--color-primary)]"
                  : "text-[var(--color-textMuted)]"
              }`}
            >
              {day.score > 0 ? `${day.score}%` : "-"}
            </span>

            {day.quizzes > 0 && (
              <span className="text-[10px] text-[var(--color-textMuted)] mt-0.5">
                {day.quizzes} quiz
              </span>
            )}
          </div>
        ))}
      </div>

      <div className="flex justify-between items-center mt-6 pt-4 border-t border-[var(--color-border)]">
        <div className="flex items-center space-x-4">
          <div className="flex items-center">
            <div className="w-3 h-3 bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-secondary)] rounded-full mr-2" />
            <span className="text-xs text-[var(--color-textSecondary)]">
              Rata-rata Skor
            </span>
          </div>
          <span className="text-lg font-bold text-[var(--color-text)]">
            {stats.averageScore}%
          </span>
        </div>

        <div className="flex items-center">
          <span className="text-xs text-[var(--color-textSecondary)] mr-2">
            Total Quiz:
          </span>
          <span className="text-lg font-bold text-[var(--color-text)]">
            {stats.totalQuizzes}
          </span>
        </div>
      </div>

      {chartData.some((d) => d.score === 0) && (
        <div className="mt-3 text-xs text-[var(--color-textMuted)] flex items-center">
          <div className="w-3 h-3 bg-[var(--color-border)] rounded-full mr-2" />
          <span>Tidak ada aktivitas di hari tersebut</span>
        </div>
      )}
    </div>
  );
};

export default ActivityChart;
