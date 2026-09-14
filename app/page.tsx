import Navbar from "@/components/layout/Navbar";
import Hero from "@/components/landing/Hero";
import Footer from "@/components/layout/Footer";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col">
      <Navbar />
      <Hero />
      <Footer />
    </main>
  );
}