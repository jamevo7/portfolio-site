import { Hero } from "@/components/sections/hero";
import { About } from "@/components/sections/about";
import { Projects } from "@/components/sections/projects";
import { Community } from "@/components/sections/community";
import { Skills } from "@/components/sections/skills";
import { Contact } from "@/components/sections/contact";
import { SectionDivider } from "@/components/section-divider";

export default function Home() {
  return (
    <>
      <Hero />
      <SectionDivider />
      <About />
      <SectionDivider />
      <Projects />
      <SectionDivider />
      <Community />
      <SectionDivider />
      <Skills />
      <SectionDivider />
      <Contact />
    </>
  );
}
