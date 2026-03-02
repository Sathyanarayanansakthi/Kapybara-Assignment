import { initTRPC } from '@trpc/server'
import { ZodError } from 'zod'

const t = initTRPC.create({
  errorFormatter({ shape, error }) {
    return {
      ...shape,
      data: {
        ...shape.data,
        zodError:
          error.cause instanceof ZodError ? error.cause.flatten() : null,
      },
    }
  },
})

// these are used to make routers and procedures
export const router = t.router
export const publicProcedure = t.procedure

