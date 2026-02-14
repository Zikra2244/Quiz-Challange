import React, { useEffect } from "react";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import {
  FiZap,
  FiClock,
  FiBarChart2,
  FiAward,
  FiUsers,
  FiShield,
} from "react-icons/fi";
import GradientText from "../../../../components/ui/GradientText/GradientText";
import Card from "../../../../components/ui/Card/Card";

const Features = () => {
  const controls = useAnimation();
  const [ref, inView] = useInView({ threshold: 0.2, triggerOnce: true });

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [controls, inView]);

  const features = [
    {
      icon: <FiZap className="w-7 h-7" />,
      title: "Langsung Tahu Hasilnya",
      description:
        "Setelah menjawab, langsung tahu benar atau salah. Cocok buat belajar cepat.",
      color: "from-yellow-400 to-orange-500",
    },
    {
      icon: <FiClock className="w-7 h-7" />,
      title: "Ada Pengatur Waktu",
      description:
        "Biar makin seru, setiap soal punya batas waktu. Bisa disesuaikan kok.",
      color: "from-green-400 to-emerald-500",
    },
    {
      icon: <FiBarChart2 className="w-7 h-7" />,
      title: "Lihat Perkembanganmu",
      description:
        "Dari grafik dan statistik, lihat sejauh mana kemampuanmu meningkat.",
      color: "from-blue-400 to-indigo-500",
    },
    {
      icon: <FiAward className="w-7 h-7" />,
      title: "Dapatkan Penghargaan",
      description:
        "Setiap pencapaian dapat badge khusus. Koleksi sebanyak-banyaknya!",
      color: "from-purple-400 to-pink-500",
    },
    {
      icon: <FiUsers className="w-7 h-7" />,
      title: "Bisa Bertanding",
      description:
        "Ajak teman atau tantang pemain lain. Lihat siapa yang paling jago.",
      color: "from-red-400 to-pink-500",
    },
    {
      icon: <FiShield className="w-7 h-7" />,
      title: "Lanjutkan Kapan Saja",
      description:
        "Quiz belum selesai? Tenang, progress-mu akan tersimpan otomatis.",
      color: "from-indigo-400 to-purple-500",
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
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
        damping: 15,
        stiffness: 100,
      },
    },
  };

  return (
    <section
      ref={ref}
      className="relative py-24 bg-gradient-to-b from-[var(--color-background)] to-[var(--color-surface)] overflow-hidden"
    >
      <div className="relative container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-2 glass rounded-full text-sm font-medium text-[var(--color-primary)] mb-4">
            ✨ Kenapa QuizFlow?
          </span>

          <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
            <span className="text-[var(--color-text)]">
              Dibuat buat kamu yang
            </span>
            <br />
            <GradientText gradient="primary" animate>
              suka tantangan
            </GradientText>
          </h2>

          <p className="text-lg text-[var(--color-textSecondary)] max-w-2xl mx-auto">
            Bukan sekadar quiz biasa. Ada beberapa hal yang bikin belajar jadi
            lebih seru di sini.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={controls}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{ y: -8 }}
              className="group"
            >
              <Card
                variant="gradient"
                padding="lg"
                hoverable
                className="h-full"
              >
                <div
                  className={`relative w-14 h-14 rounded-xl bg-gradient-to-r ${feature.color} p-3 mb-5 group-hover:scale-110 transition-transform`}
                >
                  <div className="w-full h-full text-white">{feature.icon}</div>
                </div>

                <h3 className="text-xl font-semibold text-[var(--color-text)] mb-3">
                  {feature.title}
                </h3>

                <p className="text-[var(--color-textSecondary)] text-sm leading-relaxed">
                  {feature.description}
                </p>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Features;
