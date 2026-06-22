import type { Metadata } from "next";
import { Space_Grotesk, Hanken_Grotesk, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/features/Navbar";
import Footer from "@/components/features/Footer";
import { ThemeProvider } from "@/components/ui/theme-provider";
import ModeToggle from "@/components/features/ModeToggle";
import Reveal from "@/components/features/Reveal";
import { Toaster } from "@/components/ui/sonner";
import { SITE_URL, SITE_NAME, SITE_DESCRIPTION } from "@/lib/site";

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
  metadataBase: new URL(SITE_URL),
  title: {
    default: SITE_NAME,
    template: `%s · ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  openGraph: {
    type: "website",
    url: SITE_URL,
    siteName: SITE_NAME,
    title: SITE_NAME,
    description: SITE_DESCRIPTION,
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_NAME,
    description: SITE_DESCRIPTION,
  },
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
          enableSystem={false}
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
