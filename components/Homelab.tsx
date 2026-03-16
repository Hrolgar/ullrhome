import { urlFor } from "@/sanity/lib/image";
import Image from "next/image";
import ScrollReveal from "./ScrollReveal";
import type { HomelabService } from "@/sanity/types";

interface Props {
  services: HomelabService[];
}

const categoryLabels: Record<string, string> = {
  virtualization: "Virtualization",
  networking: "Networking",
  storage: "Storage",
  media: "Media",
  security: "Security",
  monitoring: "Monitoring",
  development: "Development",
  identity: "Identity",
  automation: "Automation",
  other: "Other",
};

export default function Homelab({ services }: Props) {
  if (!services?.length) return null;

  const categories = services.reduce<Record<string, HomelabService[]>>((acc, svc) => {
    const cat = svc.category || "other";
    if (!acc[cat]) acc[cat] = [];
    acc[cat].push(svc);
    return acc;
  }, {});

  return (
    <section id="homelab" className="py-20 md:py-28 px-6 border-t border-border">
      <div className="max-w-5xl mx-auto">
        <ScrollReveal>
          <h2 className="font-[family-name:var(--font-serif)] text-4xl md:text-5xl font-bold text-foreground mb-2">Homelab</h2>
          <p className="text-muted mb-12">Self-hosted infrastructure and services</p>
        </ScrollReveal>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Object.entries(categories).map(([category, items], catIndex) => (
            <ScrollReveal key={category} delay={catIndex > 2 ? 100 : 0}>
              <div className="bg-surface rounded p-5 border border-border hover:border-primary transition-colors">
                <h3 className="text-xs font-semibold text-primary uppercase tracking-wider mb-4 pb-2 border-b border-border">
                  {categoryLabels[category] || category}
                </h3>
                <div className="space-y-2.5">
                  {items.map((svc) => (
                    <div key={svc._id} className="flex items-center gap-3 group">
                      {svc.icon && (
                        <Image
                          src={urlFor(svc.icon).width(20).height(20).url()}
                          alt={svc.name}
                          width={20}
                          height={20}
                          className="rounded opacity-70 group-hover:opacity-100 transition-opacity"
                        />
                      )}
                      <div className="flex-1 min-w-0">
                        <p className="text-sm text-foreground font-medium truncate">
                          {svc.url ? (
                            <a
                              href={svc.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="hover:text-primary transition-colors"
                            >
                              {svc.name}
                            </a>
                          ) : (
                            svc.name
                          )}
                        </p>
                        {svc.description && (
                          <p className="text-xs text-muted truncate">{svc.description}</p>
                        )}
                      </div>
                      {svc.selfHosted && (
                        <span className="text-[10px] text-accent bg-accent/10 px-1.5 py-0.5 rounded whitespace-nowrap font-medium">
                          Self-hosted
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
