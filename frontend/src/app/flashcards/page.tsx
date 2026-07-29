"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { RotateCcw, Shuffle, Check, X, Trophy, ListOrdered, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { questions } from "@/data/questions";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { playCorrectSound, playWrongSound } from "@/lib/audio";

function shuffle<T>(array: T[]): T[] {
  const copy = [...array];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}


const BATCH_SIZE = 7;
const generateChunks = (total: number, size: number) => {
  const chunks = [];
  for (let i = 0; i < total; i += size) {
    chunks.push([i, Math.min(i + size, total)] as [number, number]);
  }
  return chunks;
};
const prn232Chunks = generateChunks(questions.length, BATCH_SIZE);

export default function FlashcardsPage() {
  const [mode, setMode] = React.useState<"select" | "full" | "prn232">("select");
  const [expandedCard, setExpandedCard] = React.useState<"prn232" | null>(null);
  const [activeRange, setActiveRange] = React.useState<[number, number] | null>(null);

  const [deck, setDeck] = React.useState<typeof questions>([]);

  // State for learning logic
  const [pendingIds, setPendingIds] = React.useState<number[]>([]);
  const [wrongIds, setWrongIds] = React.useState<number[]>([]);
  const [qIndex, setQIndex] = React.useState(0);
  const [passCount, setPassCount] = React.useState(1);

  const [isFlipped, setIsFlipped] = React.useState(false);
  const [isFinished, setIsFinished] = React.useState(false);
  const [showResumeDialog, setShowResumeDialog] = React.useState(false);

  React.useEffect(() => {
    const saved = localStorage.getItem("flashcards_session");
    if (saved) {
      setShowResumeDialog(true);
    }
  }, []);

  React.useEffect(() => {
    if (mode === "select" || isFinished) return;
    const session = { mode, activeRange, deck, pendingIds, wrongIds, qIndex, passCount };
    localStorage.setItem("flashcards_session", JSON.stringify(session));
  }, [mode, activeRange, deck, pendingIds, wrongIds, qIndex, passCount, isFinished]);

  React.useEffect(() => {
    if (isFinished) {
      localStorage.removeItem("flashcards_session");
    }
  }, [isFinished]);

  const resumeSession = () => {
    const saved = localStorage.getItem("flashcards_session");
    if (saved) {
      try {
        const data = JSON.parse(saved);
        setMode(data.mode);
        setActiveRange(data.activeRange);
        setDeck(data.deck);
        setPendingIds(data.pendingIds);
        setWrongIds(data.wrongIds);
        setQIndex(data.qIndex);
        setPassCount(data.passCount);
      } catch (e) {
        console.error("Failed to parse session", e);
      }
    }
    setShowResumeDialog(false);
  };

  const abandonSession = () => {
    localStorage.removeItem("flashcards_session");
    setShowResumeDialog(false);
  };

  // Total learned out of full deck
  const learnedCount = deck.length - pendingIds.length + qIndex - wrongIds.length;
  const progressPercent = (learnedCount / deck.length) * 100;

  const currentId = pendingIds[qIndex];
  const currentQ = deck.find(q => q.id === currentId);

  const handleKnow = () => {
    playCorrectSound();
    setIsFlipped(false);
    setTimeout(() => {
      advanceCard(false);
    }, 150);
  };

  const handleStillLearning = () => {
    playWrongSound();
    setIsFlipped(false);
    setTimeout(() => {
      advanceCard(true);
    }, 150);
  };

  const advanceCard = (wasWrong: boolean) => {
    const newWrong = wasWrong ? [...wrongIds, currentId] : wrongIds;

    if (qIndex + 1 < pendingIds.length) {
      setWrongIds(newWrong);
      setQIndex(qIndex + 1);
    } else {
      // End of this pass
      if (newWrong.length > 0) {
        setPendingIds(newWrong);
        setWrongIds([]);
        setQIndex(0);
        setPassCount(p => p + 1);
      } else {
        setIsFinished(true);
      }
    }
  };

  const handleShuffle = () => {
    setIsFlipped(false);
    setIsFinished(false);
    setTimeout(() => {
      const newDeck = shuffle(activeRange ? questions.slice(activeRange[0], activeRange[1]) : questions);
      setDeck(newDeck);
      setPendingIds(newDeck.map(q => q.id));
      setWrongIds([]);
      setQIndex(0);
      setPassCount(1);
    }, 200);
  };

  const handleReset = () => {
    setIsFlipped(false);
    setIsFinished(false);
    setTimeout(() => {
      const baseDeck = activeRange ? questions.slice(activeRange[0], activeRange[1]) : questions;
      setDeck(baseDeck);
      setPendingIds(baseDeck.map(q => q.id));
      setWrongIds([]);
      setQIndex(0);
      setPassCount(1);
    }, 200);
  };

  const handleStartMode = (selectedMode: "full" | "prn232", range: [number, number] | null = null) => {
    setMode(selectedMode);
    setActiveRange(range);
    const initialDeck = range ? questions.slice(range[0], range[1]) : questions;
    setDeck(initialDeck);
    setPendingIds(initialDeck.map(q => q.id));
    setWrongIds([]);
    setQIndex(0);
    setPassCount(1);
    setIsFinished(false);
    setIsFlipped(false);
  };

  const correctOptionText = React.useMemo(() => {
    if (!currentQ) return "";
    const correctOpt = currentQ.options.find(o => o.key === currentQ.correctAnswer);
    return correctOpt ? correctOpt.text : "";
  }, [currentQ]);

  // Keyboard navigation
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (isFinished || showResumeDialog) return;

      if (e.key === " " || e.key === "Enter") {
        e.preventDefault();
        setIsFlipped(prev => !prev);
      } else if (isFlipped) {
        if (e.key === "ArrowLeft") {
          handleStillLearning(); // Left arrow = Still Learning
        } else if (e.key === "ArrowRight") {
          handleKnow(); // Right arrow = Know
        }
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isFlipped, isFinished, showResumeDialog, pendingIds.length, qIndex]);

  if (showResumeDialog) {
    return (
      <div className="flex flex-col h-full max-w-xl mx-auto w-full gap-8 pt-20 pb-20 items-center justify-center text-center">
        <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="flex flex-col gap-6">
          <div className="w-20 h-20 rounded-full bg-amber-500/10 flex items-center justify-center mx-auto mb-2">
            <RotateCcw className="w-10 h-10 text-amber-500" />
          </div>
          <h1 className="text-3xl font-bold tracking-tight">Tiếp tục bài học?</h1>
          <p className="text-muted-foreground text-lg">Bạn có một tiến trình ghi nhớ đang dang dở. Bạn muốn tiếp tục hay học bài mới?</p>
          <div className="flex gap-4 justify-center mt-4">
            <Button onClick={abandonSession} variant="outline" className="rounded-full px-8">Bắt đầu mới</Button>
            <Button onClick={resumeSession} className="rounded-full px-8 bg-emerald-500 hover:bg-emerald-600 text-white">Tiếp tục học</Button>
          </div>
        </motion.div>
      </div>
    );
  }

  if (mode === "select") {
    return (
      <div className="flex flex-col h-full max-w-4xl mx-auto w-full gap-8 pt-10 pb-20 items-center justify-center">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col gap-6 text-center mb-6"
        >
          <h1 className="text-4xl font-bold tracking-tight">Chọn thẻ ghi nhớ</h1>
          <p className="text-muted-foreground text-lg">Bạn muốn ôn tập phần nào hôm nay?</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-2xl"
        >
          {/* Card 1: PRN232 */}
          <Card
            className={`flex flex-col p-8 items-center text-center gap-4 transition-all ${expandedCard === 'prn232' ? 'border-primary shadow-lg ring-2 ring-primary/20' : 'cursor-pointer hover:border-primary/50 hover:shadow-lg group'}`}
            onClick={() => { if (expandedCard !== 'prn232') setExpandedCard('prn232'); }}
          >
            <div className="w-16 h-16 rounded-2xl bg-primary/10 text-primary flex items-center justify-center transition-transform group-hover:scale-110">
              <ListOrdered className="w-8 h-8" />
            </div>
            <div>
              <h3 className="text-xl font-bold mb-2">PRN232 - SP26 - FE</h3>
              <p className="text-sm text-muted-foreground">Bộ {questions.length} câu hỏi theo mã môn hiện tại.</p>
            </div>

            {expandedCard !== 'prn232' ? (
              <Button className="mt-4 w-full rounded-full" variant="outline">Chọn phần ôn tập</Button>
            ) : (
              <div className="w-full mt-4 flex flex-col gap-2">
                <Button className="w-full rounded-full mb-2 bg-primary/10 text-primary hover:bg-primary/20" variant="ghost" onClick={(e) => { e.stopPropagation(); handleStartMode("prn232", null); }}>
                  Ôn toàn bộ 50 câu
                </Button>
                <div className="grid grid-cols-2 gap-2 w-full">
                  {prn232Chunks.map((chunk, i) => (
                    <Button
                      key={i}
                      variant="outline"
                      className="text-xs py-1 h-8 rounded-full"
                      onClick={(e) => { e.stopPropagation(); handleStartMode("prn232", chunk); }}
                    >
                      Phần {i + 1} ({chunk[0] + 1}-{chunk[1]})
                    </Button>
                  ))}
                </div>
              </div>
            )}
          </Card>

          {/* Card 2: Full */}
          <Card
            className="flex flex-col p-8 items-center text-center gap-4 cursor-pointer hover:border-primary/50 hover:shadow-lg transition-all group"
            onClick={() => handleStartMode("full")}
          >
            <div className="w-16 h-16 rounded-2xl bg-emerald-500/10 text-emerald-500 flex items-center justify-center group-hover:scale-110 transition-transform">
              <BookOpen className="w-8 h-8" />
            </div>
            <div>
              <h3 className="text-xl font-bold mb-2">Ôn toàn bộ (Full)</h3>
              <p className="text-sm text-muted-foreground">Trộn ngẫu nhiên tất cả các flashcard có trong hệ thống.</p>
            </div>
            <Button className="mt-4 w-full rounded-full" variant="outline">Ôn tập ngay</Button>
          </Card>
        </motion.div>
      </div>
    );
  }

  if (isFinished) {
    return (
      <div className="flex flex-col h-full max-w-4xl mx-auto w-full gap-8 pt-4 pb-20 items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="flex flex-col items-center text-center p-10 bg-card border rounded-3xl shadow-xl max-w-lg w-full"
        >
          <div className="w-20 h-20 bg-emerald-500/20 text-emerald-500 rounded-full flex items-center justify-center mb-6">
            <Trophy className="w-10 h-10" />
          </div>
          <h2 className="text-3xl font-bold tracking-tight mb-2">Tuyệt vời! Đã thuộc hết!</h2>
          <p className="text-muted-foreground mb-8">
            Bạn đã hoàn thành xuất sắc toàn bộ {deck.length} thẻ ghi nhớ trong bộ này.
          </p>
          <div className="flex gap-4 w-full">
            <Button variant="outline" className="flex-1 rounded-full h-12" onClick={handleReset}>
              <RotateCcw className="w-4 h-4 mr-2" /> Học lại từ đầu
            </Button>
            <Button className="flex-1 rounded-full h-12" onClick={handleShuffle}>
              <Shuffle className="w-4 h-4 mr-2" /> Trộn & Học lại
            </Button>
          </div>
        </motion.div>
      </div>
    );
  }

  if (!currentQ) return null;

  return (
    <div className="flex flex-col h-full max-w-4xl mx-auto w-full gap-8 pt-4 pb-20">
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Thẻ ghi nhớ (Flashcards)</h1>
            <p className="text-sm text-muted-foreground mt-1">
              {isFlipped ? "Phím ⬅️: Chưa thuộc | Phím ➡️: Đã thuộc" : "Nhấn phím Cách (Space) để lật"}
            </p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={handleReset} title="Học lại từ đầu">
              <RotateCcw className="w-4 h-4 mr-1 md:mr-2" /> <span className="hidden md:inline">Học lại</span>
            </Button>
            <Button variant="outline" size="sm" onClick={handleShuffle} title="Trộn thẻ">
              <Shuffle className="w-4 h-4 mr-1 md:mr-2" /> <span className="hidden md:inline">Trộn thẻ</span>
            </Button>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <Progress value={progressPercent} segments={Math.ceil(deck.length / 7)} className="h-3 flex-1 [&_[data-slot=progress-indicator]]:bg-emerald-500" />
          <span className="text-sm font-medium text-muted-foreground min-w-[60px] text-right">
            {deck.length - pendingIds.length + qIndex} / {deck.length}
          </span>
        </div>
      </div>

      <div className="relative w-full max-w-4xl mx-auto mt-4 perspective-1000">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentQ.id}
            className="w-full cursor-pointer"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.05 }}
            transition={{ duration: 0.3 }}
            onClick={() => setIsFlipped(!isFlipped)}
          >
            <motion.div
              className="w-full grid relative"
              style={{ transformStyle: "preserve-3d" }}
              animate={{ rotateX: isFlipped ? 180 : 0 }}
              transition={{ type: "spring", stiffness: 260, damping: 20 }}
            >
              {/* FRONT OF CARD */}
              <Card
                className="col-start-1 row-start-1 p-8 md:p-12 flex flex-col items-center justify-center border-2 border-border/50 shadow-lg hover:shadow-xl hover:border-primary/30 transition-all bg-card min-h-[350px]"
                style={{ backfaceVisibility: "hidden" }}
              >
                <div className="absolute top-4 text-xs font-semibold tracking-widest text-muted-foreground/50 uppercase">
                  Câu hỏi
                </div>
                {passCount > 1 && (
                  <div className="absolute top-0 right-0 bg-amber-500 text-white px-4 py-1.5 text-sm font-semibold rounded-bl-xl shadow-sm flex items-center gap-1 z-10">
                    <RotateCcw className="w-3 h-3" /> Làm lại
                  </div>
                )}
                <div className="w-full flex flex-col gap-8 items-center mt-6 mb-6">
                  <h2 className="text-2xl md:text-3xl font-medium leading-relaxed whitespace-pre-wrap text-center max-w-3xl">
                    {currentQ.question}
                  </h2>

                  <div className="w-full max-w-3xl grid grid-cols-1 md:grid-cols-2 gap-4 text-left pointer-events-none">
                    {currentQ.options.map(opt => (
                      <div key={opt.key} className="flex gap-4 p-4 rounded-xl border border-border/50 bg-muted/30">
                        <div className="w-8 h-8 flex items-center justify-center shrink-0 rounded bg-background border font-bold text-sm text-muted-foreground">
                          {opt.key}
                        </div>
                        <div className="text-base md:text-lg leading-relaxed">{opt.text}</div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="absolute bottom-4 text-xs text-muted-foreground animate-pulse">
                  Bấm vào bất kỳ đâu để xem đáp án
                </div>
              </Card>

              {/* BACK OF CARD */}
              <Card
                className="col-start-1 row-start-1 p-8 md:p-12 flex flex-col items-center justify-center text-center border-2 border-primary/30 bg-primary/5 shadow-xl transition-all min-h-[350px]"
                style={{ backfaceVisibility: "hidden", transform: "rotateX(180deg)" }}
              >
                <div className="absolute top-6 text-sm font-semibold tracking-widest text-primary uppercase">
                  Đáp án ({currentQ.correctAnswer})
                </div>
                <div className="text-2xl md:text-3xl font-medium leading-relaxed whitespace-pre-wrap text-foreground max-w-3xl">
                  {correctOptionText}
                </div>
                {currentQ.explanation && (
                  <div className="mt-8 relative overflow-hidden bg-blue-50 dark:bg-blue-900/20 border-y border-r border-blue-200 dark:border-blue-800 border-l-4 border-l-blue-500 rounded-xl p-5 md:p-6 text-sm md:text-base text-blue-900 dark:text-blue-100 shadow-md max-w-3xl text-left w-full">
                    <div className="font-semibold text-blue-700 dark:text-blue-300 mb-3 flex items-center gap-2 text-base md:text-lg">
                      <BookOpen className="w-5 h-5" /> Giải thích chi tiết:
                    </div>
                    <div className="leading-relaxed whitespace-pre-wrap">
                      {currentQ.explanation}
                    </div>
                  </div>
                )}
              </Card>
            </motion.div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* ACTION BUTTONS (Only visible when flipped) */}
      <div className="h-20 flex items-center justify-center mt-6">
        <AnimatePresence>
          {isFlipped && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              className="flex items-center gap-6"
            >
              <Button
                variant="outline"
                size="lg"
                className="rounded-full h-14 px-8 shadow-sm text-destructive hover:text-destructive hover:bg-destructive/10 border-destructive/20"
                onClick={(e) => { e.stopPropagation(); handleStillLearning(); }}
              >
                <X className="w-5 h-5 mr-2" /> Chưa thuộc (Trái)
              </Button>
              <Button
                variant="default"
                size="lg"
                className="rounded-full h-14 px-8 shadow-md shadow-emerald-500/20 bg-emerald-500 hover:bg-emerald-600 text-white"
                onClick={(e) => { e.stopPropagation(); handleKnow(); }}
              >
                <Check className="w-5 h-5 mr-2" /> Đã thuộc (Phải)
              </Button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
