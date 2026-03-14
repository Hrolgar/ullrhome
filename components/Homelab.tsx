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
    <section id="homelab" className="py-24 px-6 bg-surface/50">
      <div className="max-w-6xl mx-auto">
        <ScrollReveal>
          <h2 className="text-3xl font-bold mb-2 gradient-text inline-block">Homelab</h2>
          <p className="text-muted mb-2">Self-hosted infrastructure and services</p>
          <div className="w-16 h-1 bg-primary rounded mb-12" />
        </ScrollReveal>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {Object.entries(categories).map(([category, items], catIndex) => (
            <ScrollReveal key={category} delay={catIndex * 100}>
              <div className="bg-bg rounded-xl p-6 border border-border card-glow">
                <h3 className="text-sm font-semibold text-primary uppercase tracking-wider mb-4">
                  {categoryLabels[category] || category}
                </h3>
                <div className="space-y-3">
                  {items.map((svc) => (
                    <div key={svc._id} className="flex items-center gap-3 group">
                      {svc.icon && (
                        <Image
                          src={urlFor(svc.icon).width(24).height(24).url()}
                          alt={svc.name}
                          width={24}
                          height={24}
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
                        <span className="text-[10px] text-accent bg-accent/10 px-1.5 py-0.5 rounded-full whitespace-nowrap">
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
