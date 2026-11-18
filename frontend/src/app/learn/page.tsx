"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Check,
  X,
  RotateCcw,
  Shuffle,
  ListOrdered,
  ArrowRight,
  BookOpen,
  Bot,
  Sparkles,
  Loader2,
  GraduationCap,
  Settings,
  Smartphone,
} from "lucide-react";
import ReactMarkdown from "react-markdown";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { subjects } from "@/data/subjects";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import Link from "next/link";
import { playCorrectSound, playWrongSound } from "@/lib/audio";
import { MarkdownContent } from "@/components/markdown-content";
import {
  getAllQuestionsWithMeta,
  getSubjectQuestions,
  isCorrectSelection,
  parseAnswerKeys,
  shuffleArray,
} from "@/lib/quiz-utils";
import { QuestionWithMeta } from "@/lib/types";

const BATCH_SIZE = 7;

export default function LearnPage() {
  const [mode, setMode] = React.useState<"select" | "subject" | "full">("select");
  const [selectedSubjectId, setSelectedSubjectId] = React.useState<string | null>(null);
  const [expandedCard, setExpandedCard] = React.useState<string | null>(null);

  const [activePaperIds, setActivePaperIds] = React.useState<string[]>([]);
  const [selectedPapersToStart, setSelectedPapersToStart] = React.useState<string[]>([]);
  const [queue, setQueue] = React.useState<string[]>([]);
  const [pendingIds, setPendingIds] = React.useState<string[]>([]);
  const [qIndex, setQIndex] = React.useState(0);
  const [batchWrongIds, setBatchWrongIds] = React.useState<string[]>([]);
  const [isBatchRetry, setIsBatchRetry] = React.useState(false);
  const [completedCount, setCompletedCount] = React.useState(0);
  const [showSegmentSummary, setShowSegmentSummary] = React.useState(false);

  const [currentBatchIds, setCurrentBatchIds] = React.useState<string[]>([]);
  const [initialWrongIds, setInitialWrongIds] = React.useState<string[]>([]);
  const [globalWrongIds, setGlobalWrongIds] = React.useState<string[]>([]);
  const [isFinalReview, setIsFinalReview] = React.useState(false);
  const [totalQuestions, setTotalQuestions] = React.useState(0);

  const [customCount, setCustomCount] = React.useState<number | "">("");
  const [customSubjectId, setCustomSubjectId] = React.useState<string>("all");
  const [customPaperId, setCustomPaperId] = React.useState<string>("all");

  const [selectedOpts, setSelectedOpts] = React.useState<string[]>([]);
  const [isAnswered, setIsAnswered] = React.useState(false);
  const [shake, setShake] = React.useState(false);
  const [showResumeDialog, setShowResumeDialog] = React.useState(false);
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

  const activeQuestions: QuestionWithMeta[] = React.useMemo(() => {
    if (mode === "subject" && selectedSubjectId) {
      return getSubjectQuestions(selectedSubjectId, activePaperIds);
    }
    if (mode === "full") {
      return getAllQuestionsWithMeta();
    }
    const defaultSubj = subjects[0];
    return defaultSubj ? getSubjectQuestions(defaultSubj.id) : [];
  }, [mode, selectedSubjectId, activePaperIds]);

  const currentQId = queue[qIndex];
  const currentQ = activeQuestions.find((q) => q.uniqueId === currentQId) || null;

  const shuffledOptions = React.useMemo(() => {
    if (!currentQ?.options) return [];
    return shuffleArray(currentQ.options);
  }, [currentQ]);

  const [hasSavedSessions, setHasSavedSessions] = React.useState<Record<string, boolean>>({});

  React.useEffect(() => {
    const id = requestAnimationFrame(() => {
      const sessions: Record<string, boolean> = {};
      for (const subj of subjects) {
        if (localStorage.getItem(`learn_session_${subj.id}`)) {
          sessions[subj.id] = true;
        }
      }
      setHasSavedSessions(sessions);

      const savedSyncCode = localStorage.getItem("lastSyncCode");
      if (savedSyncCode) {
        setLastSyncCode(savedSyncCode);
        setCustomSyncCodeInput(savedSyncCode);
      }
    });
    return () => cancelAnimationFrame(id);
  }, []);

  React.useEffect(() => {
    if (mode === "select" || (queue.length === 0 && completedCount > 0)) return;
    const timer = setTimeout(() => {
      const session = {
        mode,
        selectedSubjectId,
        activePaperIds,
        queue,
        pendingIds,
        qIndex,
        batchWrongIds,
        isBatchRetry,
        completedCount,
        currentBatchIds,
        initialWrongIds,
        globalWrongIds,
        isFinalReview,
        totalQuestions,
      };

      if (mode === "subject" && selectedSubjectId) {
        localStorage.setItem(`learn_session_${selectedSubjectId}`, JSON.stringify(session));
      } else if (mode === "full") {
        localStorage.setItem("learn_session_full", JSON.stringify(session));
      }
    }, 150);

    return () => clearTimeout(timer);
  }, [
    mode,
    selectedSubjectId,
    activePaperIds,
    queue,
    pendingIds,
    qIndex,
    batchWrongIds,
    isBatchRetry,
    completedCount,
    currentBatchIds,
    initialWrongIds,
    globalWrongIds,
    isFinalReview,
    totalQuestions,
  ]);

  React.useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [qIndex, showSegmentSummary, mode]);

  const advance = React.useCallback(() => {
    setSelectedOpts([]);
    setIsAnswered(false);
    setAiExplanation(null);
    if (qIndex < queue.length - 1) {
      setQIndex((p) => p + 1);
    } else if (batchWrongIds.length > 0) {
      toast("Bạn cần ôn lại các câu sai trong chặng này!");
      setQueue([...batchWrongIds]);
      setBatchWrongIds([]);
      setQIndex(0);
      setIsBatchRetry(true);
    } else {
      setShowSegmentSummary(true);
    }
  }, [batchWrongIds, qIndex, queue.length]);

  const handleBatchEnd = React.useCallback(() => {
    setShowSegmentSummary(false);
    if (pendingIds.length === 0) {
      if (!isFinalReview) {
        toast.success("Chúc mừng! Bạn đã hoàn thành toàn bộ câu hỏi!");
      }
      if (mode === "subject" && selectedSubjectId) {
        localStorage.removeItem(`learn_session_${selectedSubjectId}`);
      }
      setQueue([]);
      setCurrentBatchIds([]);
      return;
    }
    toast.success("Tuyệt vời! Bắt đầu chặng mới.");
    const nextBatch = pendingIds.slice(0, BATCH_SIZE);
    setQueue(nextBatch);
    setCurrentBatchIds(nextBatch);
    setPendingIds(pendingIds.slice(BATCH_SIZE));
    setQIndex(0);
    setIsBatchRetry(false);
    setBatchWrongIds([]);
    setInitialWrongIds([]);
  }, [isFinalReview, mode, pendingIds, selectedSubjectId]);

  const gradeAnswer = React.useCallback(
    (userAns: string[], correctAnswerStr: string) => {
      const isCorrect = isCorrectSelection(userAns, correctAnswerStr);

      if (isCorrect) {
        setTimeout(() => playCorrectSound(), 0);
        toast.success("Chính xác!", { duration: 700 });
        if (!isFinalReview) {
          setCompletedCount((c) => c + 1);
        }
        setTimeout(() => {
          advance();
        }, 750);
      } else {
        setTimeout(() => playWrongSound(), 0);
        setShake(true);
        setTimeout(() => setShake(false), 400);
        toast.error("Sai rồi!", { duration: 1200 });
        if (currentQId && !batchWrongIds.includes(currentQId)) {
          setBatchWrongIds((prev) => [...prev, currentQId]);
        }
        if (currentQId && !isBatchRetry && !initialWrongIds.includes(currentQId)) {
          setInitialWrongIds((prev) => [...prev, currentQId]);
        }
        if (currentQId && !isBatchRetry && !isFinalReview && !globalWrongIds.includes(currentQId)) {
          setGlobalWrongIds((prev) => [...prev, currentQId]);
        }
      }
    },
    [advance, batchWrongIds, currentQId, globalWrongIds, initialWrongIds, isBatchRetry, isFinalReview]
  );

  const handleSelect = React.useCallback(
    (key: string) => {
      if (isAnswered || !currentQ) return;

      setAiExplanation(null);
      setIsAiLoading(false);

      const correctAnsArr = parseAnswerKeys(currentQ.correctAnswer);
      const isMulti = correctAnsArr.length > 1;

      if (isMulti) {
        const newSelected = selectedOpts.includes(key)
          ? selectedOpts.filter((k) => k !== key)
          : [...selectedOpts, key];
        setSelectedOpts(newSelected);

        if (newSelected.length === correctAnsArr.length) {
          setIsAnswered(true);
          gradeAnswer(newSelected, currentQ.correctAnswer);
        }
      } else {
        const newSelected = [key];
        setSelectedOpts(newSelected);
        setIsAnswered(true);
        gradeAnswer(newSelected, currentQ.correctAnswer);
      }
    },
    [currentQ, gradeAnswer, isAnswered, selectedOpts]
  );

  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;
      if (mode === "select" || showResumeDialog || showSyncDialog) return;

      if (e.key === "Enter" || e.key === " ") {
        if (showSegmentSummary) {
          e.preventDefault();
          handleBatchEnd();
        } else if (
          isAnswered &&
          currentQ &&
          !isCorrectSelection(selectedOpts, currentQ.correctAnswer)
        ) {
          e.preventDefault();
          advance();
        }
      } else if (!isAnswered && !showSegmentSummary && ["1", "2", "3", "4"].includes(e.key)) {
        const idx = Number(e.key) - 1;
        const opt = shuffledOptions[idx];
        if (opt) handleSelect(opt.key);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [
    advance,
    currentQ,
    handleBatchEnd,
    handleSelect,
    isAnswered,
    mode,
    selectedOpts,
    showResumeDialog,
    showSegmentSummary,
    showSyncDialog,
    shuffledOptions,
  ]);

  const resumeSession = () => {
    if (!resumeSubjectId) return;
    const saved = localStorage.getItem(`learn_session_${resumeSubjectId}`);
    if (saved) {
      try {
        const data = JSON.parse(saved);
        setMode(data.mode);
        setSelectedSubjectId(resumeSubjectId);
        setActivePaperIds(data.activePaperIds || (data.activePaperId ? [data.activePaperId] : []));
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
      const payload: Record<string, unknown> = {
        mode,
        selectedSubjectId,
        activePaperIds,
        queue,
        pendingIds,
        qIndex,
        batchWrongIds,
        isBatchRetry,
        completedCount,
        currentBatchIds,
        initialWrongIds,
        globalWrongIds,
        isFinalReview,
        totalQuestions,
      };
      const codeToUse = specificCode || customSyncCodeInput.trim();
      if (isCustom && codeToUse) {
        payload.customCode = codeToUse;
      }
      const res = await fetch("/api/sync", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
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
    } catch {
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
      const res = await fetch(`/api/sync?code=${encodeURIComponent(syncCodeInput.trim())}`);
      const data = await res.json();
      if (data.session) {
        const s = data.session;
        setMode(s.mode);
        if (s.selectedSubjectId) setSelectedSubjectId(s.selectedSubjectId);
        setActivePaperIds(s.activePaperIds || (s.activePaperId ? [s.activePaperId] : []));
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

        setLastSyncCode(syncCodeInput.trim());
        localStorage.setItem("lastSyncCode", syncCodeInput.trim());
        setShowSyncDialog(false);
        toast.success("Đồng bộ thành công! Đang tiếp tục bài học...");
      } else {
        toast.error(data.error || "Mã không hợp lệ hoặc không tìm thấy");
      }
    } catch {
      toast.error("Không thể kết nối đến máy chủ");
    } finally {
      setIsSyncing(false);
    }
  };

  const abandonSession = () => {
    if (resumeSubjectId) {
      localStorage.removeItem(`learn_session_${resumeSubjectId}`);
      setHasSavedSessions((prev) => ({ ...prev, [resumeSubjectId]: false }));
      setExpandedCard(resumeSubjectId);
    }
    setShowResumeDialog(false);
  };

  const initRound = React.useCallback((ordered: boolean, subjQuestions: QuestionWithMeta[]) => {
    const rawIds = subjQuestions.map((q) => q.uniqueId);
    const ids = ordered ? rawIds : shuffleArray(rawIds);

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
    setAiExplanation(null);
    setTotalQuestions(ids.length);
  }, []);

  const handleStartMode = (
    selectedMode: "full" | "subject",
    subjectId: string | null = null,
    paperIds: string[] = [],
    customLimit?: number
  ) => {
    setMode(selectedMode);
    setSelectedSubjectId(subjectId);
    setActivePaperIds(paperIds);

    let subjQs =
      selectedMode === "subject" && subjectId
        ? getSubjectQuestions(subjectId, paperIds)
        : getAllQuestionsWithMeta();

    if (customLimit && customLimit > 0) {
      subjQs = shuffleArray(subjQs).slice(0, customLimit);
    }

    setTimeout(() => {
      initRound(true, subjQs);
    }, 80);
  };

  const shuffleRemaining = () => {
    if (isBatchRetry) {
      const remaining = queue.slice(qIndex);
      const newQueue = [...queue.slice(0, qIndex), ...shuffleArray(remaining)];
      setQueue(newQueue);
      setSelectedOpts([]);
      setIsAnswered(false);
      toast.success("Đã trộn các câu đang ôn tập!");
      return;
    }

    const remaining = [...queue.slice(qIndex), ...pendingIds];
    const shuffled = shuffleArray(remaining);
    const spotsLeftInBatch = queue.length - qIndex;
    const newQueue = [...queue.slice(0, qIndex), ...shuffled.slice(0, spotsLeftInBatch)];

    setQueue(newQueue);
    setCurrentBatchIds(newQueue);
    setPendingIds(shuffled.slice(spotsLeftInBatch));
    setSelectedOpts([]);
    setIsAnswered(false);
    toast.success("Đã trộn ngẫu nhiên các câu còn lại!");
  };

  const orderRemaining = () => {
    if (isBatchRetry) {
      const remaining = [...queue.slice(qIndex)].sort((a, b) => a.localeCompare(b));
      setQueue([...queue.slice(0, qIndex), ...remaining]);
      setSelectedOpts([]);
      setIsAnswered(false);
      toast.success("Đã sắp xếp các câu đang ôn tập!");
      return;
    }

    const remaining = [...queue.slice(qIndex), ...pendingIds].sort((a, b) => a.localeCompare(b));
    const spotsLeftInBatch = queue.length - qIndex;
    const newQueue = [...queue.slice(0, qIndex), ...remaining.slice(0, spotsLeftInBatch)];

    setQueue(newQueue);
    setCurrentBatchIds(newQueue);
    setPendingIds(remaining.slice(spotsLeftInBatch));
    setSelectedOpts([]);
    setIsAnswered(false);
    toast.success("Đã sắp xếp các câu còn lại theo thứ tự!");
  };

  const startFinalReview = () => {
    setIsFinalReview(true);
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
    }
    setMode("select");
    setSelectedSubjectId(null);
    setActivePaperIds([]);
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
          userSelected: [...selectedOpts].sort().join(", "),
        }),
      });

      const data = await response.json();
      if (response.ok) {
        setAiExplanation(data.explanation);
      } else {
        toast.error(data.error || "Có lỗi khi gọi AI.");
      }
    } catch {
      toast.error("Không thể kết nối với server AI.");
    } finally {
      setIsAiLoading(false);
    }
  };

  const totalActiveQuestions = totalQuestions || activeQuestions.length;

  if (showResumeDialog) {
    return (
      <div className="flex flex-col h-full max-w-xl mx-auto w-full gap-8 pt-20 pb-20 items-center justify-center text-center">
        <motion.div
          initial={{ scale: 0.94, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="flex flex-col gap-6 p-8 rounded-3xl border border-border/60 bg-card/85 backdrop-blur-md shadow-xl"
        >
          <div className="w-16 h-16 rounded-2xl bg-amber-500/15 flex items-center justify-center mx-auto">
            <RotateCcw className="w-8 h-8 text-amber-500" />
          </div>
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight">Tiếp tục bài học?</h1>
          <p className="text-muted-foreground">
            Bạn có bài học đang dang dở. Bạn muốn tiếp tục hay bắt đầu bài mới?
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

  if (showSegmentSummary) {
    return (
      <div className="flex flex-col h-full max-w-3xl mx-auto w-full gap-6 pt-4 pb-20">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col gap-2 relative"
        >
          <div className="flex justify-between items-center w-full">
            <div className="w-24 hidden md:block" />
            <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-center flex-1">
              Tổng kết chặng {isBatchRetry ? "(Ôn tập)" : ""}
            </h1>
            <div className="w-auto md:w-24 flex justify-end">
              <Button
                onClick={handleBatchEnd}
                variant="outline"
                size="sm"
                className="rounded-full bg-background shadow-sm hover:bg-muted"
              >
                Bỏ qua <ArrowRight className="w-4 h-4 ml-1" />
              </Button>
            </div>
          </div>
          <p className="text-muted-foreground text-center mb-2 mt-1 text-sm md:text-base">
            Xem lại các câu vừa hoàn thành trong chặng này trước khi sang chặng tiếp theo.
          </p>
        </motion.div>

        <div className="flex flex-col gap-4">
          {currentBatchIds.map((qId, idx) => {
            const q = activeQuestions.find((x) => x.uniqueId === qId);
            if (!q) return null;
            const wasWrong = initialWrongIds.includes(qId);
            const correctKeys = parseAnswerKeys(q.correctAnswer);

            return (
              <Card
                key={qId}
                className={`p-5 flex flex-col gap-4 border-2 rounded-2xl ${
                  wasWrong
                    ? "border-destructive/50 bg-destructive/5"
                    : "border-emerald-500/30 bg-emerald-500/5"
                }`}
              >
                <div className="font-medium text-base md:text-lg leading-relaxed flex items-start gap-3">
                  <Badge
                    variant={wasWrong ? "destructive" : "default"}
                    className={wasWrong ? "" : "bg-emerald-500 text-white"}
                  >
                    {idx + 1}
                  </Badge>
                  <div className={wasWrong ? "text-destructive w-full" : "w-full"}>
                    <MarkdownContent content={q.question} inlineParagraphs />
                  </div>
                </div>

                <div className="ml-8 flex flex-col gap-2">
                  {q.options.map((opt, oIdx) => {
                    const isCorrect = correctKeys.includes(opt.key);
                    return (
                      <div
                        key={`${opt.key}-${oIdx}`}
                        className={`flex items-start gap-3 p-3 rounded-xl border transition-colors ${
                          isCorrect
                            ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-950 dark:text-emerald-100"
                            : "bg-muted/30 border-transparent text-muted-foreground"
                        }`}
                      >
                        <Badge
                          variant={isCorrect ? "default" : "secondary"}
                          className={isCorrect ? "bg-emerald-500 text-white" : ""}
                        >
                          {opt.key}
                        </Badge>
                        <div className="whitespace-pre-wrap text-sm md:text-base leading-relaxed">
                          {opt.text}
                        </div>
                      </div>
                    );
                  })}
                </div>

                {q.explanation && (
                  <div className="ml-8 bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800/60 border-l-4 border-l-blue-500 rounded-xl p-4 text-sm text-blue-900 dark:text-blue-100">
                    <div className="font-semibold text-blue-700 dark:text-blue-300 mb-1.5 flex items-center gap-2">
                      <BookOpen className="w-4 h-4" /> Giải thích chi tiết:
                    </div>
                    <div className="leading-relaxed whitespace-pre-wrap">{q.explanation}</div>
                  </div>
                )}
              </Card>
            );
          })}
        </div>

        <div className="flex justify-center mt-4">
          <Button
            onClick={handleBatchEnd}
            className="rounded-full px-8 h-12 text-base shadow-md bg-primary text-primary-foreground hover:bg-primary/90"
          >
            Tiếp tục <ArrowRight className="w-5 h-5 ml-2" />
          </Button>
        </div>
      </div>
    );
  }

  if (mode === "select") {
    return (
      <div className="flex flex-col h-full max-w-5xl mx-auto w-full gap-8 pt-8 pb-20 items-center justify-center relative">
        <div className="w-full flex justify-end">
          <Button
            variant="outline"
            className="rounded-full shadow-sm"
            onClick={() => {
              setGeneratedSyncCode(null);
              setShowSyncDialog(true);
            }}
          >
            <Smartphone className="w-4 h-4 mr-2" /> Nhập mã đồng bộ
          </Button>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col gap-3 text-center mb-2"
        >
          <div className="w-14 h-14 rounded-2xl bg-primary/10 text-primary flex items-center justify-center mx-auto mb-1">
            <BookOpen className="w-7 h-7" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight">Học theo chặng</h1>
          <p className="text-muted-foreground text-base md:text-lg">
            Học cuốn chiếu 7 câu mỗi chặng — sai câu nào ôn lại ngay câu đó
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.08 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full"
        >
          <Card
            className={`flex flex-col p-6 md:p-8 items-center text-center gap-4 transition-all bg-card/75 backdrop-blur-md ${
              expandedCard === "custom"
                ? "border-primary shadow-xl ring-2 ring-primary/20 md:col-span-2 lg:col-span-3"
                : "cursor-pointer hover:border-primary/50 hover:shadow-lg group"
            }`}
            onClick={() => setExpandedCard(expandedCard === "custom" ? null : "custom")}
          >
            <div
              className={`flex flex-col md:flex-row items-center gap-4 w-full ${
                expandedCard === "custom" ? "md:justify-between" : "justify-center"
              }`}
            >
              <div className="flex flex-col md:flex-row items-center gap-4">
                <div className="w-14 h-14 rounded-2xl bg-amber-500/15 text-amber-500 flex items-center justify-center transition-transform group-hover:scale-110 shrink-0">
                  <Settings className="w-7 h-7" />
                </div>
                <div className={expandedCard === "custom" ? "text-center md:text-left" : ""}>
                  <h3 className="text-xl font-bold mb-1">Tùy chỉnh luyện tập</h3>
                  <p className="text-sm text-muted-foreground">Chọn số câu và phạm vi học linh hoạt.</p>
                </div>
              </div>
            </div>

            {expandedCard === "custom" && (
              <div
                className="w-full mt-2 flex flex-col gap-4 text-left"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="h-px w-full bg-border/60" />
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="flex flex-col gap-2">
                    <label className="text-sm font-medium">Số lượng câu hỏi</label>
                    <input
                      type="number"
                      min={1}
                      className="flex h-10 w-full rounded-xl border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                      value={customCount}
                      onChange={(e) =>
                        setCustomCount(e.target.value === "" ? "" : parseInt(e.target.value, 10))
                      }
                      placeholder="VD: 20 (để trống = tất cả)"
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-sm font-medium">Môn học</label>
                    <select
                      className="flex h-10 w-full rounded-xl border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                      value={customSubjectId}
                      onChange={(e) => {
                        setCustomSubjectId(e.target.value);
                        setCustomPaperId("all");
                      }}
                    >
                      <option value="all">Tất cả môn</option>
                      {subjects.map((s) => (
                        <option key={s.id} value={s.id}>
                          {s.fullName}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-sm font-medium">Đề thi (tùy chọn)</label>
                    <select
                      className="flex h-10 w-full rounded-xl border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                      value={customPaperId}
                      onChange={(e) => setCustomPaperId(e.target.value)}
                      disabled={customSubjectId === "all"}
                    >
                      <option value="all">Tất cả đề</option>
                      {customSubjectId !== "all" &&
                        subjects
                          .find((s) => s.id === customSubjectId)
                          ?.papers.map((p) => (
                            <option key={p.id} value={p.id}>
                              {p.name}
                            </option>
                          ))}
                    </select>
                  </div>
                </div>
                <div className="flex justify-end mt-2">
                  <Button
                    className="rounded-full px-8"
                    onClick={() => {
                      const limit = customCount === "" ? undefined : customCount;
                      if (customSubjectId === "all") {
                        handleStartMode("full", null, [], limit);
                      } else {
                        handleStartMode(
                          "subject",
                          customSubjectId,
                          customPaperId === "all" ? [] : [customPaperId],
                          limit
                        );
                      }
                    }}
                  >
                    Bắt đầu luyện tập
                  </Button>
                </div>
              </div>
            )}
          </Card>

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
                      setSelectedPapersToStart([]);
                    }
                  } else {
                    setExpandedCard(null);
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
                        {subj.papers.length} bộ đề • {totalQs} câu hỏi
                      </p>
                    </div>
                  </div>
                  {isExpanded && (
                    <Button
                      className="rounded-full bg-primary/10 text-primary hover:bg-primary/20"
                      variant="ghost"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleStartMode("subject", subj.id, []);
                      }}
                    >
                      Học toàn bộ
                    </Button>
                  )}
                </div>

                {isExpanded && (
                  <div
                    className="w-full mt-2 flex flex-col gap-4"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <div className="h-px w-full bg-border/60" />
                    <div className="text-left font-medium text-sm text-muted-foreground flex flex-col sm:flex-row justify-between sm:items-center gap-2">
                      <span>Hoặc chọn đề muốn học:</span>
                      {selectedPapersToStart.length > 0 && (
                        <Button
                          size="sm"
                          className="h-8 bg-emerald-500 hover:bg-emerald-600 text-white rounded-full px-4 w-full sm:w-auto"
                          onClick={() => handleStartMode("subject", subj.id, selectedPapersToStart)}
                        >
                          Bắt đầu học {selectedPapersToStart.length} đề
                        </Button>
                      )}
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2.5 w-full">
                      {subj.papers.map((paper) => {
                        const isSelected = selectedPapersToStart.includes(paper.id);
                        return (
                          <Button
                            key={paper.id}
                            variant={isSelected ? "default" : "outline"}
                            className={`text-sm h-10 rounded-xl justify-between px-4 transition-colors ${
                              isSelected
                                ? "bg-emerald-500 hover:bg-emerald-600 text-white border-emerald-500"
                                : ""
                            }`}
                            onClick={() => {
                              setSelectedPapersToStart((prev) =>
                                isSelected
                                  ? prev.filter((id) => id !== paper.id)
                                  : [...prev, paper.id]
                              );
                            }}
                          >
                            <span className="flex items-center truncate">
                              {isSelected && <Check className="w-3.5 h-3.5 mr-1.5 shrink-0" />}
                              {paper.name}
                            </span>
                            <Badge variant={isSelected ? "secondary" : "outline"} className="ml-2">
                              {paper.questions.length}
                            </Badge>
                          </Button>
                        );
                      })}
                    </div>
                  </div>
                )}
              </Card>
            );
          })}
        </motion.div>

        <Dialog open={showSyncDialog} onOpenChange={setShowSyncDialog}>
          <DialogContent className="sm:max-w-md rounded-2xl">
            <DialogHeader>
              <DialogTitle className="text-xl">Đồng bộ từ thiết bị khác</DialogTitle>
              <DialogDescription>
                Nhập mã bạn nhận được từ thiết bị cũ để tiếp tục bài học.
              </DialogDescription>
            </DialogHeader>
            <div className="flex flex-col gap-4 py-4">
              <Input
                value={syncCodeInput}
                onChange={(e) => setSyncCodeInput(e.target.value)}
                placeholder="Ví dụ: 123456"
                className="text-center text-2xl tracking-widest h-14 font-mono"
              />
            </div>
            <DialogFooter>
              <Button
                disabled={isSyncing}
                onClick={fetchSyncCode}
                className="w-full h-12 rounded-full text-base"
              >
                {isSyncing ? (
                  <Loader2 className="w-5 h-5 animate-spin mr-2" />
                ) : (
                  <Smartphone className="w-5 h-5 mr-2" />
                )}
                Xác nhận &amp; Đồng bộ
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
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="p-8 rounded-3xl border border-border/60 bg-card/85 backdrop-blur-md shadow-xl"
          >
            <div className="w-20 h-20 rounded-full bg-emerald-500/20 flex items-center justify-center mx-auto mb-5">
              <Check className="w-10 h-10 text-emerald-500" />
            </div>
            <h1 className="text-3xl font-bold tracking-tight mb-2">Hoàn thành ôn tập!</h1>
            <p className="text-muted-foreground text-base mb-8">
              Bạn đã khắc phục xong toàn bộ các câu từng làm sai.
            </p>
            <div className="flex gap-3 justify-center">
              <Button onClick={handleRestart} className="rounded-full px-7">
                <RotateCcw className="w-4 h-4 mr-2" /> Học bài khác
              </Button>
              <Link
                href="/"
                className="inline-flex h-10 items-center justify-center rounded-full border border-input bg-background px-7 text-sm font-medium hover:bg-accent hover:text-accent-foreground transition-colors"
              >
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
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="w-full flex flex-col items-center p-8 rounded-3xl border border-border/60 bg-card/85 backdrop-blur-md shadow-xl"
        >
          <div className="w-20 h-20 rounded-full bg-emerald-500/20 flex items-center justify-center mx-auto mb-4">
            <GraduationCap className="w-10 h-10 text-emerald-500" />
          </div>
          <h1 className="text-3xl font-bold tracking-tight mb-2">Tổng kết bài học</h1>
          <p className="text-muted-foreground text-base md:text-lg mb-8">
            Bạn đã hoàn thành {totalActiveQuestions} câu hỏi trong bài này.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full mb-8">
            <Card className="p-6 flex flex-col items-center justify-center bg-card border">
              <div className="text-4xl font-bold text-primary mb-1">{accuracy.toFixed(0)}%</div>
              <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                Độ chính xác
              </div>
            </Card>
            <Card className="p-6 flex flex-col items-center justify-center bg-emerald-500/5 border border-emerald-500/25">
              <div className="text-4xl font-bold text-emerald-600 dark:text-emerald-400 mb-1">
                {firstAttemptCorrect}
              </div>
              <div className="text-xs font-semibold text-emerald-600/80 dark:text-emerald-400/80 uppercase tracking-wider">
                Làm đúng ngay
              </div>
            </Card>
            <Card className="p-6 flex flex-col items-center justify-center bg-destructive/5 border border-destructive/25">
              <div className="text-4xl font-bold text-destructive mb-1">{globalWrongIds.length}</div>
              <div className="text-xs font-semibold text-destructive/80 uppercase tracking-wider">
                Làm sai (cần ôn)
              </div>
            </Card>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 justify-center w-full max-w-md mx-auto">
            {globalWrongIds.length > 0 && (
              <Button
                onClick={startFinalReview}
                className="rounded-full px-8 h-12 text-base w-full sm:w-auto shadow-md"
              >
                <RotateCcw className="w-4 h-4 mr-2" /> Ôn lại {globalWrongIds.length} câu sai
              </Button>
            )}
            <Link
              href="/"
              className="inline-flex h-12 items-center justify-center rounded-full border border-input bg-background px-8 text-base font-medium hover:bg-accent hover:text-accent-foreground transition-colors w-full sm:w-auto"
            >
              Về trang chủ
            </Link>
          </div>
        </motion.div>
      </div>
    );
  }

  if (!currentQ) return null;

  const progressPercent = totalActiveQuestions > 0 ? (completedCount / totalActiveQuestions) * 100 : 0;
  const currentSubject = mode === "subject" ? subjects.find((s) => s.id === selectedSubjectId) : null;
  const correctKeys = parseAnswerKeys(currentQ.correctAnswer);
  const isMulti = correctKeys.length > 1;
  const isUserCorrect = isAnswered && isCorrectSelection(selectedOpts, currentQ.correctAnswer);

  return (
    <div className="flex flex-col h-full max-w-5xl mx-auto w-full gap-6 pt-4 pb-20">
      <div className="flex flex-col gap-3">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div>
            <div className="flex items-center gap-2.5">
              <h1 className="text-2xl font-bold tracking-tight">
                {currentSubject ? currentSubject.name : "Tất cả môn"}
              </h1>
              {isMulti && (
                <Badge className="rounded-full bg-amber-500/15 text-amber-600 dark:text-amber-400 border border-amber-500/30">
                  Chọn {correctKeys.length} đáp án
                </Badge>
              )}
            </div>
            <p className="text-xs md:text-sm text-muted-foreground mt-0.5">
              {isBatchRetry
                ? "Đang ôn lại câu sai trong chặng..."
                : `Chặng hiện tại: Câu ${qIndex + 1} / ${queue.length} • Phím 1-4 để chọn nhanh`}
            </p>
          </div>

          <div className="flex flex-wrap gap-1.5">
            {lastSyncCode && (
              <Button
                variant="outline"
                size="sm"
                className="rounded-full"
                onClick={() => generateSyncCode(true, lastSyncCode)}
                disabled={isSyncing}
                title={`Lưu tiến độ vào mã ${lastSyncCode}`}
              >
                {isSyncing ? (
                  <Loader2 className="w-4 h-4 mr-1.5 animate-spin" />
                ) : (
                  <Smartphone className="w-4 h-4 mr-1.5" />
                )}
                <span className="hidden md:inline">Đồng bộ nhanh</span>
              </Button>
            )}
            <Button
              variant="outline"
              size="sm"
              className="rounded-full"
              onClick={() => {
                setGeneratedSyncCode(null);
                setCustomSyncCodeInput(lastSyncCode || "");
                setShowSyncDialog(true);
              }}
            >
              <Smartphone className="w-4 h-4 mr-1.5" />
              <span className="hidden md:inline">{lastSyncCode ? "Mã khác" : "Đồng bộ"}</span>
            </Button>
            <Button variant="outline" size="sm" className="rounded-full" onClick={handleRestart}>
              <RotateCcw className="w-4 h-4 mr-1.5" />
              <span className="hidden md:inline">Đổi môn</span>
            </Button>
            <Button variant="outline" size="sm" className="rounded-full" onClick={orderRemaining}>
              <ListOrdered className="w-4 h-4 mr-1.5" />
              <span className="hidden md:inline">Thứ tự</span>
            </Button>
            <Button variant="outline" size="sm" className="rounded-full" onClick={shuffleRemaining}>
              <Shuffle className="w-4 h-4 mr-1.5" />
              <span className="hidden md:inline">Trộn</span>
            </Button>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <Progress
            value={progressPercent}
            segmentBreakpoints={Array.from({
              length: Math.max(0, Math.ceil(totalActiveQuestions / BATCH_SIZE) - 1),
            }).map((_, i) => (((i + 1) * BATCH_SIZE) / totalActiveQuestions) * 100)}
            className="h-2.5 flex-1 [&_[data-slot=progress-indicator]]:bg-emerald-500"
          />
          <span className="text-sm font-semibold text-muted-foreground min-w-[68px] text-right tabular-nums">
            {completedCount} / {totalActiveQuestions}
          </span>
        </div>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={currentQ.uniqueId}
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0, x: shake ? [-5, 5, -5, 5, 0] : 0 }}
          exit={{ opacity: 0, y: -6 }}
          transition={{ duration: 0.12 }}
          className="flex flex-col gap-5"
        >
          <Card className="p-6 md:p-9 border border-border/60 shadow-lg bg-card/95 md:bg-card/85 md:backdrop-blur-md relative overflow-hidden rounded-3xl">
            {isBatchRetry && (
              <div className="absolute top-0 right-0 bg-amber-500 text-white px-4 py-1 text-xs font-semibold rounded-bl-2xl shadow-sm flex items-center gap-1">
                <RotateCcw className="w-3 h-3" /> Làm lại
              </div>
            )}
            <div className="text-xl md:text-2xl font-semibold leading-relaxed w-full">
              <MarkdownContent content={currentQ.question} />
              {currentQ.imageUrl && (
                <div className="mt-5 flex justify-center">
                  <img
                    src={currentQ.imageUrl}
                    alt="Hình minh họa câu hỏi"
                    className="max-w-full h-auto rounded-xl border border-border shadow-sm max-h-[380px] object-contain"
                  />
                </div>
              )}
            </div>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
            {shuffledOptions.map((opt, idx) => {
              const isSelected = selectedOpts.includes(opt.key);
              const isCorrectOpt = correctKeys.includes(opt.key);

              let stateClass =
                "bg-card/75 border-border/60 hover:border-primary/50 hover:shadow-md cursor-pointer";
              let icon = null;

              if (isAnswered) {
                if (isCorrectOpt) {
                  stateClass =
                    "bg-emerald-500/10 border-emerald-500/60 text-emerald-950 dark:text-emerald-100 cursor-default shadow-sm ring-1 ring-emerald-500";
                  icon = <Check className="w-5 h-5 text-emerald-500 ml-auto shrink-0" />;
                } else if (isSelected && !isCorrectOpt) {
                  stateClass =
                    "bg-destructive/10 border-destructive/60 text-destructive cursor-default shadow-sm ring-1 ring-destructive";
                  icon = <X className="w-5 h-5 text-destructive ml-auto shrink-0" />;
                } else {
                  stateClass = "opacity-45 cursor-default border-border/30";
                }
              } else if (isSelected) {
                stateClass =
                  "bg-primary/10 border-primary text-foreground shadow-sm ring-1 ring-primary";
              }

              return (
                <button
                  type="button"
                  key={`${opt.key}-${idx}`}
                  disabled={isAnswered}
                  onClick={() => handleSelect(opt.key)}
                  className={`touch-manipulation select-none flex items-start gap-3.5 p-4 md:p-5 rounded-2xl border-2 text-left transition-colors duration-100 active:scale-[0.99] ${stateClass}`}
                >
                  <div
                    className={`flex items-center justify-center w-9 h-9 text-base rounded-xl shrink-0 font-bold border ${
                      isAnswered && isSelected && !isCorrectOpt
                        ? "bg-destructive text-white border-destructive"
                        : isAnswered && isCorrectOpt
                        ? "bg-emerald-500 text-white border-emerald-500"
                        : !isAnswered && isSelected
                        ? "bg-primary text-primary-foreground border-primary"
                        : "bg-muted text-muted-foreground border-border"
                    }`}
                  >
                    {String.fromCharCode(65 + idx)}
                  </div>
                  <div className="flex-1 whitespace-pre-wrap text-base md:text-lg leading-relaxed pt-0.5">
                    {opt.text}
                  </div>
                  {icon}
                </button>
              );
            })}
          </div>

          <AnimatePresence>
            {isAnswered && !isUserCorrect && (
              <motion.div
                initial={{ opacity: 0, y: 10, height: 0 }}
                animate={{ opacity: 1, y: 0, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="flex flex-col gap-4 mt-1"
              >
                {currentQ.explanation && (
                  <div className="bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800/60 border-l-4 border-l-blue-500 rounded-2xl p-5 text-sm md:text-base text-blue-900 dark:text-blue-100 shadow-sm">
                    <div className="font-semibold text-blue-700 dark:text-blue-300 mb-2 flex items-center gap-2">
                      <BookOpen className="w-4 h-4" /> Giải thích chi tiết:
                    </div>
                    <div className="leading-relaxed whitespace-pre-wrap">{currentQ.explanation}</div>
                  </div>
                )}

                {aiExplanation && (
                  <div className="bg-purple-50 dark:bg-purple-950/30 border border-purple-200 dark:border-purple-800/60 border-l-4 border-l-purple-500 rounded-2xl p-5 text-sm md:text-base text-purple-900 dark:text-purple-100 shadow-sm">
                    <div className="font-semibold text-purple-700 dark:text-purple-300 mb-2 flex items-center gap-2">
                      <Sparkles className="w-4 h-4" /> Trợ lý AI giải thích:
                    </div>
                    <div className="leading-relaxed prose prose-purple dark:prose-invert max-w-none">
                      <ReactMarkdown>{aiExplanation}</ReactMarkdown>
                    </div>
                  </div>
                )}

                <div className="flex justify-between items-center pt-1">
                  <Button
                    onClick={handleAskAI}
                    disabled={isAiLoading || Boolean(aiExplanation)}
                    variant="outline"
                    className="rounded-full px-5 border-purple-300 hover:bg-purple-50 text-purple-700 dark:border-purple-800 dark:text-purple-300 dark:hover:bg-purple-900/30"
                  >
                    {isAiLoading ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" /> Đang hỏi AI...
                      </>
                    ) : (
                      <>
                        <Bot className="w-4 h-4 mr-2" /> Hỏi AI
                      </>
                    )}
                  </Button>
                  <Button
                    onClick={advance}
                    className="rounded-full px-7 bg-amber-500 hover:bg-amber-600 text-white shadow-sm"
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
              {generatedSyncCode
                ? "Nhập mã này trên thiết bị khác để tiếp tục bài học."
                : "Tạo mã đồng bộ ngẫu nhiên hoặc tự nhập mã bạn muốn."}
            </DialogDescription>
          </DialogHeader>
          <div className="flex flex-col items-center justify-center gap-4 py-6">
            {isSyncing ? (
              <div className="flex flex-col items-center gap-2 text-muted-foreground">
                <Loader2 className="w-8 h-8 animate-spin" />
                <p>Đang tạo mã...</p>
              </div>
            ) : generatedSyncCode ? (
              <div className="text-4xl font-mono tracking-[0.2em] font-bold text-primary bg-primary/10 p-6 rounded-2xl border border-primary/20 break-all text-center">
                {generatedSyncCode}
              </div>
            ) : (
              <div className="w-full flex flex-col gap-4">
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-medium">Nhập mã tùy chỉnh (Tùy chọn)</label>
                  <Input
                    value={customSyncCodeInput}
                    onChange={(e) => setCustomSyncCodeInput(e.target.value)}
                    placeholder="VD: vnr202..."
                    className="h-12"
                  />
                </div>
                <div className="flex gap-2 w-full mt-2">
                  <Button
                    onClick={() => generateSyncCode(false)}
                    variant="outline"
                    className="flex-1 h-11 rounded-full"
                  >
                    Tạo mã ngẫu nhiên
                  </Button>
                  <Button
                    onClick={() => generateSyncCode(true)}
                    disabled={!customSyncCodeInput.trim()}
                    className="flex-1 h-11 rounded-full"
                  >
                    Dùng mã này
                  </Button>
                </div>
              </div>
            )}
          </div>
          {generatedSyncCode && (
            <DialogFooter>
              <Button
                onClick={() => setShowSyncDialog(false)}
                variant="outline"
                className="w-full rounded-full"
              >
                Đóng
              </Button>
            </DialogFooter>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
