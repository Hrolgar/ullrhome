import { urlFor } from "@/sanity/lib/image";
import Image from "next/image";

interface Skill {
  _id: string;
  name: string;
  category: string;
  icon?: any;
  proficiency?: number;
}

interface Props {
  skills: Skill[];
}

export default function Skills({ skills }: Props) {
  if (!skills?.length) return null;

  const categories = skills.reduce<Record<string, Skill[]>>((acc, skill) => {
    const cat = skill.category || "other";
    if (!acc[cat]) acc[cat] = [];
    acc[cat].push(skill);
    return acc;
  }, {});

  return (
    <section id="skills" className="py-24 px-6 bg-surface">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold mb-12 text-primary">Skills</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {Object.entries(categories).map(([category, items]) => (
            <div key={category}>
              <h3 className="text-lg font-semibold mb-4 text-foreground capitalize">
                {category}
              </h3>
              <div className="flex flex-wrap gap-3">
                {items.map((skill) => (
                  <span
                    key={skill._id}
                    className="flex items-center gap-2 bg-bg px-3 py-2 rounded-lg text-sm text-muted hover:text-foreground transition-colors"
                  >
                    {skill.icon && (
                      <Image
                        src={urlFor(skill.icon).width(20).height(20).url()}
                        alt={skill.name}
                        width={20}
                        height={20}
                      />
                    )}
                    {skill.name}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
