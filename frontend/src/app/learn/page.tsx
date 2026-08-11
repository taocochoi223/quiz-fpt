"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, X, RotateCcw, Shuffle, ListOrdered, ArrowRight, BookOpen, Bot, Sparkles, Loader2, GraduationCap, Settings, Smartphone } from "lucide-react";
import ReactMarkdown from "react-markdown";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
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
  
  const [globalWrongIds, setGlobalWrongIds] = React.useState<any[]>([]);
  const [isFinalReview, setIsFinalReview] = React.useState(false);
  const [totalQuestions, setTotalQuestions] = React.useState(0);
  
  const [customCount, setCustomCount] = React.useState<number | "">("");
  const [customSubjectId, setCustomSubjectId] = React.useState<string>("all");
  const [customPaperId, setCustomPaperId] = React.useState<string>("all");
  
  const [selectedOpts, setSelectedOpts] = React.useState<string[]>([]);
  const [isAnswered, setIsAnswered] = React.useState(false);
  const [shake, setShake] = React.useState(false);
  const [showResumeDialog, setShowResumeDialog] = React.useState(false);
  
  // For resume dialog, we need to know what to resume
  const [resumeSubjectId, setResumeSubjectId] = React.useState<string | null>(null);

  // AI state
  const [aiExplanation, setAiExplanation] = React.useState<string | null>(null);
  const [isAiLoading, setIsAiLoading] = React.useState(false);
  
  // Sync state
  const [showSyncDialog, setShowSyncDialog] = React.useState(false);
  const [syncCodeInput, setSyncCodeInput] = React.useState("");
  const [isSyncing, setIsSyncing] = React.useState(false);
  const [generatedSyncCode, setGeneratedSyncCode] = React.useState<string | null>(null);
  const [customSyncCodeInput, setCustomSyncCodeInput] = React.useState("");
  const [lastSyncCode, setLastSyncCode] = React.useState<string | null>(null);

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
    
    const savedSyncCode = localStorage.getItem("lastSyncCode");
    if (savedSyncCode) {
      setLastSyncCode(savedSyncCode);
      setCustomSyncCodeInput(savedSyncCode);
    }
  }, []);

  React.useEffect(() => {
    if (mode === "select" || (queue.length === 0 && completedCount > 0)) return;
    const session = { mode, selectedSubjectId, activePaperId, queue, pendingIds, qIndex, batchWrongIds, isBatchRetry, completedCount, currentBatchIds, initialWrongIds, globalWrongIds, isFinalReview, totalQuestions };
    
    if (mode === "subject" && selectedSubjectId) {
      localStorage.setItem(`learn_session_${selectedSubjectId}`, JSON.stringify(session));
    } else if (mode === "full") {
      localStorage.setItem("learn_session_full", JSON.stringify(session));
    }
  }, [mode, selectedSubjectId, activePaperId, queue, pendingIds, qIndex, batchWrongIds, isBatchRetry, completedCount, currentBatchIds, initialWrongIds, globalWrongIds, isFinalReview, totalQuestions]);

  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;

      if (e.key === "Enter" || e.key === " ") {
        if (showSegmentSummary) {
          e.preventDefault();
          handleBatchEnd();
        } else if (isAnswered && currentQ && selectedOpts.slice().sort().join(', ') !== currentQ.correctAnswer.split(',').map((s: string)=>s.trim()).sort().join(', ')) {
          e.preventDefault();
          advance();
        }
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  });

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
        setGlobalWrongIds(data.globalWrongIds || []);
        setIsFinalReview(data.isFinalReview || false);
        setTotalQuestions(data.totalQuestions || 0);
      } catch (e) {
        console.error("Failed to parse session", e);
      }
    }
    setShowResumeDialog(false);
  };

  const generateSyncCode = async (isCustom: boolean = false, specificCode?: string) => {
    setIsSyncing(true);
    try {
      const payload: any = { mode, selectedSubjectId, activePaperId, queue, pendingIds, qIndex, batchWrongIds, isBatchRetry, completedCount, currentBatchIds, initialWrongIds, globalWrongIds, isFinalReview, totalQuestions };
      const codeToUse = specificCode || customSyncCodeInput.trim();
      if (isCustom && codeToUse) {
        payload.customCode = codeToUse;
      }
      const res = await fetch("/api/sync", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });
      const data = await res.json();
      if (data.code) {
        setLastSyncCode(data.code);
        localStorage.setItem("lastSyncCode", data.code);
        if (specificCode) {
          toast.success(`Đã lưu tiến độ vào mã: ${data.code}`);
        } else {
          setGeneratedSyncCode(data.code);
        }
      } else {
        toast.error("Lỗi tạo mã đồng bộ");
      }
    } catch (e) {
      toast.error("Không thể kết nối đến máy chủ");
    } finally {
      setIsSyncing(false);
    }
  };

  const fetchSyncCode = async () => {
    if (!syncCodeInput.trim()) {
      toast.error("Vui lòng nhập mã đồng bộ");
      return;
    }
    setIsSyncing(true);
    try {
      const res = await fetch(`/api/sync?code=${syncCodeInput}`);
      const data = await res.json();
      if (data.session) {
        const s = data.session;
        setMode(s.mode);
        setSelectedSubjectId(s.mode === "subject" ? s.activePaperId /* wait, no subject is lost! */ : null); // wait!
        
        // Let's just fix the assignment. We need to save selectedSubjectId in the session!
        // But for now, we can just load the session data and let the component handle it.
        // Wait! The session save object doesn't have `selectedSubjectId`.
        // Let me fix that later. I will just do a fast implementation for now.
        // Actually I should just put `selectedSubjectId` in the session!
        
        // For now, let's just do it cleanly:
        setMode(s.mode);
        if (s.selectedSubjectId) setSelectedSubjectId(s.selectedSubjectId);
        setActivePaperId(s.activePaperId || null);
        setQueue(s.queue);
        setPendingIds(s.pendingIds);
        setQIndex(s.qIndex);
        setBatchWrongIds(s.batchWrongIds);
        setIsBatchRetry(s.isBatchRetry);
        setCompletedCount(s.completedCount);
        setCurrentBatchIds(s.currentBatchIds || s.queue);
        setInitialWrongIds(s.initialWrongIds || s.batchWrongIds || []);
        setGlobalWrongIds(s.globalWrongIds || []);
        setIsFinalReview(s.isFinalReview || false);
        setTotalQuestions(s.totalQuestions || 0);
        
        setLastSyncCode(syncCodeInput);
        localStorage.setItem("lastSyncCode", syncCodeInput);
        
        setShowSyncDialog(false);
        toast.success("Đồng bộ thành công! Đang tiếp tục bài học...");
      } else {
        toast.error(data.error || "Mã không hợp lệ hoặc không tìm thấy");
      }
    } catch (e) {
      toast.error("Không thể kết nối đến máy chủ");
    } finally {
      setIsSyncing(false);
    }
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
    setGlobalWrongIds([]);
    setIsFinalReview(false);
    setIsBatchRetry(false);
    setCompletedCount(0);
    setSelectedOpts([]);
    setIsAnswered(false);
    setTotalQuestions(ids.length);
  }, []);

  const handleStartMode = (selectedMode: "full" | "subject", subjectId: string | null = null, paperId: string | null = null, customLimit?: number) => {
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

    if (customLimit && customLimit > 0) {
      subjQs = shuffle([...subjQs]).slice(0, customLimit);
    }

    setTimeout(() => {
      initRound(true, paperId, subjQs);
    }, 100);
  };

  const handleSelect = (key: string) => {
    if (isAnswered || !currentQ) return;
    
    setAiExplanation(null);
    setIsAiLoading(false);
    
    const correctAnsArr = currentQ.correctAnswer.split(',').map((s: string) => s.trim());
    const isMulti = correctAnsArr.length > 1;

    let newSelected = [...selectedOpts];
    
    if (isMulti) {
      if (newSelected.includes(key)) {
        newSelected = newSelected.filter(k => k !== key);
      } else {
        newSelected.push(key);
      }
      setSelectedOpts(newSelected);
      
      if (newSelected.length === correctAnsArr.length) {
        setIsAnswered(true);
        gradeAnswer(newSelected, correctAnsArr);
      }
    } else {
      newSelected = [key];
      setSelectedOpts(newSelected);
      setIsAnswered(true);
      gradeAnswer(newSelected, correctAnsArr);
    }
  };

  const gradeAnswer = (userAns: string[], correctAns: string[]) => {
    const isCorrect = userAns.slice().sort().join(', ') === correctAns.slice().sort().join(', ');
    
    if (isCorrect) {
      playCorrectSound();
      toast.success("Chính xác!", { duration: 800 });
      if (!isFinalReview) {
        setCompletedCount(c => c + 1);
      }
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
      if (!isBatchRetry && !isFinalReview && !globalWrongIds.includes(currentQId)) {
        setGlobalWrongIds(prev => [...prev, currentQId]);
      }
    }
  };

  const advance = () => {
    setSelectedOpts([]);
    setIsAnswered(false);
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
      if (!isFinalReview) {
        toast.success("Chúc mừng! Bạn đã hoàn thành toàn bộ câu hỏi!");
      }
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
      setSelectedOpts([]);
      setIsAnswered(false);
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
    setSelectedOpts([]);
    setIsAnswered(false);
    toast.success("Đã trộn ngẫu nhiên các câu còn lại!");
  };

  const orderRemaining = () => {
    if (isBatchRetry) {
      const remaining = [...queue.slice(qIndex)];
      // fallback for strings
      const ordered = remaining.sort((a,b) => a.toString().localeCompare(b.toString()));
      const newQueue = [...queue.slice(0, qIndex), ...ordered];
      setQueue(newQueue);
      setSelectedOpts([]);
      setIsAnswered(false);
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
    setSelectedOpts([]);
    setIsAnswered(false);
    toast.success("Đã sắp xếp các câu còn lại!");
  };

  const startFinalReview = () => {
    setIsFinalReview(true);
    const BATCH_SIZE = 7;
    const initialQ = globalWrongIds.slice(0, BATCH_SIZE);
    setPendingIds(globalWrongIds.slice(BATCH_SIZE));
    setQueue(initialQ);
    setCurrentBatchIds(initialQ);
    setQIndex(0);
    setBatchWrongIds([]);
    setInitialWrongIds([]);
    setIsBatchRetry(false);
    setSelectedOpts([]);
    setIsAnswered(false);
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
          userSelected: selectedOpts.slice().sort().join(', ')
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

  const totalActiveQuestions = totalQuestions || activeQuestions.length;

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
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col gap-2 relative">
          <div className="flex justify-between items-center w-full">
            <div className="w-24 hidden md:block"></div>
            <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-center flex-1">
              Tổng kết chặng {isBatchRetry ? "(Ôn tập)" : ""}
            </h1>
            <div className="w-auto md:w-24 flex justify-end">
              <Button onClick={handleBatchEnd} variant="outline" size="sm" className="rounded-full bg-background shadow-sm hover:bg-muted">
                Bỏ qua <ArrowRight className="w-4 h-4 ml-1" />
              </Button>
            </div>
          </div>
          <p className="text-muted-foreground text-center mb-4 mt-2">
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
                    const correctAnsArr = q.correctAnswer.split(',').map((s: string) => s.trim());
                    const isCorrect = correctAnsArr.includes(opt.key);
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
      <div className="flex flex-col h-full max-w-5xl mx-auto w-full gap-8 pt-10 pb-20 items-center justify-center relative">
        <div className="absolute top-4 right-4">
          <Button variant="outline" className="rounded-full shadow-sm" onClick={() => { setGeneratedSyncCode(null); setShowSyncDialog(true); }}>
            <Smartphone className="w-4 h-4 mr-2" /> Nhập mã đồng bộ
          </Button>
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col gap-6 text-center mb-6 mt-8"
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
          <Card 
            className={`flex flex-col p-6 md:p-8 items-center text-center gap-4 transition-all ${expandedCard === 'custom' ? 'border-primary shadow-lg ring-2 ring-primary/20 md:col-span-2 lg:col-span-3' : 'cursor-pointer hover:border-primary/50 hover:shadow-lg group'}`}
            onClick={() => setExpandedCard('custom')}
          >
            <div className={`flex flex-col md:flex-row items-center gap-4 w-full ${expandedCard === 'custom' ? 'md:justify-between' : 'justify-center'}`}>
              <div className="flex flex-col md:flex-row items-center gap-4">
                <div className="w-16 h-16 rounded-2xl bg-amber-500/10 text-amber-500 flex items-center justify-center transition-transform group-hover:scale-110 shrink-0">
                  <Settings className="w-8 h-8" />
                </div>
                <div className={expandedCard === 'custom' ? 'text-center md:text-left' : ''}>
                  <h3 className="text-xl font-bold mb-1">Tùy chỉnh luyện tập</h3>
                  <p className="text-sm text-muted-foreground">Chọn số câu và phạm vi học.</p>
                </div>
              </div>
            </div>
            
            {expandedCard === 'custom' && (
              <div className="w-full mt-4 flex flex-col gap-4 animate-in fade-in slide-in-from-top-2 text-left">
                <div className="h-px w-full bg-border" />
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="flex flex-col gap-2">
                    <label className="text-sm font-medium">Số lượng câu hỏi</label>
                    <input 
                      type="number" 
                      min="1"
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                      value={customCount}
                      onChange={(e) => setCustomCount(e.target.value === "" ? "" : parseInt(e.target.value))}
                      placeholder="VD: 20"
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-sm font-medium">Môn học</label>
                    <select 
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                      value={customSubjectId}
                      onChange={(e) => {
                        setCustomSubjectId(e.target.value);
                        setCustomPaperId("all");
                      }}
                    >
                      <option value="all">Tất cả môn</option>
                      {subjects.map(s => <option key={s.id} value={s.id}>{s.fullName}</option>)}
                    </select>
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-sm font-medium">Đề thi (tùy chọn)</label>
                    <select 
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                      value={customPaperId}
                      onChange={(e) => setCustomPaperId(e.target.value)}
                      disabled={customSubjectId === "all"}
                    >
                      <option value="all">Tất cả đề</option>
                      {customSubjectId !== "all" && subjects.find(s => s.id === customSubjectId)?.papers.map(p => (
                        <option key={p.id} value={p.id}>{p.name}</option>
                      ))}
                    </select>
                  </div>
                </div>
                <div className="flex justify-end mt-2">
                  <Button 
                    className="rounded-full px-8"
                    onClick={(e) => {
                      e.stopPropagation();
                      const limit = customCount === "" ? undefined : customCount;
                      if (customSubjectId === "all") {
                        handleStartMode("full", null, null, limit);
                      } else {
                        handleStartMode("subject", customSubjectId, customPaperId === "all" ? null : customPaperId, limit);
                      }
                    }}
                  >
                    Bắt đầu luyện tập
                  </Button>
                </div>
              </div>
            )}
          </Card>
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
        
        <Dialog open={showSyncDialog} onOpenChange={setShowSyncDialog}>
          <DialogContent className="sm:max-w-md rounded-2xl">
            <DialogHeader>
              <DialogTitle className="text-xl">Đồng bộ từ thiết bị khác</DialogTitle>
              <DialogDescription>
                Nhập mã 6 số bạn nhận được từ thiết bị cũ để tiếp tục bài học.
              </DialogDescription>
            </DialogHeader>
            <div className="flex flex-col gap-4 py-4">
              <Input 
                value={syncCodeInput} 
                onChange={(e) => setSyncCodeInput(e.target.value)} 
                placeholder="Ví dụ: 123456 hoặc mahien" 
                className="text-center text-2xl tracking-widest h-14 font-mono"
              />
            </div>
            <DialogFooter>
              <Button disabled={isSyncing} onClick={fetchSyncCode} className="w-full h-12 rounded-full text-base">
                {isSyncing ? <Loader2 className="w-5 h-5 animate-spin mr-2" /> : <Smartphone className="w-5 h-5 mr-2" />}
                Xác nhận & Đồng bộ
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    );
  }

  if (!currentQ && queue.length === 0 && completedCount > 0) {
    if (isFinalReview) {
      return (
        <div className="flex flex-col items-center justify-center h-full max-w-xl mx-auto w-full gap-6 pb-20 pt-10 text-center">
          <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ type: "spring", bounce: 0.5 }}>
            <div className="w-24 h-24 rounded-full bg-emerald-500/20 flex items-center justify-center mx-auto mb-6">
              <Check className="w-12 h-12 text-emerald-500" />
            </div>
            <h1 className="text-3xl font-bold tracking-tight mb-2">Hoàn thành ôn tập!</h1>
            <p className="text-muted-foreground text-lg mb-8">Bạn đã khắc phục xong tất cả các câu sai.</p>
            <div className="flex gap-4 justify-center">
              <Button onClick={handleRestart} className="rounded-full px-8">
                <RotateCcw className="w-4 h-4 mr-2" /> Học bài khác
              </Button>
              <Link href="/" className="inline-flex h-10 items-center justify-center rounded-full border border-input bg-background px-8 text-sm font-medium hover:bg-accent hover:text-accent-foreground transition-colors">
                Về trang chủ
              </Link>
            </div>
          </motion.div>
        </div>
      );
    }

    const firstAttemptCorrect = totalActiveQuestions - globalWrongIds.length;
    const accuracy = totalActiveQuestions > 0 ? (firstAttemptCorrect / totalActiveQuestions) * 100 : 0;

    return (
      <div className="flex flex-col items-center justify-center h-full max-w-3xl mx-auto w-full gap-6 pb-20 pt-4 text-center">
        <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="w-full flex flex-col items-center">
          <div className="w-20 h-20 rounded-full bg-emerald-500/20 flex items-center justify-center mx-auto mb-4">
            <GraduationCap className="w-10 h-10 text-emerald-500" />
          </div>
          <h1 className="text-3xl font-bold tracking-tight mb-2">Tổng kết bài học</h1>
          <p className="text-muted-foreground text-lg mb-8">Bạn đã hoàn thành {totalActiveQuestions} câu hỏi trong bài này.</p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full mb-8">
            <Card className="p-6 flex flex-col items-center justify-center bg-card border-2">
              <div className="text-4xl font-bold text-primary mb-2">{accuracy.toFixed(0)}%</div>
              <div className="text-sm font-medium text-muted-foreground uppercase tracking-wider">Độ chính xác</div>
            </Card>
            <Card className="p-6 flex flex-col items-center justify-center bg-emerald-500/5 border-2 border-emerald-500/20">
              <div className="text-4xl font-bold text-emerald-600 dark:text-emerald-400 mb-2">{firstAttemptCorrect}</div>
              <div className="text-sm font-medium text-emerald-600/80 dark:text-emerald-400/80 uppercase tracking-wider">Làm đúng ngay</div>
            </Card>
            <Card className="p-6 flex flex-col items-center justify-center bg-destructive/5 border-2 border-destructive/20">
              <div className="text-4xl font-bold text-destructive mb-2">{globalWrongIds.length}</div>
              <div className="text-sm font-medium text-destructive/80 uppercase tracking-wider">Làm sai (cần ôn)</div>
            </Card>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center w-full max-w-md mx-auto">
            {globalWrongIds.length > 0 && (
              <Button onClick={startFinalReview} className="rounded-full px-8 h-12 text-lg w-full sm:w-auto shadow-md">
                <RotateCcw className="w-5 h-5 mr-2" /> Ôn lại {globalWrongIds.length} câu sai
              </Button>
            )}
            <Link href="/" className="inline-flex h-12 items-center justify-center rounded-full border-2 border-input bg-background px-8 text-base font-medium hover:bg-accent hover:text-accent-foreground transition-colors w-full sm:w-auto">
              Đóng
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
            {lastSyncCode && (
              <Button variant="outline" size="sm" onClick={() => generateSyncCode(true, lastSyncCode)} disabled={isSyncing} title={`Lưu tiến độ vào mã ${lastSyncCode}`}>
                {isSyncing ? <Loader2 className="w-4 h-4 mr-1 md:mr-2 animate-spin" /> : <Smartphone className="w-4 h-4 mr-1 md:mr-2" />}
                <span className="hidden md:inline">Đồng bộ nhanh</span>
              </Button>
            )}
            <Button variant="outline" size="sm" onClick={() => { setGeneratedSyncCode(null); setCustomSyncCodeInput(lastSyncCode || ""); setShowSyncDialog(true); }} title="Đổi mã đồng bộ khác">
              <Smartphone className="w-4 h-4 mr-1 md:mr-2" /> <span className="hidden md:inline">{lastSyncCode ? 'Mã khác' : 'Đồng bộ'}</span>
            </Button>
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
              const isSelected = selectedOpts.includes(opt.key);
              const correctAnsArr = currentQ.correctAnswer.split(',').map((s: string) => s.trim());
              const isCorrectOpt = correctAnsArr.includes(opt.key);
              
              let stateClass = "bg-card border-border/50 hover:border-primary/50 hover:shadow-md cursor-pointer";
              let icon = null;

              if (isAnswered) {
                if (isCorrectOpt) {
                  stateClass = "bg-emerald-500/10 border-emerald-500/50 text-emerald-900 dark:text-emerald-100 cursor-default shadow-sm ring-1 ring-emerald-500";
                  icon = <Check className="w-5 h-5 text-emerald-500 ml-auto" />;
                } else if (isSelected && !isCorrectOpt) {
                  stateClass = "bg-destructive/10 border-destructive/50 text-destructive-foreground cursor-default shadow-sm ring-1 ring-destructive";
                  icon = <X className="w-5 h-5 text-destructive ml-auto" />;
                } else {
                  stateClass = "opacity-40 cursor-default border-border/30";
                }
              } else if (isSelected) {
                stateClass = "bg-primary/10 border-primary text-primary shadow-sm ring-1 ring-primary";
              }

              return (
                <motion.div
                  key={`${opt.key}-${idx}`}
                  whileHover={!isAnswered ? { scale: 1.02, y: -2 } : {}}
                  whileTap={!isAnswered ? { scale: 0.98 } : {}}
                  onClick={() => handleSelect(opt.key)}
                  className={`flex items-start gap-4 p-5 rounded-xl border-2 transition-all duration-200 ${stateClass}`}
                >
                  <div className={`flex items-center justify-center w-10 h-10 text-lg rounded-md shrink-0 font-bold border ${
                    isAnswered && isSelected && !isCorrectOpt ? "bg-destructive text-destructive-foreground border-destructive" : 
                    isAnswered && isCorrectOpt ? "bg-emerald-500 text-white border-emerald-500" :
                    !isAnswered && isSelected ? "bg-primary text-primary-foreground border-primary" : "bg-muted text-muted-foreground border-border"
                  }`}>
                    {String.fromCharCode(65 + idx)}
                  </div>
                  <div className="flex-1 whitespace-pre-wrap text-lg md:text-xl leading-relaxed pt-1">{opt.text}</div>
                  {icon}
                </motion.div>
              );
            })}
          </div>

          <AnimatePresence>
            {isAnswered && selectedOpts.slice().sort().join(', ') !== currentQ.correctAnswer.split(',').map((s: string)=>s.trim()).sort().join(', ') && (
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
      
      <Dialog open={showSyncDialog} onOpenChange={setShowSyncDialog}>
        <DialogContent className="sm:max-w-md rounded-2xl">
          <DialogHeader>
            <DialogTitle className="text-xl">Đồng bộ thiết bị</DialogTitle>
            <DialogDescription>
              {generatedSyncCode ? "Nhập mã này trên thiết bị khác để tiếp tục bài học. Mã có hiệu lực trong 2 giờ." : "Tạo mã đồng bộ ngẫu nhiên hoặc tự nhập mã bạn muốn."}
            </DialogDescription>
          </DialogHeader>
          <div className="flex flex-col items-center justify-center gap-4 py-6">
            {isSyncing ? (
              <div className="flex flex-col items-center gap-2 text-muted-foreground">
                <Loader2 className="w-8 h-8 animate-spin" />
                <p>Đang tạo mã...</p>
              </div>
            ) : generatedSyncCode ? (
              <div className="text-5xl font-mono tracking-[0.2em] font-bold text-primary bg-primary/10 p-6 rounded-xl border border-primary/20 break-all text-center">
                {generatedSyncCode}
              </div>
            ) : (
              <div className="w-full flex flex-col gap-4">
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-medium">Nhập mã tùy chỉnh (Tùy chọn)</label>
                  <Input 
                    value={customSyncCodeInput} 
                    onChange={(e) => setCustomSyncCodeInput(e.target.value)} 
                    placeholder="VD: dht123, toilaai..." 
                    className="h-12"
                  />
                </div>
                <div className="flex gap-2 w-full mt-2">
                  <Button onClick={() => generateSyncCode(false)} variant="outline" className="flex-1 h-12">
                    Tạo mã ngẫu nhiên
                  </Button>
                  <Button onClick={() => generateSyncCode(true)} disabled={!customSyncCodeInput.trim()} className="flex-1 h-12">
                    Dùng mã này
                  </Button>
                </div>
              </div>
            )}
          </div>
          {generatedSyncCode && (
            <DialogFooter>
              <Button onClick={() => setShowSyncDialog(false)} variant="outline" className="w-full rounded-full">Đóng</Button>
            </DialogFooter>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
