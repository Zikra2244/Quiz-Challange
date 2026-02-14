import apiClient from "./apiClient";
import { decodeHtml, shuffleArray } from "../utils/helpers";
import { POINTS_PER_DIFFICULTY, QUIZ_CATEGORIES } from "../utils/constants";

class QuizService {
  /**
   * @param {Object} config
   * @returns {Promise<Array>}
   */
  async fetchQuestions(config = {}) {
    try {
      const {
        amount = 5,
        category = 9,
        difficulty = "easy",
        type = "multiple",
      } = config;

      const response = await apiClient.get("/api.php", {
        params: {
          amount,
          category,
          difficulty,
          type,
          encode: "base64",
        },
      });

      if (response.data.response_code === 1) {
        throw new Error("Tidak cukup soal untuk parameter yang dipilih");
      }

      if (response.data.response_code === 2) {
        throw new Error("Parameter invalid");
      }

      if (response.data.response_code !== 0) {
        throw new Error("Gagal mengambil soal. Silakan coba lagi.");
      }

      return this.formatQuestions(response.data.results, category);
    } catch (error) {
      console.error("Quiz service error:", error);
      throw error;
    }
  }

  /**
   * @param {Array} results
   * @param {number} categoryId
   * @returns {Array}
   */
  formatQuestions(results, categoryId) {
    return results.map((q, index) => {
      const question = atob(q.question);
      const correctAnswer = atob(q.correct_answer);
      const incorrectAnswers = q.incorrect_answers.map((ans) => atob(ans));

      const allAnswers = shuffleArray([correctAnswer, ...incorrectAnswers]);

      return {
        id: index,
        question,
        correct_answer: correctAnswer,
        incorrect_answers: incorrectAnswers,
        all_answers: allAnswers,
        category: QUIZ_CATEGORIES[categoryId] || "General Knowledge",
        category_id: categoryId,
        difficulty: q.difficulty,
        type: q.type,
        points: POINTS_PER_DIFFICULTY[q.difficulty] || 10,
        user_answer: null,
        is_correct: null,
        time_taken: null,
      };
    });
  }

  /**
   * @returns {Promise<Array>}
   */
  async fetchCategories() {
    try {
      const response = await apiClient.get("/api_category.php");
      return response.data.trivia_categories;
    } catch (error) {
      console.error("Failed to fetch categories:", error);
      throw new Error("Gagal memuat kategori");
    }
  }

  /**
   * @returns {Promise<Object>}
   */
  async fetchGlobalCount() {
    try {
      const response = await apiClient.get("/api_count_global.php");
      return response.data;
    } catch (error) {
      console.error("Failed to fetch global count:", error);
      return null;
    }
  }

  /**
   * @param {number} categoryId
   * @returns {Promise<Object>}
   */
  async fetchCategoryCount(categoryId) {
    try {
      const response = await apiClient.get("/api_count.php", {
        params: { category: categoryId },
      });
      return response.data.category_question_count;
    } catch (error) {
      console.error("Failed to fetch category count:", error);
      return null;
    }
  }

  /**
   * @returns {Promise<string>}
   */
  async fetchToken() {
    try {
      const response = await apiClient.get("/api_token.php", {
        params: { command: "request" },
      });
      return response.data.token;
    } catch (error) {
      console.error("Failed to fetch token:", error);
      return null;
    }
  }

  /**
   * @param {string} token
   * @returns {Promise<boolean>}
   */
  async resetToken(token) {
    try {
      const response = await apiClient.get("/api_token.php", {
        params: {
          command: "reset",
          token,
        },
      });
      return response.data.response_code === 0;
    } catch (error) {
      console.error("Failed to reset token:", error);
      return false;
    }
  }
}

export default new QuizService();
