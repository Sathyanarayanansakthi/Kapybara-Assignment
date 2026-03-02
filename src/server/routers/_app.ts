import { router } from '../trpc'
import { blogRouter } from './blog'

export const appRouter = router({
  blog: blogRouter, // add blog router here
})

// this is needed for typescript to work
export type AppRouter = typeof appRouter
