import React from "react";

const LoadingSpinner = ({ fullScreen = false, text = "Loading..." }) => {
  const containerClasses = fullScreen 
    ? "min-h-screen bg-dark-400 flex items-center justify-center" 
    : "flex items-center justify-center py-12";

  return (
    <div className={containerClasses}>
      <div className="text-center">
        <div className="relative">
          <div className="w-16 h-16 border-4 border-primary-500/30 border-t-primary-500 rounded-full animate-spin mx-auto mb-4" />
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-2xl text-primary-400 animate-pulse">Q</span>
          </div>
        </div>
        <p className="text-gray-400 animate-pulse">{text}</p>
      </div>
    </div>
  );
};

export default LoadingSpinner;
