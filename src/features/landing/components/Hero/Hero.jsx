import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, useAnimation, AnimatePresence } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { FiArrowRight, FiMonitor, FiStar } from "react-icons/fi";
import Button from "../../../../components/ui/Button/Button";
import GradientText from "../../../../components/ui/GradientText/GradientText";
import DemoTour from "../DemoTour/DemoTour";

const Hero = () => {
  const controls = useAnimation();
  const [ref, inView] = useInView({ threshold: 0.3, triggerOnce: true });
  const [isHovered, setIsHovered] = useState(false);
  const [showTour, setShowTour] = useState(false);

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [controls, inView]);

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

  const floatingShapes = [
    { icon: "", size: 40, top: "15%", left: "10%", delay: 0 },
    { icon: "", size: 60, top: "70%", left: "5%", delay: 1 },
    { icon: "", size: 30, top: "20%", right: "15%", delay: 2 },
    { icon: "", size: 50, bottom: "25%", right: "10%", delay: 3 },
    { icon: "", size: 45, top: "60%", left: "15%", delay: 4 },
    { icon: "", size: 35, bottom: "40%", right: "20%", delay: 5 },
  ];

  return (
    <>
      <section
        ref={ref}
        className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-b from-[var(--color-background)] via-[var(--color-surface)] to-[var(--color-background)]"
        aria-label="Hero Section"
      >
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-0 -left-40 w-80 h-80 bg-purple-600 rounded-full mix-blend-multiply filter blur-3xl animate-blob" />
          <div className="absolute top-0 -right-40 w-80 h-80 bg-blue-600 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-2000" />
          <div className="absolute bottom-40 left-20 w-80 h-80 bg-pink-600 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-4000" />
        </div>

        {floatingShapes.map((shape, index) => (
          <motion.div
            key={index}
            className="absolute z-0 opacity-30"
            style={{
              top: shape.top,
              left: shape.left,
              right: shape.right,
              bottom: shape.bottom,
              fontSize: shape.size,
            }}
            animate={{
              y: [0, -30, 0],
              rotate: [0, 10, -10, 0],
            }}
            transition={{
              duration: 8,
              delay: shape.delay,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            {shape.icon}
          </motion.div>
        ))}

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={controls}
          className="relative container mx-auto px-6 lg:px-8 py-32 z-10"
        >
          <div className="flex flex-col items-center text-center max-w-4xl mx-auto">
            <motion.div variants={itemVariants} className="relative mb-8">
              <div className="absolute inset-0 bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-secondary)] rounded-full blur-xl opacity-50 group-hover:opacity-75 transition-opacity" />
              <div className="relative glass px-6 py-3 rounded-full inline-flex items-center space-x-3">
                <span className="text-2xl animate-wave"></span>
                <span className="text-sm font-medium text-[var(--color-text)]">
                  Hai, selamat datang di QuizFlow
                </span>
              </div>
            </motion.div>

            <motion.div variants={itemVariants} className="mb-6">
              <h1 className="text-5xl md:text-7xl lg:text-8xl font-display font-bold leading-tight">
                <span className="text-[var(--color-text)]">Belajar sambil</span>
                <br />
                <GradientText gradient="primary" animate>
                  bersenang-senang
                </GradientText>
              </h1>
            </motion.div>

            <motion.div variants={itemVariants} className="relative mb-10">
              <div className="absolute -top-10 left-1/2 transform -translate-x-1/2 w-px h-16 bg-gradient-to-b from-transparent via-[var(--color-primary)] to-transparent" />
              <p className="text-lg md:text-xl text-[var(--color-textSecondary)] max-w-2xl mx-auto leading-relaxed">
                Temukan cara baru belajar yang seru. Dari kuis interaktif,
                tantangan harian, sampai kompetisi seru bareng teman.
              </p>
            </motion.div>

            <motion.div
              variants={itemVariants}
              className="flex flex-col sm:flex-row gap-5 w-full sm:w-auto mb-16"
            >
              <Link to="/login" className="w-full sm:w-auto">
                <Button
                  variant="primary"
                  size="lg"
                  fullWidth
                  className="group relative overflow-hidden px-8 py-4 text-lg"
                  onMouseEnter={() => setIsHovered(true)}
                  onMouseLeave={() => setIsHovered(false)}
                >
                  <motion.span
                    className="absolute inset-0 bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-secondary)]"
                    initial={{ x: "-100%" }}
                    animate={{ x: isHovered ? "0%" : "-100%" }}
                    transition={{ duration: 0.3 }}
                  />
                  <span className="relative flex items-center justify-center">
                    Mulai Petualangan
                    <FiArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </span>
                </Button>
              </Link>

              <Button
                variant="outline"
                size="lg"
                fullWidth
                onClick={() => setShowTour(true)}
                className="group px-8 py-4 text-lg border-2 hover:border-[var(--color-primary)]"
              >
                <FiMonitor className="mr-2 w-5 h-5 group-hover:rotate-6 transition-transform" />
                Lihat Cara Kerjanya
              </Button>
            </motion.div>

            <motion.div
              variants={itemVariants}
              className="relative w-full max-w-3xl"
            >
              <div className="absolute -bottom-20 left-0 right-0 h-32 opacity-20">
                <svg
                  className="w-full h-full"
                  viewBox="0 0 1200 120"
                  preserveAspectRatio="none"
                >
                  <path
                    d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z"
                    fill="url(#gradient)"
                    opacity="0.3"
                  >
                    <animate
                      attributeName="d"
                      dur="10s"
                      repeatCount="indefinite"
                      values="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z;
                              M0,0V15.81C13,21.25,27.93,25.17,42.72,25.5c27.23.62,51.72-10.39,77.44-18.46C160.81,0,215.25,0,270,0c69.38,0,119.79,31.86,187.5,31.86,56.39,0,98.47-27.24,153.5-27.24,49.68,0,81.37,23.09,129.5,23.09,36.9,0,65.33-14.4,99.5-21.71,29.14-6.24,58.38-9,88.55-9,38.48,0,75.52,7.79,110.5,19.54,7.86,2.65,15.67,5.55,23.5,8.66V0Z;
                              M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z"
                    />
                  </path>
                  <defs>
                    <linearGradient
                      id="gradient"
                      x1="0%"
                      y1="0%"
                      x2="100%"
                      y2="0%"
                    >
                      <stop offset="0%" stopColor="var(--color-primary)" />
                      <stop offset="100%" stopColor="var(--color-secondary)" />
                    </linearGradient>
                  </defs>
                </svg>
              </div>

              <div className="flex justify-center space-x-4">
                {["", "", "", "", ""].map((emoji, idx) => (
                  <motion.span
                    key={idx}
                    className="text-3xl opacity-50 hover:opacity-100 transition-opacity cursor-default"
                    animate={{
                      y: [0, -15, 0],
                    }}
                    transition={{
                      duration: 2,
                      delay: idx * 0.2,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  >
                    {emoji}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          </div>
        </motion.div>

        <motion.div
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <div className="relative">
            <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 text-yellow-400 animate-ping"></div>
            <div className="w-6 h-10 rounded-full border-2 border-[var(--color-border)] flex justify-center">
              <motion.div
                className="w-1.5 h-3 bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-secondary)] rounded-full mt-2"
                animate={{ y: [0, 20, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
            </div>
          </div>
        </motion.div>
      </section>

      <AnimatePresence>
        {showTour && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/80 backdrop-blur-md z-50"
              onClick={() => setShowTour(false)}
            />
            <DemoTour onClose={() => setShowTour(false)} />
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Hero;
