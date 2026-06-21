import type { Metadata } from "next";
import { Space_Grotesk, Hanken_Grotesk, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/features/Navbar";
import Footer from "@/components/features/Footer";
import { ThemeProvider } from "@/components/ui/theme-provider";
import ModeToggle from "@/components/features/ModeToggle";
import Reveal from "@/components/features/Reveal";
import { Toaster } from "@/components/ui/sonner";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-space",
  display: "swap",
});

const hanken = Hanken_Grotesk({
  subsets: ["latin"],
  weight: ["300", "400"],
  variable: "--font-hanken",
  display: "swap",
});

const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-jetbrains",
  display: "swap",
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
    <html
      lang="en"
      suppressHydrationWarning
      className={`${spaceGrotesk.variable} ${hanken.variable} ${jetbrains.variable}`}
    >
      <body className="min-h-screen w-full antialiased">
        {/* set .js before paint so animation starts hidden */}
        <script
          dangerouslySetInnerHTML={{
            __html: "document.documentElement.classList.add('js')",
          }}
        />
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          <Navbar />
          <div className="w-full mx-auto px-6" style={{ maxWidth: "var(--maxw)" }}>
            {children}
            <Footer />
          </div>
          <ModeToggle />
          <Reveal />
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
