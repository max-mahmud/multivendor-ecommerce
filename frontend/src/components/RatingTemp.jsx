import React from 'react'
import { AiFillStar } from 'react-icons/ai'
import { CiStar } from 'react-icons/ci'
const RatingTemp = ({ rating }) => {
  const filledStar = (
    <span className="text-[#EDBB0E]">
      <AiFillStar />
    </span>
  );
  const emptyStar = (
    <span className="text-slate-600">
      <CiStar />
    </span>
  );

  const generateStars = (count, starType) => {
    const stars = [];
    for (let i = 0; i < count; i++) {
      stars.push(starType);
    }
    return stars;
  };

  const filledStarsCount = rating > 0 ? rating : 0;
  const emptyStarsCount = 5 - filledStarsCount;

  const filledStars = generateStars(filledStarsCount, filledStar);
  const emptyStars = generateStars(emptyStarsCount, emptyStar);

  return (
    <>
      {filledStars}
      {emptyStars}
    </>
  );
};

export default RatingTemp;
