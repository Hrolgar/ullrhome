import {
  getAbout,
  getSkills,
  getExperience,
  getProjects,
  getContact,
  getCertifications,
  getHomelabServices,
  getFeaturedPosts,
} from "@/sanity/lib/queries";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Skills from "@/components/Skills";
import Experience from "@/components/Experience";
import Projects from "@/components/Projects";
import Certifications from "@/components/Certifications";
import Homelab from "@/components/Homelab";
import BlogPreview from "@/components/BlogPreview";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export const revalidate = 3600;

export default async function Home() {
  const [about, skills, experience, projects, contact, certifications, homelabServices, featuredPosts] =
    await Promise.all([
      getAbout(),
      getSkills(),
      getExperience(),
      getProjects(),
      getContact(),
      getCertifications(),
      getHomelabServices(),
      getFeaturedPosts(),
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
        <Certifications certifications={certifications} />
        <Homelab services={homelabServices} />
        <BlogPreview posts={featuredPosts} />
        <Contact contact={contact} />
      </main>
      <Footer />
    </>
  );
}
