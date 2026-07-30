"use client";

import React from "react";
import Link from "next/link";
import { BookOpen, Search, Play, Library, Moon, Sun, LayoutDashboard, Layers, BrainCircuit, LibraryBig, Menu, Volume2, VolumeX } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { toggleSound, getSoundEnabled } from "@/lib/audio";

export function Navbar() {
  const pathname = usePathname();
  const { theme, setTheme } = useTheme();
  const [soundEnabled, setSoundEnabled] = React.useState(true);

  React.useEffect(() => {
    setSoundEnabled(getSoundEnabled());
  }, []);

  const handleToggleSound = () => {
    setSoundEnabled(toggleSound());
  };

  const links = [
    { href: "/", label: "Trang chủ", icon: <LayoutDashboard className="w-4 h-4 mr-2" /> },
    { href: "/flashcards", label: "Flashcards", icon: <Layers className="w-4 h-4 mr-2" /> },
    { href: "/learn", label: "Học", icon: <BookOpen className="w-4 h-4 mr-2" /> },
    { href: "/quiz", label: "Thi thử", icon: <BrainCircuit className="w-4 h-4 mr-2" /> },
    { href: "/library", label: "Thư viện", icon: <LibraryBig className="w-4 h-4 mr-2" /> },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center justify-between mx-auto px-4 md:px-8">
        <div className="flex items-center gap-6">
          <Link href="/" className="flex items-center space-x-2 transition-transform hover:scale-105 active:scale-95">
            <div className="bg-primary text-primary-foreground p-1.5 rounded-md">
              <BookOpen className="w-5 h-5" />
            </div>
            <span className="font-bold tracking-tight text-lg hidden sm:inline-block">FPTU Flashcards</span>
          </Link>
          <nav className="hidden md:flex items-center space-x-1">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`relative flex items-center px-3 py-1.5 text-sm font-medium transition-colors hover:text-primary ${
                  pathname === link.href ? "text-primary" : "text-muted-foreground"
                }`}
              >
                {pathname === link.href && (
                  <motion.div
                    layoutId="nav-indicator"
                    className="absolute inset-0 bg-secondary rounded-md -z-10"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
                {link.icon}
                {link.label}
              </Link>
            ))}
          </nav>
        </div>

        <div className="flex items-center gap-2">
          {/* Mobile Menu */}
          <div className="md:hidden">
            <DropdownMenu>
              <DropdownMenuTrigger className="inline-flex items-center justify-center rounded-full w-9 h-9 hover:bg-accent hover:text-accent-foreground text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50">
                <Menu className="w-5 h-5" />
                <span className="sr-only">Menu</span>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56 mt-2">
                {links.map((link) => (
                  <DropdownMenuItem key={link.href} className="p-0">
                    <Link href={link.href} className={`flex items-center w-full cursor-pointer px-3 py-2.5 rounded-md ${pathname === link.href ? "text-primary font-medium bg-primary/5" : ""}`}>
                      {link.icon}
                      <span className="ml-2">{link.label}</span>
                    </Link>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          <Button
            variant="ghost"
            size="icon"
            onClick={handleToggleSound}
            className="rounded-full text-muted-foreground hover:text-primary"
          >
            {soundEnabled ? <Volume2 className="h-5 w-5" /> : <VolumeX className="h-5 w-5" />}
            <span className="sr-only">Tắt/Bật âm thanh</span>
          </Button>

          <Button
            variant="ghost"
            size="icon"
            onClick={() => setTheme(theme === "light" ? "dark" : "light")}
            className="rounded-full"
          >
            <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
            <span className="sr-only">Chuyển giao diện</span>
          </Button>
        </div>
      </div>
    </header>
  );
}
