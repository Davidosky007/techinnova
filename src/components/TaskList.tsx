// src/components/TaskList.tsx

import React from 'react';
import TaskCard from './TaskCard';
import { Task } from '../utils/taskType';

interface TaskListProps {
  tasks: Task[];
  onMoveTask: (id: string, newState: Task['state']) => void;
}

const TaskList: React.FC<TaskListProps> = ({ tasks, onMoveTask }) => {
  return (
    <div className="task-list">
      {tasks.map((task) => (
        <TaskCard 
          key={task.id} 
          {...task} 
          onMove={(newState) => onMoveTask(task.id, newState)} 
        />
      ))}
    </div>
  );
};

export default TaskList;
