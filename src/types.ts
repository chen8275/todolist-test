export type Priority = 'high' | 'medium' | 'low';

export interface Todo {
  id: number;
  text: string;
  done: boolean;
  priority: Priority;
}

export type Filter = 'all' | 'active' | 'done';
