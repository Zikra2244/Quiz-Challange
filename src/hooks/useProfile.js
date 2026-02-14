import { useState, useCallback, useEffect, useMemo } from "react";
import useLocalStorage from "./useLocalStorage";
import useAchievements from "./useAchievements";

const AVATARS = [
  { id: 1, icon: "👨‍🎓", name: "Student" },
  { id: 2, icon: "👩‍🔬", name: "Scientist" },
  { id: 3, icon: "🧑‍💻", name: "Developer" },
  { id: 4, icon: "👨‍🏫", name: "Teacher" },
  { id: 5, icon: "👩‍🎨", name: "Artist" },
  { id: 6, icon: "🧑‍🚀", name: "Astronaut" },
  { id: 7, icon: "👨‍⚕️", name: "Doctor" },
  { id: 8, icon: "👩‍⚖️", name: "Judge" },
  { id: 9, icon: "🧑‍🌾", name: "Farmer" },
  { id: 10, icon: "👨‍🍳", name: "Chef" },
  { id: 11, icon: "👩‍🎤", name: "Musician" },
  { id: 12, icon: "🧑‍🏭", name: "Engineer" },
];

const THEMES = [
  { id: "dark", name: "Dark Mode", icon: "🌙" },
  { id: "light", name: "Light Mode", icon: "☀️" },
  { id: "purple", name: "Purple Haze", icon: "💜" },
  { id: "blue", name: "Ocean Blue", icon: "🌊" },
  { id: "green", name: "Forest", icon: "🌳" },
];

const NOTIFICATION_SETTINGS = {
  achievements: true,
  leaderboard: true,
  weekly_report: true,
  quiz_reminders: false,
  sound_effects: true,
};

export const useProfile = () => {
  const [user] = useLocalStorage("quiz_user", null);
  const [profile, setProfile] = useLocalStorage("user_profile", {});
  const [settings, setSettings] = useLocalStorage("user_settings", {});
  const [isEditing, setIsEditing] = useState(false);

  const { stats, totalXP, currentStreak, longestStreak } = useAchievements();

  useEffect(() => {
    if (user && Object.keys(profile).length === 0) {
      const randomAvatar = AVATARS[Math.floor(Math.random() * AVATARS.length)];

      setProfile({
        username: user.username,
        displayName: user.username,
        avatar: randomAvatar,
        bio: "Quiz enthusiast",
        joinDate: new Date().toISOString(),
        location: "",
        website: "",
        social: {
          twitter: "",
          github: "",
          linkedin: "",
        },
        preferences: {
          emailNotifications: false,
          publicProfile: true,
          showAchievements: true,
        },
      });
    }
  }, [user, profile, setProfile]);

  useEffect(() => {
    if (Object.keys(settings).length === 0) {
      setSettings({
        theme: "dark",
        language: "id",
        notifications: NOTIFICATION_SETTINGS,
        accessibility: {
          reducedMotion: false,
          highContrast: false,
          fontSize: "medium",
        },
        privacy: {
          showOnlineStatus: true,
          allowFriendRequests: true,
          showLeaderboard: true,
        },
      });
    }
  }, [settings, setSettings]);

  const level = useMemo(() => {
    return Math.floor((totalXP || 0) / 400) + 1;
  }, [totalXP]);

  const nextLevelXP = useMemo(() => {
    return level * 400;
  }, [level]);

  const levelProgress = useMemo(() => {
    const currentLevelXP = (level - 1) * 400;
    const xpEarned = (totalXP || 0) - currentLevelXP;
    const xpNeeded = 400;
    return (xpEarned / xpNeeded) * 100;
  }, [level, totalXP]);

  const updateProfile = useCallback(
    (updates) => {
      setProfile((prev) => ({
        ...prev,
        ...updates,
      }));
    },
    [setProfile],
  );

  const updateSettings = useCallback(
    (updates) => {
      setSettings((prev) => ({
        ...prev,
        ...updates,
      }));
    },
    [setSettings],
  );

  const updateNotifications = useCallback(
    (updates) => {
      setSettings((prev) => ({
        ...prev,
        notifications: {
          ...prev.notifications,
          ...updates,
        },
      }));
    },
    [setSettings],
  );

  const updatePrivacy = useCallback(
    (updates) => {
      setSettings((prev) => ({
        ...prev,
        privacy: {
          ...prev.privacy,
          ...updates,
        },
      }));
    },
    [setSettings],
  );

  const updateAccessibility = useCallback(
    (updates) => {
      setSettings((prev) => ({
        ...prev,
        accessibility: {
          ...prev.accessibility,
          ...updates,
        },
      }));
    },
    [setSettings],
  );

  const changeAvatar = useCallback(
    (avatarId) => {
      const newAvatar = AVATARS.find((a) => a.id === avatarId);
      if (newAvatar) {
        setProfile((prev) => ({
          ...prev,
          avatar: newAvatar,
        }));
      }
    },
    [setProfile],
  );

  const changeTheme = useCallback(
    (themeId) => {
      setSettings((prev) => ({
        ...prev,
        theme: themeId,
      }));

      document.documentElement.setAttribute("data-theme", themeId);
    },
    [setSettings],
  );

  const exportProfile = useCallback(() => {
    const data = {
      profile,
      settings,
      stats,
      exportDate: new Date().toISOString(),
    };

    const dataStr = JSON.stringify(data, null, 2);
    const dataUri =
      "data:application/json;charset=utf-8," + encodeURIComponent(dataStr);

    const linkElement = document.createElement("a");
    linkElement.setAttribute("href", dataUri);
    linkElement.setAttribute(
      "download",
      `quizflow-profile-${user?.username}.json`,
    );
    linkElement.click();
  }, [profile, settings, stats, user]);

  const deleteAccount = useCallback(async () => {
    localStorage.removeItem("quiz_user");
    localStorage.removeItem("user_profile");
    localStorage.removeItem("user_settings");
    localStorage.removeItem("achievements");
    localStorage.removeItem("achievement_stats");
    localStorage.removeItem("quiz_history");
    localStorage.removeItem("quiz_state");

    window.location.href = "/";
  }, []);

  return {
    profile,
    settings,
    isEditing,
    setIsEditing,

    username: user?.username,
    level,
    totalXP,
    currentStreak,
    longestStreak,
    levelProgress,
    nextLevelXP,

    avatars: AVATARS,
    themes: THEMES,
    notificationDefaults: NOTIFICATION_SETTINGS,

    updateProfile,
    updateSettings,
    updateNotifications,
    updatePrivacy,
    updateAccessibility,
    changeAvatar,
    changeTheme,
    exportProfile,
    deleteAccount,

    isProfileComplete: profile?.bio && profile?.displayName,
    hasAvatar: !!profile?.avatar,
  };
};

export default useProfile;
