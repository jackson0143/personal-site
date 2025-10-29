import type { Metadata } from "next";
import { Radio_Canada } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/features/Navbar";
const radio = Radio_Canada({
  subsets: ["latin"],
  weight: ["400", "600"],
});

export const metadata: Metadata = {
  title: "jackson",
  description: "my portfolio :)",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
  
      <body className={`${radio.className} min-h-screen w-full max-w-2xl mx-auto  px-4 `}>
      <Navbar />
        {children}
      </body>
    </html>
  );
}
