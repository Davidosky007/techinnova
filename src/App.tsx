import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import TaskList from './components/TaskList';
import TaskForm from './components/TaskForm';
import Home from './components/Home';
import { getTasks, addTask, updateTask } from './services/taskService';
import { Task } from './utils/taskType';
import { DragDropContext, DropResult } from 'react-beautiful-dnd';

const App: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    setTasks(getTasks());
  }, []);

  const handleSaveTask = (task: Task) => {
    addTask(task);
    setTasks(getTasks());
  };

  const handleMoveTask = (id: string, newState: Task['state']) => {
    const updatedTask = tasks.find((task) => task.id === id);
    if (updatedTask) {
      updatedTask.state = newState;
      updateTask(updatedTask);
      setTasks(getTasks());
    }
  };

  const onDragEnd = (result: DropResult) => {
    if (!result.destination) return;
    const { source, destination } = result;
    if (source.droppableId !== destination.droppableId) {
      handleMoveTask(result.draggableId, destination.droppableId as Task['state']);
    }
  };

  return (
    <Router>
      <div className="app">
        <Home />
        <DragDropContext onDragEnd={onDragEnd}>
          <Routes>
            <Route path="/" element={<TaskList tasks={tasks} onMoveTask={handleMoveTask} droppableId="task-list" />} />
            {/* Add other routes as needed */}
          </Routes>
        </DragDropContext>
      </div>
    </Router>
  );
};

export default App;
