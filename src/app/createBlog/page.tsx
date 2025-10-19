'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import React, { useState } from 'react'
import Tiptap from '@/components/Tiptap'
import { toast } from 'sonner'
import { trpc } from '@/lib/trpc'

const Page = () => {
  // these hold the data
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')

  const utils = trpc.useUtils()
  
  // this sends the blog to the database
  const createMutation = trpc.blog.create.useMutation({
    onSuccess: (data) => {
      // show success message
      toast.success('Blog Published! 🎉', {
        description: `"${data.title}" has been published successfully.`,
      })
      // clear the form
      setTitle('')
      setContent('')
      // refresh the blog list i think
      utils.blog.getAll.invalidate()
    },
    onError: (error) => {
      // if it fails show error
      toast.error('Failed to Publish', {
        description: error.message,
      })
    },
  })

  // this runs when you click publish
  const handleSubmit = async () => {
    // check if fields are empty
    if (!title.trim() || !content.trim()) {
      toast.error('Missing Fields', {
        description: 'Please provide both title and content.',
      })
      return
    }

    // show loading message
    const loadingToast = toast.loading('Publishing your blog post...')
    
    try {
      // try to create the blog
      await createMutation.mutateAsync({ title, content })
      toast.dismiss(loadingToast)
    } catch (error) {
      toast.dismiss(loadingToast)
      // error already handled above in onError
    }
  }

  return (
    <div className="p-6 space-y-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 text-transparent bg-clip-text">
        Create a Blog
      </h1>

      {/* title input box */}
      <Input
        placeholder="Title of the Blog"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="text-lg font-medium"
        type="text"
      />

      {/* text editor for writing blog */}
      <div className="bg-white text-black p-4 rounded-md shadow-md">
        <Tiptap content={content} setContent={setContent} />
      </div>

      {/* publish button */}
      <Button
        onClick={handleSubmit}
        disabled={!title.trim() || !content.trim() || createMutation.isPending}
        className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold px-6 py-3"
      >
        {createMutation.isPending ? 'Publishing...' : 'Publish Blog'}
      </Button>
    </div>
  )
}

export default Page