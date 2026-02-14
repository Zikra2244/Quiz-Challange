import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useAuth } from "../../../app/providers/AuthProvider";
import Hero from "/src/features/landing/components/Hero/Hero.jsx";
import Features from "/src/features/landing/components/Features/Features.jsx";
import HowItWorks from "/src/features/landing/components/HowItWorks/HowItWorks.jsx";
import Stats from "/src/features/landing/components/Stats/Stats.jsx";
import CTASection from "/src/features/landing/components/CTASection/CTASection.jsx";

const LandingPage = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      navigate("/dashboard", { replace: true });
    }
  }, [user, navigate]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="bg-dark-400"
    >
      <Hero />
      <Stats />
      <Features />
      <HowItWorks />
      <CTASection />
    </motion.div>
  );
};

export default LandingPage;
