import type { Metadata } from "next";
import { Outfit, Space_Grotesk } from "next/font/google"; // Advanced Tech Fonts
import "./globals.css";
import Providers from "@/components/Providers";

const outfit = Outfit({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-display",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Axiom Pulse | Live Token Discovery",
  description: "Real-time token discovery table with live price updates, liquidity monitoring, and market analysis.",
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${outfit.variable} ${spaceGrotesk.variable} font-sans antialiased pulse-bg text-zinc-100`}
      >
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
