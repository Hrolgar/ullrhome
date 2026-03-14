import { urlFor } from "@/sanity/lib/image";
import Image from "next/image";
import ScrollReveal from "./ScrollReveal";
import type { Post } from "@/sanity/types";

interface Props {
  posts: Post[];
}

function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default function BlogPreview({ posts }: Props) {
  if (!posts?.length) return null;

  return (
    <section id="blog" className="py-24 px-6 bg-surface/50">
      <div className="max-w-6xl mx-auto">
        <ScrollReveal>
          <div className="flex items-end justify-between mb-12">
            <div>
              <h2 className="text-3xl font-bold mb-2 gradient-text inline-block">Blog</h2>
              <div className="w-16 h-1 bg-primary rounded" />
            </div>
            <a
              href="/blog"
              className="text-sm text-primary hover:text-foreground transition-colors font-medium"
            >
              View all posts →
            </a>
          </div>
        </ScrollReveal>

        <div className="grid md:grid-cols-3 gap-6">
          {posts.map((post, index) => (
            <ScrollReveal key={post._id} delay={index * 100}>
              <a
                href={`/blog/${post.slug.current}`}
                className="group block bg-bg rounded-xl overflow-hidden border border-border card-glow h-full"
                aria-label={`Read: ${post.title}`}
              >
                {post.coverImage && (
                  <div className="overflow-hidden aspect-video">
                    <Image
                      src={urlFor(post.coverImage).width(400).height(225).url()}
                      alt={post.title}
                      width={400}
                      height={225}
                      className="w-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                )}
                <div className="p-5">
                  <time className="text-xs text-muted" dateTime={post.publishedAt}>{formatDate(post.publishedAt)}</time>
                  <h3 className="text-lg font-semibold mt-2 mb-2 group-hover:text-primary transition-colors">
                    {post.title}
                  </h3>
                  {post.excerpt && (
                    <p className="text-muted text-sm line-clamp-2">{post.excerpt}</p>
                  )}
                  {post.categories && post.categories.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-3">
                      {post.categories.map((cat) => (
                        <span
                          key={cat._id}
                          className="text-[10px] bg-surface text-accent px-2 py-0.5 rounded-full border border-border"
                        >
                          {cat.title}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </a>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
