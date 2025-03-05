"use client";

import type React from "react";
import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import axios from "axios";
import { useAuth } from "@/providers/auth-provider";

export default function EditArticle() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();
  const { token } = useAuth();
  const { id } = useParams(); // Ambil ID dari URL

  // Fetch artikel saat halaman dibuka
  useEffect(() => {
    const fetchArticle = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/articles/${id}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        if (response.status === 200) {
          setTitle(response.data.data.title);
          setContent(response.data.data.content);
        } else {
          toast.error("Failed to load article data.");
          router.push("/");
        }
      } catch (error) {
        toast.error("Error loading article.");
        router.push("/");
      }
    };

    fetchArticle();
  }, [id, token, router]);

  // Handle update artikel
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    if (!title.trim() || !content.trim()) {
      toast.error("Title and content are required.");
      setIsSubmitting(false);
      return;
    }

    try {
      const response = await axios.put(
        `${process.env.NEXT_PUBLIC_API_URL}/articles/${id}`,
        { title, content },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        toast.success("Article updated successfully!");
        router.push("/articles");
      } else {
        toast.error("Failed to update article.");
      }
    } catch (error) {
      toast.error("Error updating article.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card className="max-w-2xl mx-auto my-8">
      <CardHeader>
        <CardTitle>Edit Article</CardTitle>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="title" className="text-sm font-medium">
              Title
            </label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter the article title"
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="content" className="text-sm font-medium">
              Content
            </label>
            <Textarea
              id="content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Write your article content here"
              className="min-h-[200px]"
            />
          </div>
        </CardContent>
        <CardFooter className="mt-5">
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Updating..." : "Update Article"}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}
