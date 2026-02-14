import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { FiBarChart2, FiTrendingUp, FiCalendar } from "react-icons/fi";
import GradientText from "../../../../components/ui/GradientText/GradientText";

const HistoryChart = ({ history }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    if (!history || history.length === 0) return;

    const ctx = canvasRef.current.getContext("2d");
    const canvas = canvasRef.current;
    const width = canvas.parentElement.clientWidth;
    const height = 300;

    canvas.width = width;
    canvas.height = height;

    const last7Days = Array.from({ length: 7 }, (_, i) => {
      const date = new Date();
      date.setDate(date.getDate() - (6 - i));
      return date.toISOString().split("T")[0];
    });

    const scores = last7Days.map((date) => {
      const dayQuizzes = history.filter(
        (item) => item.timestamp?.split("T")[0] === date,
      );

      if (dayQuizzes.length === 0) return 0;

      const avgScore =
        dayQuizzes.reduce((acc, curr) => acc + (curr.score || 0), 0) /
        dayQuizzes.length;

      return Math.round(avgScore);
    });

    const counts = last7Days.map((date) => {
      return history.filter((item) => item.timestamp?.split("T")[0] === date)
        .length;
    });

    const padding = { top: 40, right: 30, bottom: 50, left: 50 };
    const chartWidth = width - padding.left - padding.right;
    const chartHeight = height - padding.top - padding.bottom;

    ctx.clearRect(0, 0, width, height);

    ctx.beginPath();
    ctx.strokeStyle = "rgba(255,255,255,0.1)";
    ctx.lineWidth = 0.5;

    for (let i = 0; i <= 4; i++) {
      const y = padding.top + (chartHeight / 4) * i;
      ctx.beginPath();
      ctx.moveTo(padding.left, y);
      ctx.lineTo(width - padding.right, y);
      ctx.stroke();

      ctx.fillStyle = "rgba(255,255,255,0.5)";
      ctx.font = "12px Inter";
      ctx.textAlign = "right";
      ctx.textBaseline = "middle";
      ctx.fillText(`${100 - i * 25}%`, padding.left - 10, y);
    }

    const barWidth = (chartWidth - 40) / 7;

    scores.forEach((score, i) => {
      const x = padding.left + 20 + barWidth * i;
      const barHeight = (score / 100) * chartHeight;
      const y = padding.top + (chartHeight - barHeight);

      const gradient = ctx.createLinearGradient(x, y, x, y + barHeight);
      gradient.addColorStop(0, "#3B82F6");
      gradient.addColorStop(1, "#8B5CF6");

      ctx.fillStyle = gradient;
      ctx.shadowColor = "rgba(59, 130, 246, 0.5)";
      ctx.shadowBlur = 10;
      ctx.fillRect(x, y, barWidth - 4, barHeight);

      ctx.shadowBlur = 0;

      ctx.fillStyle = "#FFFFFF";
      ctx.font = "bold 12px Inter";
      ctx.textAlign = "center";
      ctx.textBaseline = "bottom";
      if (score > 0) {
        ctx.fillText(`${score}%`, x + (barWidth - 4) / 2, y - 5);
      }

      ctx.fillStyle = "rgba(255,255,255,0.7)";
      ctx.font = "11px Inter";
      ctx.textBaseline = "top";

      const date = new Date(last7Days[i]);
      const label = date.toLocaleDateString("id-ID", {
        weekday: "short",
        day: "numeric",
      });
      ctx.fillText(
        label,
        x + (barWidth - 4) / 2,
        padding.top + chartHeight + 10,
      );

      if (counts[i] > 0) {
        ctx.fillStyle = "rgba(139, 92, 246, 0.8)";
        ctx.font = "10px Inter";
        ctx.fillText(
          `${counts[i]} kuis`,
          x + (barWidth - 4) / 2,
          padding.top + chartHeight + 30,
        );
      }
    });

    ctx.beginPath();
    ctx.strokeStyle = "rgba(255,255,255,0.3)";
    ctx.lineWidth = 2;

    scores.forEach((score, i) => {
      const x = padding.left + 20 + barWidth * i + (barWidth - 4) / 2;
      const y = padding.top + chartHeight - (score / 100) * chartHeight;

      if (i === 0) {
        ctx.moveTo(x, y);
      } else {
        ctx.lineTo(x, y);
      }
    });
    ctx.stroke();

    scores.forEach((score, i) => {
      const x = padding.left + 20 + barWidth * i + (barWidth - 4) / 2;
      const y = padding.top + chartHeight - (score / 100) * chartHeight;

      ctx.beginPath();
      ctx.fillStyle = "#FFFFFF";
      ctx.shadowBlur = 5;
      ctx.shadowColor = "#3B82F6";
      ctx.arc(x, y, 4, 0, 2 * Math.PI);
      ctx.fill();
      ctx.shadowBlur = 0;
    });
  }, [history]);

  return (
    <div className="glass-card p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-white flex items-center">
          <FiBarChart2 className="mr-2 text-primary-400" />
          Performa 7 Hari Terakhir
        </h2>

        <div className="flex items-center space-x-4">
          <div className="flex items-center">
            <div className="w-3 h-3 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full mr-2" />
            <span className="text-xs text-gray-400">Rata-rata Skor</span>
          </div>
          <div className="flex items-center">
            <div className="w-3 h-3 bg-white rounded-full mr-2" />
            <span className="text-xs text-gray-400">Trend</span>
          </div>
        </div>
      </div>

      <div className="relative w-full h-[300px]">
        <canvas
          ref={canvasRef}
          className="w-full h-full"
          style={{ display: "block" }}
        />
      </div>

      {history.length > 0 && (
        <div className="mt-6 pt-6 border-t border-white/10">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <FiTrendingUp className="w-4 h-4 text-green-400" />
              <span className="text-sm text-gray-400">
                Rata-rata skor 7 hari terakhir:{" "}
                <span className="text-white font-medium">
                  {Math.round(
                    history
                      .slice(0, 7)
                      .reduce((acc, curr) => acc + (curr.score || 0), 0) /
                      Math.min(history.length, 7),
                  )}
                  %
                </span>
              </span>
            </div>
            <div className="flex items-center space-x-2">
              <FiCalendar className="w-4 h-4 text-primary-400" />
              <span className="text-sm text-gray-400">
                Total {history.length} kuis
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default HistoryChart;
