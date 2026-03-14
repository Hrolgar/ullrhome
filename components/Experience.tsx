import { PortableText } from "@portabletext/react";

interface ExperienceItem {
  _id: string;
  company: string;
  role: string;
  location?: string;
  startDate: string;
  endDate?: string;
  description?: any;
  technologies?: { _id: string; name: string }[];
}

interface Props {
  experience: ExperienceItem[];
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
        <h2 className="text-3xl font-bold mb-12 text-primary">Experience</h2>
        <div className="space-y-12">
          {experience.map((exp) => (
            <div
              key={exp._id}
              className="border-l-2 border-primary pl-6 relative"
            >
              <div className="absolute -left-[9px] top-0 w-4 h-4 bg-primary rounded-full" />
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-2">
                <div>
                  <h3 className="text-xl font-semibold">{exp.role}</h3>
                  <p className="text-muted">
                    {exp.company}
                    {exp.location && ` · ${exp.location}`}
                  </p>
                </div>
                <span className="text-sm text-muted mt-1 sm:mt-0">
                  {formatDate(exp.startDate)} –{" "}
                  {exp.endDate ? formatDate(exp.endDate) : "Present"}
                </span>
              </div>
              {exp.description && (
                <div className="text-muted mt-3 leading-relaxed">
                  <PortableText value={exp.description} />
                </div>
              )}
              {exp.technologies?.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-4">
                  {exp.technologies.map((tech) => (
                    <span
                      key={tech._id}
                      className="text-xs bg-surface px-2 py-1 rounded text-accent"
                    >
                      {tech.name}
                    </span>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
