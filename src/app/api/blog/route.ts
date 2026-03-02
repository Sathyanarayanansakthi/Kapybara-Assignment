// GET, POST, PUT, and DELETE methods for blog posts
import { NextRequest, NextResponse } from 'next/server'

// GET
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

// POST
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

// PUT
export async function PUT(req: NextRequest) {
  try {
    const body = await req.json()
    const { id, title, content } = body

    // Check if id is provided
    if (!id) {
      return NextResponse.json(
        { error: 'Post ID is required' },
        { status: 400 }
      )
    }

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

    // Update the post in database
    const { updatePost } = await import('@/db/blogqueries')
    const updatedPost = await updatePost(id, title.trim(), content.trim())

    if (!updatedPost || updatedPost.length === 0) {
      return NextResponse.json(
        { error: 'Post not found' },
        { status: 404 }
      )
    }

    return NextResponse.json(updatedPost[0], { status: 200 })
    
  } catch (error) {
    console.error('Error updating post:', error)
    return NextResponse.json(
      { error: 'Failed to update post' },
      { status: 500 }
    )
  }
}

// DELETE
export async function DELETE(req: NextRequest) {
  try {
    const body = await req.json()
    const { id } = body

    // Check if id is provided
    if (!id) {
      return NextResponse.json(
        { error: 'Post ID is required' },
        { status: 400 }
      )
    }

    // Delete the post from database
    const { deletePost } = await import('@/db/blogqueries')
    await deletePost(id)

    return NextResponse.json(
      { message: 'Post deleted successfully' },
      { status: 200 }
    )
    
  } catch (error) {
    console.error('Error deleting post:', error)
    return NextResponse.json(
      { error: 'Failed to delete post' },
      { status: 500 }
    )
  }
}