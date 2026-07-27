import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Script from "next/script";
import { ThemeProvider } from "@/components/theme-provider";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { SystemProvider } from "@/context/SystemContext";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Holistic AI ",
  description: "Advanced wellness for programmers",
  icons: {
    icon: "/icon.svg",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col bg-white dark:bg-black text-black dark:text-white transition-colors duration-300">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <SystemProvider>
            <Header />
            {children}
            <Footer />
          </SystemProvider>
        </ThemeProvider>
        <Script id="tawk-to" strategy="afterInteractive">
          {`
    var Tawk_API = Tawk_API || {};
    var Tawk_LoadStart = new Date();

    (function(){
      var s1 = document.createElement("script");
      var s0 = document.getElementsByTagName("script")[0];

      s1.async = true;
      s1.src='https://embed.tawk.to/6a67c54aaa7dbb1d404d07a3/1juillb5p';
      s1.charset = 'UTF-8';
      s1.setAttribute('crossorigin','*');

      s0.parentNode.insertBefore(s1,s0);
    })();
  `}
        </Script>
      </body>
    </html>
  );
}
