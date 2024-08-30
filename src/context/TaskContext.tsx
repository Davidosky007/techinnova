import React, { createContext, useState, useContext } from 'react';
import { Task } from '../utils/taskType';
import { getTasks, saveTasks, addTask, updateTask, deleteTask } from '../services/taskService';

interface TaskContextType {
  tasks: Task[];
  addTask: (task: Task) => void;
  updateTask: (task: Task) => void;
  deleteTask: (id: string) => void;
}

const TaskContext = createContext<TaskContextType | undefined>(undefined);

export const TaskProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [tasks, setTasks] = useState<Task[]>(getTasks());

  const handleAddTask = (task: Task) => {
    addTask(task);
    setTasks(getTasks());
  };

  const handleUpdateTask = (task: Task) => {
    updateTask(task);
    setTasks(getTasks());
  };

  const handleDeleteTask = (id: string) => {
    deleteTask(id);
    setTasks(getTasks());
  };

  return (
    <TaskContext.Provider value={{ tasks, addTask: handleAddTask, updateTask: handleUpdateTask, deleteTask: handleDeleteTask }}>
      {children}
    </TaskContext.Provider>
  );
};

export const useTasks = () => {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error('useTasks must be used within a TaskProvider');
  }
  return context;
};
