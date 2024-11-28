import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";

const montserrat = Montserrat({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-montserrat",
});

export const metadata: Metadata = {
  title: "Blüte - Bloom with us",
  description: "Blüte is a multibrand skincare and beauty store that offers a wide range of products from various brands.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className={`${montserrat.variable}`}>
      <body className={`antialiased`}>
        {children}
      </body>
    </html>
  );
}
