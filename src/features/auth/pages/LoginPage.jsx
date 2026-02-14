import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useAuth } from "../../../app/providers/AuthProvider";
import LoginForm from "../components/LoginForm/LoginForm";
import GradientText from "../../../components/ui/GradientText/GradientText";

const LoginPage = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      navigate("/dashboard", { replace: true });
    }
  }, [user, navigate]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-dark-400 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8"
    >
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary-500/30 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-500/30 rounded-full blur-3xl" />
      </div>

      <div className="relative w-full max-w-md">
        <div className="text-center mb-8">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", duration: 0.6 }}
            className="inline-block"
          >
            <div className="w-20 h-20 bg-gradient-to-r from-primary-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-2xl">
              <span className="text-4xl font-bold text-white">Q</span>
            </div>
          </motion.div>

          <GradientText
            gradient="primary"
            animate
            className="text-3xl font-display font-bold"
          >
            QuizFlow
          </GradientText>

          <h2 className="mt-6 text-2xl font-display font-bold text-white">
            Welcome Back!
          </h2>
          <p className="mt-2 text-sm text-gray-400">
            Masuk untuk melanjutkan perjalanan belajarmu
          </p>
        </div>
        <LoginForm />
      </div>
    </motion.div>
  );
};

export default LoginPage;
