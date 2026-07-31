import { questions as prn232Questions, questions_paper2 as prn232Paper2, questions_paper3 as prn232Paper3 } from "./questions_prn232";
import { questionsSSL101C } from "./questions_ssl101c";
import { questionsITE302C } from "./questions_ite302c";
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
    id: "prn232",
    name: "PRN232",
    fullName: "PRN232 - Building Cross-Platform Apps with .NET",
    papers: [
      {
        id: "prn232_paper1",
        name: "Đề 1 (50 câu)",
        questions: prn232Questions,
      },
      {
        id: "prn232_paper2",
        name: "Đề 2 (50 câu mới)",
        questions: prn232Paper2,
      },
      {
        id: "prn232_paper3",
        name: "Đề 3 (36 câu)",
        questions: prn232Paper3,
      }
    ]
  },
  {
    id: "ssl101c",
    name: "SSL101C",
    fullName: "SSL101C - Academic Skills",
    papers: [
      {
        id: "ssl101c_paper1",
        name: "Đề 1",
        questions: questionsSSL101C,
      }
    ]
  },
  {
    id: "ite302c",
    name: "ITE302C",
    fullName: "ITE302C - Web Design",
    papers: [
      {
        id: "ite302c_paper1",
        name: "Đề 1",
        questions: questionsITE302C,
      }
    ]
  }
];
