import type { Metadata } from "next";
import { Plus_Jakarta_Sans, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Navbar } from "@/components/navbar";
import { Toaster } from "@/components/ui/sonner";

const plusJakarta = Plus_Jakarta_Sans({
  variable: "--font-sans-custom",
  subsets: ["latin", "vietnamese"],
  weight: ["400", "500", "600", "700", "800"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono-custom",
  subsets: ["latin", "vietnamese"],
});

export const metadata: Metadata = {
  title: "FPTU Quiz & Flashcards | Ôn thi thông minh",
  description: "Nền tảng ôn thi trắc nghiệm, thẻ ghi nhớ 3D và luyện đề thông minh cho sinh viên FPTU",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi" suppressHydrationWarning>
      <body
        className={`${plusJakarta.variable} ${jetbrainsMono.variable} min-h-screen flex flex-col bg-background text-foreground font-sans antialiased selection:bg-primary/25 selection:text-primary transition-colors duration-300`}
      >
        {/* Ambient grid & layered glow background */}
        <div className="fixed inset-0 z-[-2] bg-[linear-gradient(to_right,rgba(128,128,128,0.07)_1px,transparent_1px),linear-gradient(to_bottom,rgba(128,128,128,0.07)_1px,transparent_1px)] bg-[size:28px_28px] [mask-image:radial-gradient(ellipse_80%_70%_at_50%_0%,#000_70%,transparent_100%)]" />
        <div className="fixed left-1/2 -top-24 -translate-x-1/2 z-[-1] h-[380px] w-[620px] rounded-full bg-primary/15 opacity-60 blur-[120px] pointer-events-none" />
        <div className="fixed right-0 bottom-0 z-[-1] h-[280px] w-[360px] rounded-full bg-emerald-500/10 opacity-40 blur-[120px] pointer-events-none" />

        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <Navbar />
          <main className="flex-1 container mx-auto px-4 md:px-8 py-6 flex flex-col">
            {children}
          </main>
          <Toaster richColors position="top-center" />
        </ThemeProvider>
      </body>
    </html>
  );
}
