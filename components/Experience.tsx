import { PortableText } from "@portabletext/react";
import { portableTextComponents } from "@/lib/portableText";
import { urlFor } from "@/sanity/lib/image";
import Image from "next/image";
import ScrollReveal from "./ScrollReveal";
import type { Experience as ExperienceType } from "@/sanity/types";

interface Props {
  experience: ExperienceType[];
}

function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
  });
}

export default function Experience({ experience }: Props) {
  if (!experience?.length) return null;

  return (
    <section id="experience" className="py-20 md:py-28 px-6 border-t border-border">
      <div className="max-w-5xl mx-auto">
        <div className="grid md:grid-cols-[200px_1fr] gap-8 md:gap-16">
          <ScrollReveal>
            <h2 className="font-[family-name:var(--font-serif)] text-4xl md:text-5xl font-bold text-foreground">Experience</h2>
          </ScrollReveal>

          <div className="space-y-0">
            {experience.map((exp, index) => (
              <ScrollReveal key={exp._id} delay={index > 0 ? 100 : 0}>
                <div className="relative pl-8 pb-12 last:pb-0 border-l border-border">
                  <div className="absolute -left-[5px] top-1.5 w-2.5 h-2.5 bg-primary rounded-full ring-4 ring-bg" />

                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-3">
                    <div className="flex items-center gap-3">
                      {exp.companyLogo && (
                        <Image
                          src={urlFor(exp.companyLogo).width(32).height(32).url()}
                          alt={exp.company}
                          width={32}
                          height={32}
                          className="rounded"
                        />
                      )}
                      <div>
                        <h3 className="font-[family-name:var(--font-serif)] text-lg font-semibold text-foreground">{exp.role}</h3>
                        <p className="text-muted text-sm">
                          {exp.company}
                          {exp.location && ` · ${exp.location}`}
                        </p>
                      </div>
                    </div>
                    <span className="text-xs text-muted mt-1 sm:mt-0">
                      {formatDate(exp.startDate)} – {exp.endDate ? formatDate(exp.endDate) : "Present"}
                    </span>
                  </div>

                  {exp.description && (
                    <div className="text-muted text-sm leading-relaxed prose-editorial">
                      <PortableText value={exp.description} components={portableTextComponents} />
                    </div>
                  )}

                  {exp.technologies && exp.technologies.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-3">
                      {exp.technologies.map((tech) => (
                        <span
                          key={tech._id}
                          className="text-xs bg-surface px-2.5 py-1 rounded text-muted border border-border"
                        >
                          {tech.name}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
