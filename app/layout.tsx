import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import { Toaster } from "@/components/ui/sonner"

import { NavLayout } from "@/components/Layouts/NavLayout";
import Providers from "./providers";

import "./globals.css";

const montserrat = Montserrat({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-montserrat",
});

export const metadata: Metadata = {
  title: "Blüte - Bloom with us",
  description:
    "Blüte is a flower shop that provides a variety of flowers for your special moments. We are here to help you bloom with us.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${montserrat.variable}`}
    >
      <body className={`antialiased`}>
        <Providers>
          <NavLayout>
            <main>
              {children}    
            </main>
            <Toaster position="top-center" richColors />
          </NavLayout>
        </Providers>
      </body>
    </html>
  );
}
