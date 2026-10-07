import type { Metadata } from "next";
import "./globals.css";
import "./homepage.css";

export const metadata: Metadata = {
  title: "Tatiana Botero | Product Leader",
  description:
    "Tatiana Botero is a Senior / Lead Product Manager who turns complex business and operational problems into products and systems. Explore her enterprise platform work, measurable outcomes, and 0→1 product experience.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
