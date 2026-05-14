import type { Metadata } from "next";
import { Cormorant_Garamond, Geist } from "next/font/google";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-cormorant",
  display: "swap",
});

const geistSans = Geist({
  subsets: ["latin"],
  variable: "--font-geist-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Yet Galore | Luxury Fashion",
  description: "Luxury fashion catalogue featuring premium handbags and jackets.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${cormorant.variable} ${geistSans.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col font-sans text-foreground bg-background selection:bg-cream selection:text-black">
        {children}
      </body>
    </html>
  );
}
