import type { Metadata } from "next";
import { Syne, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { SITE } from "@/data/site";

const syne = Syne({
  subsets: ["latin"],
  variable: "--font-syne",
  weight: ["700", "800"],
});

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-jakarta",
  weight: ["400", "500", "600"],
});

export const metadata: Metadata = {
  title: `${SITE.name} | ${SITE.role}`,
  description: `${SITE.name} is a CAD designer with ${SITE.experienceYears} years of experience in 3D modeling and technical drafting.`,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${syne.variable} ${jakarta.variable}`}>
      <body>{children}</body>
    </html>
  );
}
