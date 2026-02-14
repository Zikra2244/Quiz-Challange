import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useAuth } from "../../../app/providers/AuthProvider";
import { useQuiz } from "../../../app/providers/QuizProvider";
import WelcomeHeader from "../components/WelcomeHeader/WelcomeHeader";
import StatsOverview from "../components/StatsOverview/StatsOverview";
import RecentQuizzes from "../components/RecentQuizzes/RecentQuizzes";
import RecommendedQuizzes from "../components/RecommendedQuizzes/RecommendedQuizzes";
import ActivityChart from "../components/ActivityChart/ActivityChart";
import QuickActions from "../components/QuickActions/QuickActions";
import LoadingSpinner from "../../../components/ui/LoadingSpinner/LoadingSpinner";

const DashboardPage = () => {
  const { user } = useAuth();
  const { stats: quizStats } = useQuiz();
  const [isLoading, setIsLoading] = useState(true);
  const [dashboardData, setDashboardData] = useState(null);

  useEffect(() => {
    const fetchDashboardData = async () => {
      setIsLoading(true);
      try {
        await new Promise((resolve) => setTimeout(resolve, 500));

        // Hitung statistik dari history
        const history = JSON.parse(
          localStorage.getItem("quiz_history") || "[]",
        );

        const totalQuizzes = history.length;
        const averageScore =
          history.length > 0
            ? Math.round(
                history.reduce((acc, curr) => acc + (curr.score || 0), 0) /
                  history.length,
              )
            : 0;
        const totalCorrect = history.reduce(
          (acc, curr) => acc + (curr.correct || 0),
          0,
        );
        const totalQuestions = history.reduce(
          (acc, curr) => acc + (curr.total || 0),
          0,
        );
        const accuracy =
          totalQuestions > 0
            ? Math.round((totalCorrect / totalQuestions) * 100)
            : 0;

        let streak = 0;
        if (history.length > 0) {
          const today = new Date();
          today.setHours(0, 0, 0, 0);

          const sortedHistory = [...history].sort(
            (a, b) => new Date(b.timestamp) - new Date(a.timestamp),
          );

          let currentDate = today;
          for (let i = 0; i < sortedHistory.length; i++) {
            const quizDate = new Date(sortedHistory[i].timestamp);
            quizDate.setHours(0, 0, 0, 0);

            if (quizDate.getTime() === currentDate.getTime()) {
              streak++;
              currentDate.setDate(currentDate.getDate() - 1);
            } else {
              break;
            }
          }
        }

        setDashboardData({
          totalQuizzes,
          averageScore,
          studyTime: 0,
          achievements: 0,
          streak,
          rank: streak >= 7 ? "Gold" : streak >= 3 ? "Silver" : "Bronze",
          recommendedQuizzes: [
            {
              id: 1,
              category: "Science: Computers",
              difficulty: "medium",
              questions: 10,
              participants: 1234,
              rating: 4.8,
            },
            {
              id: 2,
              category: "History",
              difficulty: "easy",
              questions: 10,
              participants: 2341,
              rating: 4.9,
            },
            {
              id: 3,
              category: "Geography",
              difficulty: "hard",
              questions: 10,
              participants: 987,
              rating: 4.7,
            },
          ],
          activityData: [
            { date: "Mon", quizzes: 2, score: 75 },
            { date: "Tue", quizzes: 1, score: 80 },
            { date: "Wed", quizzes: 3, score: 85 },
            { date: "Thu", quizzes: 2, score: 70 },
            { date: "Fri", quizzes: 4, score: 90 },
            { date: "Sat", quizzes: 2, score: 95 },
            { date: "Sun", quizzes: 1, score: 100 },
          ],
        });
      } catch (error) {
        console.error("Failed to fetch dashboard data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  if (isLoading) {
    return <LoadingSpinner fullScreen text="Memuat dashboard..." />;
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-dark-400 pt-8 pb-16"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <WelcomeHeader user={user} stats={dashboardData} />
        <StatsOverview stats={dashboardData} />
        <QuickActions />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8">
          <div className="lg:col-span-2 space-y-8">
            <ActivityChart />
            <RecentQuizzes />
          </div>
          <div className="space-y-8">
            <RecommendedQuizzes quizzes={dashboardData?.recommendedQuizzes} />
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default DashboardPage;
