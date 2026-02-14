import React from "react";

const FilterBar = ({
  timeframes,
  selectedTimeframe,
  onTimeframeChange,
  categories,
  selectedCategory,
  onCategoryChange,
}) => {
  return (
    <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-6">
      <div className="flex glass rounded-xl p-1">
        {timeframes.map((tf) => (
          <button
            key={tf.id}
            onClick={() => onTimeframeChange(tf.id)}
            className={`
              flex items-center space-x-2 px-4 py-2 rounded-lg transition-all
              ${
                selectedTimeframe === tf.id
                  ? "bg-gradient-to-r from-primary-500 to-purple-600 text-white"
                  : "text-gray-400 hover:text-white hover:bg-white/5"
              }
            `}
          >
            <span className="text-lg">{tf.icon}</span>
            <span className="hidden md:inline text-sm">{tf.label}</span>
          </button>
        ))}
      </div>

      <div className="flex glass rounded-xl p-1">
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => onCategoryChange(cat.id)}
            className={`
              flex items-center space-x-2 px-4 py-2 rounded-lg transition-all
              ${
                selectedCategory === cat.id
                  ? "bg-gradient-to-r from-primary-500 to-purple-600 text-white"
                  : "text-gray-400 hover:text-white hover:bg-white/5"
              }
            `}
          >
            <span className="text-lg">{cat.icon}</span>
            <span className="hidden md:inline text-sm">{cat.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default FilterBar;
