import React from 'react';
import TaskCard from './TaskCard';
import { Task } from '../utils/taskType';
import { Droppable, Draggable } from 'react-beautiful-dnd';

interface TaskListProps {
  tasks: Task[];
  droppableId: string;
  onMoveTask: (id: string, newState: Task['state']) => void;
}

const TaskList: React.FC<TaskListProps> = ({ tasks, droppableId, onMoveTask }) => {
  // Sort tasks by priority
  const sortedTasks = tasks.sort((a, b) => {
    const priorityOrder: { [key in Task['priority']]: number } = {
      high: 1,
      medium: 2,
      low: 3,
      '': 0,
    };
    return (priorityOrder[a.priority] || 0) - (priorityOrder[b.priority] || 0);
  });

  return (
    <Droppable droppableId={droppableId}>
      {(provided) => (
        <div
          {...provided.droppableProps}
          ref={provided.innerRef}
          className="task-list"
        >
          {sortedTasks.map((task, index) => (
            <Draggable key={task.id} draggableId={task.id} index={index}>
              {(provided) => (
                <div
                  ref={provided.innerRef}
                  {...provided.draggableProps}
                  {...provided.dragHandleProps}
                >
                  <TaskCard
                    {...task}
                    onMove={(newState) => onMoveTask(task.id, newState)}
                  />
                </div>
              )}
            </Draggable>
          ))}
          {provided.placeholder}
        </div>
      )}
    </Droppable>
  );
};

export default TaskList;
