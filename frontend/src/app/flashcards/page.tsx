"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  RotateCcw,
  Shuffle,
  Check,
  X,
  Trophy,
  BookOpen,
  GraduationCap,
  Layers,
  Sparkles,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { subjects } from "@/data/subjects";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MarkdownContent } from "@/components/markdown-content";
import { playCorrectSound, playWrongSound } from "@/lib/audio";
import {
  getAllQuestionsWithMeta,
  getSubjectQuestions,
  parseAnswerKeys,
  shuffleArray,
} from "@/lib/quiz-utils";
import { QuestionWithMeta } from "@/lib/types";

export default function FlashcardsPage() {
  const [mode, setMode] = React.useState<"select" | "subject" | "full">("select");
  const [selectedSubjectId, setSelectedSubjectId] = React.useState<string | null>(null);
  const [expandedCard, setExpandedCard] = React.useState<string | null>(null);
  const [activePaperId, setActivePaperId] = React.useState<string | null>(null);

  const [deck, setDeck] = React.useState<QuestionWithMeta[]>([]);
  const [pendingIds, setPendingIds] = React.useState<string[]>([]);
  const [wrongIds, setWrongIds] = React.useState<string[]>([]);
  const [qIndex, setQIndex] = React.useState(0);
  const [passCount, setPassCount] = React.useState(1);

  const [isFlipped, setIsFlipped] = React.useState(false);
  const [isFinished, setIsFinished] = React.useState(false);
  const [showResumeDialog, setShowResumeDialog] = React.useState(false);
  const [resumeSubjectId, setResumeSubjectId] = React.useState<string | null>(null);
  const [hasSavedSessions, setHasSavedSessions] = React.useState<Record<string, boolean>>({});

  React.useEffect(() => {
    const id = requestAnimationFrame(() => {
      const sessions: Record<string, boolean> = {};
      for (const subj of subjects) {
        if (localStorage.getItem(`flashcards_session_${subj.id}`)) {
          sessions[subj.id] = true;
        }
      }
      setHasSavedSessions(sessions);
    });
    return () => cancelAnimationFrame(id);
  }, []);

  React.useEffect(() => {
    if (mode === "select" || isFinished) return;
    const session = { mode, activePaperId, deck, pendingIds, wrongIds, qIndex, passCount };
    if (mode === "subject" && selectedSubjectId) {
      localStorage.setItem(`flashcards_session_${selectedSubjectId}`, JSON.stringify(session));
    } else if (mode === "full") {
      localStorage.setItem("flashcards_session_full", JSON.stringify(session));
    }
  }, [mode, selectedSubjectId, activePaperId, deck, pendingIds, wrongIds, qIndex, passCount, isFinished]);

  React.useEffect(() => {
    if (isFinished && mode === "subject" && selectedSubjectId) {
      localStorage.removeItem(`flashcards_session_${selectedSubjectId}`);
    }
  }, [isFinished, mode, selectedSubjectId]);

  const resumeSession = () => {
    if (!resumeSubjectId) return;
    const saved = localStorage.getItem(`flashcards_session_${resumeSubjectId}`);
    if (saved) {
      try {
        const data = JSON.parse(saved);
        setMode(data.mode);
        setSelectedSubjectId(resumeSubjectId);
        setActivePaperId(data.activePaperId || null);
        setDeck(data.deck);
        setPendingIds(data.pendingIds);
        setWrongIds(data.wrongIds);
        setQIndex(data.qIndex);
        setPassCount(data.passCount);
      } catch (e) {
        console.error("Failed to parse flashcard session", e);
      }
    }
    setShowResumeDialog(false);
  };

  const abandonSession = () => {
    if (resumeSubjectId) {
      localStorage.removeItem(`flashcards_session_${resumeSubjectId}`);
      setHasSavedSessions((prev) => ({ ...prev, [resumeSubjectId]: false }));
      setExpandedCard(resumeSubjectId);
    }
    setShowResumeDialog(false);
  };

  const learnedCount = Math.max(0, deck.length - pendingIds.length + qIndex - wrongIds.length);
  const progressPercent = deck.length > 0 ? (learnedCount / deck.length) * 100 : 0;

  const currentId = pendingIds[qIndex];
  const currentQ = deck.find((q) => q.uniqueId === currentId);

  const advanceCard = React.useCallback(
    (wasWrong: boolean) => {
      if (!currentId) return;
      const newWrong = wasWrong ? [...wrongIds, currentId] : wrongIds;

      if (qIndex + 1 < pendingIds.length) {
        setWrongIds(newWrong);
        setQIndex((prev) => prev + 1);
      } else if (newWrong.length > 0) {
        setPendingIds(newWrong);
        setWrongIds([]);
        setQIndex(0);
        setPassCount((p) => p + 1);
      } else {
        setIsFinished(true);
      }
    },
    [currentId, pendingIds.length, qIndex, wrongIds]
  );

  const handleKnow = React.useCallback(() => {
    playCorrectSound();
    setIsFlipped(false);
    setTimeout(() => advanceCard(false), 150);
  }, [advanceCard]);

  const handleStillLearning = React.useCallback(() => {
    playWrongSound();
    setIsFlipped(false);
    setTimeout(() => advanceCard(true), 150);
  }, [advanceCard]);

  const getActiveQuestions = (): QuestionWithMeta[] => {
    if (mode === "subject" && selectedSubjectId) {
      return getSubjectQuestions(selectedSubjectId, activePaperId ? [activePaperId] : undefined);
    }
    if (mode === "full") {
      return getAllQuestionsWithMeta();
    }
    return [];
  };

  const handleShuffle = () => {
    setIsFlipped(false);
    setIsFinished(false);
    setTimeout(() => {
      const newDeck = shuffleArray(getActiveQuestions());
      setDeck(newDeck);
      setPendingIds(newDeck.map((q) => q.uniqueId));
      setWrongIds([]);
      setQIndex(0);
      setPassCount(1);
    }, 180);
  };

  const handleReset = () => {
    setIsFlipped(false);
    setIsFinished(false);
    setTimeout(() => {
      const activeQs = getActiveQuestions();
      setDeck(activeQs);
      setPendingIds(activeQs.map((q) => q.uniqueId));
      setWrongIds([]);
      setQIndex(0);
      setPassCount(1);
    }, 180);
  };

  const handleStartMode = (
    selectedMode: "full" | "subject",
    subjectId: string | null = null,
    paperId: string | null = null
  ) => {
    setMode(selectedMode);
    setSelectedSubjectId(subjectId);
    setActivePaperId(paperId);

    const subjQs =
      selectedMode === "subject" && subjectId
        ? getSubjectQuestions(subjectId, paperId ? [paperId] : undefined)
        : getAllQuestionsWithMeta();

    const ids = shuffleArray(subjQs.map((q) => q.uniqueId));
    setDeck(subjQs);
    setPendingIds(ids);
    setWrongIds([]);
    setQIndex(0);
    setPassCount(1);
    setIsFinished(false);
    setIsFlipped(false);
  };

  const handleRestart = () => {
    if (mode === "subject" && selectedSubjectId) {
      localStorage.removeItem(`flashcards_session_${selectedSubjectId}`);
    }
    setMode("select");
    setSelectedSubjectId(null);
    setActivePaperId(null);
    setDeck([]);
    setPendingIds([]);
    setQIndex(0);
    setWrongIds([]);
    setIsFinished(false);
  };

  const correctOptions = React.useMemo(() => {
    if (!currentQ) return [];
    const keys = parseAnswerKeys(currentQ.correctAnswer);
    return currentQ.options.filter((o) => keys.includes(o.key));
  }, [currentQ]);

  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (isFinished || showResumeDialog || mode === "select") return;
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;

      if (e.key === " " || e.key === "Enter") {
        e.preventDefault();
        setIsFlipped((prev) => !prev);
      } else if (e.key === "1" || e.key === "ArrowLeft") {
        e.preventDefault();
        handleStillLearning();
      } else if (e.key === "2" || e.key === "ArrowRight") {
        e.preventDefault();
        handleKnow();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isFinished, showResumeDialog, mode, handleKnow, handleStillLearning]);

  if (showResumeDialog) {
    return (
      <div className="flex flex-col h-full max-w-xl mx-auto w-full gap-8 pt-20 pb-20 items-center justify-center text-center">
        <motion.div
          initial={{ scale: 0.94, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="flex flex-col gap-6 p-8 rounded-3xl border border-border/60 bg-card/80 backdrop-blur-md shadow-xl"
        >
          <div className="w-16 h-16 rounded-2xl bg-amber-500/15 flex items-center justify-center mx-auto">
            <RotateCcw className="w-8 h-8 text-amber-500" />
          </div>
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight">Tiếp tục phiên ghi nhớ?</h1>
          <p className="text-muted-foreground">
            Bạn đang có tiến trình Flashcards chưa hoàn thành. Bạn muốn học tiếp hay bắt đầu lại?
          </p>
          <div className="flex gap-3 justify-center mt-2">
            <Button onClick={abandonSession} variant="outline" className="rounded-full px-7">
              Bắt đầu mới
            </Button>
            <Button
              onClick={resumeSession}
              className="rounded-full px-7 bg-emerald-500 hover:bg-emerald-600 text-white"
            >
              Tiếp tục học
            </Button>
          </div>
        </motion.div>
      </div>
    );
  }

  if (mode === "select") {
    return (
      <div className="flex flex-col h-full max-w-5xl mx-auto w-full gap-8 pt-10 pb-20 items-center justify-center">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col gap-3 text-center mb-4"
        >
          <div className="w-14 h-14 rounded-2xl bg-primary/10 text-primary flex items-center justify-center mx-auto mb-1">
            <Layers className="w-7 h-7" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight">Thẻ ghi nhớ 3D</h1>
          <p className="text-muted-foreground text-base md:text-lg">
            Chọn môn học và bộ đề để bắt đầu lật thẻ ôn tập
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.08 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full"
        >
          {subjects.map((subj) => {
            const isExpanded = expandedCard === subj.id;
            const hasSession = hasSavedSessions[subj.id];
            const totalQs = subj.papers.reduce((sum, p) => sum + p.questions.length, 0);

            return (
              <Card
                key={subj.id}
                className={`flex flex-col p-6 md:p-8 items-center text-center gap-4 transition-all bg-card/75 backdrop-blur-md ${
                  isExpanded
                    ? "border-primary shadow-xl ring-2 ring-primary/20 md:col-span-2 lg:col-span-3"
                    : "cursor-pointer hover:border-primary/50 hover:shadow-lg group"
                }`}
                onClick={() => {
                  if (!isExpanded) {
                    if (hasSession) {
                      setResumeSubjectId(subj.id);
                      setShowResumeDialog(true);
                    } else {
                      setExpandedCard(subj.id);
                    }
                  }
                }}
              >
                <div
                  className={`flex flex-col md:flex-row items-center gap-4 w-full ${
                    isExpanded ? "md:justify-between" : "justify-center"
                  }`}
                >
                  <div className="flex flex-col md:flex-row items-center gap-4">
                    <div className="w-14 h-14 rounded-2xl bg-primary/10 text-primary flex items-center justify-center transition-transform group-hover:scale-110 shrink-0">
                      <GraduationCap className="w-7 h-7" />
                    </div>
                    <div className={isExpanded ? "text-center md:text-left" : ""}>
                      <div className="flex items-center justify-center md:justify-start gap-2">
                        <h3 className="text-xl font-bold">{subj.fullName}</h3>
                        {hasSession && (
                          <Badge variant="secondary" className="text-[11px] bg-amber-500/15 text-amber-600 dark:text-amber-400">
                            Đang học dở
                          </Badge>
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground mt-1">
                        {subj.papers.length} bộ đề • {totalQs} flashcards
                      </p>
                    </div>
                  </div>
                  {isExpanded && (
                    <Button
                      className="rounded-full bg-primary/10 text-primary hover:bg-primary/20"
                      variant="ghost"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleStartMode("subject", subj.id, null);
                      }}
                    >
                      <Sparkles className="w-4 h-4 mr-1.5" /> Ôn toàn bộ
                    </Button>
                  )}
                </div>

                {isExpanded && (
                  <div className="w-full mt-2 flex flex-col gap-3">
                    <div className="h-px w-full bg-border/60" />
                    <div className="text-left font-medium text-sm text-muted-foreground">
                      Hoặc chọn theo đề:
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2.5 w-full">
                      {subj.papers.map((paper) => (
                        <Button
                          key={paper.id}
                          variant="outline"
                          className="text-sm h-10 rounded-xl justify-between px-4"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleStartMode("subject", subj.id, paper.id);
                          }}
                        >
                          <span className="truncate">{paper.name}</span>
                          <Badge variant="secondary" className="ml-2">
                            {paper.questions.length}
                          </Badge>
                        </Button>
                      ))}
                    </div>
                  </div>
                )}
              </Card>
            );
          })}
        </motion.div>
      </div>
    );
  }

  if (isFinished) {
    return (
      <div className="flex flex-col h-full max-w-4xl mx-auto w-full gap-8 pt-8 pb-20 items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          className="flex flex-col items-center text-center p-10 bg-card/85 backdrop-blur-md border border-border/60 rounded-3xl shadow-xl max-w-lg w-full"
        >
          <div className="w-20 h-20 bg-emerald-500/15 text-emerald-500 rounded-full flex items-center justify-center mb-6">
            <Trophy className="w-10 h-10" />
          </div>
          <h2 className="text-3xl font-bold tracking-tight mb-2">Tuyệt vời! Đã thuộc hết!</h2>
          <p className="text-muted-foreground mb-8">
            Bạn đã hoàn thành xuất sắc toàn bộ {deck.length} thẻ ghi nhớ trong bộ này.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 w-full">
            <Button variant="outline" className="flex-1 rounded-full h-11" onClick={handleReset}>
              <RotateCcw className="w-4 h-4 mr-2" /> Học lại bộ này
            </Button>
            <Button className="flex-1 rounded-full h-11" onClick={handleRestart}>
              <GraduationCap className="w-4 h-4 mr-2" /> Chọn môn khác
            </Button>
          </div>
        </motion.div>
      </div>
    );
  }

  if (!currentQ) return null;

  const currentSubject = mode === "subject" ? subjects.find((s) => s.id === selectedSubjectId) : null;
  const isMultiAnswer = correctOptions.length > 1;

  return (
    <div className="flex flex-col h-full max-w-4xl mx-auto w-full gap-6 pt-4 pb-20">
      <div className="flex flex-col gap-3">
        <div className="flex items-center justify-between gap-2">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold tracking-tight">
              Flashcards: {currentSubject ? currentSubject.name : "Toàn bộ"}
            </h1>
            <p className="text-xs md:text-sm text-muted-foreground mt-1">
              Space / Enter: Lật thẻ • Phím 1 / ⬅️: Chưa thuộc • Phím 2 / ➡️: Đã thuộc
            </p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" className="rounded-full" onClick={handleRestart}>
              <RotateCcw className="w-4 h-4 mr-1.5" />
              <span className="hidden sm:inline">Đổi môn</span>
            </Button>
            <Button variant="outline" size="sm" className="rounded-full" onClick={handleShuffle}>
              <Shuffle className="w-4 h-4 mr-1.5" />
              <span className="hidden sm:inline">Trộn thẻ</span>
            </Button>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <Progress
            value={progressPercent}
            className="h-2.5 flex-1 [&_[data-slot=progress-indicator]]:bg-emerald-500"
          />
          <span className="text-sm font-semibold text-muted-foreground min-w-[70px] text-right tabular-nums">
            {learnedCount} / {deck.length}
          </span>
        </div>
      </div>

      <div className="relative w-full max-w-4xl mx-auto mt-2 perspective-1000">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentQ.uniqueId}
            className="w-full cursor-pointer touch-manipulation select-none"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.01 }}
            transition={{ duration: 0.15 }}
            onClick={() => setIsFlipped((f) => !f)}
          >
            <motion.div
              className="w-full grid relative"
              style={{ transformStyle: "preserve-3d" }}
              animate={{ rotateX: isFlipped ? 180 : 0 }}
              transition={{ type: "spring", stiffness: 320, damping: 26 }}
            >
              {/* FRONT */}
              <Card
                className="col-start-1 row-start-1 p-6 md:p-10 flex flex-col items-center justify-center border-2 border-border/60 shadow-xl hover:border-primary/40 transition-colors bg-card/95 md:bg-card/85 md:backdrop-blur-md min-h-[360px] rounded-3xl"
                style={{ backfaceVisibility: "hidden" }}
              >
                <div className="absolute top-5 left-6 flex items-center gap-2">
                  <span className="text-xs font-semibold tracking-widest text-muted-foreground/70 uppercase">
                    Câu hỏi
                  </span>
                  {isMultiAnswer && (
                    <Badge variant="secondary" className="text-[11px]">
                      Chọn {correctOptions.length} đáp án
                    </Badge>
                  )}
                </div>
                {passCount > 1 && (
                  <div className="absolute top-0 right-0 bg-amber-500 text-white px-4 py-1.5 text-xs font-semibold rounded-bl-2xl rounded-tr-3xl shadow-sm flex items-center gap-1 z-10">
                    <RotateCcw className="w-3 h-3" /> Vòng ôn {passCount}
                  </div>
                )}

                <div className="w-full flex flex-col gap-6 items-center my-8">
                  <div className="text-xl md:text-2xl font-semibold leading-relaxed text-center max-w-3xl w-full">
                    <MarkdownContent content={currentQ.question} />
                  </div>

                  <div className="w-full max-w-3xl grid grid-cols-1 gap-2.5 text-left pointer-events-none">
                    {currentQ.options.map((opt, idx) => (
                      <div
                        key={`${opt.key}-${idx}`}
                        className="flex items-center gap-3 p-3.5 rounded-xl border border-border/60 bg-muted/35"
                      >
                        <div className="w-7 h-7 flex items-center justify-center shrink-0 rounded-lg bg-background border font-bold text-xs text-muted-foreground">
                          {opt.key}
                        </div>
                        <div className="text-sm md:text-base leading-relaxed">{opt.text}</div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="text-xs text-muted-foreground animate-pulse">
                  Chạm vào thẻ để lật xem đáp án
                </div>
              </Card>

              {/* BACK */}
              <Card
                className="col-start-1 row-start-1 p-6 md:p-10 flex flex-col items-center justify-center text-center border-2 border-primary/40 bg-gradient-to-br from-primary/10 via-card to-emerald-500/5 shadow-xl min-h-[360px] rounded-3xl"
                style={{ backfaceVisibility: "hidden", transform: "rotateX(180deg)" }}
              >
                <div className="text-xs font-bold tracking-widest text-primary uppercase mb-4">
                  Đáp án đúng ({parseAnswerKeys(currentQ.correctAnswer).join(", ")})
                </div>

                <div className="flex flex-col gap-3 w-full max-w-2xl">
                  {correctOptions.map((opt) => (
                    <div
                      key={opt.key}
                      className="flex items-center gap-3 p-4 rounded-2xl border border-emerald-500/30 bg-emerald-500/10 text-left"
                    >
                      <Badge className="bg-emerald-500 text-white shrink-0">{opt.key}</Badge>
                      <span className="text-base md:text-xl font-semibold text-foreground leading-relaxed">
                        {opt.text}
                      </span>
                    </div>
                  ))}
                </div>

                {currentQ.explanation && (
                  <div className="mt-6 relative overflow-hidden bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-800/60 border-l-4 border-l-blue-500 rounded-xl p-5 text-sm md:text-base text-blue-900 dark:text-blue-100 shadow-sm max-w-2xl text-left w-full">
                    <div className="font-semibold text-blue-700 dark:text-blue-300 mb-2 flex items-center gap-2">
                      <BookOpen className="w-4 h-4" /> Giải thích chi tiết:
                    </div>
                    <div className="leading-relaxed whitespace-pre-wrap">{currentQ.explanation}</div>
                  </div>
                )}
              </Card>
            </motion.div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* ACTION BUTTONS */}
      <div className="h-20 flex items-center justify-center mt-2">
        <div
          className={`flex items-center gap-3 sm:gap-5 transition-opacity duration-150 ${
            isFlipped ? "opacity-100" : "opacity-85"
          }`}
        >
          <Button
            variant="outline"
            size="lg"
            className="touch-manipulation rounded-full h-13 px-5 sm:px-7 shadow-sm text-destructive hover:text-destructive hover:bg-destructive/10 border-destructive/30"
            onClick={(e) => {
              e.stopPropagation();
              handleStillLearning();
            }}
          >
            <X className="w-5 h-5 mr-2" />
            <span>Chưa thuộc</span>
            <span className="hidden sm:inline-block ml-2 text-xs font-mono opacity-70">[1 / ⬅]</span>
          </Button>
          <Button
            variant="default"
            size="lg"
            className="touch-manipulation rounded-full h-13 px-5 sm:px-7 shadow-md shadow-emerald-500/20 bg-emerald-500 hover:bg-emerald-600 text-white"
            onClick={(e) => {
              e.stopPropagation();
              handleKnow();
            }}
          >
            <Check className="w-5 h-5 mr-2" />
            <span>Đã thuộc</span>
            <span className="hidden sm:inline-block ml-2 text-xs font-mono opacity-85">[2 / ➡]</span>
          </Button>
        </div>
      </div>
    </div>
  );
}
