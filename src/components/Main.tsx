import React, { useState, useEffect } from 'react';
import left from '../icons/left.svg';
import right from '../icons/right.svg';
import vector_search from '../icons/search-vector.svg';
import Plus from '../icons/plus.svg';
import TaskForm from './TaskForm';
import TaskList from './TaskList';
import { getTasks, addTask, updateTask } from '../services/taskService';
import { Task } from '../utils/taskType';
import { DragDropContext, DropResult } from 'react-beautiful-dnd';

const Main: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

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

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value.toLowerCase());
  };

  const filteredTasks = tasks.filter(task => 
    task.title.toLowerCase().includes(searchTerm) || 
    task.description.toLowerCase().includes(searchTerm)
  );

  const onDragEnd = (result: DropResult) => {
    if (!result.destination) return;

    const { source, destination } = result;

    // Only update if the task is moved to a different state
    if (source.droppableId !== destination.droppableId) {
      handleMoveTask(result.draggableId, destination.droppableId as Task['state']);
    }
  };

  return (
    <>
      <section className="w-full h-[40px] flex justify-between gap-0 mb-9">
        <div className="w-full h-[40px] flex gap-[16px] items-center justify-center">
          <p className="font-sf-pro text-[30px] font-semibold leading-[32px] text-left text-black">2 August 2023</p>
          <img src={left} alt="Left Arrow" className="w-[40px] h-[40px] gap-[10px]" />
          <img src={right} alt="Right Arrow" className="w-[40px] h-[40px] gap-[10px]" />
          <div className="w-[303px] h-[44px] pt-[4px] gap-[8px] rounded-tl-[9px] opacity-0"></div>
          <div className="relative w-[236px]">
            <input
              type="text"
              placeholder="Search"
              value={searchTerm}
              onChange={handleSearch}
              className="w-full h-[40px] p-[8px] pr-[6px] pl-[36px] rounded-tl-[6px] rounded-[6px] font-inter text-[14px] font-normal leading-[24px] tracking-[-0.006em] text-left text-[#9AA6AC] border border-solid border-[#DDE2E4] focus:outline-none shadow-[0px_1px_2px_0px_rgba(16,24,40,0.05)]" />
            <div className="absolute left-[8px] top-[50%] translate-y-[-50%]">
              <img src={vector_search} alt="Search Icon" className="w-[13.99px] h-[13.99px] top-[4px] left-[4px] gap-0" />
            </div>
          </div>
        </div>
      </section>

      <DragDropContext onDragEnd={onDragEnd}>
        <div className="w-full h-[872px] p-[15px_6px] gap-0">
          <div className="flex gap-[16px]">
            <div className='w-[282px] h-full p-[12px_8px] gap-[16px] flex flex-col rounded-[6px] rounded-tl-md bg-[#F5F7F9] shadow-sm shadow-[#0000000F] border border-[#3C425714]'>
              <div className="h-[24px] gap-0 flex justify-between mb-5">
                <div className="h-[24px] gap-[8px] flex justify-center">
                  <h2 className='font-inter text-[16px] font-medium leading-[24px] text-[#6F6F6F] text-left'>To Do</h2>
                  <span className='w-[22px] h-[24px] p-[0px_6px] gap-[10px] rounded-tl-sm bg-[#DDDDDD]'>4</span>
                </div>
                <img src={Plus} alt="Add-icon" className='w-[24px] h-[24px] gap-[8px] cursor-pointer' onClick={toggleModal} />
              </div>
              <TaskList tasks={filteredTasks.filter(task => task.state === 'todo')} droppableId="todo-list" onMoveTask={handleMoveTask} />
            </div>

            <div className='w-[282px] h-full p-[12px_8px] gap-[16px] rounded-[6px] rounded-tl-md bg-[#F5F7F9] shadow-sm shadow-[#0000000F] border border-[#3C425714]'>
              <div className="h-[24px] gap-0 flex justify-between mb-5">
                <div className="h-[24px] gap-[8px] flex justify-center">
                  <h2 className='font-inter text-[16px] font-medium leading-[24px] text-[#6F6F6F] text-left'>In Progress</h2>
                  <span className='w-[22px] h-[24px] p-[0px_6px] gap-[10px] rounded-tl-sm bg-[#DDDDDD]'>4</span>
                </div>
                <img src={Plus} alt="Add-icon" className='w-[24px] h-[24px] gap-[8px] cursor-pointer' onClick={toggleModal} />
              </div>
              <TaskList tasks={filteredTasks.filter(task => task.state === 'in-progress')} droppableId="in-progress-list" onMoveTask={handleMoveTask} />
            </div>

            <div className='w-[282px] h-full p-[12px_8px] gap-[16px] rounded-[6px] rounded-tl-md bg-[#F5F7F9] shadow-sm shadow-[#0000000F] border border-[#3C425714]'>
              <div className="h-[24px] gap-0 flex justify-between mb-5">
                <div className="h-[24px] gap-[8px] flex justify-center">
                  <h2 className='font-inter text-[16px] font-medium leading-[24px] text-[#6F6F6F] text-left'>Completed</h2>
                  <span className='w-[22px] h-[24px] p-[0px_6px] gap-[10px] rounded-tl-sm bg-[#DDDDDD]'>4</span>
                </div>
                <img src={Plus} alt="Add-icon" className='w-[24px] h-[24px] gap-[8px] cursor-pointer' onClick={toggleModal} />
              </div>
              <TaskList tasks={filteredTasks.filter(task => task.state === 'complete')} droppableId="complete-list" onMoveTask={handleMoveTask} />
            </div>
          </div>
        </div>
      </DragDropContext>

      {isModalOpen && (
        <TaskForm onSave={handleSaveTask} onClose={toggleModal} />
      )}
    </>
  );
};

export default Main;
