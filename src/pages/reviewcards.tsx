import { Card } from "@prisma/client";
import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
import FlashCard from "../components/FlashCard";

import Header from "../components/Header";
import { trpc } from "../utils/trpc";

interface reviewcardsProps {}

const reviewcards = ({}: reviewcardsProps) => {
  const { data: session } = useSession({ required: true });
  const [userCards, setUserCards] = useState<Card[]>([]);
  const retrieveCards = trpc.useQuery(
    ["card.retrieveCards", { userId: session?.user?.id! }],
    {
      enabled: false,
      onSuccess: (cards: Card[]) => {
        setUserCards(cards);
      },
    }
  );

  const centerItems =
    "h-screen w-screen flex flex-col justify-center items-center";

  useEffect(() => {
    if (!session) return;
    const fetchCards = async () => {
      await retrieveCards.refetch();
    };
    fetchCards();
  }, [session]);

  return (
    <>
      <Header />
      {retrieveCards.isLoading ? (
        <div className={`${centerItems} text-white text-3xl`}>
          Loading Data...
        </div>
      ) : (
        <div className={centerItems}>
          {userCards.map((card) => (
            <FlashCard key={card.id} front={card.front} back={card.back} />
          ))}
        </div>
      )}
    </>
  );
};
export default reviewcards;
