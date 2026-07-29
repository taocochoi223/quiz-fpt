"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, X, RotateCcw, Shuffle, ListOrdered, ArrowRight, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { questions } from "@/data/questions";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import Link from "next/link";
import { playCorrectSound, playWrongSound } from "@/lib/audio";

const BATCH_SIZE = 7;

function shuffle<T>(array: T[]): T[] {
  const copy = [...array];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

const generateChunks = (total: number, size: number) => {
  const chunks = [];
  for (let i = 0; i < total; i += size) {
    chunks.push([i, Math.min(i + size, total)] as [number, number]);
  }
  return chunks;
};
const prn232Chunks = generateChunks(questions.length, BATCH_SIZE);

export default function LearnPage() {
  const [mode, setMode] = React.useState<"select" | "full" | "prn232">("select");
  const [expandedCard, setExpandedCard] = React.useState<"prn232" | null>(null);
  const [activeRange, setActiveRange] = React.useState<[number, number] | null>(null);
  const [queue, setQueue] = React.useState<number[]>([]);
  const [pendingIds, setPendingIds] = React.useState<number[]>([]);
  const [qIndex, setQIndex] = React.useState(0);
  const [batchWrongIds, setBatchWrongIds] = React.useState<number[]>([]);
  const [isBatchRetry, setIsBatchRetry] = React.useState(false);
  const [completedCount, setCompletedCount] = React.useState(0);
  const [showSegmentSummary, setShowSegmentSummary] = React.useState(false);
  
  const [currentBatchIds, setCurrentBatchIds] = React.useState<number[]>([]);
  const [initialWrongIds, setInitialWrongIds] = React.useState<number[]>([]);
  
  const [selectedOpt, setSelectedOpt] = React.useState<string | null>(null);
  const [shake, setShake] = React.useState(false);
  const [showResumeDialog, setShowResumeDialog] = React.useState(false);

  React.useEffect(() => {
    const saved = localStorage.getItem("learn_session");
    if (saved) {
      setShowResumeDialog(true);
    }
  }, []);

  React.useEffect(() => {
    if (mode === "select" || (queue.length === 0 && completedCount > 0)) return;
    const session = { mode, activeRange, queue, pendingIds, qIndex, batchWrongIds, isBatchRetry, completedCount, currentBatchIds, initialWrongIds };
    localStorage.setItem("learn_session", JSON.stringify(session));
  }, [mode, activeRange, queue, pendingIds, qIndex, batchWrongIds, isBatchRetry, completedCount, currentBatchIds, initialWrongIds]);

  const resumeSession = () => {
    const saved = localStorage.getItem("learn_session");
    if (saved) {
      try {
        const data = JSON.parse(saved);
        setMode(data.mode);
        setActiveRange(data.activeRange);
        setQueue(data.queue);
        setPendingIds(data.pendingIds);
        setQIndex(data.qIndex);
        setBatchWrongIds(data.batchWrongIds);
        setIsBatchRetry(data.isBatchRetry);
        setCompletedCount(data.completedCount);
        if (data.currentBatchIds) {
          setCurrentBatchIds(data.currentBatchIds);
        } else {
          setCurrentBatchIds(data.queue);
        }
        if (data.initialWrongIds) {
          setInitialWrongIds(data.initialWrongIds);
        } else {
          setInitialWrongIds(data.batchWrongIds || []);
        }
      } catch (e) {
        console.error("Failed to parse session", e);
      }
    }
    setShowResumeDialog(false);
  };

  const abandonSession = () => {
    localStorage.removeItem("learn_session");
    setShowResumeDialog(false);
  };

  const initRound = React.useCallback((ordered = false, range: [number, number] | null = null) => {
    let activeQuestions = questions;
    if (range) {
      activeQuestions = questions.slice(range[0], range[1]);
    }
    
    const ids = ordered 
      ? activeQuestions.map(q => q.id).sort((a,b) => a - b)
      : shuffle(activeQuestions.map(q => q.id));
    
    setPendingIds(ids.slice(BATCH_SIZE));
    const initialQ = ids.slice(0, BATCH_SIZE);
    setQueue(initialQ);
    setCurrentBatchIds(initialQ);
    setQIndex(0);
    setBatchWrongIds([]);
    setInitialWrongIds([]);
    setIsBatchRetry(false);
    setCompletedCount(0);
    setSelectedOpt(null);
  }, []);

  const handleStartMode = (selectedMode: "full" | "prn232", range: [number, number] | null = null) => {
    setMode(selectedMode);
    setActiveRange(range);
    setTimeout(() => {
      initRound(true, range);
    }, 100);
  };

  const currentQId = queue[qIndex];
  const currentQ = questions.find(q => q.id === currentQId);

  const handleSelect = (key: string) => {
    if (selectedOpt || !currentQ) return;
    
    setSelectedOpt(key);
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
      // Require manual continue for wrong answers
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
      localStorage.removeItem("learn_session");
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
      const ordered = remaining.sort((a,b) => a - b);
      const newQueue = [...queue.slice(0, qIndex), ...ordered];
      setQueue(newQueue);
      setSelectedOpt(null);
      toast.success("Đã sắp xếp các câu đang ôn tập!");
      return;
    }

    const remaining = [...queue.slice(qIndex), ...pendingIds];
    const ordered = Array.from(new Set(remaining)).sort((a,b) => a - b);
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
    localStorage.removeItem("learn_session");
    setMode("select");
    setActiveRange(null);
    setQueue([]);
    setPendingIds([]);
    setQIndex(0);
    setBatchWrongIds([]);
    setIsBatchRetry(false);
    setCompletedCount(0);
    setShowSegmentSummary(false);
  };

  const totalActiveQuestions = activeRange ? activeRange[1] - activeRange[0] : questions.length;

  if (showResumeDialog) {
    return (
      <div className="flex flex-col h-full max-w-xl mx-auto w-full gap-8 pt-20 pb-20 items-center justify-center text-center">
        <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="flex flex-col gap-6">
          <div className="w-20 h-20 rounded-full bg-amber-500/10 flex items-center justify-center mx-auto mb-2">
            <RotateCcw className="w-10 h-10 text-amber-500" />
          </div>
          <h1 className="text-3xl font-bold tracking-tight">Tiếp tục bài học?</h1>
          <p className="text-muted-foreground text-lg">Bạn có một bài học đang dang dở trước đó. Bạn muốn tiếp tục hay học bài mới?</p>
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
            const q = questions.find(x => x.id === qId)!;
            const wasWrong = initialWrongIds.includes(qId);
            return (
              <Card key={qId} className={`p-5 flex flex-col gap-4 border-2 ${wasWrong ? 'border-destructive/50 bg-destructive/5' : 'border-emerald-500/30 bg-emerald-500/5'}`}>
                <div className="font-medium text-lg leading-relaxed flex items-start gap-3">
                  <Badge variant={wasWrong ? "destructive" : "default"} className={wasWrong ? "" : "bg-emerald-500"}>
                    {idx + 1}
                  </Badge>
                  <span className={wasWrong ? "text-destructive" : ""}>{q.question}</span>
                </div>
                
                <div className="ml-10 flex flex-col gap-2 mt-2">
                  {q.options.map((opt) => {
                    const isCorrect = opt.key === q.correctAnswer;
                    return (
                      <div
                        key={opt.key}
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
      <div className="flex flex-col h-full max-w-4xl mx-auto w-full gap-8 pt-10 pb-20 items-center justify-center">
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col gap-6 text-center mb-6"
        >
          <h1 className="text-4xl font-bold tracking-tight">Chọn chế độ học</h1>
          <p className="text-muted-foreground text-lg">Bạn muốn học theo cách nào hôm nay?</p>
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
              <Button className="mt-4 w-full rounded-full" variant="outline">Chọn phần học</Button>
            ) : (
              <div className="w-full mt-4 flex flex-col gap-2">
                <Button className="w-full rounded-full mb-2 bg-primary/10 text-primary hover:bg-primary/20" variant="ghost" onClick={(e) => { e.stopPropagation(); handleStartMode("prn232", null); }}>
                  Học toàn bộ 50 câu
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
              <h3 className="text-xl font-bold mb-2">Học toàn bộ (Full)</h3>
              <p className="text-sm text-muted-foreground">Ôn tập ngẫu nhiên tất cả các câu hỏi có trong hệ thống.</p>
            </div>
            <Button className="mt-4 w-full rounded-full" variant="outline">Học ngay</Button>
          </Card>
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
              <RotateCcw className="w-4 h-4 mr-2" /> Học lại từ đầu
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

  return (
    <div className="flex flex-col h-full max-w-5xl mx-auto w-full gap-8 pt-4 pb-20">
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Chế độ học (Learn)</h1>
            <p className="text-sm text-muted-foreground">
              {isBatchRetry ? "Đang ôn lại câu sai..." : `Chặng hiện tại: Câu ${qIndex + 1} / ${queue.length}`}
            </p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={handleRestart} title="Học lại từ đầu">
              <RotateCcw className="w-4 h-4 mr-1 md:mr-2" /> <span className="hidden md:inline">Bắt đầu lại</span>
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
          <Progress value={progressPercent} segments={Math.ceil(totalActiveQuestions / 7)} className="h-3 flex-1 [&_[data-slot=progress-indicator]]:bg-emerald-500" />
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
            <h2 className="text-2xl md:text-3xl font-medium leading-relaxed whitespace-pre-wrap">{currentQ.question}</h2>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
            {currentQ.options.map((opt) => {
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
                  key={opt.key}
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
                <div className="flex justify-end">
                <Button 
                  onClick={advance} 
                  className="rounded-full px-8 bg-amber-500 hover:bg-amber-600 text-white shadow-sm"
                >
                  Đã hiểu, tiếp tục <ArrowRight className="w-4 h-4 ml-2" />
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
