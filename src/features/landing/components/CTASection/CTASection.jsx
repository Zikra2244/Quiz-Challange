import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import Button from "../../../../components/ui/Button/Button";
import GradientText from "../../../../components/ui/GradientText/GradientText";

const CTASection = () => {
  return (
    <section className="py-24 bg-gradient-to-b from-[var(--color-background)] to-[var(--color-surface)]">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="glass-card p-12 text-center max-w-3xl mx-auto"
        >
          <span className="text-5xl mb-4 block">✨</span>
          
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
            <span className="text-[var(--color-text)]">
              Siap memulai petualangan baru?
            </span>
          </h2>
          
          <p className="text-lg text-[var(--color-textSecondary)] mb-8 max-w-lg mx-auto">
            Ribuan soal dan berbagai kategori sudah menunggumu. 
            Tidak perlu daftar, langsung bisa mencoba!
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/login">
              <Button variant="primary" size="lg" className="group">
                Mulai Sekarang
                <span className="ml-2 group-hover:translate-x-1 transition-transform">→</span>
              </Button>
            </Link>
            
            <Link to="/quiz">
              <Button variant="outline" size="lg">
                Coba Contoh Quiz
              </Button>
            </Link>
          </div>
          
          <p className="text-xs text-[var(--color-textMuted)] mt-6">
            ✨ Gratis selamanya • Tanpa perlu email • Langsung main
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default CTASection;
