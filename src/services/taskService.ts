// src/services/taskService.ts

import { Task } from '../utils/taskType';

const STORAGE_KEY = 'tasks';

export const getTasks = (): Task[] => {
  const tasks = localStorage.getItem(STORAGE_KEY);
  return tasks ? JSON.parse(tasks) : [];
};

export const saveTasks = (tasks: Task[]): void => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
};

export const addTask = (task: Task): void => {
  const tasks = getTasks();
  saveTasks([...tasks, task]);
};

export const updateTask = (updatedTask: Task): void => {
  const tasks = getTasks().map((task) => 
    task.id === updatedTask.id ? updatedTask : task
  );
  saveTasks(tasks);
};

export const deleteTask = (taskId: string): void => {
  const tasks = getTasks().filter((task) => task.id !== taskId);
  saveTasks(tasks);
};
