import type { Metadata } from "next";
import { Radio_Canada } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/features/Navbar";
import Footer from "@/components/features/Footer";
import { ThemeProvider } from "@/components/ui/theme-provider";
import ModeToggle from "@/components/features/ModeToggle";
const radio = Radio_Canada({
  subsets: ["latin"],
  weight: ["400", "600"],
});

export const metadata: Metadata = {
  title: "jackson",
  description: "my website :)",
  icons: {
    icon: "/favicon.ico?v=2",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      
      <body className={`${radio.className} min-h-screen w-full max-w-2xl mx-auto pt-6 px-4 `}>

        <ThemeProvider
            attribute="class"
            defaultTheme="light"
            enableSystem
            disableTransitionOnChange
          >
      <Navbar />
        {children}
      <Footer />
      <ModeToggle />
      </ThemeProvider>
      </body>
    </html>
  );
}
