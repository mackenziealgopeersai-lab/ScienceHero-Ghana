
export type AppView = 'welcome' | 'dashboard' | 'chat' | 'quiz';

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
}

export interface QuizQuestion {
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface QuizState {
  questions: QuizQuestion[];
  currentIndex: number;
  score: number;
  isFinished: boolean;
}
