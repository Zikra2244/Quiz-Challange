import React, { useState } from "react";
import { motion } from "framer-motion";
import { FiArrowRight, FiArrowLeft, FiX, FiPlayCircle } from "react-icons/fi";
import Button from "../../../../components/ui/Button/Button";
import { Link } from "react-router-dom";

const tourSteps = [
  {
    title: "Selamat Datang di QuizFlow!",
    description:
      "Platform kuis interaktif yang dirancang untuk membantu kamu belajar dengan cara yang menyenangkan.",
    icon: "🎯",
    color: "from-blue-500 to-cyan-500",
    illustration: "📚",
    details: [
      "Ribuan soal dari berbagai kategori",
      "Sistem poin dan achievement",
      "Kompetisi dengan teman",
    ],
  },
  {
    title: "Pilih Kategori Favoritmu",
    description:
      "Tersedia 24+ kategori soal yang bisa kamu pilih sesuai minat dan kebutuhan belajarmu.",
    icon: "📋",
    color: "from-green-500 to-emerald-500",
    illustration: "🎮",
    details: [
      "General Knowledge",
      "Science & Technology",
      "History & Geography",
      "Entertainment & Sports",
    ],
  },
  {
    title: "Jawab Soal dengan Timer",
    description:
      "Setiap soal memiliki batas waktu. Jawab secepat dan setepat mungkin untuk skor tertinggi!",
    icon: "⏱️",
    color: "from-yellow-500 to-orange-500",
    illustration: "⚡",
    details: ["5 menit per sesi quiz", "Feedback instan", "Auto-save progress"],
  },
  {
    title: "Lihat Hasil & Analisis",
    description:
      "Dapatkan skor instan, review jawaban, dan analisis performa untuk terus meningkatkan kemampuanmu.",
    icon: "📊",
    color: "from-purple-500 to-pink-500",
    illustration: "📈",
    details: [
      "Skor dan statistik detail",
      "Review setiap jawaban",
      "Rekomendasi personal",
    ],
  },
  {
    title: "Kumpulkan Achievement",
    description:
      "Dapatkan badge dan XP reward untuk setiap pencapaianmu. Buktikan kalau kamu yang terbaik!",
    icon: "🏆",
    color: "from-yellow-400 to-amber-600",
    illustration: "⭐",
    details: ["20+ achievement badges", "XP rewards", "Level up system"],
  },
];

const DemoTour = ({ onClose }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const step = tourSteps[currentStep];

  const handleNext = () => {
    if (currentStep < tourSteps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrev = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      className="fixed inset-0 flex items-center justify-center z-50 p-4"
    >
      <div className="glass-card w-full max-w-4xl overflow-hidden">
        <div className="p-6 border-b border-[var(--color-border)]">
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center space-x-3">
              <div
                className={`w-12 h-12 rounded-xl bg-gradient-to-r ${step.color} p-2.5 flex items-center justify-center`}
              >
                <span className="text-3xl">{step.icon}</span>
              </div>
              <div>
                <h3 className="text-2xl font-display font-bold text-[var(--color-text)]">
                  {step.title}
                </h3>
                <p className="text-sm text-[var(--color-textSecondary)] mt-1">
                  Langkah {currentStep + 1} dari {tourSteps.length}
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 glass rounded-lg hover:bg-[var(--color-glass-hover)] transition-colors"
            >
              <FiX className="w-5 h-5 text-[var(--color-textSecondary)]" />
            </button>
          </div>

          <div className="w-full h-2 bg-[var(--color-border)] rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-secondary)]"
              initial={{ width: "0%" }}
              animate={{
                width: `${((currentStep + 1) / tourSteps.length) * 100}%`,
              }}
              transition={{ duration: 0.3 }}
            />
          </div>
        </div>

        <div className="p-8">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="flex flex-col items-center justify-center">
              <div
                className={`w-48 h-48 rounded-3xl bg-gradient-to-br ${step.color} p-1 mb-6`}
              >
                <div className="w-full h-full bg-[var(--color-surface)] rounded-3xl flex items-center justify-center">
                  <span className="text-8xl">{step.illustration}</span>
                </div>
              </div>
              <div className="text-center">
                <span className="text-5xl mb-2 block">{step.icon}</span>
                <span className="text-sm font-medium text-[var(--color-primary)]">
                  Fitur Unggulan
                </span>
              </div>
            </div>

            <div>
              <p className="text-lg text-[var(--color-textSecondary)] mb-6 leading-relaxed">
                {step.description}
              </p>

              <div className="space-y-3">
                {step.details.map((detail, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <div
                      className={`w-6 h-6 rounded-full bg-gradient-to-r ${step.color} flex items-center justify-center`}
                    >
                      <span className="text-white text-xs">✓</span>
                    </div>
                    <span className="text-[var(--color-text)]">{detail}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="p-6 border-t border-[var(--color-border)]">
          <div className="flex items-center justify-between">
            <div className="flex space-x-2">
              {tourSteps.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentStep(index)}
                  className={`w-2.5 h-2.5 rounded-full transition-all ${
                    index === currentStep
                      ? "w-8 bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-secondary)]"
                      : "bg-[var(--color-border)] hover:bg-[var(--color-textSecondary)]"
                  }`}
                />
              ))}
            </div>

            <div className="flex space-x-3">
              {currentStep > 0 && (
                <Button
                  variant="outline"
                  size="md"
                  onClick={handlePrev}
                  className="flex items-center"
                >
                  <FiArrowLeft className="mr-2" />
                  Sebelumnya
                </Button>
              )}

              {currentStep < tourSteps.length - 1 ? (
                <Button
                  variant="primary"
                  size="md"
                  onClick={handleNext}
                  className="flex items-center"
                >
                  Selanjutnya
                  <FiArrowRight className="ml-2" />
                </Button>
              ) : (
                <Link to="/login">
                  <Button
                    variant="primary"
                    size="md"
                    className="flex items-center"
                    onClick={onClose}
                  >
                    <FiPlayCircle className="mr-2" />
                    Mulai Sekarang
                  </Button>
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default DemoTour;
