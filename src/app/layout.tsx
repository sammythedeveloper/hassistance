import { ClerkProvider } from "@clerk/nextjs";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Footer } from "@/components/layout/Footer";
import { SystemProvider } from "@/context/SystemContext";
import { ChatbotTrigger } from "@/components/chatbot/chatbot-trigger";
import { Chatbot } from "@/components/chatbot/chatbot";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "DevPulse",
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
        <ClerkProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <SystemProvider>
              {children}
              <ChatbotTrigger />
            </SystemProvider>
          </ThemeProvider>
          {/* Placed outside ThemeProvider to avoid hydration script conflicts */}
          <Chatbot />
        </ClerkProvider>
      </body>
    </html>
  );
}
