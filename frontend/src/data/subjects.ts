import { questionsVNR202_de1 } from "./questions_vnr202_de1";
import { questionsVNR202_de2 } from "./questions_vnr202_de2";
import { questionsVNR202_de3 } from "./questions_vnr202_de3";
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
    id: "vnr202",
    name: "VNR202",
    fullName: "VNR202 - Lịch sử Đảng Cộng sản Việt Nam",
    papers: [
      {
        id: "vnr202_paper1",
        name: "VNR202 - SP26 - FE - RE",
        questions: questionsVNR202_de1,
      },
      {
        id: "vnr202_paper2",
        name: "VNR202 - SU26 - FE - C2",
        questions: questionsVNR202_de2,
      },
      {
        id: "vnr202_paper3",
        name: "VNR202 - SU26 - FE - RE",
        questions: questionsVNR202_de3,
      },
    ],
  },
];
