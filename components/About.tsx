import { PortableText } from "@portabletext/react";
import { portableTextComponents } from "@/lib/portableText";
import ScrollReveal from "./ScrollReveal";
import type { About as AboutType } from "@/sanity/types";

interface Props {
  about: AboutType | null;
}

export default function About({ about }: Props) {
  if (!about?.body) return null;

  return (
    <section id="about" className="py-20 md:py-28 px-6">
      <div className="max-w-5xl mx-auto">
        <div className="grid md:grid-cols-[200px_1fr] gap-8 md:gap-16">
          <ScrollReveal>
            <h2 className="font-[family-name:var(--font-serif)] text-4xl md:text-5xl font-bold text-foreground">About</h2>
          </ScrollReveal>
          <ScrollReveal delay={100}>
            <div className="prose-editorial leading-relaxed text-base">
              <PortableText value={about.body} components={portableTextComponents} />
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
