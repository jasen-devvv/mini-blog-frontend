import Blog from "@/components/layout/Blog";
import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";

export default function Home() {
  return (
    <div className="container max-w-screen-md mx-auto flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">
        <Blog />
      </main>
      <Footer />
    </div>
  );
}
