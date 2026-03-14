import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function NotFound() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen flex items-center justify-center px-6">
        <div className="text-center">
          <h1 className="text-8xl font-bold gradient-text mb-4">404</h1>
          <p className="text-xl text-muted mb-8">Page not found</p>
          <a
            href="/"
            className="px-6 py-3 bg-primary text-white rounded-lg font-medium hover:opacity-90 transition-opacity"
          >
            Go Home
          </a>
        </div>
      </main>
      <Footer />
    </>
  );
}
