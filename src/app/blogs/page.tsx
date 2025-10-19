'use client'

import { Badge } from '@/components/ui/badge'
import { Spinner } from '@/components/ui/spinner'
import { useState } from 'react'
import { trpc } from '@/lib/trpc'

export default function BlogsPage() {
  // keeps track of which posts are expanded
  const [expandedPosts, setExpandedPosts] = useState<number[]>([])
  
  // get all posts from database
  const { data: posts, isLoading } = trpc.blog.getAll.useQuery()

  // toggle read more/less
  function toggleReadMore(postId: number) {
    if (expandedPosts.includes(postId)) {
      // remove from expanded
      setExpandedPosts(expandedPosts.filter(id => id !== postId))
    } else {
      // add to expanded
      setExpandedPosts([...expandedPosts, postId])
    }
  }

  // get first 300 characters of blog
  function getPreviewText(html: string) {
    // remove html tags
    const text = html.replace(/<[^>]*>/g, '')
    return text.substring(0, 300)
  }

  // check if blog is longer than 300 characters
  function isLongPost(html: string) {
    const text = html.replace(/<[^>]*>/g, '')
    return text.length > 300
  }

  // show loading spinner
  if (isLoading) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-8 flex items-center justify-center">
        <Badge variant="secondary">
          <Spinner />
          Loading Please Wait
        </Badge>
      </div>
    )
  }

  // if no posts show message
  if (!posts || posts.length === 0) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-8">
        <p className="text-gray-500 text-center">No blog posts yet.</p>
      </div>
    )
  }

  // show all the blog posts
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
            {/* blog title */}
            <h1 className="text-4xl font-bold mb-4 text-gray-900">
              {post.title}
            </h1>

            {/* date when blog was created */}
            <div className="text-sm text-gray-500 mb-8">
              {new Date(post.createdAt).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </div>

            {/* show preview if its long and not expanded */}
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
                {/* show full content */}
                <div
                  className="blog-content text-gray-800 text-lg leading-8"
                  dangerouslySetInnerHTML={{ __html: post.blog }}
                />
                {/* show less button if its long */}
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

      {/* css styling for blog content */}
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