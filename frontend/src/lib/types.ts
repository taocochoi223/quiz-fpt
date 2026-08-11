export type Option = {
  key: string;
  text: string;
};

export type Question = {
  id: number;
  question: string;
  options: Option[];
  correctAnswer: string;
  explanation?: string;
  imageUrl?: string;
};
