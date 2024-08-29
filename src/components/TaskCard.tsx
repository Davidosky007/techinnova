// src/components/TaskCard.tsx

import React from 'react';
import { Task } from '../utils/taskType';

interface TaskCardProps extends Task {
  onMove: (newState: Task['state']) => void;
}

const TaskCard: React.FC<TaskCardProps> = ({ id, title, description, state, priority, onMove }) => {
  const handleMove = (event: React.ChangeEvent<HTMLSelectElement>) => {
    onMove(event.target.value as Task['state']);
  };

  return (
    <div className="task-card">
      <h3>{title}</h3>
      <p>{description}</p>
      <div className="task-details">
        <span>Priority: {priority}</span>
        <select value={state} onChange={handleMove}>
          <option value="todo">To-Do</option>
          <option value="in-progress">In Progress</option>
          <option value="complete">Complete</option>
        </select>
      </div>
    </div>
  );
};

export default TaskCard;
