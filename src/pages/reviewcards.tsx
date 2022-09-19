import { Card } from "@prisma/client";
import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
import FlashCard from "../components/FlashCard";

import Header from "../components/Header";
import { trpc } from "../utils/trpc";

interface reviewcardsProps {}

const reviewcards = ({}: reviewcardsProps) => {
  const { data: session } = useSession({ required: true });
  const [index, setIndex] = useState<number>(0);
  const [cardsRemaining, setCardsRemaining] = useState(0);
  const retrieveCards = trpc.useQuery(
    ["card.retrieveCards", { userId: session?.user?.id! }],
    {
      enabled: false,
      onSuccess: (cards: Card[]) => {
        setCardsRemaining(cards.length);
      },
    }
  );

  const centerItems =
    "h-screen w-screen flex flex-col justify-center items-center";

  const incrementIndex = () => {
    setIndex((prev) => prev + 1);
    setCardsRemaining((prev) => prev - 1);
  };

  const lastDay = Date.now() - 24 * 60 * 60 * 1000 * 2;
  const last24Hours = new Date(lastDay).toISOString();
  console.log(last24Hours);

  useEffect(() => {
    if (!session) return;
    const fetchCards = async () => {
      await retrieveCards.refetch();
    };
    fetchCards();
  }, [session]);

  if (retrieveCards.isLoading) {
    return (
      <>
        <Header />
        <div className={`${centerItems} text-white text-3xl`}>
          Loading Cards...
        </div>
      </>
    );
  }

  if (!retrieveCards.data) return null;

  return (
    <>
      <Header />
      <div className={centerItems}>
        {cardsRemaining ? (
          <FlashCard
            key={retrieveCards.data[index]?.id}
            cardId={retrieveCards.data[index]?.id!}
            front={retrieveCards.data[index]?.front!}
            back={retrieveCards.data[index]?.back!}
            incrementIndex={incrementIndex}
          />
        ) : (
          <div className={`${centerItems} text-white text-3xl`}>
            You have no more cards remaining.
          </div>
        )}
      </div>
    </>
  );
};

export default reviewcards;
