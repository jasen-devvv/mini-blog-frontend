"use client";

import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useAuth } from "@/providers/auth-provider";
import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";
import { toast } from "sonner";

interface IUser {
  id: string;
  username: string;
  email: string;
}

interface IArticle {
  id: number;
  title: string;
  content: string;
  user: IUser;
  created_at: string;
}

export default function ListBlog() {
  const { token, user } = useAuth();
  const [articles, setArticles] = useState<IArticle[]>([]);

  const handleDelete = async (id: number) => {
    if (!confirm("Apakah kamu yakin ingin menghapus artikel ini?")) return;

    try {
      const token = localStorage.getItem("token"); // Ambil token auth
      await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/articles/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      toast.success("Artikel berhasil dihapus!");
      setArticles(articles.filter((article) => article.id !== id)); // Hapus dari state
    } catch (error) {
      console.error(error);
      toast.error("Gagal menghapus artikel.");
    }
  };

  useEffect(() => {
    if (user?.id) {
      axios
        .get(`${process.env.NEXT_PUBLIC_API_URL}/articles/${user.id}/user`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => setArticles(res.data.data))
        .catch((err) => console.error(err));
    }
  }, [user]);

  return (
    <div className="container mx-auto px-4">
      <h1 className="text-2xl font-bold my-4">
        Article
        <Button asChild>
          <Link href="/">Back</Link>
        </Button>
        <Button asChild>
          <Link href="/articles/create">Create</Link>
        </Button>
      </h1>
      <Table>
        <TableCaption>A list of your recent articles.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Title</TableHead>
            <TableHead>Content</TableHead>
            <TableHead>Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {articles.length > 0 &&
            articles.map((article) => (
              <TableRow key={article.id}>
                <TableCell>{article.title}</TableCell>
                <TableCell className="font-medium">{article.content}</TableCell>
                <TableCell className="space-x-2">
                  {/* Tombol Edit */}
                  <Button variant="outline">
                    <Link href={`/articles/edit/${article.id}`}>Edit</Link>
                  </Button>

                  {/* Tombol Delete */}
                  <Button
                    variant="destructive"
                    onClick={() => handleDelete(article.id)}
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </div>
  );
}
