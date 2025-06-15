
import React from "react";

// Show stars (filled/empty) to represent rating between 0 and 5
const StarRating = ({ rating = 0 }: { rating: number }) => {
  const filled = Math.round(rating);
  return (
    <div className="flex items-center" data-testid="star-rating">
      {[1, 2, 3, 4, 5].map((n) => (
        <svg
          key={n}
          className={`w-4 h-4 ${n <= filled ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`}
          viewBox="0 0 20 20"
          fill={n <= filled ? "currentColor" : "none"}
          stroke="currentColor"
        >
          <polygon
            points="10,1 12.6,7 19,7.3 14,11.7 15.6,18 10,14.2 4.4,18 6,11.7 1,7.3 7.4,7"
            strokeWidth="1"
          />
        </svg>
      ))}
    </div>
  );
};

export default StarRating;
