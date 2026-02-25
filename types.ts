
export enum UserRole {
  STUDENT = 'student',
  FACULTY = 'faculty',
  ADMIN = 'admin'
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  level: number;
  exp: number;
  streak: number;
}

export interface GameCard {
  id: string;
  title: string;
  description: string;
  category: string;
  icon: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
}

export interface MockExam {
  id: string;
  title: string;
  questionsCount: number;
  durationMinutes: number;
  topic: string;
}
