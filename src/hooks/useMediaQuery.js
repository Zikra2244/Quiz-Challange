import { useState, useEffect } from "react";
import axios from "axios";

const useFetchQuestions = (
  amount = 5,
  category = 9,
  difficulty = "easy",
  type = "multiple",
) => {
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();

    const fetchQuestions = async () => {
      try {
        setLoading(true);
        setError(null);

        console.log("Fetching questions...");

        const response = await axios.get("https://opentdb.com/api.php", {
          params: {
            amount,
            category,
            difficulty,
            type,
            encode: "base64",
          },
          timeout: 10000,
          signal: controller.signal,
        });

        console.log("API Response:", response.data);

        if (!isMounted) return;

        if (response.data.response_code !== 0) {
          throw new Error(`API Error: ${response.data.response_code}`);
        }

        const decodedQuestions = response.data.results.map((q, index) => ({
          id: index,
          question: atob(q.question),
          correct_answer: atob(q.correct_answer),
          incorrect_answers: q.incorrect_answers.map((ans) => atob(ans)),
          all_answers: shuffleArray([
            atob(q.correct_answer),
            ...q.incorrect_answers.map((ans) => atob(ans)),
          ]),
          user_answer: null,
          is_correct: null,
        }));

        setQuestions(decodedQuestions);
        setError(null);
      } catch (err) {
        console.error("Fetch error:", err);

        if (!isMounted) return;

        if (err.code === "ERR_CANCELED") {
          console.log("Request canceled");
          return;
        }

        if (err.response?.status === 429) {
          setError("Terlalu banyak permintaan. Silakan tunggu 5 detik...");
          setTimeout(() => {
            if (isMounted) fetchQuestions();
          }, 5000);
        } else {
          setError("Gagal mengambil soal. Silakan coba lagi.");
        }
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchQuestions();

    return () => {
      isMounted = false;
      controller.abort();
    };
  }, [amount, category, difficulty, type]);

  const shuffleArray = (array) => {
    return [...array].sort(() => Math.random() - 0.5);
  };

  return { questions, loading, error };
};

export default useFetchQuestions;
