import { Hero } from "@/components/Hero";
import { About } from "@/components/About";
import { Experience } from "@/components/Experience";
import { Projects } from "@/components/Projects";

export default function Home() {
  // More sections (Skills, Contact) are added as we build them.
  return (
    <>
      <Hero />
      <About />
      <Experience />
      <Projects />
    </>
  );
}
