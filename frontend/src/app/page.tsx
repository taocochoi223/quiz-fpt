"use client";

import { motion } from "framer-motion";
import { ArrowRight, BrainCircuit, LibraryBig, CheckCircle2 } from "lucide-react";
import Link from "next/link";

export default function Home() {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, filter: "blur(10px)", y: 20 },
    show: { opacity: 1, filter: "blur(0px)", y: 0, transition: { type: "spring" as const, stiffness: 300, damping: 24 } },
  };

  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="flex flex-col items-center justify-center text-center pt-20 md:pt-32 pb-20 gap-8"
    >
      <motion.div variants={item} className="inline-flex items-center rounded-full border border-border bg-muted/30 px-4 py-1.5 text-sm font-medium text-muted-foreground backdrop-blur-md shadow-sm">
        <span className="flex h-2 w-2 rounded-full bg-emerald-500 mr-2 animate-pulse"></span>
        Hệ thống ôn thi FPTU Flashcards Premium V2 đã sẵn sàng!
      </motion.div>

      <motion.h1 variants={item} className="text-5xl md:text-7xl font-bold tracking-tighter max-w-4xl bg-clip-text text-transparent bg-gradient-to-b from-foreground to-foreground/60 leading-tight pb-2">
        Chinh phục điểm cao bằng phương pháp lặp lại thông minh.
      </motion.h1>

      <motion.p variants={item} className="text-xl md:text-2xl text-muted-foreground max-w-2xl font-light leading-relaxed">
        Nền tảng học tập tối giản, siêu tốc. Giúp bạn "diệt gọn" mọi môn học cực kỳ nhẹ nhàng. Chúc bạn ôn tập thật tốt và thi qua môn điểm cao nhé! 🚀
      </motion.p>

      <motion.div variants={item} className="flex flex-col sm:flex-row gap-4 mt-8 w-full sm:w-auto flex-wrap justify-center">
        <Link href="/learn" className="inline-flex h-12 items-center justify-center rounded-full bg-primary px-8 text-base font-medium text-primary-foreground shadow-lg hover:shadow-xl transition-all dark:shadow-[0_0_40px_-10px_rgba(255,255,255,0.3)] dark:hover:shadow-[0_0_60px_-15px_rgba(255,255,255,0.5)]">
          Bắt đầu học ngay <ArrowRight className="ml-2 w-4 h-4" />
        </Link>
        <Link href="/flashcards" className="inline-flex h-12 items-center justify-center rounded-full border border-border bg-background px-8 text-base font-medium text-foreground hover:bg-muted transition-all">
          Thẻ ghi nhớ (Flashcards)
        </Link>
        <Link href="/library" className="inline-flex h-12 items-center justify-center rounded-full border border-border bg-background px-8 text-base font-medium text-foreground hover:bg-muted transition-all">
          Thư viện tra cứu
        </Link>
      </motion.div>

      <motion.div variants={item} className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-20 w-full max-w-5xl text-left">
        <div className="flex flex-col gap-3 p-6 rounded-2xl border border-border/50 bg-card/40 backdrop-blur-sm hover:bg-muted/50 transition-colors group">
          <div className="w-12 h-12 rounded-xl bg-muted/50 flex items-center justify-center border border-border/50 group-hover:border-border transition-colors">
            <BrainCircuit className="w-6 h-6 text-muted-foreground" />
          </div>
          <h3 className="text-xl font-semibold tracking-tight mt-2 text-card-foreground">Học theo chặng</h3>
          <p className="text-muted-foreground leading-relaxed text-sm">
            Học cuốn chiếu từng nhóm 7 câu. Thuật toán sẽ tự động bắt bạn làm đi làm lại các câu sai cho đến khi thuộc lòng mới thôi.
          </p>
        </div>

        <div className="flex flex-col gap-3 p-6 rounded-2xl border border-border/50 bg-card/40 backdrop-blur-sm hover:bg-muted/50 transition-colors group">
          <div className="w-12 h-12 rounded-xl bg-muted/50 flex items-center justify-center border border-border/50 group-hover:border-border transition-colors">
            <CheckCircle2 className="w-6 h-6 text-muted-foreground" />
          </div>
          <h3 className="text-xl font-semibold tracking-tight mt-2 text-card-foreground">Thi thử tập trung</h3>
          <p className="text-muted-foreground leading-relaxed text-sm">
            Giả lập môi trường thi thật với giao diện tối giản. Chấm điểm siêu tốc ngay sau khi bạn vừa hoàn thành bài.
          </p>
        </div>

        <div className="flex flex-col gap-3 p-6 rounded-2xl border border-border/50 bg-card/40 backdrop-blur-sm hover:bg-muted/50 transition-colors group">
          <div className="w-12 h-12 rounded-xl bg-muted/50 flex items-center justify-center border border-border/50 group-hover:border-border transition-colors">
            <LibraryBig className="w-6 h-6 text-muted-foreground" />
          </div>
          <h3 className="text-xl font-semibold tracking-tight mt-2 text-card-foreground">Tra cứu tức thì</h3>
          <p className="text-muted-foreground leading-relaxed text-sm">
            Tìm kiếm từ khóa câu hỏi siêu tốc độ không độ trễ. Đi kèm lời giải chi tiết giúp bạn hiểu tận gốc vấn đề.
          </p>
        </div>
      </motion.div>
    </motion.div>
  );
}
