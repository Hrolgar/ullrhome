import { notFound } from "next/navigation";
import { PortableText } from "@portabletext/react";
import Image from "next/image";
import { getPostBySlug, getPostSlugs } from "@/sanity/lib/queries";
import { urlFor } from "@/sanity/lib/image";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import type { Metadata } from "next";
import type { PortableTextComponents } from "@portabletext/react";

export const revalidate = 3600;

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const slugs = await getPostSlugs();
  return slugs.map((s) => ({ slug: s.slug.current }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) return { title: "Post Not Found" };
  return {
    title: `${post.title} | Ullrhome Blog`,
    description: post.excerpt || post.title,
    openGraph: {
      title: post.title,
      description: post.excerpt || post.title,
      type: "article",
      publishedTime: post.publishedAt,
      ...(post.coverImage && {
        images: [{ url: urlFor(post.coverImage).width(1200).height(630).url() }],
      }),
    },
  };
}

const portableTextComponents: PortableTextComponents = {
  types: {
    image: ({ value }) => {
      if (!value?.asset) return null;
      return (
        <figure className="my-8">
          <Image
            src={urlFor(value).width(800).url()}
            alt={value.alt || ""}
            width={800}
            height={450}
            className="w-full rounded-lg border border-border"
          />
          {value.caption && (
            <figcaption className="text-center text-sm text-muted mt-3">
              {value.caption}
            </figcaption>
          )}
        </figure>
      );
    },
  },
};

function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) notFound();

  return (
    <>
      <Navbar />
      <main className="pt-24 pb-16 px-6">
        <article className="max-w-3xl mx-auto">
          {/* Back link */}
          <a
            href="/blog"
            className="text-sm text-muted hover:text-primary transition-colors mb-8 inline-block"
          >
            ← Back to blog
          </a>

          {/* Header */}
          <header className="mb-10">
            <div className="flex items-center gap-3 mb-4">
              <time className="text-sm text-muted">{formatDate(post.publishedAt)}</time>
              {post.categories && post.categories.length > 0 && (
                <>
                  <span className="text-border">·</span>
                  <div className="flex gap-2">
                    {post.categories.map((cat) => (
                      <span
                        key={cat._id}
                        className="text-xs bg-surface text-accent px-2.5 py-0.5 rounded-full border border-border"
                      >
                        {cat.title}
                      </span>
                    ))}
                  </div>
                </>
              )}
            </div>

            <h1 className="text-4xl md:text-5xl font-bold mb-4 leading-tight">
              {post.title}
            </h1>

            {post.excerpt && (
              <p className="text-lg text-muted">{post.excerpt}</p>
            )}
          </header>

          {/* Cover image */}
          {post.coverImage && (
            <div className="mb-10 rounded-xl overflow-hidden border border-border">
              <Image
                src={urlFor(post.coverImage).width(1200).height(630).url()}
                alt={post.title}
                width={1200}
                height={630}
                className="w-full object-cover"
                priority
              />
            </div>
          )}

          {/* Body */}
          {post.body && (
            <div className="prose-dark text-lg leading-relaxed">
              <PortableText value={post.body} components={portableTextComponents} />
            </div>
          )}

          {/* Tags */}
          {post.tags && post.tags.length > 0 && (
            <div className="mt-12 pt-8 border-t border-border">
              <div className="flex flex-wrap gap-2">
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-xs bg-surface text-muted px-3 py-1.5 rounded-full border border-border"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          )}
        </article>
      </main>
      <Footer />
    </>
  );
}
