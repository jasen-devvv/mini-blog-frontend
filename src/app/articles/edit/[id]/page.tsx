import EditArticle from '@/components/layout/EditBlog'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

export default function CreateArticlePage() {
  return (
    <div className="container mx-auto px-4">
      <h1 className="text-2xl font-bold my-4">Create New Article <Button><Link href="/articles">Back</Link></Button></h1>
      <EditArticle />
    </div>
  )
}
