import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "António Nascimento — Senior Software Engineer",
  description:
    "Personal portfolio of António Nascimento — Senior Software Engineer at Zalando in Berlin. 13+ years of building scalable backend architectures and digital experiences.",
  openGraph: {
    title: "António Nascimento — Senior Software Engineer",
    description: "Senior Software Engineer at Zalando · Berlin, Germany",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="bg-background text-foreground antialiased">{children}</body>
    </html>
  );
}
