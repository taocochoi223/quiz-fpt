
import { questionsSSL101C } from "./questions_ssl101c";
import { questionsITE302C } from "./questions_ite302c";
import { questionsITE302C_de2 } from "./questions_ite302c_de2";
import { questionsSSL101C_de2 } from "./questions_ssl101c_de2";
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
    id: "ssl101c",
    name: "SSL101C",
    fullName: "SSL101C - Academic Skills",
    papers: [
      {
        id: "ssl101c_paper1",
        name: "Đề 1 (60 câu)",
        questions: questionsSSL101C,
      },
      {
        id: "ssl101c_paper2",
        name: "Đề 2 (60 câu)",
        questions: questionsSSL101C_de2,
      }
    ]
  },
  {
    id: "ite302c",
    name: "ITE302C",
    fullName: "ITE302C - Ethics in IT",
    papers: [
      {
        id: "ite302c_paper1",
        name: "Đề 1 (60 câu)",
        questions: questionsITE302C,
      },
      {
        id: "ite302c_paper2",
        name: "Đề 2 (60 câu)",
        questions: questionsITE302C_de2,
      }
    ]
  }
];
