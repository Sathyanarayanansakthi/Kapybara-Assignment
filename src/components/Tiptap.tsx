'use client'

import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Underline from '@tiptap/extension-underline'
import TextAlign from '@tiptap/extension-text-align'
import Image from '@tiptap/extension-image'
import Link from '@tiptap/extension-link'
import Highlight from '@tiptap/extension-highlight'
import CodeBlockLowlight from '@tiptap/extension-code-block-lowlight'
import { common, createLowlight } from 'lowlight'
import { useEffect, useRef, useState } from 'react'
import {
  Bold,
  Italic,
  Underline as UnderlineIcon,
  Quote,
  List,
  ListOrdered,
  Code,
  ImageIcon,
  LinkIcon,
  Unlink,
  AlignLeft,
  AlignCenter,
  AlignRight,
  AlignJustify,
  Highlighter,
  Heading1,
  Heading2,
  Undo2,
  Redo2,
} from 'lucide-react'

const lowlight = createLowlight(common)

type Props = {
  content: string
  setContent: (html: string) => void
}

export default function Tiptap({ content, setContent }: Props) {
  const [mounted, setMounted] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => setMounted(true), [])

  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      Highlight.configure({ multicolor: true }),
      TextAlign.configure({ types: ['heading', 'paragraph'] }),
      Image.configure({ inline: false }),
      Link.configure({ openOnClick: true }),
      CodeBlockLowlight.configure({ lowlight }),
    ],
    content,
    onUpdate: ({ editor }) => setContent(editor.getHTML()),
    editorProps: {
      attributes: {
        class: 'prose min-h-[300px] max-w-none focus:outline-none dark:prose-invert',
      },
    },
    autofocus: true,
    editable: true,
    immediatelyRender: false,
  })

  const insertLocalImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    const reader = new FileReader()
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        editor?.chain().focus().setImage({ src: reader.result }).run()
      }
    }
    reader.readAsDataURL(file)
  }

  const buttonClass = (active: boolean) =>
    `flex items-center justify-center p-2 rounded-md border hover:bg-accent transition ${
      active ? 'bg-accent text-primary font-semibold' : 'text-muted-foreground'
    }`

  if (!mounted || !editor) return <div>Loading editor...</div>

  return (
    <div className="space-y-4 border rounded-md bg-white dark:bg-zinc-900 p-4">
      {/* Toolbar */}
      <div className="flex flex-wrap gap-2 border-b pb-3">
        {/* Undo/Redo */}
        <button title="Undo" onClick={() => editor.chain().focus().undo().run()} className={buttonClass(false)}><Undo2 size={16} /></button>
        <button title="Redo" onClick={() => editor.chain().focus().redo().run()} className={buttonClass(false)}><Redo2 size={16} /></button>

        {/* Format */}
        <button title="Bold" onClick={() => editor.chain().focus().toggleBold().run()} className={buttonClass(editor.isActive('bold'))}><Bold size={16} /></button>
        <button title="Italic" onClick={() => editor.chain().focus().toggleItalic().run()} className={buttonClass(editor.isActive('italic'))}><Italic size={16} /></button>
        <button title="Underline" onClick={() => editor.chain().focus().toggleUnderline().run()} className={buttonClass(editor.isActive('underline'))}><UnderlineIcon size={16} /></button>
        <button title="Strike" onClick={() => editor.chain().focus().toggleStrike().run()} className={buttonClass(editor.isActive('strike'))}>S</button>

        {/* Highlight Colors */}
        <button title="Highlight Yellow" onClick={() => editor.chain().focus().toggleHighlight({ color: 'yellow' }).run()} className={buttonClass(editor.isActive('highlight', { color: 'yellow' }))}><Highlighter size={16} /></button>
        <button title="Highlight Green" onClick={() => editor.chain().focus().toggleHighlight({ color: 'lightgreen' }).run()} className={buttonClass(editor.isActive('highlight', { color: 'lightgreen' }))}>🟩</button>
        <button title="Highlight Pink" onClick={() => editor.chain().focus().toggleHighlight({ color: 'pink' }).run()} className={buttonClass(editor.isActive('highlight', { color: 'pink' }))}>🩷</button>

        {/* Headings */}
        <button title="Heading 1" onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()} className={buttonClass(editor.isActive('heading', { level: 1 }))}><Heading1 size={16} /></button>
        <button title="Heading 2" onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()} className={buttonClass(editor.isActive('heading', { level: 2 }))}><Heading2 size={16} /></button>

        {/* Lists */}
        <button title="Bullet List" onClick={() => editor.chain().focus().toggleBulletList().run()} className={buttonClass(editor.isActive('bulletList'))}><List size={16} /></button>
        <button title="Ordered List" onClick={() => editor.chain().focus().toggleOrderedList().run()} className={buttonClass(editor.isActive('orderedList'))}><ListOrdered size={16} /></button>

        {/* Align */}
        <button title="Align Left" onClick={() => editor.chain().focus().setTextAlign('left').run()} className={buttonClass(editor.isActive({ textAlign: 'left' }))}><AlignLeft size={16} /></button>
        <button title="Align Center" onClick={() => editor.chain().focus().setTextAlign('center').run()} className={buttonClass(editor.isActive({ textAlign: 'center' }))}><AlignCenter size={16} /></button>
        <button title="Align Right" onClick={() => editor.chain().focus().setTextAlign('right').run()} className={buttonClass(editor.isActive({ textAlign: 'right' }))}><AlignRight size={16} /></button>
        <button title="Justify" onClick={() => editor.chain().focus().setTextAlign('justify').run()} className={buttonClass(editor.isActive({ textAlign: 'justify' }))}><AlignJustify size={16} /></button>

        {/* Blocks */}
        <button title="Blockquote" onClick={() => editor.chain().focus().toggleBlockquote().run()} className={buttonClass(editor.isActive('blockquote'))}><Quote size={16} /></button>
        <button title="Code Block" onClick={() => editor.chain().focus().toggleCodeBlock().run()} className={buttonClass(editor.isActive('codeBlock'))}><Code size={16} /></button>

        {/* Image Upload */}
        <button title="Insert Image" onClick={() => fileInputRef.current?.click()} className={buttonClass(false)}><ImageIcon size={16} /></button>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={insertLocalImage}
          className="hidden"
          aria-hidden="true"
        />

        {/* Links */}
        <button title="Insert Link" onClick={() => {
          const url = prompt('Enter link URL')
          if (url) editor.chain().focus().extendMarkRange('link').setLink({ href: url }).run()
        }} className={buttonClass(false)}><LinkIcon size={16} /></button>

        <button title="Remove Link" onClick={() => editor.chain().focus().unsetLink().run()} className={buttonClass(false)}><Unlink size={16} /></button>
      </div>

      {/* Editor Content */}
      <EditorContent editor={editor} />
    </div>
  )
}