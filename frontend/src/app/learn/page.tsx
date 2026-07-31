"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, X, RotateCcw, Shuffle, ListOrdered, ArrowRight, BookOpen, Bot, Sparkles, Loader2, GraduationCap } from "lucide-react";
import ReactMarkdown from "react-markdown";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { subjects, Subject } from "@/data/subjects";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
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

const generateChunks = (total: number, size: number) => {
  return []; // Deprecated, we use papers now
};

export default function LearnPage() {
  const [mode, setMode] = React.useState<"select" | "subject" | "full">("select");
  const [selectedSubjectId, setSelectedSubjectId] = React.useState<string | null>(null);
  const [expandedCard, setExpandedCard] = React.useState<string | null>(null);
  
  const [activePaperId, setActivePaperId] = React.useState<string | null>(null);
  const [queue, setQueue] = React.useState<any[]>([]);
  const [pendingIds, setPendingIds] = React.useState<any[]>([]); // Deprecated, always empty
  const [qIndex, setQIndex] = React.useState(0);
  const [batchWrongIds, setBatchWrongIds] = React.useState<any[]>([]);
  const [isBatchRetry, setIsBatchRetry] = React.useState(false);
  const [completedCount, setCompletedCount] = React.useState(0);
  const [showSegmentSummary, setShowSegmentSummary] = React.useState(false);
  
  const [currentBatchIds, setCurrentBatchIds] = React.useState<any[]>([]);
  const [initialWrongIds, setInitialWrongIds] = React.useState<any[]>([]);
  
  const [selectedOpt, setSelectedOpt] = React.useState<string | null>(null);
  const [shake, setShake] = React.useState(false);
  const [showResumeDialog, setShowResumeDialog] = React.useState(false);
  
  // For resume dialog, we need to know what to resume
  const [resumeSubjectId, setResumeSubjectId] = React.useState<string | null>(null);

  // AI state
  const [aiExplanation, setAiExplanation] = React.useState<string | null>(null);
  const [isAiLoading, setIsAiLoading] = React.useState(false);

  // Determine current active questions list based on mode
  let activeQuestions: any[] = [];
  if (mode === "subject" && selectedSubjectId) {
    const subj = subjects.find(s => s.id === selectedSubjectId);
    if (subj) {
      if (activePaperId) {
        activeQuestions = subj.papers.find(p => p.id === activePaperId)?.questions || [];
      } else {
        activeQuestions = subj.papers.flatMap(p => p.questions);
      }
    }
  } else if (mode === "full") {
    activeQuestions = subjects.flatMap(s => s.papers.flatMap(p => p.questions));
  } else {
    // When in select mode, default to PRN232 for old resume compatibility
    activeQuestions = subjects.find(s => s.id === "prn232")?.papers.flatMap(p => p.questions) || [];
  }

  const currentQId = queue[qIndex];
  const currentQ = activeQuestions.find(q => q.id === currentQId) || null;

  const shuffledOptions = React.useMemo(() => {
    if (!currentQ || !currentQ.options) return [];
    return shuffle(currentQ.options);
  }, [currentQ?.id]);

  const [hasSavedSessions, setHasSavedSessions] = React.useState<Record<string, boolean>>({});

  React.useEffect(() => {
    const sessions: Record<string, boolean> = {};
    for (const subj of subjects) {
      if (localStorage.getItem(`learn_session_${subj.id}`)) {
        sessions[subj.id] = true;
      }
    }
    if (localStorage.getItem("learn_session")) {
      sessions["prn232"] = true;
    }
    setHasSavedSessions(sessions);
  }, []);

  React.useEffect(() => {
    if (mode === "select" || (queue.length === 0 && completedCount > 0)) return;
    const session = { mode, activePaperId, queue, pendingIds, qIndex, batchWrongIds, isBatchRetry, completedCount, currentBatchIds, initialWrongIds };
    
    if (mode === "subject" && selectedSubjectId) {
      localStorage.setItem(`learn_session_${selectedSubjectId}`, JSON.stringify(session));
    } else if (mode === "full") {
      localStorage.setItem("learn_session_full", JSON.stringify(session));
    }
  }, [mode, selectedSubjectId, activePaperId, queue, pendingIds, qIndex, batchWrongIds, isBatchRetry, completedCount, currentBatchIds, initialWrongIds]);

  const resumeSession = () => {
    let saved = null;
    if (resumeSubjectId) {
      saved = localStorage.getItem(`learn_session_${resumeSubjectId}`);
      if (!saved && resumeSubjectId === "prn232") {
        saved = localStorage.getItem("learn_session"); // Legacy
      }
    }
    
    if (saved) {
      try {
        const data = JSON.parse(saved);
        setMode(data.mode === "prn232" ? "subject" : data.mode);
        setSelectedSubjectId(resumeSubjectId);
        setActivePaperId(data.activePaperId || null);
        setQueue(data.queue);
        setPendingIds(data.pendingIds);
        setQIndex(data.qIndex);
        setBatchWrongIds(data.batchWrongIds);
        setIsBatchRetry(data.isBatchRetry);
        setCompletedCount(data.completedCount);
        setCurrentBatchIds(data.currentBatchIds || data.queue);
        setInitialWrongIds(data.initialWrongIds || data.batchWrongIds || []);
      } catch (e) {
        console.error("Failed to parse session", e);
      }
    }
    setShowResumeDialog(false);
  };

  const abandonSession = () => {
    if (resumeSubjectId) {
      localStorage.removeItem(`learn_session_${resumeSubjectId}`);
      if (resumeSubjectId === "prn232") localStorage.removeItem("learn_session");
      
      setHasSavedSessions(prev => ({ ...prev, [resumeSubjectId]: false }));
      setExpandedCard(resumeSubjectId);
    }
    setShowResumeDialog(false);
  };

  const initRound = React.useCallback((ordered = false, paperId: string | null = null, subjQuestions: any[]) => {
    const ids = ordered 
      ? subjQuestions.map(q => q.id)
      : shuffle(subjQuestions.map(q => q.id));
    
    const BATCH_SIZE = 7;
    const initialQ = ids.slice(0, BATCH_SIZE);
    setPendingIds(ids.slice(BATCH_SIZE));
    setQueue(initialQ);
    setCurrentBatchIds(initialQ);
    setQIndex(0);
    setBatchWrongIds([]);
    setInitialWrongIds([]);
    setIsBatchRetry(false);
    setCompletedCount(0);
    setSelectedOpt(null);
  }, []);

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

    setTimeout(() => {
      initRound(true, paperId, subjQs);
    }, 100);
  };

  const handleSelect = (key: string) => {
    if (selectedOpt || !currentQ) return;
    
    setSelectedOpt(key);
    setAiExplanation(null);
    setIsAiLoading(false);
    
    const isCorrect = key === currentQ.correctAnswer;
    
    if (isCorrect) {
      playCorrectSound();
      toast.success("Chính xác!", { duration: 800 });
      setCompletedCount(c => c + 1);
      setTimeout(() => {
        advance();
      }, 1200);
    } else {
      playWrongSound();
      setShake(true);
      setTimeout(() => setShake(false), 500);
      toast.error("Sai rồi!", { duration: 1500 });
      if (!batchWrongIds.includes(currentQId)) {
        setBatchWrongIds(prev => [...prev, currentQId]);
      }
      if (!isBatchRetry && !initialWrongIds.includes(currentQId)) {
        setInitialWrongIds(prev => [...prev, currentQId]);
      }
    }
  };

  const advance = () => {
    setSelectedOpt(null);
    if (qIndex < queue.length - 1) {
      setQIndex(p => p + 1);
    } else {
      if (batchWrongIds.length > 0) {
        toast("Bạn cần ôn lại các câu sai trong chặng này!");
        setQueue([...batchWrongIds]);
        setBatchWrongIds([]);
        setQIndex(0);
        setIsBatchRetry(true);
      } else {
        setShowSegmentSummary(true);
      }
    }
  };

  const handleBatchEnd = () => {
    setShowSegmentSummary(false);
    if (pendingIds.length === 0) {
      toast.success("Chúc mừng! Bạn đã hoàn thành toàn bộ câu hỏi!");
      if (mode === "subject" && selectedSubjectId) {
        localStorage.removeItem(`learn_session_${selectedSubjectId}`);
        if (selectedSubjectId === "prn232") localStorage.removeItem("learn_session");
      }
      setQueue([]);
      setCurrentBatchIds([]);
      return;
    }
    toast.success("Tuyệt vời! Bắt đầu chặng mới.");
    const BATCH_SIZE = 7;
    const nextBatch = pendingIds.slice(0, BATCH_SIZE);
    setQueue(nextBatch);
    setCurrentBatchIds(nextBatch);
    setPendingIds(pendingIds.slice(BATCH_SIZE));
    setQIndex(0);
    setIsBatchRetry(false);
    setBatchWrongIds([]);
    setInitialWrongIds([]);
  };

  const shuffleRemaining = () => {
    if (isBatchRetry) {
      const remaining = [...queue.slice(qIndex)];
      const shuffled = shuffle(remaining);
      const newQueue = [...queue.slice(0, qIndex), ...shuffled];
      setQueue(newQueue);
      setSelectedOpt(null);
      toast.success("Đã trộn các câu đang ôn tập!");
      return;
    }

    const remaining = [...queue.slice(qIndex), ...pendingIds];
    const shuffled = shuffle(Array.from(new Set(remaining)));
    const spotsLeftInBatch = queue.length - qIndex;
    const newBatchSuffix = shuffled.slice(0, spotsLeftInBatch);
    const newQueue = [...queue.slice(0, qIndex), ...newBatchSuffix];
    
    setQueue(newQueue);
    setCurrentBatchIds(newQueue);
    setPendingIds(shuffled.slice(spotsLeftInBatch));
    setSelectedOpt(null);
    toast.success("Đã trộn ngẫu nhiên các câu còn lại!");
  };

  const orderRemaining = () => {
    if (isBatchRetry) {
      const remaining = [...queue.slice(qIndex)];
      // fallback for strings
      const ordered = remaining.sort((a,b) => a.toString().localeCompare(b.toString()));
      const newQueue = [...queue.slice(0, qIndex), ...ordered];
      setQueue(newQueue);
      setSelectedOpt(null);
      toast.success("Đã sắp xếp các câu đang ôn tập!");
      return;
    }

    const remaining = [...queue.slice(qIndex), ...pendingIds];
    const ordered = Array.from(new Set(remaining)).sort((a,b) => a.toString().localeCompare(b.toString()));
    const spotsLeftInBatch = queue.length - qIndex;
    const newBatchSuffix = ordered.slice(0, spotsLeftInBatch);
    const newQueue = [...queue.slice(0, qIndex), ...newBatchSuffix];
    
    setQueue(newQueue);
    setCurrentBatchIds(newQueue);
    setPendingIds(ordered.slice(spotsLeftInBatch));
    setSelectedOpt(null);
    toast.success("Đã sắp xếp thứ tự các câu còn lại!");
  };

  const handleRestart = () => {
    if (mode === "subject" && selectedSubjectId) {
      localStorage.removeItem(`learn_session_${selectedSubjectId}`);
      if (selectedSubjectId === "prn232") localStorage.removeItem("learn_session");
    }
    setMode("select");
    setSelectedSubjectId(null);
    setActivePaperId(null);
    setQueue([]);
    setPendingIds([]);
    setQIndex(0);
    setBatchWrongIds([]);
    setIsBatchRetry(false);
    setCompletedCount(0);
    setShowSegmentSummary(false);
    setAiExplanation(null);
  };

  const handleAskAI = async () => {
    if (!currentQ || isAiLoading) return;
    setIsAiLoading(true);
    setAiExplanation(null);
    
    try {
      const response = await fetch("/api/explain", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          question: currentQ.question,
          options: currentQ.options,
          correctAnswer: currentQ.correctAnswer,
          userSelected: selectedOpt
        })
      });
      
      const data = await response.json();
      if (response.ok) {
        setAiExplanation(data.explanation);
      } else {
        toast.error(data.error || "Có lỗi khi gọi AI.");
      }
    } catch (error) {
      toast.error("Không thể kết nối với server AI.");
    } finally {
      setIsAiLoading(false);
    }
  };

  const totalActiveQuestions = activeQuestions.length;

  if (showResumeDialog) {
    return (
      <div className="flex flex-col h-full max-w-xl mx-auto w-full gap-8 pt-20 pb-20 items-center justify-center text-center">
        <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="flex flex-col gap-6">
          <div className="w-20 h-20 rounded-full bg-amber-500/10 flex items-center justify-center mx-auto mb-2">
            <RotateCcw className="w-10 h-10 text-amber-500" />
          </div>
          <h1 className="text-3xl font-bold tracking-tight">Tiếp tục bài học?</h1>
          <p className="text-muted-foreground text-lg">Bạn có bài học đang dang dở. Bạn muốn tiếp tục hay học bài mới?</p>
          <div className="flex gap-4 justify-center mt-4">
            <Button onClick={abandonSession} variant="outline" className="rounded-full px-8">Bắt đầu mới</Button>
            <Button onClick={resumeSession} className="rounded-full px-8 bg-emerald-500 hover:bg-emerald-600 text-white">Tiếp tục học</Button>
          </div>
        </motion.div>
      </div>
    );
  }

  if (showSegmentSummary) {
    return (
      <div className="flex flex-col h-full max-w-3xl mx-auto w-full gap-6 pt-4 pb-20">
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col gap-2">
          <h1 className="text-3xl font-bold tracking-tight text-center">
            Tổng kết chặng {isBatchRetry ? "(Ôn tập)" : ""}
          </h1>
          <p className="text-muted-foreground text-center mb-4">
            Dưới đây là các câu hỏi bạn vừa làm. Hãy xem lại các câu sai (màu đỏ) nhé!
          </p>
        </motion.div>
        
        <div className="flex flex-col gap-4">
          {currentBatchIds.map((qId, idx) => {
            const q = activeQuestions.find(x => x.id === qId);
            if (!q) return null;
            const wasWrong = initialWrongIds.includes(qId);
            return (
              <Card key={qId} className={`p-5 flex flex-col gap-4 border-2 ${wasWrong ? 'border-destructive/50 bg-destructive/5' : 'border-emerald-500/30 bg-emerald-500/5'}`}>
                <div className="font-medium text-lg leading-relaxed flex items-start gap-3">
                  <Badge variant={wasWrong ? "destructive" : "default"} className={wasWrong ? "" : "bg-emerald-500"}>
                    {idx + 1}
                  </Badge>
                  <div className={wasWrong ? "text-destructive w-full" : "w-full"}>
                    <ReactMarkdown
                      components={{
                        p({node, children, ...props}: any) {
                          return <span {...props}>{children}</span>
                        },
                        code({node, inline, className, children, ...props}: any) {
                          return !inline ? (
                            <span className="block bg-muted p-3 rounded-lg overflow-x-auto text-[0.85rem] my-2 border border-border/50 shadow-inner font-mono text-left w-full max-w-full text-foreground">
                              <code className={className} {...props}>
                                {children}
                              </code>
                            </span>
                          ) : (
                            <code className="bg-muted px-1.5 py-0.5 rounded text-sm font-mono text-foreground" {...props}>
                              {children}
                            </code>
                          )
                        }
                      }}
                    >
                      {q.question}
                    </ReactMarkdown>
                  </div>
                </div>
                
                <div className="ml-10 flex flex-col gap-2 mt-2">
                  {q.options.map((opt: any, idx: number) => {
                    const isCorrect = opt.key === q.correctAnswer;
                    return (
                      <div
                        key={`${opt.key}-${idx}`}
                        className={`flex items-start gap-3 p-3 rounded-lg border transition-colors ${
                          isCorrect 
                            ? "bg-emerald-500/10 border-emerald-500/20 text-emerald-900 dark:text-emerald-100" 
                            : "bg-muted/30 border-transparent text-muted-foreground"
                        }`}
                      >
                        <Badge variant={isCorrect ? "default" : "secondary"} className={isCorrect ? "bg-emerald-500 hover:bg-emerald-600" : ""}>
                          {opt.key}
                        </Badge>
                        <div className="whitespace-pre-wrap text-base leading-relaxed">{opt.text}</div>
                      </div>
                    );
                  })}
                </div>

                {q.explanation && (
                  <div className="ml-10 mt-2 relative overflow-hidden bg-blue-50 dark:bg-blue-900/20 border-y border-r border-blue-200 dark:border-blue-800 border-l-4 border-l-blue-500 rounded-xl p-4 text-sm text-blue-900 dark:text-blue-100 shadow-sm">
                    <div className="font-semibold text-blue-700 dark:text-blue-300 mb-2 flex items-center gap-2">
                      <BookOpen className="w-4 h-4" /> Giải thích chi tiết:
                    </div>
                    <div className="leading-relaxed whitespace-pre-wrap">
                      {q.explanation}
                    </div>
                  </div>
                )}
              </Card>
            )
          })}
        </div>

        <div className="flex justify-center mt-6">
          <Button onClick={handleBatchEnd} className="rounded-full px-8 h-12 text-lg shadow-md bg-primary text-primary-foreground hover:bg-primary/90">
            Tiếp tục <ArrowRight className="w-5 h-5 ml-2" />
          </Button>
        </div>
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
          <h1 className="text-4xl font-bold tracking-tight">Chọn môn học</h1>
          <p className="text-muted-foreground text-lg">Bạn muốn ôn luyện môn nào hôm nay?</p>
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
                      <p className="text-sm text-muted-foreground">Bộ {subj.papers.flatMap(p => p.questions).length} câu hỏi.</p>
                    </div>
                  </div>
                  {!isExpanded && (
                    <Button className="mt-2 w-full rounded-full md:hidden" variant="outline">Chọn môn</Button>
                  )}
                  {isExpanded && (
                    <Button className="hidden md:inline-flex rounded-full bg-primary/10 text-primary hover:bg-primary/20" variant="ghost" onClick={(e) => { e.stopPropagation(); handleStartMode("subject", subj.id, null); }}>
                      Học toàn bộ
                    </Button>
                  )}
                </div>
                
                {isExpanded && (
                  <div className="w-full mt-4 flex flex-col gap-4 animate-in fade-in slide-in-from-top-2">
                    <Button className="w-full rounded-full md:hidden bg-primary/10 text-primary hover:bg-primary/20 mb-2" variant="ghost" onClick={(e) => { e.stopPropagation(); handleStartMode("subject", subj.id, null); }}>
                      Học toàn bộ
                    </Button>
                    <div className="h-px w-full bg-border" />
                    <div className="text-left font-medium text-sm text-muted-foreground">Hoặc chọn học theo đề:</div>
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

  if (!currentQ && queue.length === 0 && completedCount > 0) {
    return (
      <div className="flex flex-col items-center justify-center h-full max-w-xl mx-auto w-full gap-6 pb-20 pt-10 text-center">
        <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ type: "spring", bounce: 0.5 }}>
          <div className="w-24 h-24 rounded-full bg-emerald-500/20 flex items-center justify-center mx-auto mb-6">
            <Check className="w-12 h-12 text-emerald-500" />
          </div>
          <h1 className="text-3xl font-bold tracking-tight mb-2">Hoàn thành xuất sắc!</h1>
          <p className="text-muted-foreground text-lg mb-8">Bạn đã học xong {totalActiveQuestions} câu hỏi.</p>
          <div className="flex gap-4 justify-center">
            <Button onClick={handleRestart} className="rounded-full px-8">
              <RotateCcw className="w-4 h-4 mr-2" /> Chọn môn khác
            </Button>
            <Link href="/" className="inline-flex h-10 items-center justify-center rounded-full border border-input bg-background px-8 text-sm font-medium hover:bg-accent hover:text-accent-foreground transition-colors">
              Về trang chủ
            </Link>
          </div>
        </motion.div>
      </div>
    );
  }

  if (!currentQ) return null;

  const progressPercent = (completedCount / totalActiveQuestions) * 100;
  const currentSubject = mode === "subject" ? subjects.find(s => s.id === selectedSubjectId) : null;

  return (
    <div className="flex flex-col h-full max-w-5xl mx-auto w-full gap-8 pt-4 pb-20">
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Chế độ học: {currentSubject ? currentSubject.name : "Toàn bộ"}</h1>
            <p className="text-sm text-muted-foreground">
              {isBatchRetry ? "Đang ôn lại câu sai..." : `Chặng hiện tại: Câu ${qIndex + 1} / ${queue.length}`}
            </p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={handleRestart} title="Chọn môn khác">
              <RotateCcw className="w-4 h-4 mr-1 md:mr-2" /> <span className="hidden md:inline">Đổi môn</span>
            </Button>
            <Button variant="outline" size="sm" onClick={orderRemaining} title="Sắp xếp theo thứ tự">
              <ListOrdered className="w-4 h-4 mr-1 md:mr-2" /> <span className="hidden md:inline">Thứ tự</span>
            </Button>
            <Button variant="outline" size="sm" onClick={shuffleRemaining} title="Xáo trộn ngẫu nhiên">
              <Shuffle className="w-4 h-4 mr-1 md:mr-2" /> <span className="hidden md:inline">Trộn</span>
            </Button>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <Progress 
            value={progressPercent} 
            segmentBreakpoints={Array.from({ length: Math.ceil(totalActiveQuestions / 7) - 1 }).map((_, i) => ((i + 1) * 7 / totalActiveQuestions) * 100)}
            className="h-3 flex-1 [&_[data-slot=progress-indicator]]:bg-emerald-500" 
          />
          <span className="text-sm font-medium text-muted-foreground min-w-[60px] text-right">
            {completedCount} / {totalActiveQuestions}
          </span>
        </div>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={currentQ.id}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0, x: shake ? [-5, 5, -5, 5, 0] : 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.2 }}
          className="flex flex-col gap-6"
        >
          <Card className="p-6 md:p-10 border border-border/50 shadow-sm bg-card/50 backdrop-blur relative overflow-hidden">
            {isBatchRetry && (
              <div className="absolute top-0 right-0 bg-amber-500 text-white px-4 py-1 text-sm font-semibold rounded-bl-xl shadow-sm flex items-center gap-1">
                <RotateCcw className="w-3 h-3" /> Làm lại
              </div>
            )}
            <div className="text-2xl md:text-3xl font-medium leading-relaxed max-w-none w-full">
              <ReactMarkdown
                components={{
                  code({node, inline, className, children, ...props}: any) {
                    return !inline ? (
                      <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-[1rem] my-4 border border-border/50 shadow-inner font-mono">
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
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
            {shuffledOptions.map((opt: any, idx: number) => {
              const isSelected = selectedOpt === opt.key;
              const isCorrectOpt = opt.key === currentQ.correctAnswer;
              
              let stateClass = "bg-card border-border/50 hover:border-primary/50 hover:shadow-md cursor-pointer";
              let icon = null;

              if (selectedOpt) {
                if (isCorrectOpt) {
                  stateClass = "bg-emerald-500/10 border-emerald-500/50 text-emerald-900 dark:text-emerald-100 cursor-default shadow-sm ring-1 ring-emerald-500";
                  icon = <Check className="w-5 h-5 text-emerald-500 ml-auto" />;
                } else if (isSelected && !isCorrectOpt) {
                  stateClass = "bg-destructive/10 border-destructive/50 text-destructive-foreground cursor-default shadow-sm ring-1 ring-destructive";
                  icon = <X className="w-5 h-5 text-destructive ml-auto" />;
                } else {
                  stateClass = "opacity-40 cursor-default border-border/30";
                }
              }

              return (
                <motion.div
                  key={`${opt.key}-${idx}`}
                  whileHover={!selectedOpt ? { scale: 1.02, y: -2 } : {}}
                  whileTap={!selectedOpt ? { scale: 0.98 } : {}}
                  onClick={() => handleSelect(opt.key)}
                  className={`flex items-start gap-4 p-5 rounded-xl border-2 transition-all duration-200 ${stateClass}`}
                >
                  <div className={`flex items-center justify-center w-10 h-10 text-lg rounded-md shrink-0 font-bold border ${
                    isSelected && !isCorrectOpt ? "bg-destructive text-destructive-foreground border-destructive" : 
                    isCorrectOpt && selectedOpt ? "bg-emerald-500 text-white border-emerald-500" : "bg-muted text-muted-foreground border-border"
                  }`}>
                    {opt.key}
                  </div>
                  <div className="flex-1 whitespace-pre-wrap text-lg md:text-xl leading-relaxed pt-1">{opt.text}</div>
                  {icon}
                </motion.div>
              );
            })}
          </div>

          <AnimatePresence>
            {selectedOpt && selectedOpt !== currentQ.correctAnswer && (
              <motion.div 
                initial={{ opacity: 0, y: 10, height: 0 }}
                animate={{ opacity: 1, y: 0, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="flex flex-col gap-4 mt-2"
              >
                {currentQ.explanation && (
                  <div className="relative overflow-hidden bg-blue-50 dark:bg-blue-900/20 border-y border-r border-blue-200 dark:border-blue-800 border-l-4 border-l-blue-500 rounded-xl p-5 md:p-6 text-sm md:text-base text-blue-900 dark:text-blue-100 shadow-md mt-2">
                    <div className="font-semibold text-blue-700 dark:text-blue-300 mb-3 flex items-center gap-2 text-base md:text-lg">
                      <BookOpen className="w-5 h-5" /> Giải thích chi tiết:
                    </div>
                    <div className="leading-relaxed whitespace-pre-wrap">
                      {currentQ.explanation}
                    </div>
                  </div>
                )}

                {aiExplanation && (
                  <div className="relative overflow-hidden bg-purple-50 dark:bg-purple-900/20 border-y border-r border-purple-200 dark:border-purple-800 border-l-4 border-l-purple-500 rounded-xl p-5 md:p-6 text-sm md:text-base text-purple-900 dark:text-purple-100 shadow-md mt-2">
                    <div className="font-semibold text-purple-700 dark:text-purple-300 mb-3 flex items-center gap-2 text-base md:text-lg">
                      <Sparkles className="w-5 h-5" /> Trợ lý AI giải thích:
                    </div>
                    <div className="leading-relaxed prose prose-purple dark:prose-invert max-w-none">
                      <ReactMarkdown>{aiExplanation}</ReactMarkdown>
                    </div>
                  </div>
                )}

                <div className="flex justify-between items-center mt-2">
                  <Button 
                    onClick={handleAskAI} 
                    disabled={isAiLoading || !!aiExplanation}
                    variant="outline"
                    className="rounded-full px-4 md:px-6 border-purple-200 hover:border-purple-300 hover:bg-purple-50 text-purple-700 dark:border-purple-800 dark:text-purple-300 dark:hover:bg-purple-900/30"
                  >
                    {isAiLoading ? (
                      <><Loader2 className="w-4 h-4 mr-2 animate-spin" /> Đang hỏi AI...</>
                    ) : (
                      <><Bot className="w-4 h-4 mr-2" /> Hỏi AI</>
                    )}
                  </Button>
                  <Button 
                    onClick={advance} 
                    className="rounded-full px-6 md:px-8 bg-amber-500 hover:bg-amber-600 text-white shadow-sm"
                  >
                    Tiếp tục <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
