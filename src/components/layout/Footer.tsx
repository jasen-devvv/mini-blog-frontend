import { Separator } from "@/components/ui/separator"
import { Facebook, Twitter, Instagram, Github } from "lucide-react"
import Link from "next/link"

export default function Footer() {
  return (
    <footer className="bg-background border-t">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <p className="text-sm text-muted-foreground">© 2025 Mimio Blog. All rights reserved.</p>
          </div>
          <div className="flex space-x-4 mb-4 md:mb-0">
            <Link href="https://facebook.com" className="text-muted-foreground hover:text-primary">
              <Facebook size={20} />
              <span className="sr-only">Facebook</span>
            </Link>
            <Link href="https://twitter.com" className="text-muted-foreground hover:text-primary">
              <Twitter size={20} />
              <span className="sr-only">Twitter</span>
            </Link>
            <Link href="https://instagram.com" className="text-muted-foreground hover:text-primary">
              <Instagram size={20} />
              <span className="sr-only">Instagram</span>
            </Link>
            <Link href="https://github.com/jasen-devvv" className="text-muted-foreground hover:text-primary">
              <Github size={20} />
              <span className="sr-only">GitHub</span>
            </Link>
          </div>
        </div>

        <Separator className="my-4" />

        <div className="flex flex-col md:flex-row justify-center md:justify-between items-center">
          <nav className="flex flex-wrap justify-center md:justify-start gap-x-4 gap-y-2 text-sm">
            <Link href="/about" className="text-muted-foreground hover:text-primary">
              About
            </Link>
          </nav>
          <p className="mt-4 md:mt-0 text-sm text-muted-foreground">Made by <a href="https://github.com/jasen-devvv">Jasen</a> with ❤️ using Next.js and shadcn/ui</p>
        </div>
      </div>
    </footer>
  )
}

