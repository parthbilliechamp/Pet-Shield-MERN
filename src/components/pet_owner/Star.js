import React from 'react';

const Star = ({ filled }) => (
  <span style={{ color: filled ? '#ffc107' : '#e4e5e9' }}>
    &#9733;
  </span>
);

const StarRating = ({ rating }) => {
  const stars = [];
  for (let i = 0; i < 5; i++) {
    stars.push(
      <Star
        key={i}
        filled={i < rating}
      />
    );
  }
  return (
    <div>
      {stars}
    </div>
  );
};

export default StarRating;