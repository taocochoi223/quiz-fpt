"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, X, RotateCcw, AlertTriangle, ArrowRight, ArrowLeft, Settings2, BookOpen, GraduationCap, ListOrdered } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { subjects } from "@/data/subjects";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import ReactMarkdown from "react-markdown";

// Fisher-Yates shuffle
function shuffleArray<T>(array: T[]): T[] {
  const newArr = [...array];
  for (let i = newArr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArr[i], newArr[j]] = [newArr[j], newArr[i]];
  }
  return newArr;
}

export default function QuizPage() {
  const [mode, setMode] = React.useState<"select_subject" | "select_options" | "quiz">("select_subject");
  const [selectedSubjectId, setSelectedSubjectId] = React.useState<string | null>(null);
  const [questionCount, setQuestionCount] = React.useState<number>(20);
  const [quizSet, setQuizSet] = React.useState<any[]>([]);
  const [currentIndex, setCurrentIndex] = React.useState(0);
  const [answers, setAnswers] = React.useState<Record<string, string>>({});
  const [isFinished, setIsFinished] = React.useState(false);

  const currentQ = quizSet[currentIndex] || null;
  const shuffledOptions = React.useMemo(() => {
    if (!currentQ) return [];
    return shuffleArray(currentQ.options);
  }, [currentQ?.uniqueId]);

  const startQuiz = () => {
    let activeQuestions: any[] = [];
    if (selectedSubjectId === "full") {
      activeQuestions = subjects.flatMap(s => s.papers.flatMap(p => p.questions).map(q => ({...q, uniqueId: `${s.id}-${q.id}`})));
    } else {
      activeQuestions = subjects.find(s => s.id === selectedSubjectId)?.papers.flatMap(p => p.questions).map(q => ({...q, uniqueId: `${selectedSubjectId}-${q.id}`})) || [];
    }

    setQuizSet(shuffleArray(activeQuestions).slice(0, questionCount));
    setMode("quiz");
    setCurrentIndex(0);
    setAnswers({});
    setIsFinished(false);
  };

  const handleSelectSubject = (id: string) => {
    setSelectedSubjectId(id);
    let count = 0;
    if (id === "full") {
      count = subjects.flatMap(s => s.papers.flatMap(p => p.questions)).length;
    } else {
      count = subjects.find(s => s.id === id)?.papers.flatMap(p => p.questions).length || 0;
    }
    // Adjust question count if the subject has fewer questions
    if (count < questionCount) setQuestionCount(count);
    setMode("select_options");
  };

  if (mode === "select_subject") {
    return (
      <div className="flex flex-col h-full max-w-5xl mx-auto w-full gap-8 pt-10 pb-20 items-center justify-center">
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col gap-6 text-center mb-6"
        >
          <div className="w-16 h-16 rounded-2xl bg-primary/10 text-primary flex items-center justify-center mx-auto mb-2">
            <GraduationCap className="w-8 h-8" />
          </div>
          <h1 className="text-4xl font-bold tracking-tight">Chọn môn thi thử</h1>
          <p className="text-muted-foreground text-lg">Bạn muốn kiểm tra kiến thức môn nào?</p>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full"
        >
          {subjects.map(subj => (
            <Card 
              key={subj.id}
              className="flex flex-col p-6 items-center text-center gap-4 cursor-pointer hover:border-primary/50 hover:shadow-lg transition-all group"
              onClick={() => handleSelectSubject(subj.id)}
            >
              <div className="w-16 h-16 rounded-2xl bg-primary/10 text-primary flex items-center justify-center transition-transform group-hover:scale-110 shrink-0">
                <BookOpen className="w-8 h-8" />
              </div>
              <div>
                <h3 className="text-xl font-bold mb-1">{subj.fullName}</h3>
                <p className="text-sm text-muted-foreground mt-1">Bộ {subj.papers.flatMap(p => p.questions).length} câu hỏi trắc nghiệm.</p>
              </div>
              <Button className="mt-2 w-full rounded-full" variant="outline">Chọn môn này</Button>
            </Card>
          ))}
          <Card 
            className="flex flex-col p-6 items-center text-center gap-4 cursor-pointer hover:border-emerald-500/50 hover:shadow-lg transition-all group"
            onClick={() => handleSelectSubject("full")}
          >
            <div className="w-16 h-16 rounded-2xl bg-emerald-500/10 text-emerald-500 flex items-center justify-center transition-transform group-hover:scale-110 shrink-0">
              <ListOrdered className="w-8 h-8" />
            </div>
            <div>
              <h3 className="text-xl font-bold mb-1">Thi tổng hợp (Full)</h3>
              <p className="text-sm text-muted-foreground">Thi trộn tất cả các môn.</p>
            </div>
            <Button className="mt-2 w-full rounded-full" variant="outline">Chọn thi tổng hợp</Button>
          </Card>
        </motion.div>
      </div>
    );
  }

  if (mode === "select_options") {
    let totalAvailable = 0;
    if (selectedSubjectId === "full") {
      totalAvailable = subjects.flatMap(s => s.papers.flatMap(p => p.questions)).length;
    } else {
      totalAvailable = subjects.find(s => s.id === selectedSubjectId)?.papers.flatMap(p => p.questions).length || 0;
    }
    
    const options = [10, 20, 30, 40, totalAvailable].filter(n => n <= totalAvailable);
    if (!options.includes(totalAvailable)) options.push(totalAvailable);

    const currentSubjectName = selectedSubjectId === "full" ? "Tổng hợp" : subjects.find(s => s.id === selectedSubjectId)?.name;

    return (
      <div className="flex flex-col h-full max-w-2xl mx-auto w-full gap-8 pt-10 pb-20 items-center justify-center">
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col gap-6 text-center mb-6"
        >
          <div className="w-16 h-16 rounded-2xl bg-primary/10 text-primary flex items-center justify-center mx-auto mb-2">
            <Settings2 className="w-8 h-8" />
          </div>
          <h1 className="text-4xl font-bold tracking-tight">Cài đặt bài thi</h1>
          <p className="text-muted-foreground text-lg">Môn thi: <strong>{currentSubjectName}</strong></p>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 }}
          className="w-full"
        >
          <Card className="p-8 border-2 shadow-sm flex flex-col gap-8 items-center text-center">
            <div className="w-full flex flex-col gap-4 items-center">
              <h3 className="text-lg font-medium">Số lượng câu hỏi:</h3>
              <div className="flex flex-wrap justify-center gap-3">
                {Array.from(new Set(options)).map((num) => (
                  <Button
                    key={num}
                    variant={questionCount === num ? "default" : "outline"}
                    onClick={() => setQuestionCount(num)}
                    className={`rounded-full px-6 transition-all ${questionCount === num ? 'bg-emerald-500 hover:bg-emerald-600 text-white' : ''}`}
                  >
                    {num} câu
                  </Button>
                ))}
              </div>
            </div>

            <div className="flex gap-4 w-full justify-center">
              <Button 
                onClick={() => setMode("select_subject")} 
                variant="outline"
                size="lg" 
                className="rounded-full px-8 h-14 text-lg"
              >
                Quay lại
              </Button>
              <Button 
                onClick={startQuiz} 
                size="lg" 
                className="rounded-full px-12 h-14 text-lg bg-emerald-500 hover:bg-emerald-600 text-white flex-1"
              >
                Bắt đầu thi ngay
              </Button>
            </div>
          </Card>
        </motion.div>
      </div>
    );
  }

  const progressPercent = (Object.keys(answers).length / quizSet.length) * 100;

  const handleSelect = (key: string) => {
    setAnswers((prev) => ({
      ...prev,
      [currentQ.uniqueId]: key,
    }));
  };

  const handleNext = () => {
    if (currentIndex < quizSet.length - 1) {
      setCurrentIndex((p) => p + 1);
    } else {
      setIsFinished(true);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex((p) => p - 1);
    }
  };

  if (isFinished) {
    let score = 0;
    quizSet.forEach((q) => {
      if (answers[q.uniqueId] === q.correctAnswer) {
        score++;
      }
    });

    const finalScore = Math.round((score / quizSet.length) * 100);

    return (
      <div className="flex flex-col h-full max-w-4xl mx-auto w-full gap-8 pt-4 pb-20">
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="flex flex-col items-center justify-center text-center p-8 bg-card border-2 shadow-sm rounded-2xl mb-4"
        >
          <div className="w-24 h-24 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-6">
            <span className="text-4xl font-bold text-primary">{finalScore}%</span>
          </div>
          <h1 className="text-3xl font-bold tracking-tight mb-2">Hoàn thành bài thi!</h1>
          <p className="text-muted-foreground text-lg mb-8">
            Bạn đã trả lời đúng {score} / {quizSet.length} câu hỏi.
          </p>
          <div className="flex gap-4 justify-center">
            <Button onClick={() => setMode("select_subject")} className="rounded-full px-8">
              <RotateCcw className="w-4 h-4 mr-2" /> Thi lại
            </Button>
            <Link href="/" className="inline-flex h-10 items-center justify-center rounded-full border border-input bg-background px-8 text-sm font-medium hover:bg-accent hover:text-accent-foreground transition-colors">
              Về trang chủ
            </Link>
          </div>
        </motion.div>

        <div className="flex flex-col gap-6">
          <h2 className="text-2xl font-bold tracking-tight mb-2">Chi tiết bài làm</h2>
          {quizSet.map((q, index) => {
            const userAnswer = answers[q.uniqueId];
            const isCorrect = userAnswer === q.correctAnswer;
            
            return (
              <Card key={q.uniqueId} className="p-6 border-2 shadow-sm bg-card flex flex-col gap-4">
                <div className="flex gap-3">
                  <Badge variant={isCorrect ? "default" : "destructive"} className={isCorrect ? "bg-emerald-500" : ""}>
                    Câu {index + 1}
                  </Badge>
                  {isCorrect ? (
                    <span className="text-emerald-500 font-medium flex items-center gap-1"><Check className="w-4 h-4"/> Đúng</span>
                  ) : (
                    <span className="text-destructive font-medium flex items-center gap-1"><X className="w-4 h-4"/> Sai</span>
                  )}
                </div>
                <div className="text-lg font-medium leading-relaxed">
                  <ReactMarkdown
                    components={{
                      code({node, inline, className, children, ...props}: any) {
                        return !inline ? (
                          <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-[0.9rem] my-3 border border-border/50 shadow-inner font-mono text-left">
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
                    {q.question}
                  </ReactMarkdown>
                </div>
                
                <div className="flex flex-col gap-3 mt-2">
                  {q.options.map((opt: any, idx: number) => {
                    const isSelected = userAnswer === opt.key;
                    const isCorrectOpt = q.correctAnswer === opt.key;
                    
                    let bgClass = "bg-muted/50 border-transparent text-muted-foreground";
                    let badgeClass = "bg-muted text-muted-foreground";
                    
                    if (isCorrectOpt) {
                      bgClass = "bg-emerald-500/10 border-emerald-500/50 text-emerald-900 dark:text-emerald-100";
                      badgeClass = "bg-emerald-500 text-white";
                    } else if (isSelected && !isCorrectOpt) {
                      bgClass = "bg-destructive/10 border-destructive/50 text-destructive-foreground";
                      badgeClass = "bg-destructive text-white";
                    }

                    return (
                      <div
                        key={`${opt.key}-${idx}`}
                        className={`flex items-start gap-3 p-3 rounded-xl border-2 transition-colors ${bgClass}`}
                      >
                        <div className={`flex items-center justify-center w-8 h-8 rounded-lg shrink-0 font-bold ${badgeClass}`}>
                          {opt.key}
                        </div>
                        <div className="whitespace-pre-wrap text-base leading-relaxed pt-1 flex-1">
                          {opt.text}
                        </div>
                        {isCorrectOpt && <Check className="w-5 h-5 text-emerald-500 mt-1 shrink-0" />}
                        {isSelected && !isCorrectOpt && <X className="w-5 h-5 text-destructive mt-1 shrink-0" />}
                      </div>
                    );
                  })}
                </div>
                {q.explanation && (
                  <div className="mt-4 relative overflow-hidden bg-blue-50 dark:bg-blue-900/20 border-y border-r border-blue-200 dark:border-blue-800 border-l-4 border-l-blue-500 rounded-xl p-5 md:p-6 text-sm md:text-base text-blue-900 dark:text-blue-100 shadow-md">
                    <div className="font-semibold text-blue-700 dark:text-blue-300 mb-3 flex items-center gap-2 text-base md:text-lg">
                      <BookOpen className="w-5 h-5" /> Giải thích chi tiết:
                    </div>
                    <div className="leading-relaxed whitespace-pre-wrap">
                      {q.explanation}
                    </div>
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

  const currentAnswer = answers[currentQ.uniqueId];

  return (
    <div className="flex flex-col h-full max-w-5xl mx-auto w-full gap-8 pt-4 pb-20">
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold tracking-tight">Thi thử</h1>
          <div className="text-right text-sm font-medium bg-muted px-3 py-1 rounded-full">
            Câu hỏi {currentIndex + 1} / {quizSet.length}
          </div>
        </div>
        <Progress value={progressPercent} className="h-3 bg-primary/10 [&_[data-slot=progress-indicator]]:bg-emerald-500" />
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={currentQ.uniqueId}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3 }}
          className="flex flex-col gap-6"
        >
          <Card className="p-6 md:p-10 border-2 shadow-sm bg-card">
            <div className="text-2xl md:text-3xl font-medium leading-relaxed w-full">
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
          </Card>

          <div className="grid grid-cols-1 gap-3 mt-4">
            {shuffledOptions.map((opt: any, idx: number) => {
              const isSelected = currentAnswer === opt.key;
              
              let stateClass = "bg-background border-border/50 hover:border-primary/50 hover:bg-muted/50 cursor-pointer";
              let badgeClass = "bg-muted text-muted-foreground";

              if (isSelected) {
                stateClass = "bg-primary/5 border-primary text-primary cursor-default";
                badgeClass = "bg-primary text-primary-foreground";
              }

              return (
                <motion.div
                  key={`${opt.key}-${idx}`}
                  whileHover={!isSelected ? { scale: 1.01 } : {}}
                  whileTap={!isSelected ? { scale: 0.99 } : {}}
                  onClick={() => handleSelect(opt.key)}
                  className={`flex items-center gap-4 p-4 rounded-xl border-2 transition-all ${stateClass}`}
                >
                  <div className={`flex items-center justify-center w-12 h-12 text-lg rounded-lg shrink-0 font-bold transition-colors ${badgeClass}`}>
                    {String.fromCharCode(65 + idx)}
                  </div>
                  <div className="flex-1 whitespace-pre-wrap text-lg md:text-xl leading-relaxed">{opt.text}</div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </AnimatePresence>

      <div className="flex items-center justify-between mt-8 pt-4 border-t border-border/50">
        <Button 
          variant="outline" 
          onClick={handlePrev} 
          disabled={currentIndex === 0}
          className="rounded-full px-6"
        >
          <ArrowLeft className="w-4 h-4 mr-2" /> Quay lại
        </Button>

        {currentIndex === quizSet.length - 1 ? (
          <Button 
            onClick={handleNext}
            disabled={!currentAnswer}
            className="rounded-full px-8 bg-emerald-500 hover:bg-emerald-600 text-white"
          >
            Nộp bài <Check className="w-4 h-4 ml-2" />
          </Button>
        ) : (
          <Button 
            onClick={handleNext} 
            className="rounded-full px-6"
          >
            Tiếp theo <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        )}
      </div>
    </div>
  );
}
