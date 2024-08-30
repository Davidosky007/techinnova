import React, { useEffect, useState } from 'react';
import { Task } from '../utils/taskType';
import moreIcon from '../icons/more-horizontal.svg';

interface TaskCardProps extends Task {
  onMove: (newState: Task['state']) => void;
  image?: File | null; // Ensure this type is correct and matches your use case
}

const TaskCard: React.FC<TaskCardProps> = ({ id, title, description, state, priority, onMove, image }) => {
  const [imageURL, setImageURL] = useState<string | null>(null);

  useEffect(() => {
    // Check if the image prop is valid before creating the URL
    if (image && image instanceof File) {
      const url = URL.createObjectURL(image);
      setImageURL(url);

      // Cleanup object URL when component unmounts or image changes
      return () => URL.revokeObjectURL(url);
    } else {
      setImageURL(null);
    }
  }, [image]);

  const handleMove = (event: React.ChangeEvent<HTMLSelectElement>) => {
    onMove(event.target.value as Task['state']);
  };

  return (
    <div className="w-[258px] h-full p-4 flex flex-col gap-[16px] rounded-tl-md rounded-[6px] mb-4 bg-white shadow-sm">
      <p className="w-fit h-6 px-2 py-1 flex items-center gap-2 rounded-tl text-left bg-[#EBFAE2] font-inter text-xs font-medium leading-6 text-[#4F9C20]">
        {priority.toUpperCase()}
      </p>
      <div className="flex justify-between items-center">
        <h3 className="font-sf-pro text-base font-medium leading-6 text-left text-[#1A1919]">
          {title}
        </h3>
        <span className="w-6 h-6 flex justify-center items-center gap-2 p-1 cursor-pointer rounded-tl-md rounded-[6px] bg-white border border-[#DDDDDD] shadow-sm">
          <img src={moreIcon} alt="More" className="w-[16px] h-[16px]" />
        </span>
      </div>
      <p>{description}</p>
      <div className="task-details">
        {imageURL && (
          <div className="w-full h-32 rounded-lg border border-[#E4E7EC] bg-white flex items-center justify-center mb-4">
            <img
              src={imageURL}
              alt="Task"
              className="w-full h-full object-cover"
            />
          </div>
        )}
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
