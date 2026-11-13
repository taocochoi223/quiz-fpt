import { subjects } from "@/data/subjects";
import { QuestionWithMeta } from "@/lib/types";

/**
 * Fisher-Yates shuffle returning a new array without mutating the input.
 */
export function shuffleArray<T>(array: readonly T[]): T[] {
  const copy = [...array];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

/**
 * Parse a comma-separated answer string (e.g. "A, B, C") into trimmed, sorted keys.
 */
export function parseAnswerKeys(correctAnswer: string): string[] {
  return correctAnswer
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean)
    .sort();
}

/**
 * Check whether the user's selected option keys exactly match the question's correct keys.
 */
export function isCorrectSelection(selected: readonly string[], correctAnswer: string): boolean {
  const userSorted = [...selected].map((s) => s.trim()).filter(Boolean).sort();
  const correctSorted = parseAnswerKeys(correctAnswer);
  if (userSorted.length !== correctSorted.length) return false;
  return userSorted.every((val, idx) => val === correctSorted[idx]);
}

/**
 * Flatten all questions across every subject and paper with full metadata and uniqueId.
 */
export function getAllQuestionsWithMeta(): QuestionWithMeta[] {
  return subjects.flatMap((subject) =>
    subject.papers.flatMap((paper) =>
      paper.questions.map((q) => ({
        ...q,
        uniqueId: `${subject.id}-${paper.id}-${q.id}`,
        subjectId: subject.id,
        subjectName: subject.name,
        paperId: paper.id,
        paperName: paper.name,
      }))
    )
  );
}

/**
 * Get questions for a specific subject (optionally filtered by paper IDs) with full metadata.
 */
export function getSubjectQuestions(subjectId: string, paperIds?: readonly string[]): QuestionWithMeta[] {
  const subject = subjects.find((s) => s.id === subjectId);
  if (!subject) return [];

  const targetPapers =
    paperIds && paperIds.length > 0
      ? subject.papers.filter((p) => paperIds.includes(p.id))
      : subject.papers;

  return targetPapers.flatMap((paper) =>
    paper.questions.map((q) => ({
      ...q,
      uniqueId: `${subject.id}-${paper.id}-${q.id}`,
      subjectId: subject.id,
      subjectName: subject.name,
      paperId: paper.id,
      paperName: paper.name,
    }))
  );
}

/**
 * Format elapsed seconds as MM:SS.
 */
export function formatDuration(totalSeconds: number): string {
  const mins = Math.floor(totalSeconds / 60);
  const secs = totalSeconds % 60;
  return `${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
}

