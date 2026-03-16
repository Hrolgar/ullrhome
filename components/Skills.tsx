import { urlFor } from "@/sanity/lib/image";
import Image from "next/image";
import ScrollReveal from "./ScrollReveal";
import type { Skill } from "@/sanity/types";

interface Props {
  skills: Skill[];
}

const categoryLabels: Record<string, string> = {
  language: "Languages",
  framework: "Frameworks",
  tool: "Tools",
  platform: "Platforms",
  database: "Databases",
  devops: "DevOps",
  other: "Other",
};

export default function Skills({ skills }: Props) {
  if (!skills?.length) return null;

  const categories = skills.reduce<Record<string, Skill[]>>((acc, skill) => {
    const cat = skill.category || "other";
    if (!acc[cat]) acc[cat] = [];
    acc[cat].push(skill);
    return acc;
  }, {});

  return (
    <section id="skills" className="py-20 md:py-28 px-6">
      <div className="max-w-5xl mx-auto">
        <ScrollReveal>
          <h2 className="font-[family-name:var(--font-serif)] text-4xl md:text-5xl font-bold text-foreground mb-12">Skills</h2>
        </ScrollReveal>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
          {Object.entries(categories).map(([category, items], catIndex) => (
            <ScrollReveal key={category} delay={catIndex > 2 ? 100 : 0}>
              <h3 className="text-xs font-semibold uppercase tracking-wider text-muted mb-3">
                {categoryLabels[category] || category}
              </h3>
              <div className="flex flex-wrap gap-2">
                {items.map((skill) => (
                  <span
                    key={skill._id}
                    className="inline-flex items-center gap-1.5 text-sm bg-surface px-3 py-1.5 rounded text-foreground border border-border"
                  >
                    {skill.icon && (
                      <Image
                        src={urlFor(skill.icon).width(16).height(16).url()}
                        alt=""
                        width={16}
                        height={16}
                        className="opacity-70"
                      />
                    )}
                    {skill.name}
                  </span>
                ))}
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
