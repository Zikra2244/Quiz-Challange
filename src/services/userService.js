import {
  getStorageItem,
  setStorageItem,
  removeStorageItem,
} from "../utils/storage";
import { STORAGE_KEYS } from "../utils/constants";
import { validateUsername } from "../utils/validators";

class UserService {
  /**
   * @returns {Object|null}
   */
  getCurrentUser() {
    return getStorageItem(STORAGE_KEYS.USER);
  }

  /**
   * @param {string} username
   * @returns {Object}
   */
  login(username) {
    const validation = validateUsername(username);
    if (!validation.isValid) {
      throw new Error(validation.error);
    }

    const sanitizedUsername = username.trim().replace(/[<>]/g, "");

    const userData = {
      username: sanitizedUsername,
      loginTime: new Date().toISOString(),
      sessionId:
        crypto.randomUUID?.() || Math.random().toString(36).substring(7),
    };

    setStorageItem(STORAGE_KEYS.USER, userData);

    return userData;
  }
  logout() {
    removeStorageItem(STORAGE_KEYS.USER);
    removeStorageItem(STORAGE_KEYS.QUIZ_STATE);
  }

  /**
   * @returns {Object}
   */
  getProfile() {
    return getStorageItem(STORAGE_KEYS.USER_PROFILE, {});
  }

  /**
   * @param {Object} profileData
   * @returns {Object}
   */
  updateProfile(profileData) {
    const currentProfile = this.getProfile();
    const newProfile = { ...currentProfile, ...profileData };
    setStorageItem(STORAGE_KEYS.USER_PROFILE, newProfile);
    return newProfile;
  }

  /**
   * @returns {Object}
   */
  getSettings() {
    return getStorageItem(STORAGE_KEYS.USER_SETTINGS, {
      theme: "dark",
      language: "id",
      notifications: {
        achievements: true,
        leaderboard: true,
        weekly_report: true,
        quiz_reminders: false,
        sound_effects: true,
      },
    });
  }

  /**
   * @param {Object} settingsData
   * @returns {Object}
   */
  updateSettings(settingsData) {
    const currentSettings = this.getSettings();
    const newSettings = { ...currentSettings, ...settingsData };
    setStorageItem(STORAGE_KEYS.USER_SETTINGS, newSettings);
    return newSettings;
  }

  /**
   * @returns {boolean}
   */
  isAuthenticated() {
    return !!this.getCurrentUser();
  }
}

export default new UserService();
