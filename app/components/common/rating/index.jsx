"use client";

import Rating from "react-rating";

const index = ({initialRating = 5}) => {
  return (
    <Rating
      initialRating={initialRating}
      emptySymbol="fa-regular fa-star"
      readonly
      fullSymbol="fa-solid fa-star"
      fractions={2}
      className="text-yellow-500 text-xl"
    />
  );
};

export default index;
