import { QuizAttempt } from '../types';

export const MAX_ATTEMPTS = 2;

const STORAGE_KEY_ATTEMPTS = 'informatica_evaluacion_final_v1';
const STORAGE_KEY_CURRENT_STUDENT = 'informatica_evaluacion_current_student';

export function normalizeStudentName(name: string): string {
  // Strip leading emoji/symbols and extra spaces so "🤖 Sofía" and "Sofía" match the same student
  return name
    .replace(/^[\p{Emoji}\p{Emoji_Presentation}\p{Extended_Pictographic}\s]+/gu, '')
    .trim()
    .toLowerCase();
}

export function calculateScore(correctCount: number, totalQuestions: number = 25): number {
  if (totalQuestions <= 0) return 0;
  const rawScore = (correctCount / totalQuestions) * 10;
  return Math.round(rawScore * 10) / 10;
}

export function isPassing(score: number): boolean {
  return score >= 6.0;
}

export function getAllAttempts(): QuizAttempt[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY_ATTEMPTS);
    if (!raw) return [];
    return JSON.parse(raw);
  } catch (e) {
    console.error('Error reading attempts from localStorage:', e);
    return [];
  }
}

export function getAttemptsForStudent(studentName: string): QuizAttempt[] {
  const all = getAllAttempts();
  const normalized = normalizeStudentName(studentName);
  if (!normalized) return [];
  return all.filter(a => normalizeStudentName(a.studentName) === normalized);
}

export function getNextAttemptNumber(studentName: string): number {
  const studentAttempts = getAttemptsForStudent(studentName);
  return studentAttempts.length + 1;
}

export function getRemainingAttempts(studentName: string): number {
  const used = getAttemptsForStudent(studentName).length;
  return Math.max(0, MAX_ATTEMPTS - used);
}

export function canStudentAttempt(studentName: string): boolean {
  return getRemainingAttempts(studentName) > 0;
}

export function getBestScoreForStudent(studentName: string): number | null {
  const studentAttempts = getAttemptsForStudent(studentName);
  if (studentAttempts.length === 0) return null;
  return Math.max(...studentAttempts.map(a => a.score));
}

export function saveAttempt(
  studentName: string,
  correctCount: number,
  incorrectCount: number,
  answers: QuizAttempt['answers'],
  totalQuestions: number = 25
): QuizAttempt {
  const score = calculateScore(correctCount, totalQuestions);
  const status = isPassing(score) ? 'APROBADO' : 'DEBE SEGUIR PRACTICANDO';
  const attemptNumber = getNextAttemptNumber(studentName);

  const newAttempt: QuizAttempt = {
    id: 'att_' + Date.now() + '_' + Math.random().toString(36).substring(2, 7),
    studentName: studentName.trim(),
    attemptNumber,
    correctCount,
    incorrectCount,
    score,
    status,
    date: new Date().toLocaleString('es-CO', {
      dateStyle: 'medium',
      timeStyle: 'short',
    }),
    answers,
  };

  const all = getAllAttempts();
  all.unshift(newAttempt); // latest first
  try {
    localStorage.setItem(STORAGE_KEY_ATTEMPTS, JSON.stringify(all));
  } catch (e) {
    console.error('Error saving attempt to localStorage:', e);
  }

  return newAttempt;
}

export function getLastStudentName(): string {
  try {
    return localStorage.getItem(STORAGE_KEY_CURRENT_STUDENT) || '';
  } catch {
    return '';
  }
}

export function setLastStudentName(name: string): void {
  try {
    localStorage.setItem(STORAGE_KEY_CURRENT_STUDENT, name.trim());
  } catch {
    // Ignore error
  }
}

export function clearAllAttempts(): void {
  try {
    localStorage.removeItem(STORAGE_KEY_ATTEMPTS);
  } catch {
    // Ignore error
  }
}
