import { z } from "zod";

import {
  createTRPCRouter,
  publicProcedure,
  // protectedProcedure,
} from "~/server/api/trpc";

export type LetterCorrectness =
  | 'incorrect'
  | 'almost'
  | 'correct'

const handleGuess = (guess: string, wordOfTheDay: string): LetterCorrectness[] => {
  const guessSplit = guess.split('');
  const wordOfTheDaySplit = wordOfTheDay.split('')

  const result: LetterCorrectness[] = [
      'incorrect',
      'incorrect',
      'incorrect',
      'incorrect',
      'incorrect',
  ]

  guessSplit.forEach((letter, i) => {
      if (wordOfTheDaySplit[i] === letter) {
          wordOfTheDaySplit[i] = ''
          result[i] = 'correct'
      }
  })
  guessSplit.forEach((letter, i) => {
      if (wordOfTheDaySplit.includes(letter) && result[i] !== 'correct') {
          const letterIndex = wordOfTheDaySplit.indexOf(letter)
          wordOfTheDaySplit[letterIndex] = ''
          result[i] = 'almost'
      }
  })
  return result
}

export const wordRouter = createTRPCRouter({
  handleGuess: publicProcedure
    .input(z.object({ guess: z.string() }))
    .mutation(({ input, ctx }) => {
      const { guess } = input;

      const INPUT_REGEX = /[A-Za-z]{5,7}/;
      if (!INPUT_REGEX.test(guess)) return [];
      
      const wordOfTheDay = ''
      return handleGuess(guess, 'PIZZA');
    }),

  // getAll: publicProcedure.query(({ ctx }) => {
  //   return ctx.prisma.example.findMany();
  // }),

  // getSecretMessage: protectedProcedure.query(() => {
  //   return "you can now see this secret message!";
  // }),
});
