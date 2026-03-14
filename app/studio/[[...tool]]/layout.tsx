export const metadata = {
  title: "Ullrhome Studio",
  description: "Content management for Ullrhome",
};

export default function StudioLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
