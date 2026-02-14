import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiClock,
  FiFilter,
  FiSearch,
  FiGrid,
  FiList,
  FiChevronLeft,
  FiChevronRight,
  FiActivity,
  FiTrash2,
  FiBarChart2,
  FiAward,
  FiStar,
  FiCalendar,
  FiTrendingUp,
} from "react-icons/fi";
import { useAuth } from "../../../app/providers/AuthProvider";
import Button from "../../../components/ui/Button/Button";
import GradientText from "../../../components/ui/GradientText/GradientText";
import HistoryCard from "../components/HistoryCard/HistoryCard";
import HistoryStats from "../components/HistoryStats/HistoryStats";
import HistoryFilters from "../components/HistoryFilters/HistoryFilters";
import EmptyState from "../components/EmptyState/EmptyState";
import DeleteConfirmation from "../components/DeleteConfirmation/DeleteConfirmation";

const HistoryPage = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  const [history, setHistory] = useState([]);
  const [filteredHistory, setFilteredHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState({
    dateRange: "all",
    scoreRange: "all",
    difficulty: "all",
    category: "all",
  });
  const [sortBy, setSortBy] = useState("newest");
  const [viewMode, setViewMode] = useState("grid");

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9;

  const [selectedItems, setSelectedItems] = useState([]);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const [stats, setStats] = useState({
    totalQuizzes: 0,
    averageScore: 0,
    totalCorrect: 0,
    totalQuestions: 0,
    bestScore: 0,
    worstScore: 100,
    streak: 0,
    categoriesCount: {},
  });

  useEffect(() => {
    loadHistory();
  }, []);

  const loadHistory = () => {
    setLoading(true);
    try {
      let data = JSON.parse(localStorage.getItem("quiz_history") || "[]");

      console.log(" Raw history data:", data.length, "items");

      data = data.filter(
        (item) =>
          item &&
          item.id &&
          item.questions &&
          item.questions.length > 0 &&
          item.userAnswers &&
          item.userAnswers.length > 0,
      );

      const uniqueData = data.filter(
        (item, index, self) =>
          index ===
          self.findIndex(
            (t) =>
              t.timestamp === item.timestamp &&
              t.score === item.score &&
              t.category === item.category,
          ),
      );

      if (uniqueData.length !== data.length) {
        console.log(` Menghapus ${data.length - uniqueData.length} duplikat`);
        localStorage.setItem("quiz_history", JSON.stringify(uniqueData));
        data = uniqueData;
      }

      data.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));

      setHistory(data);
      setFilteredHistory(data);

      calculateStats(data);

      console.log(" History loaded:", data.length, "items");
    } catch (error) {
      console.error(" Failed to load history:", error);
      setHistory([]);
      setFilteredHistory([]);
    } finally {
      setLoading(false);
    }
  };

  const calculateStats = (data) => {
    const totalQuizzes = data.length;

    if (totalQuizzes === 0) {
      setStats({
        totalQuizzes: 0,
        averageScore: 0,
        totalCorrect: 0,
        totalQuestions: 0,
        bestScore: 0,
        worstScore: 100,
        streak: 0,
        categoriesCount: {},
      });
      return;
    }

    const totalScore = data.reduce((acc, curr) => acc + (curr.score || 0), 0);
    const averageScore = Math.round(totalScore / totalQuizzes);

    const totalCorrect = data.reduce(
      (acc, curr) => acc + (curr.correct || 0),
      0,
    );
    const totalQuestions = data.reduce(
      (acc, curr) => acc + (curr.total || 0),
      0,
    );

    const scores = data.map((item) => item.score || 0);
    const bestScore = Math.max(...scores);
    const worstScore = Math.min(...scores);

    let streak = 0;
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const sortedByDate = [...data].sort(
      (a, b) => new Date(b.timestamp) - new Date(a.timestamp),
    );

    let currentDate = today;
    for (let i = 0; i < sortedByDate.length; i++) {
      const quizDate = new Date(sortedByDate[i].timestamp);
      quizDate.setHours(0, 0, 0, 0);

      const diffDays = Math.floor(
        (currentDate - quizDate) / (1000 * 60 * 60 * 24),
      );

      if (diffDays === 0) {
        streak++;
        currentDate.setDate(currentDate.getDate() - 1);
      } else if (diffDays === 1) {
        streak++;
        currentDate.setDate(currentDate.getDate() - 1);
      } else {
        break;
      }
    }

    const categoriesCount = {};
    data.forEach((item) => {
      const cat = item.category || "General";
      categoriesCount[cat] = (categoriesCount[cat] || 0) + 1;
    });

    setStats({
      totalQuizzes,
      averageScore,
      totalCorrect,
      totalQuestions,
      bestScore,
      worstScore,
      streak,
      categoriesCount,
    });
  };

  useEffect(() => {
    let result = [...history];

    if (searchTerm) {
      result = result.filter(
        (item) =>
          item.category?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.difficulty?.toLowerCase().includes(searchTerm.toLowerCase()),
      );
    }

    if (filters.scoreRange !== "all") {
      switch (filters.scoreRange) {
        case "high":
          result = result.filter((item) => item.score >= 80);
          break;
        case "medium":
          result = result.filter((item) => item.score >= 60 && item.score < 80);
          break;
        case "low":
          result = result.filter((item) => item.score < 60);
          break;
      }
    }

    if (filters.difficulty !== "all") {
      result = result.filter((item) => item.difficulty === filters.difficulty);
    }

    if (filters.category !== "all") {
      result = result.filter((item) => item.category === filters.category);
    }

    result.sort((a, b) => {
      switch (sortBy) {
        case "newest":
          return new Date(b.timestamp) - new Date(a.timestamp);
        case "oldest":
          return new Date(a.timestamp) - new Date(b.timestamp);
        case "highest":
          return b.score - a.score;
        case "lowest":
          return a.score - b.score;
        case "fastest":
          return (a.timeSpent || 0) - (b.timeSpent || 0);
        default:
          return 0;
      }
    });

    setFilteredHistory(result);
    setCurrentPage(1);
  }, [history, searchTerm, filters, sortBy]);

  const paginatedHistory = filteredHistory.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );

  const totalPages = Math.ceil(filteredHistory.length / itemsPerPage);

  const handleDeleteSelected = () => {
    try {
      const newHistory = history.filter(
        (item) => !selectedItems.includes(item.id),
      );
      localStorage.setItem("quiz_history", JSON.stringify(newHistory));
      setHistory(newHistory);
      calculateStats(newHistory);
      setSelectedItems([]);
      console.log(" Deleted selected items:", selectedItems.length);
    } catch (error) {
      console.error("Failed to delete selected items:", error);
    } finally {
      setShowDeleteConfirm(false);
    }
  };

  const handleDeleteAll = () => {
    try {
      localStorage.removeItem("quiz_history");
      setHistory([]);
      setSelectedItems([]);
      calculateStats([]);
      console.log(" Deleted all history");
    } catch (error) {
      console.error("Failed to delete all history:", error);
    } finally {
      setShowDeleteConfirm(false);
    }
  };

  const handleCardClick = (item) => {
    navigate(`/result/${item.id}`);
  };

  const handleSelectItem = (id) => {
    setSelectedItems((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id],
    );
  };

  const uniqueCategories = [
    ...new Set(history.map((item) => item.category).filter(Boolean)),
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-[var(--color-background)] flex items-center justify-center">
        <div className="text-center">
          <div className="relative">
            <div className="w-20 h-20 border-4 border-[var(--color-primary)]/30 border-t-[var(--color-primary)] rounded-full animate-spin mx-auto mb-4" />
            <div className="absolute inset-0 flex items-center justify-center">
              <FiActivity className="w-8 h-8 text-[var(--color-primary)] animate-pulse" />
            </div>
          </div>
          <p className="text-[var(--color-textSecondary)] animate-pulse">
            Memuat riwayat kuis...
          </p>
        </div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-[var(--color-background)] pt-8 pb-16"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center space-x-3 mb-2"
            >
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-secondary)] p-2.5">
                <FiClock className="w-full h-full text-white" />
              </div>
              <div>
                <h1 className="text-3xl md:text-4xl font-display font-bold">
                  <GradientText gradient="primary" animate>
                    Riwayat Kuis
                  </GradientText>
                </h1>
                <p className="text-[var(--color-textSecondary)]">
                  Lihat kembali perjalanan belajarmu
                </p>
              </div>
            </motion.div>
          </div>

          {history.length > 0 && (
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowDeleteConfirm(true)}
              className="border-red-500/50 text-red-400 hover:bg-red-500/10 mt-4 md:mt-0"
            >
              <FiTrash2 className="mr-2" />
              Hapus Riwayat
            </Button>
          )}
        </div>

        {history.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mb-8"
          >
            <HistoryStats stats={stats} />
          </motion.div>
        )}

        {history.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mb-6"
          >
            <HistoryFilters
              searchTerm={searchTerm}
              onSearchChange={setSearchTerm}
              filters={filters}
              onFilterChange={setFilters}
              sortBy={sortBy}
              onSortChange={setSortBy}
              viewMode={viewMode}
              onViewModeChange={setViewMode}
              categories={uniqueCategories}
              totalResults={filteredHistory.length}
              selectedCount={selectedItems.length}
              onDeleteSelected={() => setShowDeleteConfirm(true)}
            />
          </motion.div>
        )}

        <AnimatePresence mode="wait">
          {filteredHistory.length > 0 ? (
            <motion.div
              key={viewMode}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="mt-6"
            >
              <div
                className={`grid gap-6 ${
                  viewMode === "grid"
                    ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
                    : "grid-cols-1"
                }`}
              >
                {paginatedHistory.map((item, index) => (
                  <HistoryCard
                    key={item.id}
                    item={item}
                    index={index}
                    viewMode={viewMode}
                    isSelected={selectedItems.includes(item.id)}
                    onSelect={handleSelectItem}
                    onClick={() => handleCardClick(item)}
                  />
                ))}
              </div>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="mt-12"
            >
              <EmptyState
                hasFilters={
                  searchTerm !== "" ||
                  Object.values(filters).some((v) => v !== "all")
                }
                onClearFilters={() => {
                  setSearchTerm("");
                  setFilters({
                    dateRange: "all",
                    scoreRange: "all",
                    difficulty: "all",
                    category: "all",
                  });
                  setSortBy("newest");
                }}
              />
            </motion.div>
          )}
        </AnimatePresence>

        {filteredHistory.length > 0 && totalPages > 1 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="flex justify-center items-center space-x-2 mt-12"
          >
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
              disabled={currentPage === 1}
            >
              <FiChevronLeft className="w-4 h-4" />
            </Button>

            <div className="flex items-center space-x-2">
              {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                let pageNum;
                if (totalPages <= 5) {
                  pageNum = i + 1;
                } else if (currentPage <= 3) {
                  pageNum = i + 1;
                } else if (currentPage >= totalPages - 2) {
                  pageNum = totalPages - 4 + i;
                } else {
                  pageNum = currentPage - 2 + i;
                }

                return (
                  <button
                    key={i}
                    onClick={() => setCurrentPage(pageNum)}
                    className={`
                      w-10 h-10 rounded-lg font-medium transition-all
                      ${
                        currentPage === pageNum
                          ? "bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-secondary)] text-white"
                          : "glass text-[var(--color-textSecondary)] hover:text-[var(--color-text)] hover:bg-[var(--color-glass-hover)]"
                      }
                    `}
                  >
                    {pageNum}
                  </button>
                );
              })}
            </div>

            <Button
              variant="outline"
              size="sm"
              onClick={() =>
                setCurrentPage((prev) => Math.min(totalPages, prev + 1))
              }
              disabled={currentPage === totalPages}
            >
              <FiChevronRight className="w-4 h-4" />
            </Button>
          </motion.div>
        )}

        {filteredHistory.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-center mt-4"
          >
            <p className="text-sm text-[var(--color-textMuted)]">
              Menampilkan {paginatedHistory.length} dari{" "}
              {filteredHistory.length} hasil
              {filteredHistory.length !== history.length && (
                <span> (difilter dari {history.length} total)</span>
              )}
            </p>
          </motion.div>
        )}

        <DeleteConfirmation
          isOpen={showDeleteConfirm}
          onClose={() => setShowDeleteConfirm(false)}
          onConfirm={
            selectedItems.length > 0 ? handleDeleteSelected : handleDeleteAll
          }
          count={selectedItems.length || history.length}
          isSelective={selectedItems.length > 0}
        />
      </div>
    </motion.div>
  );
};

export default HistoryPage;
