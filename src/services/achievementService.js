import { getStorageItem, setStorageItem } from "../utils/storage";
import { STORAGE_KEYS } from "../utils/constants";

class AchievementService {
  /**
   * @returns {Object}
   */
  getAchievements() {
    return getStorageItem(STORAGE_KEYS.ACHIEVEMENTS, {});
  }

  /**
   * @returns {Object}
   */
  getStats() {
    return getStorageItem(STORAGE_KEYS.ACHIEVEMENT_STATS, {
      totalQuizzes: 0,
      totalXP: 0,
      currentStreak: 0,
      longestStreak: 0,
      highScores: 0,
      perfectScores: 0,
      categoriesCompleted: {},
      fastestQuiz: Infinity,
      averageAccuracy: 0,
      shares: 0,
      lastQuizDate: null,
    });
  }

  /**
   * @param {Object} updates
   * @returns {Object}
   */
  updateStats(updates) {
    const currentStats = this.getStats();
    const newStats = { ...currentStats, ...updates };
    setStorageItem(STORAGE_KEYS.ACHIEVEMENT_STATS, newStats);
    return newStats;
  }

  /**
   * @param {string} achievementId
   * @param {Object} achievementData
   * @returns {Object}
   */
  unlockAchievement(achievementId, achievementData) {
    const achievements = this.getAchievements();

    achievements[achievementId] = {
      unlocked: true,
      unlockedAt: new Date().toISOString(),
      achievement: achievementData,
    };

    setStorageItem(STORAGE_KEYS.ACHIEVEMENTS, achievements);

    const stats = this.getStats();
    stats.totalXP = (stats.totalXP || 0) + (achievementData.xp || 0);
    this.updateStats(stats);

    return achievements;
  }

  /**
   * @param {string} achievementId
   * @returns {boolean}
   */
  isUnlocked(achievementId) {
    const achievements = this.getAchievements();
    return !!achievements[achievementId]?.unlocked;
  }

  /**
   * @param {number} limit
   * @returns {Array}
   */
  getRecentUnlocks(limit = 5) {
    const achievements = this.getAchievements();

    return Object.entries(achievements)
      .filter(([_, data]) => data.unlocked)
      .map(([id, data]) => ({
        id,
        ...data.achievement,
        unlockedAt: data.unlockedAt,
      }))
      .sort((a, b) => new Date(b.unlockedAt) - new Date(a.unlockedAt))
      .slice(0, limit);
  }

  resetAchievements() {
    setStorageItem(STORAGE_KEYS.ACHIEVEMENTS, {});
    setStorageItem(STORAGE_KEYS.ACHIEVEMENT_STATS, {
      totalQuizzes: 0,
      totalXP: 0,
      currentStreak: 0,
      longestStreak: 0,
      highScores: 0,
      perfectScores: 0,
      categoriesCompleted: {},
      fastestQuiz: Infinity,
      averageAccuracy: 0,
      shares: 0,
      lastQuizDate: null,
    });
  }
}

export default new AchievementService();
