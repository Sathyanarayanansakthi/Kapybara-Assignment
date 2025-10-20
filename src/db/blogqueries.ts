// This file contains functions to interact with the blog database
// It has four main functions: get all posts, create, update, and delete

import { db } from '../index'
import { blogTable } from './blogSchema'
import { desc, eq } from 'drizzle-orm'

// Types for TypeScript
export type BlogPost = typeof blogTable.$inferSelect
export type NewBlogPost = typeof blogTable.$inferInsert

// Function to get all blog posts from the database
// Posts are sorted by newest first
export async function getAllPosts(): Promise<BlogPost[]> {
  try {
    console.log('Fetching all posts from database...')
    
    const posts = await db
      .select()
      .from(blogTable)
      .orderBy(desc(blogTable.createdAt))
    
    console.log('Posts fetched:', posts.length)
    return posts
    
  } catch (error) {
    console.error('Error fetching posts:', error)
    throw error
  }
}

// Function to create a new blog post
export async function createPost(title: string, content: string): Promise<BlogPost[]> {
  try {
    console.log('Creating new post...')
    
    const result = await db
      .insert(blogTable)
      .values({
        title: title,
        blog: content,
      })
      .returning()
    
    console.log('Post created successfully')
    return result
    
  } catch (error) {
    console.error('Error creating post:', error)
    throw error
  }
}

// Function to update an existing blog post
export async function updatePost(id: number, title: string, content: string): Promise<BlogPost[]> {
  try {
    console.log('Updating post with id:', id)
    
    const result = await db
      .update(blogTable)
      .set({
        title: title,
        blog: content,
        updatedAt: new Date(),
      })
      .where(eq(blogTable.id, id))
      .returning()
    
    console.log('Post updated successfully')
    return result
    
  } catch (error) {
    console.error('Error updating post:', error)
    throw error
  }
}

// Function to delete a blog post
export async function deletePost(id: number): Promise<void> {
  try {
    console.log('Deleting post with id:', id)
    
    await db
      .delete(blogTable)
      .where(eq(blogTable.id, id))
    
    console.log('Post deleted successfully')
    
  } catch (error) {
    console.error('Error deleting post:', error)
    throw error
  }
}