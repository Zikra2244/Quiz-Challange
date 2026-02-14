import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "../../app/providers/AuthProvider";
import { useQuiz } from "../../app/providers/QuizProvider";
import Button from "../ui/Button/Button";
import GradientText from "../ui/GradientText/GradientText";

import {
  FiHome,
  FiAward,
  FiClock,
  FiLogOut,
  FiUser,
  FiMenu,
  FiX,
  FiActivity,
  FiBarChart2,
  FiChevronDown,
  FiBookOpen,
  FiPlay,
  FiRefreshCw,
} from "react-icons/fi";

const Header = () => {
  const { user, logout } = useAuth();
  const { state, clearQuiz } = useQuiz();
  const navigate = useNavigate();
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [showQuizModal, setShowQuizModal] = useState(false);
  const [hasUnfinishedQuiz, setHasUnfinishedQuiz] = useState(false);

  useEffect(() => {
    try {
      if (state && !state.completed && state.questions?.length > 0) {
        setHasUnfinishedQuiz(true);
      } else {
        const savedState = localStorage.getItem("quiz_state");
        if (savedState) {
          const quizState = JSON.parse(savedState);
          if (
            quizState &&
            !quizState.completed &&
            quizState.questions?.length > 0
          ) {
            setHasUnfinishedQuiz(true);
          } else {
            setHasUnfinishedQuiz(false);
          }
        } else {
          setHasUnfinishedQuiz(false);
        }
      }
    } catch (error) {
      console.error("Error checking quiz state:", error);
      setHasUnfinishedQuiz(false);
    }
  }, [state, location.pathname]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsMenuOpen(false);
    setIsProfileOpen(false);
  }, [location.pathname]);

  const handleLogout = async () => {
    await logout();
    navigate("/");
  };

  const handleQuizClick = (e) => {
    e.preventDefault();
    setShowQuizModal(true);
  };

  const handleStartNewQuiz = () => {
    clearQuiz();
    localStorage.removeItem("quiz_state");
    setHasUnfinishedQuiz(false);
    setShowQuizModal(false);

    navigate("/quiz");
  };

  const handleResumeQuiz = () => {
    setShowQuizModal(false);
    navigate("/quiz");
  };

  const navItems = user
    ? [
        {
          name: "Dashboard",
          path: "/dashboard",
          icon: FiHome,
          exact: true,
        },
        {
          name: "Quiz",
          path: "/quiz",
          icon: FiBookOpen,
          onClick: handleQuizClick,
          badge: hasUnfinishedQuiz ? "1" : null,
        },
        {
          name: "History",
          path: "/history",
          icon: FiClock,
        },
        {
          name: "Achievements",
          path: "/achievements",
          icon: FiAward,
        },
        {
          name: "Leaderboard",
          path: "/leaderboard",
          icon: FiBarChart2,
        },
      ]
    : [];

  const isActivePath = (path) => {
    if (path === "/dashboard") {
      return location.pathname === path;
    }
    return location.pathname.startsWith(path);
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled
            ? "bg-[var(--color-surface)]/90 backdrop-blur-xl border-b border-[var(--color-border)] py-3"
            : "bg-transparent py-5"
        }`}
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            {/* Logo */}
            <Link
              to="/"
              className="flex items-center space-x-3 group"
              aria-label="QuizFlow Home"
            >
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="relative"
              >
                <div className="w-10 h-10 bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-secondary)] rounded-xl flex items-center justify-center shadow-lg shadow-[var(--color-primary)]/20 group-hover:shadow-[var(--color-primary)]/40 transition-all duration-300">
                  <span className="text-2xl font-bold text-white">Q</span>
                </div>
                <div className="absolute -inset-1 bg-gradient-to-r from-[var(--color-primary)]/50 to-[var(--color-secondary)]/50 rounded-xl blur-md group-hover:blur-lg transition-all duration-300 opacity-0 group-hover:opacity-100" />
              </motion.div>

              <div className="flex flex-col">
                <GradientText
                  gradient="primary"
                  className="text-xl font-display font-bold hidden sm:block"
                  animate
                >
                  QuizFlow
                </GradientText>
                <span className="text-[10px] text-[var(--color-textMuted)] hidden sm:block -mt-1">
                  Test Your Knowledge
                </span>
              </div>
            </Link>

            {user && (
              <nav className="hidden md:flex items-center space-x-1">
                {navItems.map((item) => {
                  const isActive = isActivePath(item.path);
                  return (
                    <div key={item.name} className="relative">
                      <Link
                        to={item.path}
                        onClick={item.onClick}
                        className={`
                          relative px-4 py-2.5 rounded-xl transition-all duration-300 
                          flex items-center space-x-2.5 group
                          ${
                            isActive
                              ? "text-[var(--color-text)] bg-[var(--color-glass)]"
                              : "text-[var(--color-textSecondary)] hover:text-[var(--color-text)] hover:bg-[var(--color-glass)]"
                          }
                        `}
                      >
                        <item.icon
                          className={`w-4.5 h-4.5 transition-transform duration-300 group-hover:scale-110 ${
                            isActive ? "text-[var(--color-primary)]" : ""
                          }`}
                        />
                        <span className="font-medium text-sm">{item.name}</span>

                        {isActive && (
                          <motion.div
                            layoutId="activeNav"
                            className="absolute inset-0 bg-gradient-to-r from-[var(--color-primary)]/20 to-[var(--color-secondary)]/20 rounded-xl"
                            transition={{ type: "spring", duration: 0.5 }}
                          />
                        )}
                      </Link>

                      {item.badge && (
                        <span className="absolute -top-2 -right-2 w-5 h-5 bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-secondary)] rounded-full flex items-center justify-center text-xs font-bold text-white shadow-lg shadow-[var(--color-primary)]/30">
                          {item.badge}
                        </span>
                      )}
                    </div>
                  );
                })}
              </nav>
            )}

            <div className="flex items-center space-x-3">
              {user ? (
                <>
                  <div className="hidden md:block relative">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setIsProfileOpen(!isProfileOpen)}
                      className="flex items-center space-x-3 px-4 py-2.5 bg-[var(--color-glass)] hover:bg-[var(--color-glass-hover)] rounded-xl transition-all duration-300 border border-[var(--color-border)] hover:border-[var(--color-border-hover)]"
                      aria-label="User menu"
                      aria-expanded={isProfileOpen}
                    >
                      <div className="relative">
                        <div className="w-8 h-8 bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-secondary)] rounded-lg flex items-center justify-center">
                          <span className="text-sm font-bold text-white">
                            {user.username?.charAt(0).toUpperCase()}
                          </span>
                        </div>
                        <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-500 rounded-full border-2 border-[var(--color-surface)]" />
                      </div>
                      <span className="text-[var(--color-text)] font-medium text-sm max-w-[100px] truncate">
                        {user.username}
                      </span>
                      <FiChevronDown
                        className={`w-4 h-4 text-[var(--color-textSecondary)] transition-transform duration-300 ${
                          isProfileOpen ? "rotate-180" : ""
                        }`}
                      />
                    </motion.button>

                    <AnimatePresence>
                      {isProfileOpen && (
                        <motion.div
                          initial={{ opacity: 0, y: -10, scale: 0.95 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: -10, scale: 0.95 }}
                          transition={{ duration: 0.2 }}
                          className="absolute right-0 mt-2 w-56 glass rounded-xl shadow-xl overflow-hidden border border-[var(--color-border)]"
                        >
                          <div className="p-2">
                            <div className="px-3 py-2 mb-1 bg-[var(--color-glass)] rounded-lg">
                              <p className="text-xs text-[var(--color-textSecondary)]">
                                Signed in as
                              </p>
                              <p className="text-sm font-medium text-[var(--color-text)] truncate">
                                {user.username}
                              </p>
                            </div>

                            <Link
                              to="/profile"
                              className="flex items-center space-x-3 px-3 py-2.5 text-[var(--color-textSecondary)] hover:text-[var(--color-text)] hover:bg-[var(--color-glass)] rounded-lg transition-colors"
                              onClick={() => setIsProfileOpen(false)}
                            >
                              <FiUser className="w-4 h-4" />
                              <span className="text-sm">Profile</span>
                            </Link>

                            <Link
                              to="/settings"
                              className="flex items-center space-x-3 px-3 py-2.5 text-[var(--color-textSecondary)] hover:text-[var(--color-text)] hover:bg-[var(--color-glass)] rounded-lg transition-colors"
                              onClick={() => setIsProfileOpen(false)}
                            >
                              <FiBarChart2 className="w-4 h-4" />
                              <span className="text-sm">Settings</span>
                            </Link>

                            <div className="h-px bg-[var(--color-border)] my-2" />

                            <button
                              onClick={() => {
                                setIsProfileOpen(false);
                                handleLogout();
                              }}
                              className="w-full flex items-center space-x-3 px-3 py-2.5 text-[var(--color-error)] hover:text-[var(--color-error)] hover:bg-[var(--color-error)]/10 rounded-lg transition-colors"
                            >
                              <FiLogOut className="w-4 h-4" />
                              <span className="text-sm">Logout</span>
                            </button>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                    className="md:hidden relative w-10 h-10 glass rounded-xl flex items-center justify-center hover:bg-[var(--color-glass-hover)] transition-all duration-300"
                    aria-label="Toggle menu"
                    aria-expanded={isMenuOpen}
                  >
                    <AnimatePresence mode="wait">
                      {isMenuOpen ? (
                        <motion.div
                          key="close"
                          initial={{ rotate: -90, opacity: 0 }}
                          animate={{ rotate: 0, opacity: 1 }}
                          exit={{ rotate: 90, opacity: 0 }}
                          transition={{ duration: 0.2 }}
                        >
                          <FiX className="w-5 h-5 text-[var(--color-text)]" />
                        </motion.div>
                      ) : (
                        <motion.div
                          key="menu"
                          initial={{ rotate: 90, opacity: 0 }}
                          animate={{ rotate: 0, opacity: 1 }}
                          exit={{ rotate: -90, opacity: 0 }}
                          transition={{ duration: 0.2 }}
                        >
                          <FiMenu className="w-5 h-5 text-[var(--color-text)]" />
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.button>
                </>
              ) : (
                <Link to="/login">
                  <Button
                    variant="primary"
                    size="sm"
                    className="shadow-lg shadow-[var(--color-primary)]/20"
                  >
                    Get Started
                  </Button>
                </Link>
              )}
            </div>
          </div>

          <AnimatePresence>
            {user && isMenuOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="md:hidden overflow-hidden"
              >
                <div className="py-4 mt-2 border-t border-[var(--color-border)]">
                  <nav className="flex flex-col space-y-1">
                    {navItems.map((item) => {
                      const isActive = isActivePath(item.path);
                      return (
                        <Link
                          key={item.name}
                          to={item.path}
                          onClick={(e) => {
                            if (item.onClick) {
                              e.preventDefault();
                              item.onClick(e);
                            }
                            setIsMenuOpen(false);
                          }}
                          className={`
                            flex items-center space-x-3 px-4 py-3 rounded-xl transition-all
                            ${
                              isActive
                                ? "bg-gradient-to-r from-[var(--color-primary)]/20 to-[var(--color-secondary)]/20 text-[var(--color-text)] border border-[var(--color-primary)]/30"
                                : "text-[var(--color-textSecondary)] hover:text-[var(--color-text)] hover:bg-[var(--color-glass)]"
                            }
                          `}
                        >
                          <item.icon
                            className={`w-5 h-5 ${isActive ? "text-[var(--color-primary)]" : ""}`}
                          />
                          <span className="font-medium">{item.name}</span>
                          {item.badge && (
                            <span className="ml-auto w-5 h-5 bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-secondary)] rounded-full flex items-center justify-center text-xs font-bold text-white">
                              {item.badge}
                            </span>
                          )}
                        </Link>
                      );
                    })}

                    <div className="mt-4 pt-4 border-t border-[var(--color-border)]">
                      <div className="flex items-center space-x-3 px-4 py-3 bg-[var(--color-glass)] rounded-xl">
                        <div className="relative">
                          <div className="w-10 h-10 bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-secondary)] rounded-lg flex items-center justify-center">
                            <span className="text-base font-bold text-white">
                              {user?.username?.charAt(0).toUpperCase()}
                            </span>
                          </div>
                          <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-500 rounded-full border-2 border-[var(--color-surface)]" />
                        </div>
                        <div className="flex-1">
                          <p className="text-[var(--color-text)] font-medium">
                            {user?.username}
                          </p>
                          <p className="text-xs text-[var(--color-textSecondary)]">
                            Logged in
                          </p>
                        </div>
                      </div>

                      <Link
                        to="/profile"
                        onClick={() => setIsMenuOpen(false)}
                        className="flex items-center space-x-3 px-4 py-3 text-[var(--color-textSecondary)] hover:text-[var(--color-text)] hover:bg-[var(--color-glass)] rounded-xl transition-colors"
                      >
                        <FiUser className="w-5 h-5" />
                        <span className="font-medium">Profile</span>
                      </Link>

                      <Link
                        to="/settings"
                        onClick={() => setIsMenuOpen(false)}
                        className="flex items-center space-x-3 px-4 py-3 text-[var(--color-textSecondary)] hover:text-[var(--color-text)] hover:bg-[var(--color-glass)] rounded-xl transition-colors"
                      >
                        <FiBarChart2 className="w-5 h-5" />
                        <span className="font-medium">Settings</span>
                      </Link>

                      <button
                        onClick={() => {
                          setIsMenuOpen(false);
                          handleLogout();
                        }}
                        className="w-full flex items-center space-x-3 px-4 py-3 text-[var(--color-error)] hover:text-[var(--color-error)] hover:bg-[var(--color-error)]/10 rounded-xl transition-colors"
                      >
                        <FiLogOut className="w-5 h-5" />
                        <span className="font-medium">Logout</span>
                      </button>
                    </div>
                  </nav>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </header>

      <div className="h-20" />

      <AnimatePresence>
        {showQuizModal && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
              onClick={() => setShowQuizModal(false)}
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="fixed inset-0 flex items-center justify-center z-50 p-4"
            >
              <div className="glass-card p-8 max-w-md w-full relative overflow-hidden">
                <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-[var(--color-primary)]/20 to-[var(--color-secondary)]/20 rounded-full blur-3xl" />
                <div className="absolute bottom-0 left-0 w-40 h-40 bg-gradient-to-tr from-blue-500/20 to-cyan-500/20 rounded-full blur-3xl" />

                <div className="relative z-10">
                  <div className="text-center mb-6">
                    <div className="w-20 h-20 mx-auto mb-4 rounded-2xl bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-secondary)] flex items-center justify-center shadow-xl shadow-[var(--color-primary)]/30">
                      {hasUnfinishedQuiz ? (
                        <FiRefreshCw className="w-10 h-10 text-white" />
                      ) : (
                        <FiBookOpen className="w-10 h-10 text-white" />
                      )}
                    </div>

                    <h3 className="text-2xl font-display font-bold text-[var(--color-text)] mb-2">
                      {hasUnfinishedQuiz
                        ? "Lanjutkan Quiz?"
                        : "Mulai Quiz Baru?"}
                    </h3>

                    <p className="text-[var(--color-textSecondary)] text-sm">
                      {hasUnfinishedQuiz
                        ? "Kamu memiliki quiz yang belum selesai. Pilih tindakan yang ingin dilakukan:"
                        : "Kamu akan memulai quiz baru dengan 5 soal pilihan ganda."}
                    </p>
                  </div>

                  {hasUnfinishedQuiz ? (
                    <div className="space-y-3">
                      <Button
                        variant="primary"
                        size="lg"
                        fullWidth
                        onClick={handleResumeQuiz}
                        className="flex items-center justify-center shadow-lg shadow-[var(--color-primary)]/30"
                      >
                        <FiRefreshCw className="mr-2" />
                        Lanjutkan Quiz
                      </Button>
                      <Button
                        variant="outline"
                        size="lg"
                        fullWidth
                        onClick={handleStartNewQuiz}
                        className="flex items-center justify-center"
                      >
                        <FiPlay className="mr-2" />
                        Mulai Baru
                      </Button>
                      <Button
                        variant="ghost"
                        size="lg"
                        fullWidth
                        onClick={() => setShowQuizModal(false)}
                      >
                        Batal
                      </Button>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      <Button
                        variant="primary"
                        size="lg"
                        fullWidth
                        onClick={handleStartNewQuiz}
                        className="flex items-center justify-center shadow-lg shadow-[var(--color-primary)]/30"
                      >
                        <FiPlay className="mr-2" />
                        Mulai Quiz
                      </Button>
                      <Button
                        variant="ghost"
                        size="lg"
                        fullWidth
                        onClick={() => setShowQuizModal(false)}
                      >
                        Batal
                      </Button>
                    </div>
                  )}

                  <div className="mt-6 p-4 glass rounded-xl">
                    <div className="flex items-start space-x-3">
                      <div className="w-8 h-8 rounded-lg bg-[var(--color-primary)]/20 flex items-center justify-center flex-shrink-0">
                        <FiBookOpen className="w-4 h-4 text-[var(--color-primary)]" />
                      </div>
                      <div>
                        <h4 className="text-sm font-medium text-[var(--color-text)] mb-1">
                          Informasi Quiz
                        </h4>
                        <ul className="text-xs text-[var(--color-textSecondary)] space-y-1">
                          <li className="flex items-center">
                            <span className="w-1 h-1 bg-[var(--color-primary)] rounded-full mr-2" />
                            5 soal pilihan ganda
                          </li>
                          <li className="flex items-center">
                            <span className="w-1 h-1 bg-[var(--color-primary)] rounded-full mr-2" />
                            Waktu pengerjaan 5 menit
                          </li>
                          <li className="flex items-center">
                            <span className="w-1 h-1 bg-[var(--color-primary)] rounded-full mr-2" />
                            Dapat melanjutkan quiz yang tertunda
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Header;
