import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function NotFound() {
  return (
    <>
      <Navbar />
      <main id="main-content" className="min-h-screen flex items-center justify-center px-6 relative overflow-hidden">
        {/* Background gradients matching hero */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/3 -left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
          <div className="absolute bottom-1/3 -right-1/4 w-96 h-96 bg-secondary/5 rounded-full blur-3xl" />
        </div>

        <div className="text-center relative z-10 animate-fade-in-up">
          <p className="text-sm font-medium text-primary uppercase tracking-widest mb-4">
            Page not found
          </p>
          <h1 className="text-8xl md:text-9xl font-bold gradient-text mb-6">
            404
          </h1>
          <p className="text-lg text-muted max-w-md mx-auto mb-10">
            The page you&apos;re looking for doesn&apos;t exist or has been moved.
          </p>
          <div className="flex gap-4 justify-center">
            <a
              href="/"
              className="px-6 py-3 bg-primary text-white rounded-lg font-medium hover:opacity-90 transition-opacity"
            >
              Go Home
            </a>
            <a
              href="/blog"
              className="px-6 py-3 border border-border rounded-lg font-medium text-muted hover:text-foreground hover:border-primary transition-colors"
            >
              Read Blog
            </a>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
