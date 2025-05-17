export type QuizType =
  | "atomic-number"
  | "visual"
  | "electron-configuration"
  | "physical-properties";

export interface QuizProperty {
  name: string;
  value: string | number;
  unit: string;
}

export interface QuizQuestion {
  type: QuizType;
  question: string;
  correctAnswer: string;
  options: string[];
  imageUrl?: string;
  hint?: string;
  properties?: QuizProperty[];
  electronConfig?: string;
}

export interface QuizState {
  currentQuestion: number;
  score: number;
  timeRemaining: number;
  questions: QuizQuestion[];
  isComplete: boolean;
}

export interface QuizSettings {
  type: QuizType;
  numberOfQuestions: number;
  timePerQuestion: number; // in seconds
}
