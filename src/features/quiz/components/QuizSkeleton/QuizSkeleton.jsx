import React from "react";

const QuizSkeleton = () => {
  return (
    <div className="min-h-screen bg-dark-400 pt-8 pb-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
        <div className="flex justify-between items-center mb-8">
          <div>
            <div className="h-8 w-48 bg-white/5 rounded-lg animate-pulse mb-2" />
            <div className="h-4 w-32 bg-white/5 rounded-lg animate-pulse" />
          </div>
          <div className="h-12 w-24 bg-white/5 rounded-xl animate-pulse" />
        </div>

        <div className="glass-card p-6 mb-8">
          <div className="h-5 w-32 bg-white/5 rounded-lg animate-pulse mb-4" />
          <div className="h-3 w-full bg-white/5 rounded-full animate-pulse mb-6" />
          <div className="flex justify-between">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="w-8 h-8 bg-white/5 rounded-xl animate-pulse" />
            ))}
          </div>
        </div>

        <div className="glass-card p-8">
          <div className="h-6 w-32 bg-white/5 rounded-full animate-pulse mb-6" />
          <div className="space-y-3 mb-8">
            <div className="h-8 w-full bg-white/5 rounded-lg animate-pulse" />
            <div className="h-8 w-3/4 bg-white/5 rounded-lg animate-pulse" />
          </div>
          <div className="space-y-4">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="h-14 w-full bg-white/5 rounded-lg animate-pulse" />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuizSkeleton;
