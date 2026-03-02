import { Toaster } from 'sonner'

export default function CreateBlogLayout({ 
  children 
}: { 
  children: React.ReactNode 
}) {
  return (
    <>
      {children}
      <Toaster position="top-right" richColors />
    </>
  )
}