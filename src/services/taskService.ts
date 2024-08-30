import { Task } from '../utils/taskType';

const STORAGE_KEY = 'tasks';

export const getTasks = (): Task[] => {
  try {
    const tasks = localStorage.getItem(STORAGE_KEY);
    return tasks ? JSON.parse(tasks) : [];
  } catch (error) {
    console.error('Failed to get tasks:', error);
    return [];
  }
};

export const saveTasks = (tasks: Task[]): void => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
  } catch (error) {
    console.error('Failed to save tasks:', error);
  }
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
