import { z } from 'zod';
import { baseProcedure, createTRPCRouter } from '../init';
import { inngest } from '@/inngest/client';
// Remove unused import
// import { text } from 'stream/consumers';

// You'll need to import inngest from wherever it's defined
// import { inngest } from '../path/to/inngest';

export const appRouter = createTRPCRouter({
  invoke: baseProcedure
    .input(
      z.object({
        value: z.string(),
      }),
    )
    .mutation(async ({ input }) => {
      // Fixed: Removed extra parentheses, fixed variable name casing
      await inngest.send({
        name: "test/hello.world",
        data: {
          value: input.value // Fixed: 'Input' -> 'input'
        }
      });
      
      // Optional: return something from the mutation
      return { success: true };
    }),

  hello: baseProcedure
    .input(
      z.object({
        text: z.string(),
      }),
    )
    .query((opts) => {
      return {
        greeting: `hello ${opts.input.text}`,
      };
    }),
});

// export type definition of API
export type AppRouter = typeof appRouter;