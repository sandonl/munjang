import { createRouter } from "./context";
import { z } from "zod";

export const cardRouter = createRouter()
  .query("retrieveCards", {
    input: z.object({
      userId: z.string(),
    }),
    async resolve({ input, ctx }) {
      const userCards = await ctx.prisma.card.findMany({
        where: {
          userId: input.userId,
        },
      });
      return userCards;
    },
  })
  .mutation("passReview", {
    input: z.object({
      cardId: z.string(),
    }),
    async resolve({ input, ctx }) {
      await ctx.prisma.card.update({
        where: {
          id: input.cardId,
        },
        data: {
          reviews: { increment: 1 },
        },
      });
    },
  })
  .mutation("createCard", {
    input: z.object({
      front: z.string(),
      back: z.string(),
      userId: z.string(),
    }),
    async resolve({ input, ctx }) {
      const newCard = await ctx.prisma.card.create({
        data: {
          userId: input.userId,
          front: input.front,
          back: input.back,
        },
      });
      return newCard;
    },
  });
