"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, BookOpen, Layers, ChevronDown, ChevronUp, GraduationCap } from "lucide-react";
import { Input } from "@/components/ui/input";
import { subjects } from "@/data/subjects";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import ReactMarkdown from "react-markdown";

export default function LibraryPage() {
  const [searchQuery, setSearchQuery] = React.useState("");
  const [expandedItems, setExpandedItems] = React.useState<string[]>([]);
  const [selectedSubjectId, setSelectedSubjectId] = React.useState<string | "all">("all");
  const [selectedPaperId, setSelectedPaperId] = React.useState<string | "all">("all");

  const allQuestions = React.useMemo(() => {
    return subjects.flatMap(s => s.papers.flatMap(p => p.questions.map(q => ({ 
      ...q, 
      subjectId: s.id, 
      subjectName: s.name,
      paperId: p.id,
      paperName: p.name,
      uniqueId: `${s.id}-${p.id}-${q.id}`
    }))));
  }, []);

  const filteredQuestions = React.useMemo(() => {
    let filtered = allQuestions;
    
    if (selectedSubjectId !== "all") {
      filtered = filtered.filter(q => q.subjectId === selectedSubjectId);
      if (selectedPaperId !== "all") {
        filtered = filtered.filter(q => q.paperId === selectedPaperId);
      }
    }
    
    if (!searchQuery.trim()) return filtered;
    
    const lowerQuery = searchQuery.toLowerCase();
    return filtered.filter(
      (q) =>
        q.question.toLowerCase().includes(lowerQuery) ||
        q.options.some((o: any) => o.text.toLowerCase().includes(lowerQuery))
    );
  }, [searchQuery, selectedSubjectId, selectedPaperId, allQuestions]);

  const toggleExpandAll = () => {
    if (expandedItems.length === filteredQuestions.length && filteredQuestions.length > 0) {
      setExpandedItems([]);
    } else {
      setExpandedItems(filteredQuestions.map((q: any) => q.uniqueId));
    }
  };

  // Reset expanded items when searching to avoid huge lag, or let them stay
  React.useEffect(() => {
    setExpandedItems([]);
  }, [searchQuery, selectedSubjectId, selectedPaperId]);

  React.useEffect(() => {
    setSelectedPaperId("all");
  }, [selectedSubjectId]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col h-full max-w-4xl mx-auto w-full gap-6 pb-20"
    >
      <div className="flex flex-col gap-2 pt-4">
        <h1 className="text-3xl font-bold tracking-tight">Thư viện câu hỏi</h1>
        <p className="text-muted-foreground">Xem và tìm kiếm tất cả các thẻ ghi nhớ và câu hỏi hiện có.</p>
      </div>

      <div className="flex flex-col gap-4">
        <div className="flex flex-wrap gap-2">
          <Button 
            variant={selectedSubjectId === "all" ? "default" : "outline"}
            onClick={() => setSelectedSubjectId("all")}
            className={`rounded-full ${selectedSubjectId === "all" ? "bg-emerald-500 hover:bg-emerald-600 text-white" : ""}`}
          >
            Tất cả
          </Button>
          {subjects.map(s => (
            <Button 
              key={s.id}
              variant={selectedSubjectId === s.id ? "default" : "outline"}
              onClick={() => setSelectedSubjectId(s.id)}
              className={`rounded-full ${selectedSubjectId === s.id ? "bg-emerald-500 hover:bg-emerald-600 text-white" : ""}`}
            >
              <GraduationCap className="w-4 h-4 mr-2" /> {s.name}
            </Button>
          ))}
        </div>

        {selectedSubjectId !== "all" && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            className="flex flex-wrap gap-2"
          >
            <Button 
              variant={selectedPaperId === "all" ? "secondary" : "outline"}
              onClick={() => setSelectedPaperId("all")}
              size="sm"
              className="rounded-full"
            >
              Tất cả đề
            </Button>
            {subjects.find(s => s.id === selectedSubjectId)?.papers.map(p => (
              <Button 
                key={p.id}
                variant={selectedPaperId === p.id ? "secondary" : "outline"}
                onClick={() => setSelectedPaperId(p.id)}
                size="sm"
                className="rounded-full"
              >
                <Layers className="w-3 h-3 mr-1.5" /> {p.name}
              </Button>
            ))}
          </motion.div>
        )}

        <div className="relative group">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-muted-foreground group-focus-within:text-primary transition-colors" />
          </div>
          <Input
            type="text"
            placeholder="Tìm kiếm câu hỏi hoặc câu trả lời..."
            className="pl-10 h-12 text-base rounded-xl bg-muted/50 border-transparent focus-visible:bg-background focus-visible:ring-primary shadow-sm transition-all"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      <div className="flex items-center justify-between text-sm text-muted-foreground">
        <span>Tìm thấy {filteredQuestions.length} câu hỏi</span>
        {filteredQuestions.length > 0 && (
          <Button 
            variant="outline" 
            size="sm"
            onClick={toggleExpandAll}
            className="rounded-full shadow-sm hover:shadow transition-all"
          >
            {expandedItems.length === filteredQuestions.length ? (
              <><ChevronUp className="w-4 h-4 mr-2" /> Thu gọn tất cả</>
            ) : (
              <><Layers className="w-4 h-4 mr-2" /> Mở rộng tất cả</>
            )}
          </Button>
        )}
      </div>

      <Card className="border-border/50 shadow-sm bg-background/50 overflow-hidden">
        {filteredQuestions.length > 0 ? (
          <Accordion 
            className="w-full" 
            value={expandedItems as any} 
            onValueChange={setExpandedItems as any}
          >
            {filteredQuestions.map((q: any, index: number) => {
              const uniqueId = q.uniqueId;
              return (
              <AccordionItem key={uniqueId} value={uniqueId} className="border-border/50 px-4">
                <AccordionTrigger className="hover:no-underline hover:text-primary text-left py-4">
                  <div className="text-lg font-medium leading-relaxed pr-4 flex items-start sm:items-center flex-col sm:flex-row gap-2 w-full text-left">
                    <div className="flex-1 w-full flex gap-2">
                      <span className="text-muted-foreground mr-1 shrink-0">{index + 1}.</span> 
                      <div className="flex-1">
                        <ReactMarkdown
                          components={{
                            p({node, children, ...props}: any) {
                              return <span className="block mb-2 last:mb-0" {...props}>{children}</span>
                            },
                            code({node, inline, className, children, ...props}: any) {
                              return !inline ? (
                                <span className="block bg-muted p-4 rounded-lg overflow-x-auto text-[0.9rem] my-3 border border-border/50 shadow-inner font-mono text-left w-full max-w-full">
                                  <code className={className} {...props}>
                                    {children}
                                  </code>
                                </span>
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
                        {q.imageUrl && (
                          <div className="mt-4 flex justify-start w-full">
                            <img src={q.imageUrl} alt="Question figure" className="max-w-full h-auto rounded-lg border border-border shadow-sm max-h-[300px] object-contain" />
                          </div>
                        )}
                      </div>
                    </div>
                    {selectedSubjectId === "all" && (
                      <Badge variant="outline" className="shrink-0 bg-muted/50 text-xs">
                        {q.subjectName}
                      </Badge>
                    )}
                  </div>
                </AccordionTrigger>
                <AccordionContent className="pb-6">
                  <div className="flex flex-col gap-3 pl-4 border-l-2 border-border/50 ml-2 mt-2">
                    {q.options.map((opt: any, idx: number) => {
                      const correctAnsArr = q.correctAnswer.split(',').map((s: string) => s.trim());
                      const isCorrect = correctAnsArr.includes(opt.key);
                      return (
                        <div
                          key={`${opt.key}-${idx}`}
                          className={`flex items-start gap-3 p-3 rounded-lg border transition-colors ${
                            isCorrect 
                              ? "bg-emerald-500/10 border-emerald-500/20 text-emerald-900 dark:text-emerald-100" 
                              : "bg-muted/50 border-transparent text-muted-foreground"
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
                    <div className="mt-4 ml-2 relative overflow-hidden bg-blue-50 dark:bg-blue-900/20 border-y border-r border-blue-200 dark:border-blue-800 border-l-4 border-l-blue-500 rounded-xl p-5 md:p-6 text-sm md:text-base text-blue-900 dark:text-blue-100 shadow-md">
                      <div className="font-semibold text-blue-700 dark:text-blue-300 mb-3 flex items-center gap-2 text-base md:text-lg">
                        <BookOpen className="w-5 h-5" /> Giải thích chi tiết:
                      </div>
                      <div className="leading-relaxed whitespace-pre-wrap">
                        {q.explanation}
                      </div>
                    </div>
                  )}
                </AccordionContent>
              </AccordionItem>
              );
            })}
          </Accordion>
        ) : (
          <div className="py-20 flex flex-col items-center justify-center text-center">
            <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mb-4">
              <Search className="w-8 h-8 text-muted-foreground opacity-50" />
            </div>
            <h3 className="text-lg font-semibold">Không tìm thấy kết quả</h3>
            <p className="text-muted-foreground mt-1 max-w-sm">Không tìm thấy câu hỏi nào chứa &quot;{searchQuery}&quot;. Vui lòng thử từ khóa khác.</p>
          </div>
        )}
      </Card>
    </motion.div>
  );
}
