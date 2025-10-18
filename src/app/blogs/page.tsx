// app/blogs/page.tsx

'use client'

import { useEffect, useState } from 'react'

type BlogPost = {
  id: number
  title: string
  blog: string
  createdAt: string
}

export default function BlogsPage() {
  const [posts, setPosts] = useState<BlogPost[]>([])
  const [loading, setLoading] = useState(true)
  const [expandedPosts, setExpandedPosts] = useState<number[]>([])

  useEffect(() => {
    fetchBlogs()
  }, [])

  async function fetchBlogs() {
    try {
      const response = await fetch('/api/blog')
      const data = await response.json()
      setPosts(data)
      setLoading(false)
    } catch (error) {
      console.error('Error:', error)
      setLoading(false)
    }
  }

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

  if (loading) {
    return <div className="max-w-3xl mx-auto px-4 py-8">Loading...</div>
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      {posts.map((post) => {
        const isExpanded = expandedPosts.includes(post.id)
        const longPost = isLongPost(post.blog)

        return (
          <article 
            key={post.id} 
            className="mb-12 pb-12 border-b-2 border-gray-300 last:border-b-0"
          >
            <h1 className="text-4xl font-bold mb-4 text-gray-900">
              {post.title}
            </h1>
            
            <div className="text-sm text-gray-500 mb-8">
              {new Date(post.createdAt).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </div>
            
            {longPost && !isExpanded ? (
              <div>
                <div className="blog-content text-gray-800 text-lg leading-8">
                  {getPreviewText(post.blog)}...
                </div>
                <button
                  onClick={() => toggleReadMore(post.id)}
                  className="text-blue-600 hover:text-blue-800 font-medium mt-4"
                >
                  Read more
                </button>
              </div>
            ) : (
              <div>
                <div 
                  className="blog-content text-gray-800 text-lg leading-8"
                  dangerouslySetInnerHTML={{ __html: post.blog }}
                />
                {longPost && (
                  <button
                    onClick={() => toggleReadMore(post.id)}
                    className="text-blue-600 hover:text-blue-800 font-medium mt-4"
                  >
                    Show less
                  </button>
                )}
              </div>
            )}
          </article>
        )
      })}
      
      <style jsx global>{`
        .blog-content p {
          margin-bottom: 1.5rem;
        }
        
        .blog-content strong {
          font-weight: 600;
        }
        
        .blog-content em {
          font-style: italic;
        }
        
        .blog-content h1 {
          font-size: 2rem;
          font-weight: 700;
          margin-top: 2rem;
          margin-bottom: 1rem;
        }
        
        .blog-content h2 {
          font-size: 1.75rem;
          font-weight: 700;
          margin-top: 2rem;
          margin-bottom: 1rem;
        }
        
        .blog-content h3 {
          font-size: 1.5rem;
          font-weight: 600;
          margin-top: 1.5rem;
          margin-bottom: 0.75rem;
        }
        
        .blog-content ul,
        .blog-content ol {
          margin-bottom: 1.5rem;
          padding-left: 2rem;
        }
        
        .blog-content li {
          margin-bottom: 0.5rem;
        }
        
        .blog-content a {
          color: #000;
          text-decoration: underline;
        }
        
        .blog-content blockquote {
          border-left: 3px solid #000;
          padding-left: 1.5rem;
          margin: 1.5rem 0;
          font-style: italic;
        }
        
        .blog-content code {
          background-color: #f5f5f5;
          padding: 2px 6px;
          border-radius: 3px;
          font-size: 0.9em;
        }
      `}</style>
    </div>
  )
}