import { Card } from "@prisma/client";
import { useSession } from "next-auth/react";
import Head from "next/head";
import { useEffect, useState } from "react";
import FlashCard from "../components/FlashCard";

import Header from "../components/Header";
import { trpc } from "../utils/trpc";

const HeadElements = () => {
  return (
    <>
      <Head>
        <title> 문장 - MUNJANG - Review Cards </title>
      </Head>
      <Header />
    </>
  );
};

const reviewcards = () => {
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

  const incrementIndex = () => {
    setIndex((prev) => prev + 1);
    setCardsRemaining((prev) => prev - 1);
  };

  useEffect(() => {
    if (!session) return;
    const fetchCards = async () => {
      await retrieveCards.refetch();
    };
    fetchCards();
  }, [session]);

  // To be refactored
  if (
    retrieveCards.isLoading ||
    retrieveCards.isFetching ||
    retrieveCards.isRefetching
  ) {
    return (
      <>
        <HeadElements />
        <div className="center-items text-white text-3xl">
          <div
            className="spinner-border animate-spin w-8 h-8 border-4 rounded-full"
            role="status"
          ></div>
        </div>
      </>
    );
  }

  if (!retrieveCards.data) return null;

  return (
    <>
      <HeadElements />
      <div className="center-items">
        {cardsRemaining ? (
          <FlashCard
            key={retrieveCards.data[index]?.id}
            cardId={retrieveCards.data[index]?.id!}
            front={retrieveCards.data[index]?.front!}
            back={retrieveCards.data[index]?.back!}
            incrementIndex={incrementIndex}
          />
        ) : (
          <div className="center-items text-white text-3xl">
            You have no more cards remaining today. Come back again tomorrow! 🥳
          </div>
        )}
      </div>
    </>
  );
};

export default reviewcards;
