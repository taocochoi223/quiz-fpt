"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { RotateCcw, Shuffle, Check, X, Trophy, ListOrdered, BookOpen, GraduationCap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { subjects } from "@/data/subjects";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import ReactMarkdown from "react-markdown";
import { playCorrectSound, playWrongSound } from "@/lib/audio";

function shuffle<T>(array: T[]): T[] {
  const copy = [...array];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

const generateChunks = (total: number, size: number) => {
  return []; // Deprecated, we use papers now
};

export default function FlashcardsPage() {
  const [mode, setMode] = React.useState<"select" | "subject" | "full">("select");
  const [selectedSubjectId, setSelectedSubjectId] = React.useState<string | null>(null);
  const [expandedCard, setExpandedCard] = React.useState<string | null>(null);
  const [activePaperId, setActivePaperId] = React.useState<string | null>(null);

  const [deck, setDeck] = React.useState<any[]>([]);

  // State for learning logic
  const [pendingIds, setPendingIds] = React.useState<number[]>([]);
  const [wrongIds, setWrongIds] = React.useState<number[]>([]);
  const [qIndex, setQIndex] = React.useState(0);
  const [passCount, setPassCount] = React.useState(1);

  const [isFlipped, setIsFlipped] = React.useState(false);
  const [isFinished, setIsFinished] = React.useState(false);
  const [showResumeDialog, setShowResumeDialog] = React.useState(false);
  
  const [resumeSubjectId, setResumeSubjectId] = React.useState<string | null>(null);

  const [hasSavedSessions, setHasSavedSessions] = React.useState<Record<string, boolean>>({});

  React.useEffect(() => {
    const sessions: Record<string, boolean> = {};
    for (const subj of subjects) {
      if (localStorage.getItem(`flashcards_session_${subj.id}`)) {
        sessions[subj.id] = true;
      }
    }
    if (localStorage.getItem("flashcards_session")) {
      sessions["prn232"] = true;
    }
    setHasSavedSessions(sessions);
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
    if (isFinished) {
      if (mode === "subject" && selectedSubjectId) {
        localStorage.removeItem(`flashcards_session_${selectedSubjectId}`);
        if (selectedSubjectId === "prn232") localStorage.removeItem("flashcards_session");
      }
    }
  }, [isFinished, mode, selectedSubjectId]);

  const resumeSession = () => {
    let saved = null;
    if (resumeSubjectId) {
      saved = localStorage.getItem(`flashcards_session_${resumeSubjectId}`);
      if (!saved && resumeSubjectId === "prn232") {
        saved = localStorage.getItem("flashcards_session");
      }
    }
    if (saved) {
      try {
        const data = JSON.parse(saved);
        setMode(data.mode === "prn232" ? "subject" : data.mode);
        setSelectedSubjectId(resumeSubjectId);
        setActivePaperId(data.activePaperId || null);
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
    if (resumeSubjectId) {
      localStorage.removeItem(`flashcards_session_${resumeSubjectId}`);
      if (resumeSubjectId === "prn232") localStorage.removeItem("flashcards_session");
      
      setHasSavedSessions(prev => ({ ...prev, [resumeSubjectId]: false }));
      setExpandedCard(resumeSubjectId);
    }
    setShowResumeDialog(false);
  };

  const learnedCount = deck.length - pendingIds.length + qIndex - wrongIds.length;
  const progressPercent = deck.length > 0 ? (learnedCount / deck.length) * 100 : 0;

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

  const getActiveQuestions = () => {
    if (mode === "subject" && selectedSubjectId) {
      const subj = subjects.find(s => s.id === selectedSubjectId);
      if (activePaperId) {
        return subj?.papers.find(p => p.id === activePaperId)?.questions || [];
      }
      return subj?.papers.flatMap(p => p.questions) || [];
    } else if (mode === "full") {
      return subjects.flatMap(s => s.papers.flatMap(p => p.questions));
    }
    return [];
  };

  const handleShuffle = () => {
    setIsFlipped(false);
    setIsFinished(false);
    setTimeout(() => {
      const activeQs = getActiveQuestions();
      const newDeck = shuffle(activeQs);
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
      const activeQs = getActiveQuestions();
      setDeck(activeQs);
      setPendingIds(activeQs.map(q => q.id));
      setWrongIds([]);
      setQIndex(0);
      setPassCount(1);
    }, 200);
  };

  const handleStartMode = (selectedMode: "full" | "subject", subjectId: string | null = null, paperId: string | null = null) => {
    setMode(selectedMode);
    setSelectedSubjectId(subjectId);
    setActivePaperId(paperId);

    let subjQs: any[] = [];
    if (selectedMode === "subject" && subjectId) {
      const subj = subjects.find(s => s.id === subjectId);
      if (subj) {
        if (paperId) {
          subjQs = subj.papers.find(p => p.id === paperId)?.questions || [];
        } else {
          subjQs = subj.papers.flatMap(p => p.questions);
        }
      }
    } else if (selectedMode === "full") {
      subjQs = subjects.flatMap(s => s.papers.flatMap(p => p.questions));
    }

    const ids = shuffle(subjQs.map(q => q.id));
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
      if (selectedSubjectId === "prn232") localStorage.removeItem("flashcards_session");
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

  const correctOptionText = React.useMemo(() => {
    if (!currentQ) return "";
    const correctOpt = currentQ.options.find((o: any) => o.key === currentQ.correctAnswer);
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
          handleStillLearning(); 
        } else if (e.key === "ArrowRight") {
          handleKnow(); 
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
      <div className="flex flex-col h-full max-w-5xl mx-auto w-full gap-8 pt-10 pb-20 items-center justify-center">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col gap-6 text-center mb-6"
        >
          <h1 className="text-4xl font-bold tracking-tight">Chọn thẻ ghi nhớ</h1>
          <p className="text-muted-foreground text-lg">Bạn muốn ôn tập môn nào hôm nay?</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full"
        >
          {subjects.map(subj => {
            const isExpanded = expandedCard === subj.id;
            const hasSession = hasSavedSessions[subj.id];

            return (
              <Card
                key={subj.id}
                className={`flex flex-col p-6 md:p-8 items-center text-center gap-4 transition-all ${isExpanded ? 'border-primary shadow-lg ring-2 ring-primary/20 md:col-span-2 lg:col-span-3' : 'cursor-pointer hover:border-primary/50 hover:shadow-lg group'}`}
                onClick={() => { 
                  if (!isExpanded) {
                    if (hasSavedSessions[subj.id]) {
                      setResumeSubjectId(subj.id);
                      setShowResumeDialog(true);
                    } else {
                      setExpandedCard(subj.id); 
                    }
                  } 
                }}
              >
                <div className={`flex flex-col md:flex-row items-center gap-4 w-full ${isExpanded ? 'md:justify-between' : 'justify-center'}`}>
                  <div className="flex flex-col md:flex-row items-center gap-4">
                    <div className="w-16 h-16 rounded-2xl bg-primary/10 text-primary flex items-center justify-center transition-transform group-hover:scale-110 shrink-0">
                      <GraduationCap className="w-8 h-8" />
                    </div>
                    <div className={isExpanded ? 'text-center md:text-left' : ''}>
                      <h3 className="text-xl font-bold mb-1">{subj.fullName}</h3>
                      <p className="text-sm text-muted-foreground">Bộ {subj.papers.flatMap(p => p.questions).length} flashcards.</p>
                    </div>
                  </div>
                  {!isExpanded && (
                    <Button className="mt-2 w-full rounded-full md:hidden" variant="outline">Chọn môn</Button>
                  )}
                  {isExpanded && (
                    <Button className="hidden md:inline-flex rounded-full bg-primary/10 text-primary hover:bg-primary/20" variant="ghost" onClick={(e) => { e.stopPropagation(); handleStartMode("subject", subj.id, null); }}>
                      Ôn toàn bộ
                    </Button>
                  )}
                </div>

                {isExpanded && (
                  <div className="w-full mt-4 flex flex-col gap-4 animate-in fade-in slide-in-from-top-2">
                    <Button className="w-full rounded-full md:hidden bg-primary/10 text-primary hover:bg-primary/20 mb-2" variant="ghost" onClick={(e) => { e.stopPropagation(); handleStartMode("subject", subj.id, null); }}>
                      Ôn toàn bộ
                    </Button>
                    <div className="h-px w-full bg-border" />
                    <div className="text-left font-medium text-sm text-muted-foreground">Hoặc chọn theo đề:</div>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2 w-full">
                      {subj.papers.map((paper, i) => (
                        <Button
                          key={paper.id}
                          variant="outline"
                          className="text-xs py-1 h-9 rounded-full truncate px-2"
                          onClick={(e) => { e.stopPropagation(); handleStartMode("subject", subj.id, paper.id); }}
                        >
                          {paper.name} ({paper.questions.length} câu)
                        </Button>
                      ))}
                    </div>
                  </div>
                )}
              </Card>
            )
          })}
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
          <div className="flex flex-col md:flex-row gap-4 w-full">
            <Button variant="outline" className="flex-1 rounded-full h-12" onClick={handleReset}>
              <RotateCcw className="w-4 h-4 mr-2" /> Học lại bộ này
            </Button>
            <Button className="flex-1 rounded-full h-12" onClick={handleRestart}>
              <GraduationCap className="w-4 h-4 mr-2" /> Chọn môn khác
            </Button>
          </div>
        </motion.div>
      </div>
    );
  }

  if (!currentQ) return null;

  const currentSubject = mode === "subject" ? subjects.find(s => s.id === selectedSubjectId) : null;

  return (
    <div className="flex flex-col h-full max-w-4xl mx-auto w-full gap-8 pt-4 pb-20">
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Flashcards: {currentSubject ? currentSubject.name : "Toàn bộ"}</h1>
            <p className="text-sm text-muted-foreground mt-1">
              {isFlipped ? "Phím ⬅️: Chưa thuộc | Phím ➡️: Đã thuộc" : "Nhấn phím Cách (Space) để lật"}
            </p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={handleRestart} title="Đổi môn khác">
              <RotateCcw className="w-4 h-4 mr-1 md:mr-2" /> <span className="hidden md:inline">Đổi môn</span>
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
                  <div className="text-2xl md:text-3xl font-medium leading-relaxed text-center max-w-3xl w-full">
                    <ReactMarkdown
                      components={{
                        code({node, inline, className, children, ...props}: any) {
                          return !inline ? (
                            <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-[1rem] my-4 border border-border/50 shadow-inner font-mono text-left">
                              <code className={className} {...props}>
                                {children}
                              </code>
                            </pre>
                          ) : (
                            <code className="bg-muted px-1.5 py-0.5 rounded text-sm font-mono text-primary" {...props}>
                              {children}
                            </code>
                          )
                        }
                      }}
                    >
                      {currentQ.question}
                    </ReactMarkdown>
                  </div>

                  <div className="w-full max-w-3xl grid grid-cols-1 md:grid-cols-2 gap-4 text-left pointer-events-none">
                    {currentQ.options.map((opt: any, idx: number) => (
                      <div key={`${opt.key}-${idx}`} className="flex gap-4 p-4 rounded-xl border border-border/50 bg-muted/30">
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
