// This file contains functions to interact with the blog database
// It has two main functions: get all posts and create a new post

import { db } from '../index'
import { blogTable } from './blogSchema'
import { desc } from 'drizzle-orm'

// Types for TypeScript
// These help us know what shape our data should have
export type BlogPost = typeof blogTable.$inferSelect
export type NewBlogPost = typeof blogTable.$inferInsert

// Function to get all blog posts from the database
// Posts are sorted by newest first
export async function getAllPosts(): Promise<BlogPost[]> {
  try {
    console.log('Fetching all posts from database...')
    
    // Get all posts from the blogTable, sorted by creation date (newest first)
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
// Takes a title and content, saves them to the database
export async function createPost(title: string, content: string): Promise<BlogPost[]> {
  try {
    console.log('Creating new post...')
    
    // Insert the new post into the database
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