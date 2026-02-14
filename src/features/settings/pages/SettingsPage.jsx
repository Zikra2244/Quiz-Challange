import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  FiSettings,
  FiMoon,
  FiBell,
  FiShield,
  FiEye,
  FiVolume2,
  FiGlobe,
  FiUser,
  FiLogOut,
} from "react-icons/fi";
import { useAuth } from "../../../app/providers/AuthProvider";
import useProfile from "../../../hooks/useProfile";
import useSound from "../../../hooks/useSound";
import GradientText from "../../../components/ui/GradientText/GradientText";
import Button from "../../../components/ui/Button/Button";
import ThemeSettings from "../components/ThemeSettings/ThemeSettings";
import NotificationSettings from "../components/NotificationSettings/NotificationSettings";
import PrivacySettings from "../components/PrivacySettings/PrivacySettings";
import DangerZone from "../components/DangerZone/DangerZone";

const SettingsPage = () => {
  const navigate = useNavigate();
  const { logout } = useAuth();
  const { settings, updateSettings, exportProfile } = useProfile();
  const { isMuted, toggleMute, setMasterVolume, masterVolume } = useSound();

  const [activeTab, setActiveTab] = useState("appearance");

  const handleLogout = async () => {
    await logout();
    navigate("/");
  };

  const tabs = [
    { id: "appearance", label: "Appearance", icon: <FiMoon /> },
    { id: "notifications", label: "Notifications", icon: <FiBell /> },
    { id: "privacy", label: "Privacy", icon: <FiShield /> },
    { id: "sound", label: "Sound", icon: <FiVolume2 /> },
    { id: "language", label: "Language", icon: <FiGlobe /> },
    { id: "account", label: "Account", icon: <FiUser /> },
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-[var(--color-background)] pt-8 pb-16"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-display font-bold mb-2">
            <GradientText gradient="primary" animate>
              Settings
            </GradientText>
          </h1>
          <p className="text-[var(--color-textSecondary)]">
            Kelola preferensi dan pengaturan akunmu
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <div className="lg:col-span-1">
            <div className="glass-card p-4 sticky top-24">
              <nav className="space-y-1">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`
                      w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-all
                      ${
                        activeTab === tab.id
                          ? "bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-secondary)] text-white"
                          : "text-[var(--color-textSecondary)] hover:text-[var(--color-text)] hover:bg-[var(--color-glass-hover)]"
                      }
                    `}
                  >
                    <span className="text-lg">{tab.icon}</span>
                    <span className="text-sm font-medium">{tab.label}</span>
                  </button>
                ))}
              </nav>

              <div className="mt-6 pt-6 border-t border-[var(--color-border)]">
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-[var(--color-error)] hover:text-[var(--color-error)] hover:bg-[var(--color-error)]/10 transition-all"
                >
                  <FiLogOut className="w-5 h-5" />
                  <span className="text-sm font-medium">Logout</span>
                </button>
              </div>
            </div>
          </div>

          <div className="lg:col-span-3">
            <div className="glass-card p-6">
              {activeTab === "appearance" && <ThemeSettings />}

              {activeTab === "notifications" && (
                <NotificationSettings
                  settings={settings?.notifications || {}}
                  onUpdate={(updates) =>
                    updateSettings({
                      notifications: { ...settings?.notifications, ...updates },
                    })
                  }
                />
              )}

              {activeTab === "privacy" && (
                <PrivacySettings
                  settings={settings?.privacy || {}}
                  onUpdate={(updates) =>
                    updateSettings({
                      privacy: { ...settings?.privacy, ...updates },
                    })
                  }
                />
              )}

              {activeTab === "sound" && (
                <div className="space-y-6">
                  <h2 className="text-2xl font-display font-bold text-[var(--color-text)] mb-4">
                    Sound Settings
                  </h2>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 glass rounded-lg">
                      <div>
                        <h3 className="text-[var(--color-text)] font-medium mb-1">
                          Sound Effects
                        </h3>
                        <p className="text-sm text-[var(--color-textSecondary)]">
                          Enable/disable sound effects
                        </p>
                      </div>
                      <button
                        onClick={toggleMute}
                        className={`
                          relative w-14 h-7 rounded-full transition-colors
                          ${isMuted ? "bg-gray-600" : "bg-[var(--color-primary)]"}
                        `}
                      >
                        <span
                          className={`
                          absolute top-1 left-1 w-5 h-5 rounded-full bg-white transition-transform
                          ${!isMuted && "transform translate-x-7"}
                        `}
                        />
                      </button>
                    </div>

                    <div className="p-4 glass rounded-lg">
                      <h3 className="text-[var(--color-text)] font-medium mb-2">
                        Master Volume
                      </h3>
                      <input
                        type="range"
                        min="0"
                        max="1"
                        step="0.01"
                        value={masterVolume}
                        onChange={(e) =>
                          setMasterVolume(parseFloat(e.target.value))
                        }
                        disabled={isMuted}
                        className="w-full h-2 bg-[var(--color-border)] rounded-lg appearance-none cursor-pointer"
                        style={{
                          accentColor: "var(--color-primary)",
                        }}
                      />
                      <div className="flex justify-between text-xs text-[var(--color-textSecondary)] mt-1">
                        <span>0%</span>
                        <span>{Math.round(masterVolume * 100)}%</span>
                        <span>100%</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === "language" && (
                <div className="space-y-6">
                  <h2 className="text-2xl font-display font-bold text-[var(--color-text)] mb-4">
                    Language Settings
                  </h2>
                  <div className="space-y-4">
                    <div className="p-4 glass rounded-lg">
                      <label className="block text-sm font-medium text-[var(--color-textSecondary)] mb-2">
                        Display Language
                      </label>
                      <select className="w-full px-4 py-3 glass rounded-lg text-[var(--color-text)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]">
                        <option value="id">Indonesia</option>
                        <option value="en">English</option>
                      </select>
                      <p className="text-xs text-[var(--color-textMuted)] mt-2">
                        Pilih bahasa yang akan digunakan di aplikasi
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === "account" && (
                <DangerZone
                  onDeleteAccount={() => console.log("Delete account")}
                  onLogout={handleLogout}
                  onExportData={exportProfile}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default SettingsPage;
