import { urlFor } from "@/sanity/lib/image";
import Image from "next/image";
import HeroTyping from "./HeroClient";
import type { About } from "@/sanity/types";

interface Props {
  about: About | null;
}

export default function Hero({ about }: Props) {
  const roles = about?.roles || [];

  return (
    <section className="min-h-screen flex items-center justify-center pt-20 px-6 relative overflow-hidden">
      {/* Subtle gradient background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 -left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 -right-1/4 w-96 h-96 bg-secondary/5 rounded-full blur-3xl" />
      </div>

      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-12 relative z-10">
        <div className="flex-1 text-center md:text-left animate-fade-in-up">
          <h1 className="text-5xl md:text-7xl font-bold mb-4 leading-tight">
            <span className="gradient-text">
              {about?.heading || "Hello, I'm Hrolgar"}
            </span>
          </h1>

          {roles.length > 0 && (
            <p className="text-2xl md:text-3xl mb-6 h-10">
              <HeroTyping roles={roles} />
            </p>
          )}

          <p className="text-lg text-muted max-w-xl mb-8 animate-fade-in-up animate-delay-200">
            {about?.tagline || "Developer, homelab enthusiast, and builder of things."}
          </p>

          <div className="flex gap-4 justify-center md:justify-start animate-fade-in-up animate-delay-300">
            <a
              href="#projects"
              className="px-6 py-3 bg-primary text-white rounded-lg font-medium hover:opacity-90 transition-opacity"
            >
              View Projects
            </a>
            <a
              href="#contact"
              className="px-6 py-3 border border-border rounded-lg font-medium text-muted hover:text-foreground hover:border-primary transition-colors"
            >
              Get in Touch
            </a>
            {about?.resumeFile?.asset?.url && (
              <a
                href={about.resumeFile.asset.url}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 border border-border rounded-lg font-medium text-muted hover:text-foreground hover:border-accent transition-colors"
              >
                Resume
              </a>
            )}
          </div>
        </div>

        {about?.profileImage && (
          <div className="flex-shrink-0 animate-fade-in-up animate-delay-200">
            <div className="relative">
              <div className="absolute -inset-1 bg-gradient-to-r from-primary to-secondary rounded-full blur opacity-30" />
              <Image
                src={urlFor(about.profileImage).width(350).height(350).url()}
                alt="Profile"
                width={350}
                height={350}
                className="relative rounded-full border-2 border-border"
                priority
              />
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
