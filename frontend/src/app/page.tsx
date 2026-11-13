"use client";

import { motion } from "framer-motion";
import {
  ArrowRight,
  BrainCircuit,
  LibraryBig,
  Layers,
  BookOpen,
  Sparkles,
  Zap,
  Target,
} from "lucide-react";
import Link from "next/link";
import { subjects } from "@/data/subjects";

export default function Home() {
  const totalSubjects = subjects.length;
  const totalPapers = subjects.reduce((acc, s) => acc + s.papers.length, 0);
  const totalQuestions = subjects.reduce(
    (acc, s) => acc + s.papers.reduce((pAcc, p) => pAcc + p.questions.length, 0),
    0
  );

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.08 },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 18 },
    show: {
      opacity: 1,
      y: 0,
      transition: { type: "spring" as const, stiffness: 320, damping: 26 },
    },
  };

  const modes = [
    {
      href: "/learn",
      title: "Học theo chặng",
      description: "Chia nhỏ 7 câu mỗi chặng, lặp lại câu sai cho tới khi nhớ sâu, có AI giải thích.",
      icon: BookOpen,
      accent: "from-indigo-500/20 to-primary/5 text-primary border-primary/20",
      badge: "Khuyên dùng",
    },
    {
      href: "/flashcards",
      title: "Thẻ ghi nhớ 3D",
      description: "Lật thẻ siêu mượt bằng phím Space, đánh dấu đã thuộc hoặc cần ôn lại nhanh chóng.",
      icon: Layers,
      accent: "from-violet-500/20 to-purple-500/5 text-violet-500 border-violet-500/20",
      badge: "Nhớ nhanh",
    },
    {
      href: "/quiz",
      title: "Thi thử bấm giờ",
      description: "Giả lập phòng thi thật với đồng hồ đếm giờ, đánh dấu câu phân vân và lọc câu sai.",
      icon: BrainCircuit,
      accent: "from-emerald-500/20 to-teal-500/5 text-emerald-500 border-emerald-500/20",
      badge: "Thực chiến",
    },
    {
      href: "/library",
      title: "Thư viện tra cứu",
      description: "Tìm kiếm tức thì câu hỏi và đáp án theo từ khóa, hỗ trợ lọc theo từng đề.",
      icon: LibraryBig,
      accent: "from-amber-500/20 to-orange-500/5 text-amber-500 border-amber-500/20",
      badge: "Siêu tốc",
    },
  ];

  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="flex flex-col items-center justify-center text-center pt-10 md:pt-20 pb-20 gap-10"
    >
      <motion.div
        variants={item}
        className="inline-flex items-center gap-2 rounded-full border border-primary/25 bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary backdrop-blur-md shadow-sm"
      >
        <Sparkles className="w-4 h-4" />
        <span>Đã cập nhật {subjects.map((s) => s.name).join(", ")} • Sẵn sàng ôn thi</span>
      </motion.div>

      <motion.div variants={item} className="flex flex-col items-center gap-5 max-w-4xl">
        <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-b from-foreground via-foreground to-foreground/65 leading-[1.12] pb-1">
          Chinh phục điểm cao bằng phương pháp lặp lại thông minh.
        </h1>
        <p className="text-lg md:text-xl text-muted-foreground max-w-2xl leading-relaxed">
          Nền tảng ôn tập tối giản, tốc độ cao cho sinh viên FPTU. Học cuốn chiếu theo chặng, lật thẻ 3D, thi thử bấm giờ và tra cứu không độ trễ.
        </p>
      </motion.div>

      <motion.div variants={item} className="flex flex-wrap items-center justify-center gap-3.5">
        <Link
          href="/learn"
          className="inline-flex h-12 items-center justify-center rounded-full bg-primary px-8 text-base font-semibold text-primary-foreground shadow-lg shadow-primary/25 hover:bg-primary/90 hover:scale-[1.02] active:scale-[0.98] transition-all"
        >
          Bắt đầu học ngay <ArrowRight className="ml-2 w-4 h-4" />
        </Link>
        <Link
          href="/quiz"
          className="inline-flex h-12 items-center justify-center rounded-full border border-border bg-card/80 backdrop-blur px-7 text-base font-medium text-foreground hover:bg-muted/80 transition-all"
        >
          Vào thi thử
        </Link>
        <Link
          href="/library"
          className="inline-flex h-12 items-center justify-center rounded-full border border-border bg-card/80 backdrop-blur px-7 text-base font-medium text-foreground hover:bg-muted/80 transition-all"
        >
          Tra cứu thư viện
        </Link>
      </motion.div>

      {/* Quick Stats */}
      <motion.div
        variants={item}
        className="grid grid-cols-3 gap-4 sm:gap-8 px-6 py-4 rounded-2xl border border-border/60 bg-card/60 backdrop-blur-md shadow-sm max-w-xl w-full"
      >
        <div className="flex flex-col items-center">
          <span className="text-2xl md:text-3xl font-bold text-foreground">{totalSubjects}</span>
          <span className="text-xs md:text-sm text-muted-foreground">Môn học</span>
        </div>
        <div className="flex flex-col items-center border-x border-border/60">
          <span className="text-2xl md:text-3xl font-bold text-primary">{totalQuestions}</span>
          <span className="text-xs md:text-sm text-muted-foreground">Câu hỏi</span>
        </div>
        <div className="flex flex-col items-center">
          <span className="text-2xl md:text-3xl font-bold text-emerald-500">{totalPapers}</span>
          <span className="text-xs md:text-sm text-muted-foreground">Bộ đề thi</span>
        </div>
      </motion.div>

      {/* Bento Grid 4 Modes */}
      <motion.div
        variants={item}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mt-4 w-full max-w-6xl text-left"
      >
        {modes.map((m) => {
          const Icon = m.icon;
          return (
            <Link key={m.href} href={m.href} className="group block h-full">
              <div className="h-full flex flex-col justify-between gap-4 p-6 rounded-2xl border border-border/60 bg-card/60 backdrop-blur-md hover:border-primary/40 hover:bg-card hover:shadow-xl hover:shadow-primary/5 transition-all duration-300">
                <div className="flex flex-col gap-3">
                  <div className="flex items-center justify-between">
                    <div
                      className={`w-11 h-11 rounded-xl bg-gradient-to-br border flex items-center justify-center transition-transform duration-300 group-hover:scale-110 ${m.accent}`}
                    >
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="text-[11px] font-semibold px-2.5 py-0.5 rounded-full bg-muted text-muted-foreground">
                      {m.badge}
                    </span>
                  </div>
                  <h3 className="text-lg font-bold tracking-tight text-card-foreground mt-1 group-hover:text-primary transition-colors">
                    {m.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed text-sm">{m.description}</p>
                </div>

                <div className="flex items-center text-xs font-semibold text-primary opacity-80 group-hover:opacity-100 group-hover:translate-x-1 transition-all">
                  Mở chế độ <ArrowRight className="w-3.5 h-3.5 ml-1" />
                </div>
              </div>
            </Link>
          );
        })}
      </motion.div>

      <motion.div
        variants={item}
        className="flex flex-wrap items-center justify-center gap-6 text-xs text-muted-foreground pt-4"
      >
        <span className="inline-flex items-center gap-1.5">
          <Zap className="w-3.5 h-3.5 text-amber-500" /> Hỗ trợ phím tắt 1-4 &amp; Space
        </span>
        <span className="inline-flex items-center gap-1.5">
          <Target className="w-3.5 h-3.5 text-emerald-500" /> Tự động lưu tiến độ học
        </span>
      </motion.div>
    </motion.div>
  );
}
