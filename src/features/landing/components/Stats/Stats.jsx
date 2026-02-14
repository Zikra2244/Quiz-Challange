import React, { useEffect } from "react";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { FiUsers, FiBookOpen, FiAward, FiClock } from "react-icons/fi";

const Stats = () => {
  const controls = useAnimation();
  const [ref, inView] = useInView({ threshold: 0.3, triggerOnce: true });

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [controls, inView]);

  const stats = [
    {
      icon: <FiUsers className="w-8 h-8" />,
      value: "15K+",
      label: "Active Users",
      color: "from-blue-500 to-cyan-500",
    },
    {
      icon: <FiBookOpen className="w-8 h-8" />,
      value: "50K+",
      label: "Questions",
      color: "from-green-500 to-emerald-500",
    },
    {
      icon: <FiAward className="w-8 h-8" />,
      value: "25K+",
      label: "Quizzes Taken",
      color: "from-purple-500 to-pink-500",
    },
    {
      icon: <FiClock className="w-8 h-8" />,
      value: "1M+",
      label: "Minutes Learned",
      color: "from-orange-500 to-red-500",
    },
  ];

  return (
    <section
      ref={ref}
      className="relative py-20 bg-gradient-to-b from-dark-300 to-dark-400 overflow-hidden"
      aria-label="Statistics"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              variants={{
                hidden: { opacity: 0, y: 30 },
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: {
                    delay: index * 0.2,
                    duration: 0.6,
                    type: "spring",
                  },
                },
              }}
              initial="hidden"
              animate={controls}
              className="relative group"
            >
              <div className="glass-card p-8 text-center hover:scale-105 transition-all duration-300">
                <div className="relative w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-primary-500 to-purple-600 p-0.5 group-hover:rotate-6 transition-transform duration-300">
                  <div className="w-full h-full bg-dark-300 rounded-2xl flex items-center justify-center text-white">
                    {stat.icon}
                  </div>
                </div>

                <div className="text-4xl md:text-5xl font-display font-bold text-white mb-2">
                  {stat.value}
                </div>
                <h3 className="text-lg font-semibold text-white mb-1">
                  {stat.label}
                </h3>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Stats;
