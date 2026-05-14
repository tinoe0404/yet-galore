import type { Metadata } from "next";
import { fontVariables } from "@/lib/fonts";
import "./globals.css";

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
    <html lang="en" className={`${fontVariables} h-full antialiased`}>
      <body className="min-h-full flex flex-col font-sans text-foreground bg-background selection:bg-cream selection:text-black">
        {children}
      </body>
    </html>
  );
}
