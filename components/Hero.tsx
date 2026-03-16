import { urlFor } from "@/sanity/lib/image";
import Image from "next/image";
import type { About } from "@/sanity/types";

interface Props {
  about: About | null;
}

export default function Hero({ about }: Props) {
  const roles = about?.roles || [];
  const tagline = roles.length > 0 ? roles[0] : "Developer, homelab enthusiast, and builder of things.";

  return (
    <section className="pt-32 pb-20 md:pt-40 md:pb-28 px-6">
      <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center md:items-start gap-12 md:gap-16">
        <div className="flex-1 text-center md:text-left animate-fade-in-up">
          <h1 className="font-[family-name:var(--font-serif)] text-4xl md:text-5xl lg:text-6xl font-bold mb-4 leading-tight text-foreground">
            {about?.heading || "Hello, I'm Hrolgar"}
          </h1>

          <p className="text-lg md:text-xl text-muted mb-6">
            {tagline}
          </p>

          <p className="text-base text-muted max-w-xl mb-8 animate-fade-in-up animate-delay-100">
            {about?.tagline || "Building things that matter with code, curiosity, and a homelab."}
          </p>

          <div className="flex gap-4 justify-center md:justify-start animate-fade-in-up animate-delay-100">
            <a
              href="#projects"
              className="px-6 py-3 bg-primary text-white rounded font-medium hover:bg-secondary transition-colors"
            >
              View Projects
            </a>
            <a
              href="#contact"
              className="px-6 py-3 border border-primary text-primary rounded font-medium hover:bg-primary hover:text-white transition-colors"
            >
              Get in Touch
            </a>
            {about?.resumeFile?.asset?.url && (
              <a
                href={about.resumeFile.asset.url}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 border border-border rounded font-medium text-muted hover:text-foreground hover:border-foreground transition-colors"
              >
                Resume
              </a>
            )}
          </div>
        </div>

        <div className="flex-shrink-0 animate-fade-in-up animate-delay-100">
          {about?.profileImage ? (
            <Image
              src={urlFor(about.profileImage).width(320).height(380).url()}
              alt={about?.heading || "Profile"}
              width={320}
              height={380}
              className="rounded object-cover border border-border"
              priority
            />
          ) : (
            <div className="w-[320px] h-[380px] rounded border border-border bg-surface flex items-center justify-center">
              <span className="text-6xl text-muted/30">?</span>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
