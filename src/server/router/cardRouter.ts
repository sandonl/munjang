import { createRouter } from "./context";
import { z } from "zod";

export const cardRouter = createRouter()
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
  })
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
  });
