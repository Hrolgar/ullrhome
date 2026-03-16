import { urlFor } from "@/sanity/lib/image";
import Image from "next/image";
import ScrollReveal from "./ScrollReveal";
import type { Certification } from "@/sanity/types";

interface Props {
  certifications: Certification[];
}

function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
  });
}

export default function Certifications({ certifications }: Props) {
  if (!certifications?.length) return null;

  return (
    <section id="certifications" className="py-20 md:py-28 px-6 border-t border-border">
      <div className="max-w-5xl mx-auto">
        <ScrollReveal>
          <h2 className="font-[family-name:var(--font-serif)] text-4xl md:text-5xl font-bold text-foreground mb-12">Certifications</h2>
        </ScrollReveal>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {certifications.map((cert, index) => (
            <ScrollReveal key={cert._id} delay={index > 2 ? 100 : 0}>
              <div className="bg-surface rounded p-6 border border-border hover:border-primary transition-colors h-full flex flex-col">
                <div className="flex items-start gap-4 mb-4">
                  {cert.badge && (
                    <Image
                      src={urlFor(cert.badge).width(48).height(48).url()}
                      alt={cert.name}
                      width={48}
                      height={48}
                      className="rounded"
                    />
                  )}
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-foreground text-sm leading-tight">{cert.name}</h3>
                    <p className="text-muted text-xs mt-1">{cert.issuer}</p>
                  </div>
                </div>

                <div className="mt-auto flex items-center justify-between">
                  {cert.issueDate && (
                    <span className="text-xs text-muted">
                      {formatDate(cert.issueDate)}
                      {cert.expiryDate && ` – ${formatDate(cert.expiryDate)}`}
                    </span>
                  )}
                  {cert.credentialUrl && (
                    <a
                      href={cert.credentialUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs text-primary hover:underline"
                    >
                      Verify
                    </a>
                  )}
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
