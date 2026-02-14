import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import {
  FiUserPlus,
  FiSettings,
  FiPlayCircle,
  FiAward,
  FiArrowRight,
} from "react-icons/fi";
import GradientText from "../../../../components/ui/GradientText/GradientText";
import Button from "../../../../components/ui/Button/Button";

const HowItWorks = () => {
  const controls = useAnimation();
  const [ref, inView] = useInView({ threshold: 0.3, triggerOnce: true });
  const [activeStep, setActiveStep] = useState(0);

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [controls, inView]);

  const steps = [
    {
      icon: <FiUserPlus className="w-8 h-8" />,
      title: "Masuk aja",
      description:
        "Cukup pake username, nggak perlu repot isi email atau password.",
      color: "from-blue-400 to-cyan-500",
    },
    {
      icon: <FiSettings className="w-8 h-8" />,
      title: "Pilih kesukaanmu",
      description:
        "Mau quiz tentang film, sejarah, atau sains? Tentukan sendiri.",
      color: "from-purple-400 to-pink-500",
    },
    {
      icon: <FiPlayCircle className="w-8 h-8" />,
      title: "Mulai jawab",
      description:
        "Santai aja, ada timer tapi nggak perlu buru-buru. Nikmati setiap soal.",
      color: "from-green-400 to-emerald-500",
    },
    {
      icon: <FiAward className="w-8 h-8" />,
      title: "Lihat hasilnya",
      description: "Dapat skor, badge, dan lihat di mana letak kehebatanmu.",
      color: "from-orange-400 to-red-500",
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 100,
      },
    },
  };

  return (
    <section
      ref={ref}
      className="relative py-24 bg-[var(--color-background)] overflow-hidden"
    >
      <div className="relative container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-2 glass rounded-full text-sm font-medium text-[var(--color-primary)] mb-4">
            🎯 Cara Mainnya
          </span>

          <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
            <span className="text-[var(--color-text)]">Cuma 4 langkah,</span>
            <br />
            <GradientText gradient="primary" animate>
              simpel banget
            </GradientText>
          </h2>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={controls}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {steps.map((step, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="relative group"
              onMouseEnter={() => setActiveStep(index)}
              onMouseLeave={() => setActiveStep(0)}
            >
              <div className="glass-card p-6 h-full transition-all duration-300 group-hover:scale-105 group-hover:bg-[var(--color-surface)]">
                <div className="absolute -top-3 -right-3 w-8 h-8 rounded-full bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-secondary)] flex items-center justify-center text-white font-bold text-sm">
                  {index + 1}
                </div>

                <div
                  className={`relative w-16 h-16 rounded-xl bg-gradient-to-r ${step.color} p-3 mb-4 group-hover:rotate-3 transition-transform`}
                >
                  <div className="w-full h-full text-white">{step.icon}</div>
                </div>
                <h3 className="text-xl font-semibold text-[var(--color-text)] mb-2">
                  {step.title}
                </h3>

                <p className="text-sm text-[var(--color-textSecondary)] leading-relaxed">
                  {step.description}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.8 }}
          className="text-center mt-12"
        >
          <p className="text-[var(--color-textSecondary)] mb-4">
            Tertarik buat coba?
          </p>
          <Link to="/login">
            <Button variant="primary" size="lg" className="group">
              Yuk Mulai
              <FiArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default HowItWorks;
