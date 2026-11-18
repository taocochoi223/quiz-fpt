"use client";

import React from "react";
import Link from "next/link";
import {
  BookOpen,
  Moon,
  Sun,
  LayoutDashboard,
  Layers,
  BrainCircuit,
  LibraryBig,
  Menu,
  Volume2,
  VolumeX,
  Sparkles,
} from "lucide-react";
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
  const { resolvedTheme, setTheme } = useTheme();
  const [soundEnabled, setSoundEnabled] = React.useState(true);
  const mounted = React.useSyncExternalStore(
    () => () => {},
    () => true,
    () => false
  );

  React.useEffect(() => {
    const id = requestAnimationFrame(() => {
      setSoundEnabled(getSoundEnabled());
    });
    return () => cancelAnimationFrame(id);
  }, []);

  const handleToggleSound = () => {
    setSoundEnabled(toggleSound());
  };

  const links = [
    { href: "/", label: "Trang chủ", icon: LayoutDashboard },
    { href: "/learn", label: "Học theo chặng", icon: BookOpen },
    { href: "/flashcards", label: "Flashcards", icon: Layers },
    { href: "/quiz", label: "Thi thử", icon: BrainCircuit },
    { href: "/library", label: "Thư viện", icon: LibraryBig },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/60 bg-background/95 md:bg-background/75 md:backdrop-blur-md">
      <div className="container flex h-16 items-center justify-between mx-auto px-4 md:px-8">
        <div className="flex items-center gap-6">
          <Link
            href="/"
            className="flex items-center gap-2.5 transition-transform hover:scale-[1.02] active:scale-[0.98]"
          >
            <div className="bg-gradient-to-br from-primary to-indigo-600 text-primary-foreground p-2 rounded-xl shadow-md shadow-primary/20">
              <Sparkles className="w-4 h-4" />
            </div>
            <div className="hidden sm:flex flex-col leading-none">
              <span className="font-bold tracking-tight text-base">FPTU Quiz</span>
              <span className="text-[10px] font-medium text-muted-foreground tracking-wider uppercase mt-0.5">
                Smart Study Hub
              </span>
            </div>
          </Link>

          <nav className="hidden md:flex items-center gap-1 bg-muted/50 p-1 rounded-full border border-border/50">
            {links.map((link) => {
              const Icon = link.icon;
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`relative flex items-center gap-2 px-3.5 py-1.5 text-sm font-medium rounded-full transition-colors ${
                    isActive ? "text-primary-foreground" : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="nav-indicator"
                      className="absolute inset-0 bg-primary rounded-full -z-10 shadow-sm"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                  <Icon className="w-4 h-4" />
                  {link.label}
                </Link>
              );
            })}
          </nav>
        </div>

        <div className="flex items-center gap-1.5">
          {/* Mobile Menu */}
          <div className="md:hidden">
            <DropdownMenu>
              <DropdownMenuTrigger className="inline-flex items-center justify-center rounded-full w-9 h-9 hover:bg-accent hover:text-accent-foreground text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring">
                <Menu className="w-5 h-5" />
                <span className="sr-only">Menu</span>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56 mt-2 p-1.5">
                {links.map((link) => {
                  const Icon = link.icon;
                  const isActive = pathname === link.href;
                  return (
                    <DropdownMenuItem key={link.href} className="p-0">
                      <Link
                        href={link.href}
                        className={`flex items-center w-full cursor-pointer px-3 py-2.5 rounded-lg text-sm ${
                          isActive ? "text-primary font-semibold bg-primary/10" : "text-foreground"
                        }`}
                      >
                        <Icon className="w-4 h-4 mr-2.5" />
                        <span>{link.label}</span>
                      </Link>
                    </DropdownMenuItem>
                  );
                })}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          <Button
            variant="ghost"
            size="icon"
            onClick={handleToggleSound}
            title={soundEnabled ? "Tắt âm thanh" : "Bật âm thanh"}
            className="rounded-full text-muted-foreground hover:text-foreground hover:bg-muted/80"
          >
            {soundEnabled ? <Volume2 className="h-[1.15rem] w-[1.15rem]" /> : <VolumeX className="h-[1.15rem] w-[1.15rem]" />}
            <span className="sr-only">Tắt/Bật âm thanh</span>
          </Button>

          <Button
            variant="ghost"
            size="icon"
            onClick={() => setTheme(resolvedTheme === "light" ? "dark" : "light")}
            title="Chuyển giao diện Sáng/Tối"
            className="rounded-full text-muted-foreground hover:text-foreground hover:bg-muted/80 relative"
          >
            {mounted ? (
              <>
                <Sun className="h-[1.15rem] w-[1.15rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                <Moon className="absolute h-[1.15rem] w-[1.15rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
              </>
            ) : (
              <Sun className="h-[1.15rem] w-[1.15rem]" />
            )}
            <span className="sr-only">Chuyển giao diện</span>
          </Button>
        </div>
      </div>
    </header>
  );
}
