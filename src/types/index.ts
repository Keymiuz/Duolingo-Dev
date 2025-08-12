export interface Exercise {
  type: 'mcq' | 'fill' | 'output-prediction';
  prompt: string;
  choices?: string[];
  starterCode?: string;
  answer: string;
  hints?: string[];
  explanation?: string;
}

export interface Lesson {
  id: string;
  title: string;
  xp: number;
  level: number;
  exercises: Exercise[];
}
