export default function Footer() {
  return (
    <footer className="py-8 px-6 border-t border-border">
      <div className="max-w-5xl mx-auto flex items-center justify-between">
        <p className="text-xs text-muted">
          &copy; {new Date().getFullYear()} Ullrhome
        </p>
        <p className="text-xs text-muted">
          Built with Next.js
        </p>
      </div>
    </footer>
  );
}
