"use client"

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useEffect, useState } from "react"
import axios from "axios";
import { format } from 'date-fns'

interface IUser {
  id: string;
  username: string
  email: string;
}

interface IArticle {
  id: number;
  title: string;
  content: string;
  user: IUser;
  created_at: string;
}

const formatDate = (dateString: string) => {
  return format(new Date(dateString), "EEEE, dd-MM-yyyy | HH:mm");
};

export default function Blog() {
  const [data, setData] = useState<IArticle[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/articles`);
        setData(response.data.data || []);
      } catch (error: any) {
        console.error("Fetch error:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-8">Latest Blog Posts</h1>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {data.length > 0 ? (
          data.map((post) => (
            <Card key={post.id} className="flex flex-col">
              <CardHeader>
                <CardTitle>{post.title}</CardTitle>
                <CardDescription>{formatDate(post.created_at)}</CardDescription>
              </CardHeader>
              <CardContent className="flex-grow">
                <p>{post.content}</p>
              </CardContent>
              <CardFooter className="flex justify-between items-center">
                <Badge variant="secondary">{post.user.username}</Badge>
                <a href={`/articles/${post.id}`} className="text-sm text-blue-500 hover:underline">
                  Read more
                </a>
              </CardFooter>
            </Card>
          ))
        ) : (
          <p className="text-center">No blog posts available.</p>
        )}
      </div>
    </div>
  );
}
