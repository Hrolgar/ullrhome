import { PortableText } from "@portabletext/react";
import { portableTextComponents } from "@/lib/portableText";
import { urlFor } from "@/sanity/lib/image";
import Image from "next/image";
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
        <ScrollReveal>
          <div className="flex flex-col md:flex-row gap-10 md:gap-16">
            {about.profileImage && (
              <div className="md:w-2/5 flex-shrink-0">
                <Image
                  src={urlFor(about.profileImage).width(480).height(640).url()}
                  alt={about.heading || "Profile"}
                  width={480}
                  height={640}
                  className="rounded object-cover w-full max-h-80 md:max-h-none md:aspect-[3/4]"
                  priority
                />
              </div>
            )}
            <div className="md:w-3/5">
              <div className="prose-editorial leading-relaxed text-base">
                <PortableText value={about.body} components={portableTextComponents} />
              </div>
              {about.resumeFile?.asset?.url && (
                <a
                  href={about.resumeFile.asset.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block mt-6 text-sm text-primary hover:text-secondary transition-colors font-medium"
                >
                  Download resume →
                </a>
              )}
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
