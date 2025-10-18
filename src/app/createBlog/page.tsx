'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import React, { useState } from 'react'
import Tiptap from '@/components/Tiptap'
import { toast } from 'sonner'

const Page = () => {
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async () => {
    if (!title.trim() || !content.trim()) {
      toast.error('Missing Fields', {
        description: 'Please provide both title and content.',
      })
      return
    }

    setLoading(true)
    const loadingToast = toast.loading('Publishing your blog post...')

    try {
      const res = await fetch('/api/blog', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, content }),
      })

      const data = await res.json()

      if (!res.ok) {
        console.error('Error response:', data)
        throw new Error(data?.error || 'Failed to publish blog.')
      }

      toast.dismiss(loadingToast)
      toast.success('Blog Published! 🎉', {
        description: `"${title}" has been published successfully.`,
      })

      setTitle('')
      setContent('')
    } catch (err: unknown) {
      toast.dismiss(loadingToast)
      
      if (err instanceof Error) {
        toast.error('Failed to Publish', {
          description: err.message,
        })
      } else {
        toast.error('Failed to Publish', {
          description: 'An unknown error occurred.',
        })
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="p-6 space-y-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 text-transparent bg-clip-text">
        Create a Blog
      </h1>

      <Input
        placeholder="Title of the Blog"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="text-lg font-medium"
        type="text"
      />

      <div className="bg-white text-black p-4 rounded-md shadow-md">
        <Tiptap content={content} setContent={setContent} />
      </div>

      <Button
        onClick={handleSubmit}
        disabled={!title.trim() || !content.trim() || loading}
        className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold px-6 py-3"
      >
        {loading ? 'Publishing...' : 'Publish Blog'}
      </Button>
    </div>
  )
}

export default Page