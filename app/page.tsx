import { Hero } from "@/components/sections/hero";
import { QuoteStrip } from "@/components/quote-strip";
import { Projects } from "@/components/sections/projects";

// Landing page: the hero intro, the quote strip, then the Work bento. About and
// More now live on their own routes (/about, /more); Blog is at /blog.
export default function Home() {
  return (
    <>
      <Hero />
      <QuoteStrip />
      <Projects />
    </>
  );
}
