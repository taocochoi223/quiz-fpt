export type Option = {
  key: string;
  text: string;
};

export type Question = {
  id: number | string;
  uniqueId?: string;
  question: string;
  options: Option[];
  correctAnswer: string;
  explanation?: string;
  imageUrl?: string;
};

export type QuestionWithMeta = Question & {
  uniqueId: string;
  subjectId: string;
  subjectName: string;
  paperId: string;
  paperName: string;
};
