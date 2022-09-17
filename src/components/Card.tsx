import React from "react";

interface CardProps {
  front: string;
  back: string;
}

const Card = ({ front, back }: CardProps) => {
  return (
    <>
      <div
        className="border rounded-md border-purple-300 w-6/12 h-80 text-white flex
        flex-col justify-center items-center
      "
      >
        <div className="text-3xl h-10">Front: {front}</div>
      </div>
    </>
  );
};
export default Card;
