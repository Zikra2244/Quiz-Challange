import React, { lazy, Suspense } from "react";
import { createBrowserRouter, Navigate } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
import Layout from "../../components/layout/Layout";

const PageLoader = () => (
  <div className="min-h-screen bg-dark-400 flex items-center justify-center">
    <div className="text-center">
      <div className="relative">
        <div className="w-20 h-20 border-4 border-primary-500/30 border-t-primary-500 rounded-full animate-spin mx-auto mb-4" />
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-2xl text-primary-400 animate-pulse">Q</span>
        </div>
      </div>
      <p className="text-gray-400 animate-pulse">Memuat halaman...</p>
    </div>
  </div>
);

const LandingPage = lazy(
  () => import("../../features/landing/pages/LandingPage"),
);
const LoginPage = lazy(() => import("../../features/auth/pages/LoginPage"));

const DashboardPage = lazy(
  () => import("../../features/dashboard/pages/DashboardPage"),
);
const QuizPage = lazy(() => import("../../features/quiz/pages/QuizPage"));
const ResultPage = lazy(() => import("../../features/result/pages/ResultPage"));
const ResultDetailPage = lazy(
  () => import("../../features/result/pages/ResultDetailPage"),
);
const HistoryPage = lazy(
  () => import("../../features/history/pages/HistoryPage"),
);

const ProfilePage = lazy(
  () => import("../../features/profile/pages/ProfilePage"),
);

const AchievementsPage = lazy(
  () => import("../../features/achievements/pages/AchievementsPage"),
);

const LeaderboardPage = lazy(
  () => import("../../features/leaderboard/pages/LeaderboardPage"),
);
const SettingsPage = lazy(
  () => import("../../features/settings/pages/SettingsPage"),
);

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: (
          <Suspense fallback={<PageLoader />}>
            <LandingPage />
          </Suspense>
        ),
      },
      {
        path: "login",
        element: (
          <Suspense fallback={<PageLoader />}>
            <LoginPage />
          </Suspense>
        ),
      },
    ],
  },

  {
    element: (
      <ProtectedRoute>
        <Layout />
      </ProtectedRoute>
    ),
    children: [
      {
        path: "dashboard",
        element: (
          <Suspense fallback={<PageLoader />}>
            <DashboardPage />
          </Suspense>
        ),
      },

      {
        path: "quiz",
        element: (
          <Suspense fallback={<PageLoader />}>
            <QuizPage />
          </Suspense>
        ),
      },

      {
        path: "result",
        children: [
          {
            index: true,
            element: (
              <Suspense fallback={<PageLoader />}>
                <ResultPage />
              </Suspense>
            ),
          },
          {
            path: ":id",
            element: (
              <Suspense fallback={<PageLoader />}>
                <ResultDetailPage />
              </Suspense>
            ),
          },
        ],
      },

      {
        path: "history",
        element: (
          <Suspense fallback={<PageLoader />}>
            <HistoryPage />
          </Suspense>
        ),
      },

      {
        path: "profile",
        element: (
          <Suspense fallback={<PageLoader />}>
            <ProfilePage />
          </Suspense>
        ),
      },

      {
        path: "achievements",
        element: (
          <Suspense fallback={<PageLoader />}>
            <AchievementsPage />
          </Suspense>
        ),
      },

      {
        path: "leaderboard",
        element: (
          <Suspense fallback={<PageLoader />}>
            <LeaderboardPage />
          </Suspense>
        ),
      },

      {
        path: "settings",
        element: (
          <Suspense fallback={<PageLoader />}>
            <SettingsPage />
          </Suspense>
        ),
      },

      {
        path: "statistics",
        element: <Navigate to="/dashboard" replace />,
      },
      {
        path: "learn",
        element: (
          <div className="min-h-screen bg-dark-400 flex items-center justify-center">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-white mb-4">
                Coming Soon
              </h2>
              <p className="text-gray-400">Fitur belajar akan segera hadir!</p>
            </div>
          </div>
        ),
      },
      {
        path: "features",
        element: <Navigate to="/#features" replace />,
      },
      {
        path: "pricing",
        element: <Navigate to="/" replace />,
      },
      {
        path: "help",
        element: (
          <div className="min-h-screen bg-dark-400 flex items-center justify-center">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-white mb-4">
                Help Center
              </h2>
              <p className="text-gray-400">Dokumentasi akan segera tersedia</p>
            </div>
          </div>
        ),
      },
      {
        path: "about",
        element: (
          <div className="min-h-screen bg-dark-400 flex items-center justify-center">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-white mb-4">
                About QuizFlow
              </h2>
              <p className="text-gray-400">
                Platform kuis interaktif untuk meningkatkan pengetahuanmu
              </p>
            </div>
          </div>
        ),
      },
      {
        path: "privacy",
        element: (
          <div className="min-h-screen bg-dark-400 py-16">
            <div className="container mx-auto px-4 max-w-4xl">
              <h1 className="text-3xl font-display font-bold text-white mb-8">
                Privacy Policy
              </h1>
              <div className="glass-card p-8 text-gray-300 space-y-4">
                <p>Last updated: {new Date().toLocaleDateString("id-ID")}</p>
                <p>Your privacy is important to us...</p>
              </div>
            </div>
          </div>
        ),
      },
      {
        path: "terms",
        element: (
          <div className="min-h-screen bg-dark-400 py-16">
            <div className="container mx-auto px-4 max-w-4xl">
              <h1 className="text-3xl font-display font-bold text-white mb-8">
                Terms of Service
              </h1>
              <div className="glass-card p-8 text-gray-300 space-y-4">
                <p>Last updated: {new Date().toLocaleDateString("id-ID")}</p>
                <p>By using QuizFlow, you agree to these terms...</p>
              </div>
            </div>
          </div>
        ),
      },
      {
        path: "cookies",
        element: (
          <div className="min-h-screen bg-dark-400 py-16">
            <div className="container mx-auto px-4 max-w-4xl">
              <h1 className="text-3xl font-display font-bold text-white mb-8">
                Cookie Policy
              </h1>
              <div className="glass-card p-8 text-gray-300 space-y-4">
                <p>Last updated: {new Date().toLocaleDateString("id-ID")}</p>
                <p>We use cookies to enhance your experience...</p>
              </div>
            </div>
          </div>
        ),
      },
    ],
  },

  {
    path: "*",
    element: (
      <div className="min-h-screen bg-dark-400 flex items-center justify-center p-4">
        <div className="glass-card p-12 text-center max-w-md">
          <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-gradient-to-r from-primary-500 to-purple-600 flex items-center justify-center">
            <span className="text-5xl font-bold text-white">404</span>
          </div>
          <h1 className="text-2xl font-display font-bold text-white mb-4">
            Page Not Found
          </h1>
          <p className="text-gray-400 mb-8">
            Halaman yang kamu cari tidak ditemukan atau sudah dipindahkan.
          </p>
          <button
            onClick={() => (window.location.href = "/")}
            className="px-6 py-3 bg-gradient-to-r from-primary-500 to-purple-600 text-white rounded-lg hover:shadow-lg transition-all"
          >
            Kembali ke Beranda
          </button>
        </div>
      </div>
    ),
  },
]);

export default router;
