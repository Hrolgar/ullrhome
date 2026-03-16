import { urlFor } from "@/sanity/lib/image";
import Image from "next/image";
import ScrollReveal from "./ScrollReveal";
import type { Project } from "@/sanity/types";

interface Props {
  projects: Project[];
}

export default function Projects({ projects }: Props) {
  if (!projects?.length) return null;

  return (
    <section id="projects" className="py-20 md:py-28 px-6 border-t border-border">
      <div className="max-w-5xl mx-auto">
        <ScrollReveal>
          <h2 className="font-[family-name:var(--font-serif)] text-4xl md:text-5xl font-bold text-foreground mb-12">Projects</h2>
        </ScrollReveal>

        <div className="grid md:grid-cols-2 gap-6">
          {projects.map((project, index) => (
            <ScrollReveal key={project._id} delay={index > 1 ? 100 : 0}>
              <div className="bg-surface rounded overflow-hidden border border-border hover:border-primary transition-colors group h-full flex flex-col">
                {project.image && (
                  <div className="overflow-hidden">
                    <Image
                      src={urlFor(project.image).width(600).height(340).url()}
                      alt={project.title}
                      width={600}
                      height={340}
                      className="w-full object-cover group-hover:scale-102 transition-transform duration-300"
                    />
                  </div>
                )}
                <div className="p-6 flex flex-col flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="font-[family-name:var(--font-serif)] text-xl font-semibold">{project.title}</h3>
                    {project.featured && (
                      <span className="text-[10px] uppercase tracking-wider bg-accent/15 text-accent px-2 py-0.5 rounded font-medium">
                        Featured
                      </span>
                    )}
                  </div>

                  {project.summary && (
                    <p className="text-muted text-sm mb-4 flex-1">{project.summary}</p>
                  )}

                  {project.technologies && project.technologies.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.technologies.map((tech) => (
                        <span
                          key={tech._id}
                          className="text-xs bg-surface-hover px-2.5 py-1 rounded text-muted"
                        >
                          {tech.name}
                        </span>
                      ))}
                    </div>
                  )}

                  <div className="flex gap-4 mt-auto pt-2">
                    {project.slug?.current && (
                      <a
                        href={`/projects/${project.slug.current}`}
                        className="text-sm text-primary hover:text-secondary transition-colors font-medium"
                      >
                        Read More →
                      </a>
                    )}
                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-muted hover:text-foreground transition-colors"
                      >
                        GitHub
                      </a>
                    )}
                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-muted hover:text-foreground transition-colors"
                      >
                        Live
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
