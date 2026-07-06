import type { Metadata } from "next";
import LayoutClientWrapper from "@/components/layout/LayoutClientWrapper";
import "./globals.css";

export const metadata: Metadata = {
  title: "BEM STMIK Tazkia | Portal Inovasi Mahasiswa",
  description: "Website Resmi BEM STMIK Tazkia dan Etalase Karya Inovasi Teknologi Mahasiswa",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" className="light">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&family=Outfit:wght@400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-background text-on-background font-sans antialiased overflow-x-hidden">
        <LayoutClientWrapper>{children}</LayoutClientWrapper>
      </body>
    </html>
  );
}

