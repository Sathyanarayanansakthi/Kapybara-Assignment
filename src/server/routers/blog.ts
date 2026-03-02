import { z } from 'zod'
import { router, publicProcedure } from '../trpc'
import { getAllPosts, createPost, updatePost, deletePost } from '@/db/blogqueries'

// validation for creating blog
const createBlogSchema = z.object({
  title: z.string().min(1, 'Title is required').max(300, 'Title is too long').trim(),
  content: z.string().min(1, 'Content is required').trim(),
})

// validation for updating blog
const updateBlogSchema = z.object({
  id: z.number(),
  title: z.string().min(1, 'Title is required').max(300, 'Title is too long').trim(),
  content: z.string().min(1, 'Content is required').trim(),
})

// validation for deleting blog
const deleteBlogSchema = z.object({
  id: z.number(),
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
      return result[0]
    }),

  // update existing blog in database
  update: publicProcedure
    .input(updateBlogSchema)
    .mutation(async ({ input }) => {
      const result = await updatePost(input.id, input.title, input.content)
      return result[0]
    }),

  // delete blog from database
  delete: publicProcedure
    .input(deleteBlogSchema)
    .mutation(async ({ input }) => {
      await deletePost(input.id)
      return { success: true }
    }),
})