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
    <section id="blog" className="py-20 md:py-28 px-6 border-t border-border">
      <div className="max-w-5xl mx-auto">
        <ScrollReveal>
          <div className="flex items-end justify-between mb-12">
            <h2 className="font-[family-name:var(--font-serif)] text-4xl md:text-5xl font-bold text-foreground">Blog</h2>
            <a
              href="/blog"
              className="text-sm text-primary hover:text-secondary transition-colors font-medium"
            >
              View all posts →
            </a>
          </div>
        </ScrollReveal>

        <div className="grid md:grid-cols-3 gap-6">
          {posts.map((post, index) => (
            <ScrollReveal key={post._id} delay={index > 0 ? 100 : 0}>
              <a
                href={`/blog/${post.slug.current}`}
                className="group block bg-surface rounded overflow-hidden border border-border hover:border-primary transition-colors h-full"
                aria-label={`Read: ${post.title}`}
              >
                {post.coverImage && (
                  <div className="overflow-hidden aspect-video">
                    <Image
                      src={urlFor(post.coverImage).width(400).height(225).url()}
                      alt={post.title}
                      width={400}
                      height={225}
                      className="w-full object-cover group-hover:scale-102 transition-transform duration-300"
                    />
                  </div>
                )}
                <div className="p-5">
                  <time className="text-xs text-muted" dateTime={post.publishedAt}>{formatDate(post.publishedAt)}</time>
                  <h3 className="font-[family-name:var(--font-serif)] text-lg font-semibold mt-2 mb-2 group-hover:text-primary transition-colors">
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
                          className="text-[10px] bg-bg text-muted px-2 py-0.5 rounded"
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
