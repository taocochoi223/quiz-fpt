"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Check,
  X,
  RotateCcw,
  ArrowRight,
  ArrowLeft,
  Settings2,
  BookOpen,
  GraduationCap,
  Clock,
  Flag,
  LayoutGrid,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { subjects } from "@/data/subjects";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { MarkdownContent } from "@/components/markdown-content";
import {
  formatDuration,
  getSubjectQuestions,
  isCorrectSelection,
  parseAnswerKeys,
  shuffleArray,
} from "@/lib/quiz-utils";
import { Option, QuestionWithMeta } from "@/lib/types";

type ShuffledQuestion = QuestionWithMeta & {
  shuffledOptions: Option[];
};

export default function QuizPage() {
  const [mode, setMode] = React.useState<"select_subject" | "select_options" | "quiz">("select_subject");
  const [selectedSubjectId, setSelectedSubjectId] = React.useState<string | null>(null);
  const [selectedPaperId, setSelectedPaperId] = React.useState<string>("all");
  const [questionCount, setQuestionCount] = React.useState<number | "">("");

  const [quizSet, setQuizSet] = React.useState<ShuffledQuestion[]>([]);
  const [currentIndex, setCurrentIndex] = React.useState(0);
  const [answers, setAnswers] = React.useState<Record<string, string[]>>({});
  const [flaggedIds, setFlaggedIds] = React.useState<string[]>([]);
  const [elapsedSeconds, setElapsedSeconds] = React.useState(0);
  const [isFinished, setIsFinished] = React.useState(false);
  const [resultFilter, setResultFilter] = React.useState<"all" | "wrong" | "correct">("all");
  const [showNavigator, setShowNavigator] = React.useState(true);

  const currentQ = quizSet[currentIndex] || null;

  // Timer while taking quiz
  React.useEffect(() => {
    if (mode !== "quiz" || isFinished) return;
    const timer = setInterval(() => {
      setElapsedSeconds((s) => s + 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [mode, isFinished]);

  const startQuiz = () => {
    if (!selectedSubjectId) return;
    const activeQs = getSubjectQuestions(
      selectedSubjectId,
      selectedPaperId === "all" ? undefined : [selectedPaperId]
    );
    if (activeQs.length === 0) return;

    const finalCount = typeof questionCount === "number" && questionCount > 0 ? questionCount : activeQs.length;
    const picked = shuffleArray(activeQs)
      .slice(0, finalCount)
      .map((q) => ({
        ...q,
        shuffledOptions: shuffleArray(q.options),
      }));

    setQuizSet(picked);
    setCurrentIndex(0);
    setAnswers({});
    setFlaggedIds([]);
    setElapsedSeconds(0);
    setResultFilter("all");
    setIsFinished(false);
    setMode("quiz");
  };

  const handleSelectSubject = (id: string) => {
    setSelectedSubjectId(id);
    setSelectedPaperId("all");
    const count = getSubjectQuestions(id).length;
    setQuestionCount(count > 20 ? 20 : count);
    setMode("select_options");
  };

  const handleSelectOption = React.useCallback(
    (key: string) => {
      if (!currentQ) return;
      const isMulti = parseAnswerKeys(currentQ.correctAnswer).length > 1;
      setAnswers((prev) => {
        const currentArr = prev[currentQ.uniqueId] || [];
        if (isMulti) {
          const updated = currentArr.includes(key)
            ? currentArr.filter((k) => k !== key)
            : [...currentArr, key];
          return { ...prev, [currentQ.uniqueId]: updated };
        }
        return { ...prev, [currentQ.uniqueId]: [key] };
      });
    },
    [currentQ]
  );

  const toggleFlag = () => {
    if (!currentQ) return;
    setFlaggedIds((prev) =>
      prev.includes(currentQ.uniqueId)
        ? prev.filter((id) => id !== currentQ.uniqueId)
        : [...prev, currentQ.uniqueId]
    );
  };

  const handleNext = React.useCallback(() => {
    if (currentIndex < quizSet.length - 1) {
      setCurrentIndex((p) => p + 1);
    } else {
      setIsFinished(true);
    }
  }, [currentIndex, quizSet.length]);

  const handlePrev = React.useCallback(() => {
    if (currentIndex > 0) {
      setCurrentIndex((p) => p - 1);
    }
  }, [currentIndex]);

  // Keyboard shortcuts during quiz
  React.useEffect(() => {
    if (mode !== "quiz" || isFinished || !currentQ) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;
      if (e.key === "ArrowRight") {
        e.preventDefault();
        handleNext();
      } else if (e.key === "ArrowLeft") {
        e.preventDefault();
        handlePrev();
      } else if (["1", "2", "3", "4"].includes(e.key)) {
        const idx = Number(e.key) - 1;
        const opt = currentQ.shuffledOptions[idx];
        if (opt) handleSelectOption(opt.key);
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [mode, isFinished, currentQ, handleNext, handlePrev, handleSelectOption]);

  if (mode === "select_subject") {
    return (
      <div className="flex flex-col h-full max-w-5xl mx-auto w-full gap-8 pt-10 pb-20 items-center justify-center">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col gap-3 text-center mb-4"
        >
          <div className="w-14 h-14 rounded-2xl bg-primary/10 text-primary flex items-center justify-center mx-auto mb-1">
            <GraduationCap className="w-7 h-7" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight">Chọn môn thi thử</h1>
          <p className="text-muted-foreground text-base md:text-lg">
            Mô phỏng phòng thi thật với đồng hồ đếm giờ và đánh dấu câu hỏi
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.08 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full"
        >
          {subjects.map((subj) => {
            const total = subj.papers.reduce((sum, p) => sum + p.questions.length, 0);
            return (
              <Card
                key={subj.id}
                className="flex flex-col p-6 items-center text-center gap-4 cursor-pointer bg-card/75 backdrop-blur-md hover:border-primary/50 hover:shadow-xl transition-all group"
                onClick={() => handleSelectSubject(subj.id)}
              >
                <div className="w-14 h-14 rounded-2xl bg-primary/10 text-primary flex items-center justify-center transition-transform group-hover:scale-110 shrink-0">
                  <BookOpen className="w-7 h-7" />
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-1">{subj.fullName}</h3>
                  <p className="text-sm text-muted-foreground">
                    {subj.papers.length} bộ đề • {total} câu hỏi trắc nghiệm
                  </p>
                </div>
                <Button className="mt-2 w-full rounded-full" variant="outline">
                  Chọn môn này
                </Button>
              </Card>
            );
          })}
        </motion.div>
      </div>
    );
  }

  if (mode === "select_options") {
    const subj = subjects.find((s) => s.id === selectedSubjectId);
    const totalAvailable =
      selectedPaperId === "all"
        ? subj?.papers.reduce((sum, p) => sum + p.questions.length, 0) || 0
        : subj?.papers.find((p) => p.id === selectedPaperId)?.questions.length || 0;

    return (
      <div className="flex flex-col h-full max-w-2xl mx-auto w-full gap-8 pt-10 pb-20 items-center justify-center">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col gap-3 text-center mb-2"
        >
          <div className="w-14 h-14 rounded-2xl bg-primary/10 text-primary flex items-center justify-center mx-auto mb-1">
            <Settings2 className="w-7 h-7" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight">Cài đặt bài thi</h1>
          <p className="text-muted-foreground text-base md:text-lg">
            Môn thi: <strong className="text-foreground">{subj?.name}</strong>
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.08 }}
          className="w-full"
        >
          <Card className="p-6 md:p-8 border border-border/60 bg-card/80 backdrop-blur-md shadow-xl flex flex-col gap-6 rounded-3xl">
            <div className="w-full flex flex-col gap-4 text-left">
              <div className="w-full flex flex-col gap-2">
                <label className="text-sm font-semibold">Chọn đề thi</label>
                <select
                  className="flex h-11 w-full rounded-xl border border-input bg-background px-3.5 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  value={selectedPaperId}
                  onChange={(e) => {
                    setSelectedPaperId(e.target.value);
                    const newTotal =
                      e.target.value === "all"
                        ? subj?.papers.reduce((sum, p) => sum + p.questions.length, 0) || 0
                        : subj?.papers.find((p) => p.id === e.target.value)?.questions.length || 0;
                    if (typeof questionCount === "number" && questionCount > newTotal) {
                      setQuestionCount(newTotal);
                    }
                  }}
                >
                  <option value="all">Trộn tất cả các đề</option>
                  {subj?.papers.map((p) => (
                    <option key={p.id} value={p.id}>
                      {p.name} ({p.questions.length} câu)
                    </option>
                  ))}
                </select>
              </div>

              <div className="w-full flex flex-col gap-2">
                <div className="flex items-center justify-between">
                  <label className="text-sm font-semibold">
                    Số lượng câu hỏi (Tối đa: {totalAvailable})
                  </label>
                  <div className="flex gap-1.5">
                    {[10, 20, 40, totalAvailable]
                      .filter((v, i, arr) => v <= totalAvailable && arr.indexOf(v) === i)
                      .map((preset) => (
                        <button
                          key={preset}
                          type="button"
                          onClick={() => setQuestionCount(preset)}
                          className={`px-2.5 py-0.5 rounded-full text-xs font-medium border transition-colors ${
                            questionCount === preset
                              ? "bg-primary text-primary-foreground border-primary"
                              : "bg-muted/60 text-muted-foreground border-border hover:text-foreground"
                          }`}
                        >
                          {preset === totalAvailable ? "Tất cả" : preset}
                        </button>
                      ))}
                  </div>
                </div>
                <input
                  type="number"
                  min={1}
                  max={totalAvailable}
                  className="flex h-11 w-full rounded-xl border border-input bg-background px-3.5 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  value={questionCount}
                  onChange={(e) => {
                    if (e.target.value === "") {
                      setQuestionCount("");
                    } else {
                      let val = parseInt(e.target.value, 10);
                      if (Number.isNaN(val) || val < 1) val = 1;
                      if (val > totalAvailable) val = totalAvailable;
                      setQuestionCount(val);
                    }
                  }}
                  placeholder={`Nhập số câu (VD: ${Math.min(20, totalAvailable)})`}
                />
              </div>
            </div>

            <div className="flex gap-3 w-full pt-2">
              <Button
                onClick={() => setMode("select_subject")}
                variant="outline"
                size="lg"
                className="rounded-full px-7 h-12"
              >
                Quay lại
              </Button>
              <Button
                onClick={startQuiz}
                size="lg"
                className="rounded-full px-8 h-12 bg-emerald-500 hover:bg-emerald-600 text-white flex-1 shadow-lg shadow-emerald-500/20"
              >
                Bắt đầu thi ngay
              </Button>
            </div>
          </Card>
        </motion.div>
      </div>
    );
  }

  if (isFinished) {
    let score = 0;
    quizSet.forEach((q) => {
      if (isCorrectSelection(answers[q.uniqueId] || [], q.correctAnswer)) {
        score++;
      }
    });

    const finalScore = Math.round((score / quizSet.length) * 100);
    const wrongCount = quizSet.length - score;

    const displayedQuestions = quizSet
      .map((q, index) => ({
        q,
        index,
        isCorrect: isCorrectSelection(answers[q.uniqueId] || [], q.correctAnswer),
      }))
      .filter((item) => {
        if (resultFilter === "wrong") return !item.isCorrect;
        if (resultFilter === "correct") return item.isCorrect;
        return true;
      });

    return (
      <div className="flex flex-col h-full max-w-4xl mx-auto w-full gap-8 pt-4 pb-20">
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="flex flex-col items-center justify-center text-center p-8 md:p-10 bg-card/85 backdrop-blur-md border border-border/60 shadow-xl rounded-3xl"
        >
          <div
            className={`w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-5 border-4 ${
              finalScore >= 80
                ? "bg-emerald-500/15 border-emerald-500/40 text-emerald-500"
                : finalScore >= 50
                ? "bg-amber-500/15 border-amber-500/40 text-amber-500"
                : "bg-destructive/15 border-destructive/40 text-destructive"
            }`}
          >
            <span className="text-3xl font-extrabold">{finalScore}%</span>
          </div>
          <h1 className="text-3xl font-bold tracking-tight mb-2">Hoàn thành bài thi!</h1>
          <p className="text-muted-foreground text-base md:text-lg mb-6">
            Bạn trả lời đúng <strong className="text-foreground">{score} / {quizSet.length}</strong> câu hỏi.
          </p>

          <div className="grid grid-cols-3 gap-4 w-full max-w-md mb-8 p-4 rounded-2xl bg-muted/40 border border-border/50">
            <div>
              <div className="text-xl font-bold text-emerald-500">{score}</div>
              <div className="text-xs text-muted-foreground">Câu đúng</div>
            </div>
            <div className="border-x border-border/60">
              <div className="text-xl font-bold text-destructive">{wrongCount}</div>
              <div className="text-xs text-muted-foreground">Câu sai</div>
            </div>
            <div>
              <div className="text-xl font-bold text-primary tabular-nums">{formatDuration(elapsedSeconds)}</div>
              <div className="text-xs text-muted-foreground">Thời gian</div>
            </div>
          </div>

          <div className="flex flex-wrap gap-3 justify-center">
            <Button onClick={() => setMode("select_subject")} className="rounded-full px-7">
              <RotateCcw className="w-4 h-4 mr-2" /> Thi lại
            </Button>
            <Link
              href="/"
              className="inline-flex h-10 items-center justify-center rounded-full border border-input bg-background px-7 text-sm font-medium hover:bg-accent hover:text-accent-foreground transition-colors"
            >
              Về trang chủ
            </Link>
          </div>
        </motion.div>

        <div className="flex flex-col gap-5">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <h2 className="text-2xl font-bold tracking-tight">Chi tiết bài làm</h2>
            <div className="flex gap-2">
              <Button
                size="sm"
                variant={resultFilter === "all" ? "default" : "outline"}
                className="rounded-full"
                onClick={() => setResultFilter("all")}
              >
                Tất cả ({quizSet.length})
              </Button>
              <Button
                size="sm"
                variant={resultFilter === "wrong" ? "destructive" : "outline"}
                className="rounded-full"
                onClick={() => setResultFilter("wrong")}
              >
                Câu sai ({wrongCount})
              </Button>
              <Button
                size="sm"
                variant={resultFilter === "correct" ? "secondary" : "outline"}
                className="rounded-full"
                onClick={() => setResultFilter("correct")}
              >
                Câu đúng ({score})
              </Button>
            </div>
          </div>

          {displayedQuestions.map(({ q, index, isCorrect }) => {
            const correctAnsArr = parseAnswerKeys(q.correctAnswer);
            const userAnsArr = answers[q.uniqueId] || [];

            return (
              <Card
                key={q.uniqueId}
                className="p-6 border border-border/60 shadow-sm bg-card/80 backdrop-blur-md flex flex-col gap-4 rounded-2xl"
              >
                <div className="flex items-center justify-between gap-3">
                  <Badge variant={isCorrect ? "default" : "destructive"} className={isCorrect ? "bg-emerald-500 text-white" : ""}>
                    Câu {index + 1}
                  </Badge>
                  {isCorrect ? (
                    <span className="text-emerald-500 text-sm font-semibold flex items-center gap-1">
                      <Check className="w-4 h-4" /> Đúng
                    </span>
                  ) : (
                    <span className="text-destructive text-sm font-semibold flex items-center gap-1">
                      <X className="w-4 h-4" /> Sai
                    </span>
                  )}
                </div>

                <div className="text-base md:text-lg font-medium leading-relaxed">
                  <MarkdownContent content={q.question} />
                </div>

                <div className="flex flex-col gap-2.5">
                  {q.shuffledOptions.map((opt, idx) => {
                    const isSelected = userAnsArr.includes(opt.key);
                    const isCorrectOpt = correctAnsArr.includes(opt.key);

                    let bgClass = "bg-muted/40 border-transparent text-muted-foreground";
                    let badgeClass = "bg-muted text-muted-foreground";

                    if (isCorrectOpt) {
                      bgClass = "bg-emerald-500/10 border-emerald-500/40 text-emerald-950 dark:text-emerald-100";
                      badgeClass = "bg-emerald-500 text-white";
                    } else if (isSelected && !isCorrectOpt) {
                      bgClass = "bg-destructive/10 border-destructive/40 text-destructive";
                      badgeClass = "bg-destructive text-white";
                    }

                    return (
                      <div
                        key={`${opt.key}-${idx}`}
                        className={`flex items-start gap-3 p-3.5 rounded-xl border transition-colors ${bgClass}`}
                      >
                        <div className={`flex items-center justify-center w-7 h-7 rounded-lg shrink-0 font-bold text-xs ${badgeClass}`}>
                          {opt.key}
                        </div>
                        <div className="whitespace-pre-wrap text-sm md:text-base leading-relaxed flex-1">
                          {opt.text}
                        </div>
                        {isCorrectOpt && <Check className="w-4 h-4 text-emerald-500 mt-1 shrink-0" />}
                        {isSelected && !isCorrectOpt && <X className="w-4 h-4 text-destructive mt-1 shrink-0" />}
                      </div>
                    );
                  })}
                </div>

                {q.explanation && (
                  <div className="mt-2 bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800/60 border-l-4 border-l-blue-500 rounded-xl p-4 text-sm text-blue-900 dark:text-blue-100">
                    <div className="font-semibold text-blue-700 dark:text-blue-300 mb-1.5 flex items-center gap-1.5">
                      <BookOpen className="w-4 h-4" /> Giải thích chi tiết:
                    </div>
                    <div className="leading-relaxed whitespace-pre-wrap">{q.explanation}</div>
                  </div>
                )}
              </Card>
            );
          })}
        </div>
      </div>
    );
  }

  if (!currentQ) return null;

  const answeredCount = Object.values(answers).filter((a) => a.length > 0).length;
  const progressPercent = quizSet.length > 0 ? (answeredCount / quizSet.length) * 100 : 0;
  const currentAnswerArr = answers[currentQ.uniqueId] || [];
  const correctKeys = parseAnswerKeys(currentQ.correctAnswer);
  const isMulti = correctKeys.length > 1;
  const isFlagged = flaggedIds.includes(currentQ.uniqueId);

  return (
    <div className="flex flex-col h-full max-w-6xl mx-auto w-full gap-6 pt-4 pb-20">
      {/* Top Bar */}
      <div className="flex flex-col gap-3">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-bold tracking-tight">Thi thử</h1>
            <Badge variant="secondary" className="rounded-full font-semibold tabular-nums">
              Câu {currentIndex + 1} / {quizSet.length}
            </Badge>
            {isMulti && (
              <Badge className="rounded-full bg-amber-500/15 text-amber-600 dark:text-amber-400 border border-amber-500/30">
                Chọn {correctKeys.length} đáp án
              </Badge>
            )}
          </div>

          <div className="flex items-center gap-2">
            <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-card border border-border/60 text-sm font-semibold tabular-nums">
              <Clock className="w-4 h-4 text-primary" />
              {formatDuration(elapsedSeconds)}
            </div>
            <Button
              variant={isFlagged ? "secondary" : "outline"}
              size="sm"
              className={`rounded-full ${isFlagged ? "text-amber-600 border-amber-500/40 bg-amber-500/10" : ""}`}
              onClick={toggleFlag}
              title="Đánh dấu câu cần xem lại"
            >
              <Flag className="w-4 h-4 mr-1" />
              <span className="hidden sm:inline">{isFlagged ? "Đã đánh dấu" : "Đánh dấu"}</span>
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="rounded-full"
              onClick={() => setShowNavigator((v) => !v)}
              title="Ẩn/Hiện bảng câu hỏi"
            >
              <LayoutGrid className="w-4 h-4" />
            </Button>
          </div>
        </div>
        <Progress
          value={progressPercent}
          className="h-2.5 bg-primary/10 [&_[data-slot=progress-indicator]]:bg-emerald-500"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Main Question Area */}
        <div className={`${showNavigator ? "lg:col-span-8" : "lg:col-span-12"} flex flex-col gap-5`}>
          <AnimatePresence mode="wait">
            <motion.div
              key={currentQ.uniqueId}
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              transition={{ duration: 0.12 }}
              className="flex flex-col gap-5"
            >
              <Card className="p-6 md:p-8 border border-border/60 shadow-lg bg-card/95 md:bg-card/85 md:backdrop-blur-md rounded-3xl">
                <div className="text-lg md:text-2xl font-semibold leading-relaxed w-full">
                  <MarkdownContent content={currentQ.question} />
                  {currentQ.imageUrl && (
                    <div className="mt-5 flex justify-center">
                      <img
                        src={currentQ.imageUrl}
                        alt="Hình minh họa"
                        className="max-w-full h-auto rounded-xl border border-border shadow-sm max-h-[380px] object-contain"
                      />
                    </div>
                  )}
                </div>
              </Card>

              <div className="grid grid-cols-1 gap-3">
                {currentQ.shuffledOptions.map((opt, idx) => {
                  const isSelected = currentAnswerArr.includes(opt.key);
                  return (
                    <button
                      type="button"
                      key={`${opt.key}-${idx}`}
                      onClick={() => handleSelectOption(opt.key)}
                      className={`touch-manipulation select-none flex items-center gap-4 p-4 rounded-2xl border-2 text-left transition-colors duration-100 active:scale-[0.99] ${
                        isSelected
                          ? "bg-primary/10 border-primary text-foreground shadow-sm"
                          : "bg-card/90 md:bg-card/70 border-border/60 hover:border-primary/40 hover:bg-muted/50"
                      }`}
                    >
                      <div
                        className={`flex items-center justify-center w-10 h-10 text-base rounded-xl shrink-0 font-bold transition-colors ${
                          isSelected
                            ? "bg-primary text-primary-foreground"
                            : "bg-muted text-muted-foreground"
                        }`}
                      >
                        {String.fromCharCode(65 + idx)}
                      </div>
                      <div className="flex-1 whitespace-pre-wrap text-base md:text-lg leading-relaxed">
                        {opt.text}
                      </div>
                      <span className="hidden sm:inline-block text-xs text-muted-foreground/60 font-mono">
                        [{idx + 1}]
                      </span>
                    </button>
                  );
                })}
              </div>
            </motion.div>
          </AnimatePresence>

          <div className="flex items-center justify-between pt-3 border-t border-border/50">
            <Button
              variant="outline"
              onClick={handlePrev}
              disabled={currentIndex === 0}
              className="rounded-full px-6"
            >
              <ArrowLeft className="w-4 h-4 mr-2" /> Câu trước
            </Button>

            {currentIndex === quizSet.length - 1 ? (
              <Button
                onClick={handleNext}
                className="rounded-full px-8 bg-emerald-500 hover:bg-emerald-600 text-white shadow-md shadow-emerald-500/20"
              >
                Nộp bài ({answeredCount}/{quizSet.length}) <Check className="w-4 h-4 ml-2" />
              </Button>
            ) : (
              <Button onClick={handleNext} className="rounded-full px-6">
                Câu tiếp <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            )}
          </div>
        </div>

        {/* Question Navigator Sidebar */}
        {showNavigator && (
          <Card className="lg:col-span-4 p-5 border border-border/60 bg-card/80 backdrop-blur-md rounded-2xl shadow-sm sticky top-20">
            <div className="flex items-center justify-between mb-4">
              <span className="font-semibold text-sm">Danh sách câu hỏi</span>
              <span className="text-xs text-muted-foreground">
                Đã làm {answeredCount}/{quizSet.length}
              </span>
            </div>

            <div className="grid grid-cols-5 sm:grid-cols-8 lg:grid-cols-5 gap-2 max-h-[340px] overflow-y-auto pr-1">
              {quizSet.map((q, idx) => {
                const isDone = (answers[q.uniqueId] || []).length > 0;
                const isCurrent = idx === currentIndex;
                const isItemFlagged = flaggedIds.includes(q.uniqueId);

                return (
                  <button
                    key={q.uniqueId}
                    type="button"
                    onClick={() => setCurrentIndex(idx)}
                    className={`relative h-9 rounded-lg text-xs font-semibold transition-all border ${
                      isCurrent
                        ? "ring-2 ring-primary border-primary bg-primary text-primary-foreground"
                        : isDone
                        ? "bg-emerald-500/15 border-emerald-500/40 text-emerald-700 dark:text-emerald-300"
                        : "bg-muted/50 border-border/60 text-muted-foreground hover:bg-muted"
                    }`}
                  >
                    {idx + 1}
                    {isItemFlagged && (
                      <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-amber-500 border border-background" />
                    )}
                  </button>
                );
              })}
            </div>

            <div className="flex flex-wrap gap-3 text-[11px] text-muted-foreground mt-4 pt-3 border-t border-border/50">
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-sm bg-emerald-500/40 border border-emerald-500" /> Đã làm
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-sm bg-muted border border-border" /> Chưa làm
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-amber-500" /> Đánh dấu
              </span>
            </div>

            <Button
              onClick={() => setIsFinished(true)}
              variant="outline"
              className="w-full mt-4 rounded-full border-emerald-500/40 text-emerald-600 dark:text-emerald-400 hover:bg-emerald-500/10"
            >
              Nộp bài ngay
            </Button>
          </Card>
        )}
      </div>
    </div>
  );
}
