// app/layout.tsx
import "bootstrap/dist/css/bootstrap.min.css";
import "./globals.css"; // optional custom styles

export const metadata = {
  title: "TODO App",
};

export default function RootLayout({
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
