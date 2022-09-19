// src/server/router/index.ts
import { createRouter } from "./context";
import superjson from "superjson";

import { protectedExampleRouter } from "./protected-example-router";
import { cardRouter } from "./cardRouter";

export const appRouter = createRouter()
  .transformer(superjson)
  .merge("auth.", protectedExampleRouter)
  .merge("card.", cardRouter);

// export type definition of API
export type AppRouter = typeof appRouter;
