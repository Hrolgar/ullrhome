import type { Skill } from "@/sanity/types";

interface Props {
  skills: Skill[];
}

export default function Skills({ skills }: Props) {
  if (!skills?.length) return null;

  return (
    <section id="skills" className="py-8 px-6 border-t border-border">
      <div className="max-w-5xl mx-auto flex flex-col md:flex-row gap-4 md:gap-8">
        <span className="text-xs font-semibold uppercase tracking-wider text-muted whitespace-nowrap pt-1">
          Technologies
        </span>
        <div className="flex flex-wrap gap-2">
          {skills.map((skill) => (
            <span
              key={skill._id}
              className="text-sm text-muted hover:text-foreground transition-colors"
            >
              {skill.name}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
