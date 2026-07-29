"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, BookOpen, Layers, ChevronDown, ChevronUp } from "lucide-react";
import { Input } from "@/components/ui/input";
import { questions } from "@/data/questions";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function LibraryPage() {
  const [searchQuery, setSearchQuery] = React.useState("");
  const [expandedItems, setExpandedItems] = React.useState<string[]>([]);

  const filteredQuestions = React.useMemo(() => {
    if (!searchQuery.trim()) return questions;
    const lowerQuery = searchQuery.toLowerCase();
    return questions.filter(
      (q) =>
        q.question.toLowerCase().includes(lowerQuery) ||
        q.options.some((o) => o.text.toLowerCase().includes(lowerQuery))
    );
  }, [searchQuery]);

  const toggleExpandAll = () => {
    if (expandedItems.length === filteredQuestions.length && filteredQuestions.length > 0) {
      setExpandedItems([]);
    } else {
      setExpandedItems(filteredQuestions.map((q) => q.id.toString()));
    }
  };

  // Reset expanded items when searching to avoid huge lag, or let them stay
  React.useEffect(() => {
    setExpandedItems([]);
  }, [searchQuery]);

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
            {filteredQuestions.map((q, index) => (
              <AccordionItem key={q.id} value={q.id.toString()} className="border-border/50 px-4">
                <AccordionTrigger className="hover:no-underline hover:text-primary text-left py-4">
                  <span className="text-lg font-medium leading-relaxed pr-4">
                    <span className="text-muted-foreground mr-2">{index + 1}.</span> 
                    {q.question}
                  </span>
                </AccordionTrigger>
                <AccordionContent className="pb-6">
                  <div className="flex flex-col gap-3 pl-4 border-l-2 border-border/50 ml-2 mt-2">
                    {q.options.map((opt) => {
                      const isCorrect = opt.key === q.correctAnswer;
                      return (
                        <div
                          key={opt.key}
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
            ))}
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
