import React, { useState } from "react";

interface StarRatingProps {
    onRatingChange: (rating: number) => void; // Define the expected prop
}
  

const StarRating: React.FC<StarRatingProps> = ({ onRatingChange }) => {
  const [rating, setRating] = useState(0);

  const handleClick = (value) => {
    const newRating = rating === value ? 0 : value;
    setRating(newRating);
    onRatingChange(newRating); // Notify the parent component of the change
  };

  return (
    <div style={{ display: "flex", cursor: "pointer" }}>
      {[1, 2, 3, 4, 5].map((value) => (
        <span
          key={value}
          onClick={() => handleClick(value)}
          style={{
            fontSize: "2rem",
            color: value <= rating ? "gold" : "gray",
            margin: "0 5px",
          }}
        >
          ★
        </span>
      ))}
    </div>
  );
};

export default StarRating;