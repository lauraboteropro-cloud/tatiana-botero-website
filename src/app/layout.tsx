import type { Metadata } from "next";
import { Caveat, Geist } from "next/font/google";
import { Suspense } from "react";
import { GlowController } from "@/components/glow";
import { RevealController } from "@/components/reveal";
import "./globals.css";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"], display: "swap" });
// Handwriting is used only by <Annotation>. One weight, latin subset, so the cost stays small.
const hand = Caveat({ variable: "--font-hand", subsets: ["latin"], weight: "500", display: "swap" });

export const metadata: Metadata = {
  title: "Tatiana Botero | Product Leader",
  description:
    "Tatiana Botero is a Senior / Lead Product Manager who turns complicated business problems into products that make the operation work better. Enterprise products, 0→1, B2B / Vertical SaaS, AI, and operations.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" data-scroll-behavior="smooth" className={`${geistSans.variable} ${hand.variable}`}>
      <body>
        {children}
        <GlowController />
        <Suspense fallback={null}>
          <RevealController />
        </Suspense>
      </body>
    </html>
  );
}
