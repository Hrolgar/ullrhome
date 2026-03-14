import { notFound } from "next/navigation";
import { PortableText } from "@portabletext/react";
import Image from "next/image";
import { getProjectBySlug, getProjectSlugs } from "@/sanity/lib/queries";
import { urlFor } from "@/sanity/lib/image";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import type { Metadata } from "next";

export const revalidate = 3600;

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const slugs = await getProjectSlugs();
  return slugs.map((s) => ({ slug: s.slug.current }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);
  if (!project) return { title: "Project Not Found" };
  return {
    title: `${project.title} | Ullrhome`,
    description: project.summary || `${project.title} — project by Hrolgar`,
    openGraph: project.image
      ? { images: [{ url: urlFor(project.image).width(1200).height(630).url() }] }
      : undefined,
  };
}

export default async function ProjectPage({ params }: PageProps) {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);
  if (!project) notFound();

  return (
    <>
      <Navbar />
      <main className="pt-24 pb-16 px-6">
        <article className="max-w-4xl mx-auto">
          {/* Back link */}
          <a
            href="/#projects"
            className="text-sm text-muted hover:text-primary transition-colors mb-8 inline-block"
          >
            ← Back to projects
          </a>

          {/* Header */}
          <h1 className="text-4xl md:text-5xl font-bold mb-4 gradient-text">
            {project.title}
          </h1>

          {project.summary && (
            <p className="text-lg text-muted mb-6">{project.summary}</p>
          )}

          {/* Links */}
          <div className="flex gap-4 mb-8">
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 bg-surface border border-border rounded-lg text-sm text-muted hover:text-foreground hover:border-primary transition-all"
              >
                View on GitHub
              </a>
            )}
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 bg-primary text-white rounded-lg text-sm hover:opacity-90 transition-opacity"
              >
                Live Demo
              </a>
            )}
          </div>

          {/* Technologies */}
          {project.technologies && project.technologies.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-8">
              {project.technologies.map((tech) => (
                <span
                  key={tech._id}
                  className="text-xs bg-surface px-3 py-1.5 rounded-full text-accent border border-border"
                >
                  {tech.name}
                </span>
              ))}
            </div>
          )}

          {/* Cover image */}
          {project.image && (
            <div className="mb-10 rounded-xl overflow-hidden border border-border">
              <Image
                src={urlFor(project.image).width(1200).height(630).url()}
                alt={project.title}
                width={1200}
                height={630}
                className="w-full object-cover"
                priority
              />
            </div>
          )}

          {/* Body */}
          {project.description && (
            <div className="prose-dark text-lg leading-relaxed">
              <PortableText value={project.description} />
            </div>
          )}
        </article>
      </main>
      <Footer />
    </>
  );
}
