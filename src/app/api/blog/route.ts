// GET and POST methods for blog posts

import { NextRequest, NextResponse } from 'next/server'

// GET - Get all blog posts
export async function GET() {
  try {
    const { getAllPosts } = await import('@/db/blogqueries')
    const posts = await getAllPosts()
    
    return NextResponse.json(posts)
    
  } catch (error) {
    console.error('Error fetching posts:', error)
    return NextResponse.json(
      { error: 'Failed to fetch posts' },
      { status: 500 }
    )
  }
}

// POST - Create a new blog post
export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { title, content } = body

    // Check if title is valid
    if (!title || !title.trim()) {
      return NextResponse.json(
        { error: 'Title is required' },
        { status: 400 }
      )
    }

    // Check if content is valid
    if (!content || !content.trim()) {
      return NextResponse.json(
        { error: 'Content is required' },
        { status: 400 }
      )
    }

    // Save the post to database
    const { createPost } = await import('@/db/blogqueries')
    const newPost = await createPost(title.trim(), content.trim())

    return NextResponse.json(newPost[0], { status: 201 })
    
  } catch (error) {
    console.error('Error creating post:', error)
    return NextResponse.json(
      { error: 'Failed to create post' },
      { status: 500 }
    )
  }
}