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
    <section id="skills" className="py-24 px-6 bg-surface/50">
      <div className="max-w-6xl mx-auto">
        <ScrollReveal>
          <h2 className="text-3xl font-bold mb-2 gradient-text inline-block">Skills</h2>
          <div className="w-16 h-1 bg-primary rounded mb-12" />
        </ScrollReveal>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
          {Object.entries(categories).map(([category, items], catIndex) => (
            <ScrollReveal key={category} delay={catIndex * 100}>
              <h3 className="text-lg font-semibold mb-4 text-foreground">
                {categoryLabels[category] || category}
              </h3>
              <div className="space-y-3">
                {items.map((skill) => (
                  <div key={skill._id} className="group">
                    <div className="flex items-center gap-3 mb-1">
                      {skill.icon && (
                        <Image
                          src={urlFor(skill.icon).width(20).height(20).url()}
                          alt={skill.name}
                          width={20}
                          height={20}
                          className="opacity-70 group-hover:opacity-100 transition-opacity"
                        />
                      )}
                      <span className="text-sm text-muted group-hover:text-foreground transition-colors">
                        {skill.name}
                      </span>
                      {skill.proficiency && (
                        <span className="ml-auto text-xs text-muted">
                          {skill.proficiency}/5
                        </span>
                      )}
                    </div>
                    {skill.proficiency && (
                      <div className="h-1 bg-bg rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-primary to-secondary rounded-full proficiency-bar"
                          style={{ "--bar-width": `${(skill.proficiency / 5) * 100}%` } as React.CSSProperties}
                        />
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
