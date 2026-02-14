import apiClient from "../../../services/apiClient";

const shuffleArray = (array) => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

const decodeHtml = (html) => {
  if (!html) return "";
  const txt = document.createElement("textarea");
  txt.innerHTML = html;
  return txt.value;
};

export const quizService = {
  async fetchQuestions(config = {}) {
    try {
      const {
        amount = 5,
        category = 9,
        difficulty = "easy",
        type = "multiple"
      } = config;

      const response = await apiClient.get("/api.php", {
        params: {
          amount,
          category,
          difficulty,
          type,
          encode: "base64"
        }
      });

      if (response.data.response_code !== 0) {
        throw new Error("Gagal mengambil soal");
      }

      return response.data.results.map((q, index) => {
        const question = atob(q.question);
        const correctAnswer = atob(q.correct_answer);
        const incorrectAnswers = q.incorrect_answers.map(ans => atob(ans));

        return {
          id: index,
          question,
          correct_answer: correctAnswer,
          incorrect_answers: incorrectAnswers,
          all_answers: shuffleArray([correctAnswer, ...incorrectAnswers]),
          category: "General Knowledge",
          difficulty: q.difficulty || difficulty,
          points: difficulty === "easy" ? 10 : difficulty === "medium" ? 20 : 30,
          user_answer: null,
          is_correct: null
        };
      });
    } catch (error) {
      console.error("Quiz service error:", error);
      throw new Error("Gagal memuat soal. Silakan coba lagi.");
    }
  }
};

export default quizService;
