import { Card } from "@prisma/client";
import { useSession } from "next-auth/react";
import Head from "next/head";
import React, { useEffect, useState } from "react";
import FlashCard from "../components/FlashCard";
import NextLink from "next/link";

import Header from "../components/Header";
import { trpc } from "../utils/trpc";

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

  if (
    retrieveCards.isLoading ||
    retrieveCards.isFetching ||
    retrieveCards.isRefetching
  ) {
    return (
      <>
        <Header />
        <div className="center-items text-white text-3xl">Loading Cards...</div>
      </>
    );
  }

  if (!retrieveCards.data) return null;

  return (
    <>
      <Head>
        <title> 문장 - MUNJANG - Review Cards </title>
      </Head>
      <Header />
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
