import { urlFor } from "@/sanity/lib/image";
import Image from "next/image";

interface Project {
  _id: string;
  title: string;
  slug?: { current: string };
  summary?: string;
  image?: any;
  technologies?: { _id: string; name: string }[];
  githubUrl?: string;
  liveUrl?: string;
  featured?: boolean;
}

interface Props {
  projects: Project[];
}

export default function Projects({ projects }: Props) {
  if (!projects?.length) return null;

  return (
    <section id="projects" className="py-24 px-6 bg-surface">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold mb-12 text-primary">Projects</h2>
        <div className="grid md:grid-cols-2 gap-8">
          {projects.map((project) => (
            <div
              key={project._id}
              className="bg-bg rounded-xl overflow-hidden border border-surface hover:border-primary transition-colors"
            >
              {project.image && (
                <Image
                  src={urlFor(project.image).width(600).height(340).url()}
                  alt={project.title}
                  width={600}
                  height={340}
                  className="w-full object-cover"
                />
              )}
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
                {project.summary && (
                  <p className="text-muted mb-4">{project.summary}</p>
                )}
                {project.technologies?.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.technologies.map((tech) => (
                      <span
                        key={tech._id}
                        className="text-xs bg-surface px-2 py-1 rounded text-accent"
                      >
                        {tech.name}
                      </span>
                    ))}
                  </div>
                )}
                <div className="flex gap-4">
                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-primary hover:underline"
                    >
                      GitHub
                    </a>
                  )}
                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-primary hover:underline"
                    >
                      Live Demo
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
