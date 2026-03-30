export const metadata = {
  title: "Hrolgar Studio",
  description: "Content management for hrolgar.com",
};

export default function StudioLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div
      className="sanity-studio"
      style={{
        height: "100vh",
        maxHeight: "100dvh",
        overscrollBehavior: "none",
        WebkitFontSmoothing: "antialiased",
      }}
    >
      {children}
    </div>
  );
}
