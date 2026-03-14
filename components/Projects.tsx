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
    <section id="projects" className="py-24 px-6 bg-surface/50">
      <div className="max-w-6xl mx-auto">
        <ScrollReveal>
          <h2 className="text-3xl font-bold mb-2 gradient-text inline-block">Projects</h2>
          <div className="w-16 h-1 bg-primary rounded mb-12" />
        </ScrollReveal>

        <div className="grid md:grid-cols-2 gap-6">
          {projects.map((project, index) => (
            <ScrollReveal key={project._id} delay={index * 100}>
              <div className="bg-bg rounded-xl overflow-hidden border border-border card-glow group h-full flex flex-col">
                {project.image && (
                  <div className="overflow-hidden">
                    <Image
                      src={urlFor(project.image).width(600).height(340).url()}
                      alt={project.title}
                      width={600}
                      height={340}
                      className="w-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                )}
                <div className="p-6 flex flex-col flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="text-xl font-semibold">{project.title}</h3>
                    {project.featured && (
                      <span className="text-[10px] uppercase tracking-wider bg-primary/20 text-primary px-2 py-0.5 rounded-full font-medium">
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
                          className="text-xs bg-surface px-2.5 py-1 rounded-full text-accent border border-border"
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
                        className="text-sm text-primary hover:text-foreground transition-colors font-medium"
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
