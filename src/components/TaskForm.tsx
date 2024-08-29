import React, { useState } from 'react';
import { Task, TaskPriority } from '../utils/taskType';
import close_icon from '../icons/close-circle.svg';
import upload from '../icons/upload.svg';
import deleteIcon from '../icons/delete.svg';

interface TaskFormProps {
  onSave: (task: Task) => void;
  onClose: () => void;
}

const TaskForm: React.FC<TaskFormProps> = ({ onSave, onClose }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState<TaskPriority>('');
  const [deadline, setDeadline] = useState('');
  const [time, setTime] = useState('');
  const [image, setImage] = useState<File | null>(null);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const newTask: Task = {
      id: Date.now().toString(),
      title,
      description,
      state: 'todo',
      priority,
    };
    onSave(newTask);
    setTitle('');
    setDescription('');
    setDeadline('');
    setTime('');
    setImage(null);
    onClose(); // Close the modal after saving the task
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setImage(event.target.files[0]);
    }
  };

  const handleFileDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    if (event.dataTransfer.files && event.dataTransfer.files.length > 0) {
      setImage(event.dataTransfer.files[0]);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center p-[33rem] bg-[#26323899] backdrop-blur-sm overflow-x-clip overflow-y-scroll transition-opacity duration-300 animate-fade-in">
      <form onSubmit={handleSubmit} className="w-[517px] p-[48px_32px] flex flex-col gap-[32px] bg-white relative m-9 rounded-lg shadow-lg transition-transform duration-300 transform scale-100 animate-fade-in">
        <div className="w-[453px] h-[24px] gap-0 flex justify-between mb-8">
          <p className="font-sf-pro text-[24px] font-semibold leading-[32px] text-center text-[#1A1919]">Add Task</p>
          <img src={close_icon} alt="Close Icon" onClick={onClose} className="w-[24px] h-[24px] cursor-pointer" />
        </div>
        <div className='gap-[6px] flex flex-col'>
          <p className='font-inter text-[14px] font-medium leading-[20px] text-[#1A1919] text-left'>Task Name</p>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Task Name"
            required
            className="border w-full focus:outline-none h-[48px] p-[10px_14px] gap-[8px] rounded-[12px] border-t border-r border-b border-l border-[#D0D5DD] text-[#848585] bg-[#FFFFFF]"
          />
        </div>
        <div className='gap-[6px] flex flex-col'>
          <div className='flex gap-[4px]'>
            <p className='font-inter text-[14px] font-medium leading-[20px] text-[#1A1919] text-left'>Description</p>
            <p className='font-inter text-[14px] font-medium leading-[20px] text-[#848585] text-left'>(Optional)</p>
          </div>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Task Description"
            required
            className="border focus:outline-none w-[453px] h-[96px] p-[16px_14px] gap-[8px] rounded-[12px] border-t border-r border-b border-l border-[#D0D5DD] text-[#848585] bg-[#FFFFFF]"
          />
        </div>
        <div className='gap-[6px] flex flex-col'>
          <p className='font-inter text-[14px] font-medium leading-[20px] text-[#1A1919] text-left'>Priority</p>
          <select
            value={priority || ''}
            onChange={(e) => setPriority(e.target.value as TaskPriority)}
            className="border w-full focus:outline-none h-[48px] p-[10px_14px] gap-[8px] rounded-[12px] border-t border-r border-b border-l border-[#D0D5DD] text-[#848585] bg-[#FFFFFF]"
          >
            <option value="" className='text-[#848585]' disabled>Select the priority of the task</option>
            <option value="high" className="option-style">High</option>
            <option value="medium" className="option-style">Medium</option>
            <option value="low" className="option-style">Low</option>
          </select>
        </div>
        <div className="flex flex-col gap-2">
          <div className="flex gap-2">
            <p className="font-inter text-base font-medium text-[#1A1919]">Upload cover</p>
            <p className="font-inter text-base font-medium text-[#848585]">(Optional)</p>
          </div>
          {!image ? (
            <div
              className="w-full h-32 p-4 rounded-lg border border-[#E4E7EC] bg-white flex flex-col items-center justify-center cursor-pointer relative"
              onClick={() => document.getElementById('fileInput')?.click()}
              onDragOver={(e) => e.preventDefault()}
              onDrop={handleFileDrop}
            >
              <input
                id="fileInput"
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
              />
              <img src={upload} alt="Upload Icon" className="w-[24px] h-[24px]" />
              <p className="text-center text-[#848585]"><span className='text-[#6941C6]'>Click to upload</span> or drag and drop <br />PNG or JPG</p>
            </div>
          ) : (
            <div className="w-full h-32 p-4 rounded-lg border border-[#E4E7EC] bg-white flex items-center gap-4">
                <img src={URL.createObjectURL(image)} alt="Uploaded Preview" className="w-[187px] h-[87px] rounded-t-[4px] border-t border-r border-l border-[#D0D5DD]" />
                <div className="flex flex-col items-left justify-center">

              <p className="text-[#344054] font-inter text-sm font-medium leading-5 text-left">{image.name}</p>
              <p className="font-inter text-sm font-normal leading-5 text-left text-[#667085]">Size: {Math.round(image.size / 1024)} KB</p>
              <div className="w-[194px] flex items-center justify-center gap-[12px] mt-3 rounded-full h-2.5 mb-2">
                    <div className="bg-[#4F35F3] h-2.5 rounded-full" style={{ width: '80%' }}></div>
                    <span className='font-inter text-sm font-medium leading-[20px] text-left text-[#344054]'>100%</span>
              </div>
                </div>
              <button
                onClick={() => setImage(null)}
                className=""
                >
                  <img src={deleteIcon} alt="Close Icon" className="w-[40px] h-[40px]" />
              </button>
            </div>
          )}
        </div>
        <div className='flex gap-4'>
          <div className='gap-[6px] flex flex-col'>
            <p className='font-inter text-[14px] font-medium leading-[20px] text-[#1A1919] text-left'>Deadline</p>
        <input
          type="date"
          value={deadline}
          onChange={(e) => setDeadline(e.target.value)}
          className="p-2 border border-gray-300 rounded-[12px] focus:outline-none w-[219px]"
        />
          </div>
          <div className='gap-[6px] flex flex-col'>
            <p className='font-inter text-[14px] font-medium leading-[20px] text-[#1A1919] text-left'>Deadline</p>  
        <input
          type="time"
          value={time}
          onChange={(e) => setTime(e.target.value)}
          className="p-2 border border-gray-300 rounded-[12px] focus:outline-none w-[219px]"
        />
          </div>
        </div>
        <button
          type="submit"
          className="p-2 h-[48px] bg-[#4F35F3] text-white rounded-[12px] hover:bg-blue-600"
        >
          Update
        </button>
      </form>
    </div>
  );
};

export default TaskForm;
