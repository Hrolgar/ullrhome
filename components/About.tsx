import { PortableText } from "@portabletext/react";
import ScrollReveal from "./ScrollReveal";
import type { About as AboutType } from "@/sanity/types";

interface Props {
  about: AboutType | null;
}

export default function About({ about }: Props) {
  if (!about?.body) return null;

  return (
    <section id="about" className="py-24 px-6">
      <div className="max-w-4xl mx-auto">
        <ScrollReveal>
          <h2 className="text-3xl font-bold mb-2 gradient-text inline-block">About Me</h2>
          <div className="w-16 h-1 bg-primary rounded mb-8" />
        </ScrollReveal>
        <ScrollReveal delay={100}>
          <div className="prose-dark leading-relaxed text-lg">
            <PortableText value={about.body} />
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
