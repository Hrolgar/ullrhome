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
    <section id="experience" className="py-24 px-6">
      <div className="max-w-4xl mx-auto">
        <ScrollReveal>
          <h2 className="text-3xl font-bold mb-2 gradient-text inline-block">Experience</h2>
          <div className="w-16 h-1 bg-primary rounded mb-12" />
        </ScrollReveal>

        <div className="space-y-0">
          {experience.map((exp, index) => (
            <ScrollReveal key={exp._id} delay={index * 100}>
              <div className="relative pl-8 pb-12 last:pb-0 border-l border-border">
                {/* Timeline dot */}
                <div className="absolute -left-[5px] top-1 w-2.5 h-2.5 bg-primary rounded-full ring-4 ring-bg" />

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
                      <h3 className="text-lg font-semibold text-foreground">{exp.role}</h3>
                      <p className="text-muted text-sm">
                        {exp.company}
                        {exp.location && ` · ${exp.location}`}
                      </p>
                    </div>
                  </div>
                  <span className="text-xs text-muted mt-1 sm:mt-0 bg-surface px-2 py-1 rounded">
                    {formatDate(exp.startDate)} – {exp.endDate ? formatDate(exp.endDate) : "Present"}
                  </span>
                </div>

                {exp.description && (
                  <div className="text-muted text-sm leading-relaxed prose-dark">
                    <PortableText value={exp.description} components={portableTextComponents} />
                  </div>
                )}

                {exp.technologies && exp.technologies.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-3">
                    {exp.technologies.map((tech) => (
                      <span
                        key={tech._id}
                        className="text-xs bg-surface px-2.5 py-1 rounded-full text-accent border border-border"
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
    </section>
  );
}
