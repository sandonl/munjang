import React, { useState } from "react";

interface FlashCardProps {
  front: string;
  back: string;
}

const FlashCard = ({ front, back }: FlashCardProps) => {
  const [backShown, setBackShown] = useState<boolean>(false);

  const cardButtonStyles =
    " px-4 py-2 m-4 border border-purple-300 rounded-md ";

  const showBack = () => {
    setBackShown(true);
  };

  return (
    <>
      <div
        className="m-4 border rounded-md border-purple-300 w-6/12 h-80 text-white flex
        flex-col justify-center items-center
      "
      >
        <div className="text-3xl h-1/2 p-4 text-center">
          Front:
          <div>{front}</div>
        </div>
        <div className="text-3xl h-1/2 p-4 text-center">
          {backShown && (
            <div>
              Back:
              <div>{back}</div>
            </div>
          )}
        </div>
        <div className="">
          {backShown ? (
            <div>
              <button className={cardButtonStyles}> Fail </button>
              <button className={cardButtonStyles}> Pass </button>
            </div>
          ) : (
            <div>
              <button className={cardButtonStyles} onClick={showBack}>
                Show
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
};
export default FlashCard;
