import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiShare2,
  FiTwitter,
  FiFacebook,
  FiLink,
  FiCheckCircle,
  FiX,
} from "react-icons/fi";
import Button from "../../../../components/ui/Button/Button";

const ShareResult = ({ result }) => {
  const [copied, setCopied] = useState(false);
  const [showOptions, setShowOptions] = useState(false);

  const shareText = `Aku mendapatkan skor ${result?.score || 0}% di QuizFlow! ${result?.correct || 0}/${result?.total || 0} jawaban benar. Coba tantang dirimu juga! 🎯`;

  const shareUrls = {
    twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}`,
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}&quote=${encodeURIComponent(shareText)}`,
  };

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error("Failed to copy:", error);
    }
  };

  return (
    <div className="glass-card p-6">
      <h2 className="text-xl font-semibold text-white mb-4 flex items-center">
        <FiShare2 className="mr-2 text-primary-400" />
        Bagikan Hasil
      </h2>

      <Button
        variant="primary"
        size="lg"
        fullWidth
        onClick={() => setShowOptions(!showOptions)}
        className="mb-4"
      >
        <FiShare2 className="mr-2" />
        Bagikan ke Teman
      </Button>

      <AnimatePresence>
        {showOptions && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="space-y-3 overflow-hidden"
          >
            <div className="grid grid-cols-2 gap-2">
              <a
                href={shareUrls.twitter}
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col items-center p-3 glass rounded-lg hover:bg-white/5 transition-colors"
              >
                <FiTwitter className="w-5 h-5 text-blue-400 mb-1" />
                <span className="text-xs text-gray-400">Twitter</span>
              </a>

              <a
                href={shareUrls.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col items-center p-3 glass rounded-lg hover:bg-white/5 transition-colors"
              >
                <FiFacebook className="w-5 h-5 text-blue-600 mb-1" />
                <span className="text-xs text-gray-400">Facebook</span>
              </a>
            </div>

            <button
              onClick={handleCopyLink}
              className="w-full flex items-center justify-between p-3 glass rounded-lg hover:bg-white/5 transition-colors"
            >
              <div className="flex items-center">
                <FiLink className="w-4 h-4 text-gray-400 mr-2" />
                <span className="text-sm text-gray-300">Salin Link</span>
              </div>
              {copied && (
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-xs text-green-400 flex items-center"
                >
                  <FiCheckCircle className="w-3 h-3 mr-1" />
                  Tersalin!
                </motion.span>
              )}
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ShareResult;
