
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import { useAuth } from "@/providers/auth-provider"
import axios from "axios"
import {format} from 'date-fns'

async function getBlogDetail(id:string) {
  const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/articles/${id}`);
  return res.data.data;
}

export const formatDate = (dateString: string) => {
  return format(new Date(dateString), "EEEE, dd-MM-yyyy | HH:mm");
};

export default async function Article({ params }: { params: { id: string } }) {
  const {id} = params
  const article = await getBlogDetail(id)

  return (
    <div className="container mx-auto py-8 px-4">
      <Link href="/">
        <Button variant="outline" className="mb-6">
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to Blog
        </Button>
      </Link>

      <Card className="max-w-3xl mx-auto">
        <CardHeader>
          <div className="flex justify-between items-start mb-2">
            <CardDescription>{formatDate(article.created_at)}</CardDescription>
          </div>
          <CardTitle className="text-3xl mb-2">{article.title}</CardTitle>
          <CardDescription>By {article.user.username}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="prose max-w-none" dangerouslySetInnerHTML={{ __html: article.content }} />
        </CardContent>
      </Card>
    </div>
  )
}

