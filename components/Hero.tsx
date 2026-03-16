import type { About } from "@/sanity/types";

interface Props {
  about: About | null;
}

export default function Hero({ about }: Props) {
  const roles = about?.roles || [];
  const tagline = roles.length > 0 ? roles[0] : "Developer, homelab enthusiast, and builder of things.";

  return (
    <section className="min-h-screen flex flex-col items-center justify-center px-6 relative">
      <div className="text-center animate-fade-in-up">
        <h1 className="font-[family-name:var(--font-serif)] text-6xl md:text-8xl lg:text-9xl font-bold text-foreground leading-none tracking-tight">
          {about?.heading || "Hrolgar"}
        </h1>
        <p className="text-xl text-muted mt-6 font-[family-name:var(--font-sans)]">
          {tagline}
        </p>
      </div>

      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 animate-fade-in-up animate-delay-100">
        <div className="w-px h-12 bg-border mx-auto animate-pulse" />
      </div>
    </section>
  );
}
