import { urlFor } from "@/sanity/lib/image";
import Image from "next/image";

interface Props {
  about: any;
}

export default function Hero({ about }: Props) {
  return (
    <section className="min-h-screen flex items-center justify-center pt-20 px-6">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-12">
        <div className="flex-1 text-center md:text-left">
          <h1 className="text-5xl md:text-7xl font-bold mb-6">
            {about?.heading || "Hello, I'm Hrolgar"}
          </h1>
          <p className="text-xl text-muted max-w-xl">
            {about?.tagline || "Developer, homelab enthusiast, and builder of things."}
          </p>
        </div>
        {about?.profileImage && (
          <div className="flex-shrink-0">
            <Image
              src={urlFor(about.profileImage).width(400).height(400).url()}
              alt="Profile"
              width={400}
              height={400}
              className="rounded-full border-4 border-primary"
              priority
            />
          </div>
        )}
      </div>
    </section>
  );
}
