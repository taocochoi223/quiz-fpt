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
        {/* Ambient grid & lightweight radial glow background (GPU-friendly) */}
        <div className="fixed inset-0 z-[-2] bg-[linear-gradient(to_right,rgba(128,128,128,0.06)_1px,transparent_1px),linear-gradient(to_bottom,rgba(128,128,128,0.06)_1px,transparent_1px)] bg-[size:28px_28px] [mask-image:radial-gradient(ellipse_80%_70%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none" />
        <div className="fixed inset-0 z-[-1] bg-[radial-gradient(ellipse_60%_40%_at_50%_-10%,color-mix(in_srgb,var(--primary)_14%,transparent),transparent),radial-gradient(circle_at_90%_90%,rgba(16,185,129,0.07),transparent_45%)] pointer-events-none" />

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
