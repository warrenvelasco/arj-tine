import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Hero from "@/components/sections/Hero";
import Couple from "@/components/sections/Couple";
import Story from "@/components/sections/Story";
import Rsvp from "@/components/sections/Rsvp";
import Events from "@/components/sections/Events";

export default function Home() {
  return (
    <>
      <Header />
      <main className="flex-1">
        <Hero />
        <Couple />
        <Story />
        <Rsvp />
        <Events />
      </main>
      <Footer />
    </>
  );
}
