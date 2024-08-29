import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import TaskList from './components/TaskList';
import TaskForm from './components/TaskForm';
import Sidebar from './components/SideBar';
import Home from './components/Home';
import { getTasks, addTask, updateTask, deleteTask } from './services/taskService';
import { Task } from './utils/taskType';

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

  const handleLinkClick = (link: string) => {
    console.log(`Clicked on ${link}`);
    // Add your logic here to handle link clicks
  };

  return (
    <Router>
    <div className="app">
      {/* <h1>Task Management Dashboard</h1> */}
        {/* <Sidebar onLinkClick={handleLinkClick} /> */}
        <Home />
       <Routes>
          <Route path="/" element={<TaskList tasks={tasks} onMoveTask={handleMoveTask} />} />
          <Route path="/tasks" element={<TaskList tasks={tasks} onMoveTask={handleMoveTask} />} />
          {/* Add other routes as needed */}
        </Routes>
      {/* <TaskForm onSave={handleSaveTask} />
      <div className="task-lists">
        <div>
          <h2>To-Do</h2>
          <TaskList tasks={tasks.filter(task => task.state === 'todo')} onMoveTask={handleMoveTask} />
        </div>
        <div>
          <h2>In Progress</h2>
          <TaskList tasks={tasks.filter(task => task.state === 'in-progress')} onMoveTask={handleMoveTask} />
        </div>
        <div>
          <h2>Complete</h2>
          <TaskList tasks={tasks.filter(task => task.state === 'complete')} onMoveTask={handleMoveTask} />
        </div>
      </div> */}
    </div>
    </Router>
  );
};

export default App;
