import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiAlertTriangle, FiTrash2, FiX } from "react-icons/fi";
import Button from "../../../../components/ui/Button/Button";

const DeleteConfirmation = ({
  isOpen,
  onClose,
  onConfirm,
  count,
  isSelective,
}) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
            onClick={onClose}
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="fixed inset-0 flex items-center justify-center z-50 p-4"
          >
            <div className="glass-card p-8 max-w-md w-full">
              <div className="flex justify-between items-start mb-6">
                <div className="w-12 h-12 rounded-full bg-red-500/20 flex items-center justify-center">
                  <FiAlertTriangle className="w-6 h-6 text-red-400" />
                </div>
                <button
                  onClick={onClose}
                  className="p-2 glass rounded-lg hover:bg-white/5 transition-colors"
                >
                  <FiX className="w-5 h-5 text-gray-400" />
                </button>
              </div>

              <h3 className="text-2xl font-display font-bold text-white mb-2">
                Hapus {isSelective ? "Data Terpilih" : "Semua Riwayat"}?
              </h3>

              <p className="text-gray-400 mb-6">
                {isSelective ? (
                  <>
                    Kamu akan menghapus{" "}
                    <span className="text-white font-medium">{count}</span> data
                    riwayat kuis.
                  </>
                ) : (
                  <>
                    Kamu akan menghapus seluruh{" "}
                    <span className="text-white font-medium">{count}</span>{" "}
                    riwayat kuis.
                  </>
                )}
              </p>

              <div className="glass p-4 rounded-lg mb-6">
                <p className="text-sm text-yellow-400">
                  <span className="font-bold">Perhatian:</span> Data yang sudah
                  dihapus tidak dapat dipulihkan kembali.
                </p>
              </div>

              <div className="flex space-x-3">
                <Button variant="outline" size="lg" fullWidth onClick={onClose}>
                  Batal
                </Button>
                <Button
                  variant="primary"
                  size="lg"
                  fullWidth
                  onClick={onConfirm}
                  className="bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600"
                >
                  <FiTrash2 className="mr-2" />
                  Hapus
                </Button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default DeleteConfirmation;
