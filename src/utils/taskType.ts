// src/utils/taskTypes.ts

export type TaskState = 'todo' | 'in-progress' | 'complete';
export type TaskPriority = 'high' | 'medium' | 'low' | '';

export interface Task {
  id: string;
  title: string;
  description: string;
  state: TaskState;
  priority: TaskPriority;
}
