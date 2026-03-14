export default function Footer() {
  return (
    <footer className="py-8 px-6 border-t border-border">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-sm text-muted">
          &copy; {new Date().getFullYear()} Ullrhome
        </p>
        <p className="text-xs text-muted">
          Built with Next.js &amp; Sanity
        </p>
      </div>
    </footer>
  );
}
