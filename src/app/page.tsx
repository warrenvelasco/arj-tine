import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Hero from "@/components/sections/Hero";
import Couple from "@/components/sections/Couple";
import Story from "@/components/sections/Story";
import Gallery from "@/components/sections/Gallery";
import Rsvp from "@/components/sections/Rsvp";
import Events from "@/components/sections/Events";
import IntroGate from "@/components/intro/IntroGate";

export default function Home() {
  return (
    <IntroGate>
      <Header />
      <main className="flex-1">
        <Hero />
        <Couple />
        <Story />
        <Gallery />
        <Rsvp />
        <Events />
      </main>
      <Footer />
    </IntroGate>
  );
}
