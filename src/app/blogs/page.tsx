'use client'

import { Badge } from '@/components/ui/badge'
import { Spinner } from '@/components/ui/spinner'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { useState } from 'react'
import { trpc } from '@/lib/trpc'
import Tiptap from '@/components/Tiptap'

export default function BlogsPage() {
  const [expandedPosts, setExpandedPosts] = useState<number[]>([])
  const [editingPost, setEditingPost] = useState<number | null>(null)
  const [editTitle, setEditTitle] = useState('')
  const [editContent, setEditContent] = useState('')
  
  // get all posts from database
  const { data: posts, isLoading } = trpc.blog.getAll.useQuery()
  
  // get trpc utils for invalidating cache
  const utils = trpc.useUtils()
  
  // update mutation
  const updateMutation = trpc.blog.update.useMutation({
    onSuccess: () => {
      utils.blog.getAll.invalidate()
      setEditingPost(null)
      setEditTitle('')
      setEditContent('')
    },
  })
  
  // delete mutation
  const deleteMutation = trpc.blog.delete.useMutation({
    onSuccess: () => {
      utils.blog.getAll.invalidate()
    },
  })

  function toggleReadMore(postId: number) {
    if (expandedPosts.includes(postId)) {
      setExpandedPosts(expandedPosts.filter(id => id !== postId))
    } else {
      setExpandedPosts([...expandedPosts, postId])
    }
  }

  function getPreviewText(html: string) {
    const text = html.replace(/<[^>]*>/g, '')
    return text.substring(0, 300)
  }

  function isLongPost(html: string) {
    const text = html.replace(/<[^>]*>/g, '')
    return text.length > 300
  }
  
  function startEditing(postId: number, title: string, content: string) {
    setEditingPost(postId)
    setEditTitle(title)
    setEditContent(content)
  }
  
  function cancelEditing() {
    setEditingPost(null)
    setEditTitle('')
    setEditContent('')
  }
  
  function handleUpdate(postId: number) {
    if (!editTitle.trim() || !editContent.trim()) {
      alert('Title and content are required')
      return
    }
    
    updateMutation.mutate({
      id: postId,
      title: editTitle,
      content: editContent,
    })
  }
  
  function handleDelete(postId: number) {
    if (confirm('Are you sure you want to delete this post?')) {
      deleteMutation.mutate({ id: postId })
    }
  }

  if (isLoading) {
    return (
      <div className="max-w-5xl mx-auto px-4 py-8 flex items-center justify-center">
        <Badge variant="secondary">
          <Spinner />
          Loading Please Wait
        </Badge>
      </div>
    )
  }

  if (!posts || posts.length === 0) {
    return (
      <div className="max-w-5xl mx-auto px-4 py-8">
        <p className="text-gray-500 text-center">No blog posts yet.</p>
      </div>
    )
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <div className="space-y-6">
        {posts.map((post) => {
          const isExpanded = expandedPosts.includes(post.id)
          const longPost = isLongPost(post.blog)
          const isEditing = editingPost === post.id

          return (
            <Card key={post.id} className="overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
              {isEditing ? (
                // Edit mode with Tiptap
                <CardContent className="pt-6">
                  <div className="space-y-4">
                    <input
                      type="text"
                      value={editTitle}
                      onChange={(e) => setEditTitle(e.target.value)}
                      className="w-full text-3xl font-bold text-gray-900 border-2 border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-blue-500"
                      placeholder="Title"
                    />
                    
                    {/* Tiptap Rich Text Editor */}
                    <Tiptap content={editContent} setContent={setEditContent} />
                    
                    <div className="flex gap-2 pt-4">
                      <Button
                        onClick={() => handleUpdate(post.id)}
                        disabled={updateMutation.isPending}
                        className="bg-blue-600 hover:bg-blue-700"
                      >
                        {updateMutation.isPending ? 'Saving...' : 'Save Changes'}
                      </Button>
                      <Button
                        onClick={cancelEditing}
                        variant="outline"
                      >
                        Cancel
                      </Button>
                    </div>
                  </div>
                </CardContent>
              ) : (
                // View mode
                <>
                  <CardHeader>
                    <CardTitle className="text-3xl font-bold text-gray-900">
                      {post.title}
                    </CardTitle>
                    <CardDescription>
                      {new Date(post.createdAt).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                      })}
                    </CardDescription>
                  </CardHeader>

                  <CardContent>
                    {longPost && !isExpanded ? (
                      <div>
                        <div className="blog-content text-gray-800 text-base leading-relaxed">
                          {getPreviewText(post.blog)}...
                        </div>
                        <Button
                          onClick={() => toggleReadMore(post.id)}
                          variant="link"
                          className="text-blue-600 hover:text-blue-800 px-0 mt-2"
                        >
                          Read more →
                        </Button>
                      </div>
                    ) : (
                      <div>
                        <div
                          className="blog-content text-gray-800 text-base leading-relaxed"
                          dangerouslySetInnerHTML={{ __html: post.blog }}
                        />
                        {longPost && (
                          <Button
                            onClick={() => toggleReadMore(post.id)}
                            variant="link"
                            className="text-blue-600 hover:text-blue-800 px-0 mt-2"
                          >
                            ← Show less
                          </Button>
                        )}
                      </div>
                    )}
                  </CardContent>

                  <CardFooter className="flex gap-2 border-t pt-4">
                    <Button
                      onClick={() => startEditing(post.id, post.title, post.blog)}
                      variant="default"
                      size="sm"
                      className="bg-blue-600 hover:bg-blue-700"
                    >
                      Update
                    </Button>
                    <Button
                      onClick={() => handleDelete(post.id)}
                      disabled={deleteMutation.isPending}
                      variant="destructive"
                      size="sm"
                    >
                      {deleteMutation.isPending ? 'Deleting...' : 'Delete'}
                    </Button>
                  </CardFooter>
                </>
              )}
            </Card>
          )
        })}
      </div>

      <style jsx global>{`
        .blog-content p {
          margin-bottom: 1rem;
        }

        .blog-content strong {
          font-weight: 600;
        }

        .blog-content em {
          font-style: italic;
        }

        .blog-content h1 {
          font-size: 1.875rem;
          font-weight: 700;
          margin-top: 1.5rem;
          margin-bottom: 1rem;
        }

        .blog-content h2 {
          font-size: 1.5rem;
          font-weight: 700;
          margin-top: 1.5rem;
          margin-bottom: 0.75rem;
        }

        .blog-content h3 {
          font-size: 1.25rem;
          font-weight: 600;
          margin-top: 1rem;
          margin-bottom: 0.5rem;
        }

        .blog-content ul,
        .blog-content ol {
          margin-bottom: 1rem;
          padding-left: 1.5rem;
        }

        .blog-content li {
          margin-bottom: 0.25rem;
        }

        .blog-content a {
          color: #2563eb;
          text-decoration: underline;
        }

        .blog-content blockquote {
          border-left: 3px solid #3b82f6;
          padding-left: 1rem;
          margin: 1rem 0;
          font-style: italic;
          color: #4b5563;
        }

        .blog-content code {
          background-color: #f3f4f6;
          padding: 2px 6px;
          border-radius: 3px;
          font-size: 0.875em;
        }

        .blog-content img {
          max-width: 100%;
          height: auto;
          border-radius: 0.5rem;
          margin: 1rem 0;
        }
      `}</style>
    </div>
  )
}