import { Hero } from "@/components/sections/hero";
import { About } from "@/components/sections/about";
import { Projects } from "@/components/sections/projects";
import { Community } from "@/components/sections/community";
import { Contact } from "@/components/sections/contact";
import { QuoteStrip } from "@/components/quote-strip";

export default function Home() {
  return (
    <>
      <Hero />
      <QuoteStrip />
      <About />
      <Projects />
      <Community />
      <Contact />
    </>
  );
}
