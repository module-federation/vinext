import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Vinext Module Federation host",
  description: "Vinext Module Federation SSR example",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
