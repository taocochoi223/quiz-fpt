"use client";

import * as React from "react";
import { motion } from "framer-motion";
import {
  Search,
  BookOpen,
  Layers,
  ChevronUp,
  GraduationCap,
  X,
  Copy,
  Check,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { subjects } from "@/data/subjects";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MarkdownContent } from "@/components/markdown-content";
import { getAllQuestionsWithMeta, parseAnswerKeys } from "@/lib/quiz-utils";
import { toast } from "sonner";

export default function LibraryPage() {
  const [searchQuery, setSearchQuery] = React.useState("");
  const [expandedItems, setExpandedItems] = React.useState<string[]>([]);
  const [selectedSubjectId, setSelectedSubjectId] = React.useState<string | "all">("all");
  const [selectedPaperId, setSelectedPaperId] = React.useState<string | "all">("all");
  const [onlyMultiAnswer, setOnlyMultiAnswer] = React.useState(false);
  const [copiedId, setCopiedId] = React.useState<string | null>(null);

  const allQuestions = React.useMemo(() => getAllQuestionsWithMeta(), []);

  const filteredQuestions = React.useMemo(() => {
    let filtered = allQuestions;

    if (selectedSubjectId !== "all") {
      filtered = filtered.filter((q) => q.subjectId === selectedSubjectId);
      if (selectedPaperId !== "all") {
        filtered = filtered.filter((q) => q.paperId === selectedPaperId);
      }
    }

    if (onlyMultiAnswer) {
      filtered = filtered.filter((q) => parseAnswerKeys(q.correctAnswer).length > 1);
    }

    if (!searchQuery.trim()) return filtered;

    const lowerQuery = searchQuery.toLowerCase();
    return filtered.filter(
      (q) =>
        q.question.toLowerCase().includes(lowerQuery) ||
        q.options.some((o) => o.text.toLowerCase().includes(lowerQuery))
    );
  }, [searchQuery, selectedSubjectId, selectedPaperId, onlyMultiAnswer, allQuestions]);

  const toggleExpandAll = () => {
    if (expandedItems.length === filteredQuestions.length && filteredQuestions.length > 0) {
      setExpandedItems([]);
    } else {
      setExpandedItems(filteredQuestions.map((q) => q.uniqueId));
    }
  };

  const handleCopyQuestion = async (e: React.MouseEvent, q: (typeof allQuestions)[number]) => {
    e.stopPropagation();
    const correctKeys = parseAnswerKeys(q.correctAnswer);
    const correctLines = q.options
      .filter((o) => correctKeys.includes(o.key))
      .map((o) => `${o.key}. ${o.text}`)
      .join("\n");
    const text = `${q.question}\nĐáp án đúng:\n${correctLines}`;
    try {
      await navigator.clipboard.writeText(text);
      setCopiedId(q.uniqueId);
      toast.success("Đã sao chép câu hỏi & đáp án");
      setTimeout(() => setCopiedId(null), 1500);
    } catch {
      toast.error("Không thể sao chép vào clipboard");
    }
  };

  const handleSubjectChange = (subjectId: string | "all") => {
    setSelectedSubjectId(subjectId);
    setSelectedPaperId("all");
    setExpandedItems([]);
  };

  const handlePaperChange = (paperId: string | "all") => {
    setSelectedPaperId(paperId);
    setExpandedItems([]);
  };

  const handleSearchChange = (value: string) => {
    setSearchQuery(value);
    setExpandedItems([]);
  };

  const handleToggleMulti = () => {
    setOnlyMultiAnswer((v) => !v);
    setExpandedItems([]);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col h-full max-w-4xl mx-auto w-full gap-6 pb-20"
    >
      <div className="flex flex-col gap-2 pt-4">
        <h1 className="text-3xl font-bold tracking-tight">Thư viện câu hỏi</h1>
        <p className="text-muted-foreground">
          Tra cứu nhanh câu hỏi, đáp án đúng và giải thích chi tiết theo từng môn học.
        </p>
      </div>

      <div className="flex flex-col gap-4 p-4 rounded-2xl border border-border/60 bg-card/60 backdrop-blur-md shadow-sm">
        <div className="flex flex-wrap gap-2">
          <Button
            variant={selectedSubjectId === "all" ? "default" : "outline"}
            onClick={() => handleSubjectChange("all")}
            className="rounded-full"
            size="sm"
          >
            Tất cả ({allQuestions.length})
          </Button>
          {subjects.map((s) => (
            <Button
              key={s.id}
              variant={selectedSubjectId === s.id ? "default" : "outline"}
              onClick={() => handleSubjectChange(s.id)}
              className="rounded-full"
              size="sm"
            >
              <GraduationCap className="w-4 h-4 mr-1.5" /> {s.name}
            </Button>
          ))}
          <Button
            variant={onlyMultiAnswer ? "secondary" : "outline"}
            onClick={handleToggleMulti}
            className="rounded-full ml-auto"
            size="sm"
          >
            Câu nhiều đáp án
          </Button>
        </div>

        {selectedSubjectId !== "all" && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            className="flex flex-wrap gap-2"
          >
            <Button
              variant={selectedPaperId === "all" ? "secondary" : "outline"}
              onClick={() => handlePaperChange("all")}
              size="sm"
              className="rounded-full"
            >
              Tất cả đề
            </Button>
            {subjects
              .find((s) => s.id === selectedSubjectId)
              ?.papers.map((p) => (
                <Button
                  key={p.id}
                  variant={selectedPaperId === p.id ? "secondary" : "outline"}
                  onClick={() => handlePaperChange(p.id)}
                  size="sm"
                  className="rounded-full"
                >
                  <Layers className="w-3 h-3 mr-1.5" /> {p.name}
                </Button>
              ))}
          </motion.div>
        )}

        <div className="relative group">
          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
            <Search className="h-4 w-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
          </div>
          <Input
            type="text"
            placeholder="Tìm kiếm từ khóa trong câu hỏi hoặc đáp án..."
            className="pl-10 pr-10 h-11 text-sm md:text-base rounded-xl bg-background/80 border-border/60 focus-visible:ring-primary shadow-sm transition-all"
            value={searchQuery}
            onChange={(e) => handleSearchChange(e.target.value)}
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => handleSearchChange("")}
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-muted-foreground hover:text-foreground"
              aria-label="Xóa tìm kiếm"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>
      </div>

      <div className="flex items-center justify-between text-sm text-muted-foreground">
        <span>
          Tìm thấy <strong className="text-foreground">{filteredQuestions.length}</strong> câu hỏi
        </span>
        {filteredQuestions.length > 0 && (
          <Button
            variant="outline"
            size="sm"
            onClick={toggleExpandAll}
            className="rounded-full shadow-sm hover:shadow transition-all"
          >
            {expandedItems.length === filteredQuestions.length ? (
              <>
                <ChevronUp className="w-4 h-4 mr-1.5" /> Thu gọn tất cả
              </>
            ) : (
              <>
                <Layers className="w-4 h-4 mr-1.5" /> Mở rộng tất cả
              </>
            )}
          </Button>
        )}
      </div>

      <Card className="border-border/60 shadow-sm bg-card/95 md:bg-card/70 md:backdrop-blur-md overflow-hidden rounded-2xl">
        {filteredQuestions.length > 0 ? (
          <Accordion
            className="w-full"
            value={expandedItems}
            onValueChange={setExpandedItems}
          >
            {filteredQuestions.map((q, index) => {
              const uniqueId = q.uniqueId;
              const correctKeys = parseAnswerKeys(q.correctAnswer);
              const isMulti = correctKeys.length > 1;

              return (
                <AccordionItem key={uniqueId} value={uniqueId} className="border-border/50 px-4 md:px-6">
                  <AccordionTrigger className="hover:no-underline hover:text-primary text-left py-4">
                    <div className="text-base md:text-lg font-medium leading-relaxed pr-4 flex items-start sm:items-center flex-col sm:flex-row gap-2 w-full text-left">
                      <div className="flex-1 w-full flex gap-2.5">
                        <span className="text-muted-foreground font-semibold shrink-0 tabular-nums">
                          {index + 1}.
                        </span>
                        <div className="flex-1">
                          <MarkdownContent content={q.question} inlineParagraphs />
                          {q.imageUrl && (
                            <div className="mt-4 flex justify-start w-full">
                              <img
                                src={q.imageUrl}
                                alt="Hình minh họa câu hỏi"
                                className="max-w-full h-auto rounded-lg border border-border shadow-sm max-h-[300px] object-contain"
                              />
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="flex items-center gap-1.5 shrink-0">
                        {isMulti && (
                          <Badge variant="secondary" className="text-[11px]">
                            Chọn {correctKeys.length}
                          </Badge>
                        )}
                        {selectedSubjectId === "all" && (
                          <Badge variant="outline" className="bg-muted/50 text-xs">
                            {q.subjectName}
                          </Badge>
                        )}
                      </div>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="pb-6">
                    <div className="flex justify-end mb-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={(e) => handleCopyQuestion(e, q)}
                        className="h-8 text-xs text-muted-foreground hover:text-foreground rounded-full"
                      >
                        {copiedId === uniqueId ? (
                          <>
                            <Check className="w-3.5 h-3.5 mr-1 text-emerald-500" /> Đã chép
                          </>
                        ) : (
                          <>
                            <Copy className="w-3.5 h-3.5 mr-1" /> Sao chép
                          </>
                        )}
                      </Button>
                    </div>
                    <div className="flex flex-col gap-2.5 pl-4 border-l-2 border-border/60 ml-2">
                      {q.options.map((opt, idx) => {
                        const isCorrect = correctKeys.includes(opt.key);
                        return (
                          <div
                            key={`${opt.key}-${idx}`}
                            className={`flex items-start gap-3 p-3.5 rounded-xl border transition-colors ${
                              isCorrect
                                ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-950 dark:text-emerald-100"
                                : "bg-muted/40 border-transparent text-muted-foreground"
                            }`}
                          >
                            <Badge
                              variant={isCorrect ? "default" : "secondary"}
                              className={isCorrect ? "bg-emerald-500 hover:bg-emerald-600 text-white" : ""}
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
                      <div className="mt-4 ml-2 relative overflow-hidden bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800/60 border-l-4 border-l-blue-500 rounded-xl p-5 text-sm md:text-base text-blue-900 dark:text-blue-100 shadow-sm">
                        <div className="font-semibold text-blue-700 dark:text-blue-300 mb-2 flex items-center gap-2">
                          <BookOpen className="w-4 h-4" /> Giải thích chi tiết:
                        </div>
                        <div className="leading-relaxed whitespace-pre-wrap">{q.explanation}</div>
                      </div>
                    )}
                  </AccordionContent>
                </AccordionItem>
              );
            })}
          </Accordion>
        ) : (
          <div className="py-20 flex flex-col items-center justify-center text-center px-4">
            <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mb-4">
              <Search className="w-8 h-8 text-muted-foreground opacity-50" />
            </div>
            <h3 className="text-lg font-semibold">Không tìm thấy kết quả</h3>
            <p className="text-muted-foreground mt-1 max-w-sm text-sm">
              Không tìm thấy câu hỏi nào khớp với bộ lọc hiện tại. Vui lòng thử từ khóa khác.
            </p>
          </div>
        )}
      </Card>
    </motion.div>
  );
}
