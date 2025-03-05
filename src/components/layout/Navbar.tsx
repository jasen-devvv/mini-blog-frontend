"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Link from "next/link";
import { Button } from "../ui/button";
import Image from "next/image";
import { useAuth } from "@/providers/auth-provider";

export default function Navbar() {
  const { token } = useAuth();

  return (
    <div className="bg-background">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <div className="flex items-center">
          <Link href="/" className="flex items-center gap-2">
            <Image
              src={"/logo.png"}
              alt="Logo"
              width={35}
              height={35}
              priority
            />
            <span className="font-semibold">Mimio Blog</span>
          </Link>
        </div>

        {token ? (
          <div>
            <DropdownMenu>
              <DropdownMenuTrigger>
                <Avatar>
                  <AvatarImage src="/profile.jpg" />
                  <AvatarFallback>PP</AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <Link href="/articles">Articles</Link>
                </DropdownMenuItem>
                <DropdownMenuItem>Logout</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        ) : (
          <div>
            <Link href="/login">
              <Button>Login</Button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
