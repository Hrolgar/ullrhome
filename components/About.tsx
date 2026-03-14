import { PortableText } from "@portabletext/react";

interface Props {
  about: any;
}

export default function About({ about }: Props) {
  if (!about) return null;

  return (
    <section id="about" className="py-24 px-6">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold mb-8 text-primary">About Me</h2>
        <div className="prose prose-invert max-w-none text-muted leading-relaxed">
          {about.body ? (
            <PortableText value={about.body} />
          ) : (
            <p>About section content — edit this in Sanity Studio.</p>
          )}
        </div>
      </div>
    </section>
  );
}
