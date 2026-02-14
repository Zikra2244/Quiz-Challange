import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiSearch,
  FiFilter,
  FiGrid,
  FiList,
  FiChevronDown,
  FiX,
  FiTrash2,
} from "react-icons/fi";
import Button from "../../../../components/ui/Button/Button";
const HistoryFilters = ({
  searchTerm,
  onSearchChange,
  filters,
  onFilterChange,
  sortBy,
  onSortChange,
  viewMode,
  onViewModeChange,
  totalResults,
  selectedCount,
  onDeleteSelected,
}) => {
  const [showFilters, setShowFilters] = useState(false);

  const scoreRangeOptions = [
    { value: "all", label: "Semua Skor" },
    { value: "high", label: "Tinggi (≥80%)" },
    { value: "medium", label: "Sedang (60-79%)" },
    { value: "low", label: "Rendah (<60%)" },
  ];

  const difficultyOptions = [
    { value: "all", label: "Semua Level" },
    { value: "easy", label: "Mudah" },
    { value: "medium", label: "Sedang" },
    { value: "hard", label: "Sulit" },
  ];

  const sortOptions = [
    { value: "newest", label: "Terbaru" },
    { value: "oldest", label: "Terlama" },
    { value: "highest", label: "Skor Tertinggi" },
    { value: "lowest", label: "Skor Terendah" },
  ];

  const hasActiveFilters = () => {
    return (
      searchTerm !== "" ||
      filters.scoreRange !== "all" ||
      filters.difficulty !== "all"
    );
  };

  const clearFilters = () => {
    onSearchChange("");
    onFilterChange({
      dateRange: "all",
      scoreRange: "all",
      difficulty: "all",
      category: "all",
    });
    onSortChange("newest");
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1 relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <FiSearch className="h-5 w-5 text-gray-500" />
          </div>
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Cari berdasarkan kategori..."
            className="block w-full pl-10 pr-12 py-3 glass rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary-500 transition-all"
          />
          {searchTerm && (
            <button
              onClick={() => onSearchChange("")}
              className="absolute inset-y-0 right-0 pr-3 flex items-center"
            >
              <FiX className="h-5 w-5 text-gray-500 hover:text-white transition-colors" />
            </button>
          )}
        </div>

        <div className="flex items-center space-x-2">
          <div className="flex glass rounded-xl p-1">
            <button
              onClick={() => onViewModeChange("grid")}
              className={`p-2 rounded-lg transition-all ${
                viewMode === "grid"
                  ? "bg-primary-500 text-white"
                  : "text-gray-400 hover:text-white"
              }`}
            >
              <FiGrid className="w-5 h-5" />
            </button>
            <button
              onClick={() => onViewModeChange("list")}
              className={`p-2 rounded-lg transition-all ${
                viewMode === "list"
                  ? "bg-primary-500 text-white"
                  : "text-gray-400 hover:text-white"
              }`}
            >
              <FiList className="w-5 h-5" />
            </button>
          </div>

          <button
            onClick={() => setShowFilters(!showFilters)}
            className={`relative px-4 py-2 glass rounded-xl hover:bg-white/5 transition-all flex items-center space-x-2 ${
              showFilters || hasActiveFilters()
                ? "text-primary-400"
                : "text-gray-400"
            }`}
          >
            <FiFilter className="w-5 h-5" />
            <span className="hidden sm:inline">Filter</span>
          </button>

          {selectedCount > 0 && (
            <Button
              variant="outline"
              size="sm"
              onClick={onDeleteSelected}
              className="border-red-500/50 text-red-400 hover:bg-red-500/10"
            >
              <FiTrash2 className="mr-2" />
              Hapus ({selectedCount})
            </Button>
          )}
        </div>
      </div>

      <AnimatePresence>
        {showFilters && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden"
          >
            <div className="glass-card p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold text-white">
                  Filter & Sort
                </h3>

                {hasActiveFilters() && (
                  <button
                    onClick={clearFilters}
                    className="text-sm text-primary-400 hover:text-primary-300 flex items-center"
                  >
                    <FiX className="mr-1" />
                    Hapus Semua Filter
                  </button>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs text-gray-400 mb-2">
                    Rentang Skor
                  </label>
                  <select
                    value={filters.scoreRange}
                    onChange={(e) =>
                      onFilterChange({ ...filters, scoreRange: e.target.value })
                    }
                    className="w-full px-4 py-2 glass rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
                  >
                    {scoreRangeOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs text-gray-400 mb-2">
                    Level Kesulitan
                  </label>
                  <select
                    value={filters.difficulty}
                    onChange={(e) =>
                      onFilterChange({ ...filters, difficulty: e.target.value })
                    }
                    className="w-full px-4 py-2 glass rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
                  >
                    {difficultyOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs text-gray-400 mb-2">
                    Urutkan
                  </label>
                  <select
                    value={sortBy}
                    onChange={(e) => onSortChange(e.target.value)}
                    className="w-full px-4 py-2 glass rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
                  >
                    {sortOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="mt-4 pt-4 border-t border-white/10">
                <span className="text-sm text-gray-400">
                  Menampilkan{" "}
                  <span className="text-white font-medium">{totalResults}</span>{" "}
                  hasil
                </span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default HistoryFilters;
