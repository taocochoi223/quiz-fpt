import { questionsMLN131_de1 } from "./questions_mln131_de1";
import { questionsMLN131_de2 } from "./questions_mln131_de2";
import { questionsMLN131_de3 } from "./questions_mln131_de3";
import { Question } from "@/lib/types";

export interface Paper {
  id: string;
  name: string;
  questions: Question[];
}

export interface Subject {
  id: string;
  name: string;
  fullName: string;
  papers: Paper[];
}

export const subjects: Subject[] = [
  {
    id: "mln131",
    name: "MLN131",
    fullName: "MLN131 - Triết học Mác - Lênin / CNXHKH",
    papers: [
      {
        id: "mln131_paper1",
        name: "Đề 1 (60 câu)",
        questions: questionsMLN131_de1,
      },
      {
        id: "mln131_paper2",
        name: "Đề 2 (60 câu)",
        questions: questionsMLN131_de2,
      },
      {
        id: "mln131_paper3",
        name: "Đề 3 (60 câu)",
        questions: questionsMLN131_de3,
      }
    ]
  }
];
