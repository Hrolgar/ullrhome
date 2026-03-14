import { getAbout, getSkills, getExperience, getProjects, getContact } from "@/sanity/lib/queries";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Skills from "@/components/Skills";
import Experience from "@/components/Experience";
import Projects from "@/components/Projects";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export const revalidate = 3600;

export default async function Home() {
  const [about, skills, experience, projects, contact] = await Promise.all([
    getAbout(),
    getSkills(),
    getExperience(),
    getProjects(),
    getContact(),
  ]);

  return (
    <>
      <Navbar />
      <main>
        <Hero about={about} />
        <About about={about} />
        <Skills skills={skills} />
        <Experience experience={experience} />
        <Projects projects={projects} />
        <Contact contact={contact} />
      </main>
      <Footer />
    </>
  );
}
