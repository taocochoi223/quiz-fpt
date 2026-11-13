"use client";

import React from "react";
import ReactMarkdown from "react-markdown";

interface MarkdownContentProps {
  content: string;
  inlineParagraphs?: boolean;
  className?: string;
}

export function MarkdownContent({ content, inlineParagraphs = false, className }: MarkdownContentProps) {
  return (
    <div className={className}>
      <ReactMarkdown
        components={{
          p({ children, ...props }) {
            if (inlineParagraphs) {
              return (
                <span className="block mb-2 last:mb-0" {...props}>
                  {children}
                </span>
              );
            }
            return (
              <p className="mb-2 last:mb-0" {...props}>
                {children}
              </p>
            );
          },
          code({ className: codeClassName, children, ...props }) {
            const isBlock = Boolean(codeClassName) || String(children).includes("\n");
            if (isBlock) {
              return (
                <span className="block bg-muted p-4 rounded-xl overflow-x-auto text-[0.9rem] my-3 border border-border/60 shadow-inner font-mono text-left w-full max-w-full text-foreground">
                  <code className={codeClassName} {...props}>
                    {children}
                  </code>
                </span>
              );
            }
            return (
              <code className="bg-muted px-1.5 py-0.5 rounded-md text-sm font-mono text-primary" {...props}>
                {children}
              </code>
            );
          },
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}

