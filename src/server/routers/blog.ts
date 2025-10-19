import { z } from 'zod'
import { router, publicProcedure } from '../trpc'
import { getAllPosts, createPost } from '@/db/blogqueries'

// validation for creating blog
const createBlogSchema = z.object({
  title: z.string().min(1, 'Title is required').max(300, 'Title is too long').trim(),
  content: z.string().min(1, 'Content is required').trim(),
})

export const blogRouter = router({
  // get all blogs from database
  getAll: publicProcedure.query(async () => {
    return await getAllPosts()
  }),

  // create new blog in database
  create: publicProcedure
    .input(createBlogSchema)
    .mutation(async ({ input }) => {
      const result = await createPost(input.title, input.content)
      return result[0] // return the first result
    }),
})
