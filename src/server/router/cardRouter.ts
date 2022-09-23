import { createRouter } from "./context";
import { z } from "zod";

const lastDay = Date.now() - 24 * 60 * 60 * 1000;
const last24Hours = new Date(lastDay).toISOString();

export const cardRouter = createRouter()
  .query("retrieveCards", {
    input: z.object({
      userId: z.string(),
    }),
    async resolve({ input, ctx }) {
      const userCards = await ctx.prisma.card.findMany({
        where: {
          userId: input.userId,
          OR: [
            {
              lastReviewed: {
                lte: last24Hours,
              },
            },
            {
              reviews: 0,
            },
          ],
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
          lastReviewed: new Date().toISOString(),
        },
      });
      // Used to retire cards that have reached a 50 review limit.
      await ctx.prisma.card.deleteMany({
        where: {
          id: input.cardId,
          reviews: {
            equals: 50,
          },
        },
      });
    },
  })
  .mutation("failReview", {
    input: z.object({
      cardId: z.string(),
    }),
    async resolve({ input, ctx }) {
      await ctx.prisma.card.update({
        where: {
          id: input.cardId,
        },
        data: {
          lastReviewed: new Date().toISOString(),
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
