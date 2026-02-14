import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FiClock, FiFilter, FiRefreshCw, FiAward } from "react-icons/fi";
import Button from "../../../../components/ui/Button/Button";
import GradientText from "../../../../components/ui/GradientText/GradientText";

const EmptyState = ({ hasFilters, onClearFilters }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass-card p-12 text-center max-w-2xl mx-auto"
    >
      <div className="relative mb-8">
        <div className="w-24 h-24 mx-auto bg-gradient-to-r from-primary-500/20 to-purple-600/20 rounded-3xl flex items-center justify-center">
          <FiClock className="w-12 h-12 text-primary-400" />
        </div>
      </div>

      <h2 className="text-3xl font-display font-bold mb-4">
        {hasFilters ? (
          <GradientText gradient="primary" animate>
            Tidak Ada Hasil
          </GradientText>
        ) : (
          <GradientText gradient="primary" animate>
            Belum Ada Riwayat
          </GradientText>
        )}
      </h2>

      <p className="text-gray-400 mb-8 max-w-md mx-auto">
        {hasFilters ? (
          <>Tidak ditemukan kuis yang sesuai dengan filter yang kamu pilih.</>
        ) : (
          <>
            Kamu belum pernah mengerjakan kuis apapun.
            <br />
            Mulai perjalanan belajarmu sekarang juga!
          </>
        )}
      </p>

      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        {hasFilters ? (
          <Button
            variant="outline"
            size="lg"
            onClick={onClearFilters}
            className="flex items-center"
          >
            <FiRefreshCw className="mr-2" />
            Hapus Semua Filter
          </Button>
        ) : (
          <Link to="/quiz">
            <Button variant="primary" size="lg" className="flex items-center">
              Mulai Kuis Sekarang
            </Button>
          </Link>
        )}
      </div>
    </motion.div>
  );
};

export default EmptyState;
