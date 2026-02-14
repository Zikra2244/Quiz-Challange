import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  FiUser,
  FiSettings,
  FiAward,
  FiBarChart2,
  FiEdit2,
  FiLogOut,
  FiDownload,
} from "react-icons/fi";
import { useAuth } from "../../../app/providers/AuthProvider";
import useProfile from "../../../hooks/useProfile";
import useAchievements from "../../../hooks/useAchievements";
import GradientText from "../../../components/ui/GradientText/GradientText";
import Button from "../../../components/ui/Button/Button";
import ProfileHeader from "../components/ProfileHeader/ProfileHeader";
import ProfileStats from "../components/ProfileStats/ProfileStats";
import ProfileAchievements from "../components/ProfileAchievements/ProfileAchievements";
import EditProfileModal from "../components/EditProfileModal/EditProfileModal";
import LevelProgress from "../components/LevelProgress/LevelProgress";

const ProfilePage = () => {
  const navigate = useNavigate();
  const { logout } = useAuth();
  const { profile, settings, updateProfile, exportProfile } = useProfile();

  const {
    unlockedAchievements,
    stats: achievementStats,
    totalXP,
    totalUnlocked,
    totalAchievements,
    currentStreak,
    longestStreak,
    completionPercentage,
  } = useAchievements();

  const [isEditing, setIsEditing] = useState(false);
  const [userStats, setUserStats] = useState({
    totalQuizzes: 0,
    averageScore: 0,
    totalCorrect: 0,
    totalQuestions: 0,
    perfectScores: 0,
    level: 1,
    nextLevelXP: 100,
    levelProgress: 0,
  });

  useEffect(() => {
    try {
      const history = JSON.parse(localStorage.getItem("quiz_history") || "[]");

      const totalQuizzes = history.length;
      const totalCorrect = history.reduce(
        (acc, curr) => acc + (curr.correct || 0),
        0,
      );
      const totalQuestions = history.reduce(
        (acc, curr) => acc + (curr.total || 0),
        0,
      );
      const averageScore =
        totalQuizzes > 0
          ? Math.round(
              history.reduce((acc, curr) => acc + (curr.score || 0), 0) /
                totalQuizzes,
            )
          : 0;
      const perfectScores = history.filter((q) => q.score === 100).length;

      const level = Math.floor(totalXP / 100) + 1;
      const nextLevelXP = level * 100;
      const levelProgress = ((totalXP - (level - 1) * 100) / 100) * 100;

      setUserStats({
        totalQuizzes,
        averageScore,
        totalCorrect,
        totalQuestions,
        perfectScores,
        level,
        nextLevelXP,
        levelProgress,
      });

      console.log("📊 Profile stats:", { totalXP, level, totalQuizzes });
    } catch (error) {
      console.error("Failed to load quiz stats:", error);
    }
  }, [totalXP]);

  const handleLogout = async () => {
    await logout();
    navigate("/");
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-[var(--color-background)] pt-8 pb-16"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl md:text-4xl font-display font-bold">
              <GradientText gradient="primary" animate>
                My Profile
              </GradientText>
            </h1>
            <p className="text-[var(--color-textSecondary)] mt-2">
              Kelola profil dan lihat progress belajarmu
            </p>
          </div>

          <div className="flex items-center space-x-3">
            <Button variant="outline" size="sm" onClick={exportProfile}>
              <FiDownload className="mr-2" />
              Export Data
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={handleLogout}
              className="border-red-500/50 text-red-400 hover:bg-red-500/10"
            >
              <FiLogOut className="mr-2" />
              Logout
            </Button>
          </div>
        </div>

        <ProfileHeader
          profile={profile}
          level={userStats.level}
          totalXP={totalXP}
          currentStreak={currentStreak}
          longestStreak={longestStreak}
          onEdit={() => setIsEditing(true)}
        />

        <LevelProgress
          level={userStats.level}
          currentXP={totalXP}
          nextLevelXP={userStats.nextLevelXP}
          progress={userStats.levelProgress}
        />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-8">
          <div className="lg:col-span-2 space-y-6">
            <ProfileStats stats={userStats} />
          </div>

          <div className="space-y-6">
            <ProfileAchievements
              achievements={unlockedAchievements.slice(0, 5)}
              totalUnlocked={totalUnlocked}
              totalAchievements={totalAchievements}
            />
          </div>
        </div>

        <EditProfileModal
          isOpen={isEditing}
          onClose={() => setIsEditing(false)}
          profile={profile}
          onSave={updateProfile}
        />
      </div>
    </motion.div>
  );
};

export default ProfilePage;
