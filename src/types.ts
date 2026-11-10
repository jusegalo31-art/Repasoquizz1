export type OptionColor = 'amarillo' | 'azul' | 'rojo';

export interface Option {
  id: string;
  text: string;
  color: OptionColor;
  isCorrect: boolean;
  illustrationKey: string;
  spokenLabel: string; // The phrase read by narrator, e.g., "Una máquina que nos ayuda a realizar tareas."
}

export type QuestionType = 'multiple-choice' | 'written-parts';

export interface Question {
  id: number;
  questionNumber: number;
  type?: QuestionType;
  promptText: string;
  spokenQuestion: string;
  options: Option[];
}

export interface QuizAttempt {
  id: string;
  studentName: string;
  attemptNumber: number;
  correctCount: number;
  incorrectCount: number;
  score: number; // 0.0 to 10.0
  status: 'APROBADO' | 'DEBE SEGUIR PRACTICANDO';
  date: string;
  answers: {
    questionId: number;
    selectedOptionId: string;
    isCorrect: boolean;
  }[];
}

export type ScreenState = 'start' | 'quiz' | 'results';

export interface TTSStatus {
  configured: boolean;
  voiceId: string;
  modelId: string;
  cachedFilesCount: number;
}
