import React, { useState } from "react";
import { trpc } from "../utils/trpc";

interface FlashCardProps {
  cardId: string;
  front: string;
  back: string;
  incrementIndex: () => void;
}

const FlashCard = ({ cardId, front, back, incrementIndex }: FlashCardProps) => {
  const [backShown, setBackShown] = useState<boolean>(false);
  const passReview = trpc.useMutation(["card.passReview"]);
  const failReview = trpc.useMutation(["card.failReview"]);

  const cardButtonStyles =
    " px-4 py-2 m-4 border border-purple-300 rounded-md hover:bg-purple-300 duration-300 ";

  const showBack = () => {
    setBackShown(true);
  };

  const passCard = () => {
    incrementIndex();
    passReview.mutateAsync({
      cardId,
    });
  };

  const failCard = () => {
    incrementIndex();
    failReview.mutateAsync({
      cardId,
    });
  };

  return (
    <>
      <div
        className="m-4 border rounded-md border-purple-300 w-6/12 h-80 text-white flex
        flex-col justify-center items-center
      "
      >
        <div className="text-3xl h-1/2 p-8 text-center">
          <div>{front}</div>
        </div>
        <div className="text-3xl h-1/2 p-8 text-center">
          {backShown && (
            <div>
              <div>{back}</div>
            </div>
          )}
        </div>
        <div className="">
          {backShown ? (
            <div>
              <button className={cardButtonStyles} onClick={failCard}>
                Fail
              </button>
              <button className={cardButtonStyles} onClick={passCard}>
                Pass
              </button>
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
