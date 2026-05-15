import type { Metadata } from "next";
import { fontVariables } from "@/lib/fonts";
import "./globals.css";

export const metadata: Metadata = {
  title: "Yet Galore | Luxury Fashion",
  description: "Luxury fashion catalogue featuring premium handbags and jackets.",
};

import { NuqsAdapter } from 'nuqs/adapters/next/app';
import { Providers } from './providers';
import SetVh from '@/components/common/SetVh';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${fontVariables} h-full antialiased`}>
      <head>
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
      </head>
      <body className="min-h-full flex flex-col font-sans text-foreground bg-background selection:bg-cream selection:text-black">
        <Providers>
          <SetVh />
          <NuqsAdapter>
            {children}
          </NuqsAdapter>
        </Providers>
      </body>
    </html>
  );
}
