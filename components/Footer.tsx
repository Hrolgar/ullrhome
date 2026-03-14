export default function Footer() {
  return (
    <footer className="py-8 px-6 border-t border-surface">
      <div className="max-w-6xl mx-auto text-center text-sm text-muted">
        <p>&copy; {new Date().getFullYear()} Ullrhome. Built with Next.js &amp; Sanity.</p>
      </div>
    </footer>
  );
}
