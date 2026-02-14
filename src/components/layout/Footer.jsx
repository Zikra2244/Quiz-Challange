import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  FiGithub,
  FiTwitter,
  FiLinkedin,
  FiMail,
  FiHeart,
  FiGlobe,
  FiShield,
  FiHelpCircle,
  FiFileText,
} from "react-icons/fi";
import GradientText from "../ui/GradientText/GradientText";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    product: [
      { name: "Features", href: "/features" },
      { name: "Quiz", href: "/quiz" },
      { name: "Leaderboard", href: "/leaderboard" },
      { name: "Achievements", href: "/achievements" },
    ],
    resources: [
      { name: "Documentation", href: "/docs", icon: FiFileText },
      { name: "Help Center", href: "/help", icon: FiHelpCircle },
      { name: "Privacy", href: "/privacy", icon: FiShield },
      { name: "Terms", href: "/terms", icon: FiFileText },
    ],
    company: [
      { name: "Profile", href: "/profile" },
      { name: "Settings", href: "/settings" },
      { name: "About", href: "/about" },
      { name: "Blog", href: "/blog" },
      { name: "Careers", href: "/careers" },
      { name: "Contact", href: "/contact" },
    ],
  };

  const socialLinks = [
    { icon: FiGithub, href: "https://github.com", label: "GitHub" },
    { icon: FiTwitter, href: "https://twitter.com", label: "Twitter" },
    { icon: FiLinkedin, href: "https://linkedin.com", label: "LinkedIn" },
    { icon: FiMail, href: "mailto:hello@quizflow.com", label: "Email" },
  ];

  return (
    <footer className="bg-dark-300 border-t border-white/10">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="py-12 md:py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-12">
            <div className="lg:col-span-2">
              <Link to="/" className="flex items-center space-x-2 mb-4 group">
                <motion.div
                  whileHover={{ scale: 1.05, rotate: 5 }}
                  className="w-10 h-10 bg-gradient-to-r from-primary-500 to-purple-600 rounded-xl flex items-center justify-center"
                >
                  <span className="text-2xl font-bold text-white">Q</span>
                </motion.div>
                <GradientText
                  gradient="primary"
                  className="text-2xl font-display font-bold"
                >
                  QuizFlow
                </GradientText>
              </Link>

              <p className="text-gray-400 mb-6 max-w-md leading-relaxed">
                Platform kuis interaktif modern dengan teknologi terkini. Uji
                pengetahuanmu dan tingkatkan skillmu bersama ribuan pengguna
                lainnya.
              </p>

              <div className="flex space-x-4">
                {socialLinks.map((social) => (
                  <motion.a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ y: -4, scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-10 h-10 glass rounded-lg flex items-center justify-center text-gray-400 hover:text-primary-400 hover:bg-white/10 transition-all"
                    aria-label={social.label}
                  >
                    <social.icon className="w-5 h-5" />
                  </motion.a>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-white font-semibold mb-4 flex items-center">
                <FiGlobe className="w-4 h-4 mr-2 text-primary-400" />
                Product
              </h3>
              <ul className="space-y-3">
                {footerLinks.product.map((link) => (
                  <li key={link.name}>
                    <Link
                      to={link.href}
                      className="text-gray-400 hover:text-primary-400 transition-colors text-sm"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-white font-semibold mb-4 flex items-center">
                <FiFileText className="w-4 h-4 mr-2 text-primary-400" />
                Resources
              </h3>
              <ul className="space-y-3">
                {footerLinks.resources.map((link) => (
                  <li key={link.name}>
                    <Link
                      to={link.href}
                      className="text-gray-400 hover:text-primary-400 transition-colors text-sm flex items-center"
                    >
                      <link.icon className="w-3 h-3 mr-2" />
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-white font-semibold mb-4">Company</h3>
              <ul className="space-y-3">
                {footerLinks.company.map((link) => (
                  <li key={link.name}>
                    <Link
                      to={link.href}
                      className="text-gray-400 hover:text-primary-400 transition-colors text-sm"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="py-6 border-t border-white/10 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm order-2 md:order-1 mt-4 md:mt-0">
            © {currentYear} QuizFlow. All rights reserved.
          </p>

          <div className="flex items-center space-x-6 order-1 md:order-2">
            <Link
              to="/privacy"
              className="text-xs text-gray-400 hover:text-primary-400 transition-colors"
            >
              Privacy Policy
            </Link>
            <Link
              to="/terms"
              className="text-xs text-gray-400 hover:text-primary-400 transition-colors"
            >
              Terms of Service
            </Link>
            <Link
              to="/cookies"
              className="text-xs text-gray-400 hover:text-primary-400 transition-colors"
            >
              Cookie Policy
            </Link>
          </div>

          <p className="text-gray-400 text-sm flex items-center order-3 mt-4 md:mt-0">
            Made with{" "}
            <FiHeart className="w-4 h-4 text-red-500 mx-1 animate-pulse" /> by{" "}
            <a
              href="https://github.com/yourusername"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary-400 hover:text-primary-300 transition-colors"
            >
              Your Name
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default React.memo(Footer);
