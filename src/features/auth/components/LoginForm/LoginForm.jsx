import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useAuth } from "../../../../app/providers/AuthProvider";
import Button from "../../../../components/ui/Button/Button";
import { FiUser, FiArrowRight, FiAlertCircle } from "react-icons/fi";

const LoginForm = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  
  const [username, setUsername] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const validateUsername = (value) => {
    if (!value || value.trim().length < 3) {
      return "Username minimal 3 karakter";
    }
    if (value.trim().length > 20) {
      return "Username maksimal 20 karakter";
    }
    if (!/^[a-zA-Z0-9_]+$/.test(value.trim())) {
      return "Username hanya boleh huruf, angka, dan underscore";
    }
    return "";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const validationError = validateUsername(username);
    if (validationError) {
      setError(validationError);
      return;
    }

    setIsLoading(true);
    setError("");

    try {
      await new Promise((resolve) => setTimeout(resolve, 800));
      login(username.trim());
      navigate("/dashboard");
    } catch (err) {
      setError("Login gagal. Silakan coba lagi.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
      className="glass-card p-8"
    >
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label 
            htmlFor="username" 
            className="block text-sm font-medium text-gray-300 mb-2"
          >
            Username
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FiUser className="h-5 w-5 text-gray-500" />
            </div>
            <input
              id="username"
              type="text"
              value={username}
              onChange={(e) => {
                setUsername(e.target.value);
                setError("");
              }}
              className="block w-full pl-10 pr-3 py-3 bg-dark-300 border rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-300 border-white/10"
              placeholder="Masukkan username"
              autoComplete="off"
              autoFocus
              disabled={isLoading}
            />
          </div>
          {error && (
            <motion.p
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-2 text-sm text-red-400 flex items-center"
            >
              <FiAlertCircle className="w-4 h-4 mr-1" />
              {error}
            </motion.p>
          )}
        </div>

        <Button
          type="submit"
          variant="primary"
          size="lg"
          fullWidth
          loading={isLoading}
          disabled={isLoading}
        >
          {isLoading ? "Memproses..." : "Mulai Quiz"}
          {!isLoading && <FiArrowRight className="ml-2" />}
        </Button>

        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-white/10"></div>
          </div>
          <div className="relative flex justify-center text-xs">
            <span className="px-2 bg-dark-300 text-gray-500">atau</span>
          </div>
        </div>

        <div className="text-center">
          <p className="text-sm text-gray-400">
            Login dengan username apa saja untuk mencoba demo
          </p>
          <button
            type="button"
            onClick={() => setUsername(`user_${Math.floor(Math.random() * 1000)}`)}
            className="mt-2 text-xs text-primary-400 hover:text-primary-300 transition-colors"
          >
            Generate random username
          </button>
        </div>
      </form>

      <div className="mt-6 p-4 bg-primary-500/10 rounded-lg border border-primary-500/20">
        <h4 className="text-sm font-medium text-primary-400 mb-2">
          ?? Fitur Login:
        </h4>
        <ul className="text-xs text-gray-400 space-y-1">
          <li className="flex items-center">
            <span className="w-1 h-1 bg-primary-400 rounded-full mr-2" />
            Minimal 3 karakter
          </li>
          <li className="flex items-center">
            <span className="w-1 h-1 bg-primary-400 rounded-full mr-2" />
            Hanya huruf, angka, underscore
          </li>
          <li className="flex items-center">
            <span className="w-1 h-1 bg-primary-400 rounded-full mr-2" />
            Session aktif 30 menit
          </li>
        </ul>
      </div>
    </motion.div>
  );
};

export default LoginForm;
