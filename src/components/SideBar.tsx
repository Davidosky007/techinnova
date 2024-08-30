import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import logo from '../logo_tech.svg';
import calendarIcon from '../icons/calender.svg';
import inboxIcon from '../icons/inbox.svg';
import notesIcon from '../icons/notes.svg';
import todoListIcon from '../icons/todo.svg';
import settingsIcon from '../icons/settings.svg';
import ThemeToggle from './ThemeToggle';

interface SidebarProps {
  onLinkClick: (link: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ onLinkClick }) => {
  const [activeLink, setActiveLink] = useState<string>('Calendar');

  const linkIcons: Record<string, string> = {
    Calendar: calendarIcon,
    Inbox: inboxIcon,
    Notes: notesIcon,
    'To-Do List': todoListIcon,
    Settings: settingsIcon,
  };

  const links = Object.keys(linkIcons);

  return (
    <div className="w-[276px] h-screen py-[40px] px-0 gap-[60px] rounded-tl-[20px] rounded-bl-[20px] bg-white fixed top-0 left-0 flex flex-col items-center">
      <Link to="/">
        <div className="w-[179.84px] h-[44px] p-[2.56px]">
          <img src={logo} alt="Techinnova Logo" className="w-full h-full object-cover" />
        </div>
      </Link>

      <ul className="list-none p-0 m-0 flex flex-col items-center w-full">
        {links.map((link) => (
          <li key={link} className="relative w-full">
            {activeLink === link && (
              <div className="absolute right-0 top-0 w-[6px] h-[76px] bg-[#4F35F3]"></div>
            )}
            <button
              onClick={() => {
                onLinkClick(link);
                setActiveLink(link);
              }}
              className={`w-full h-[76px] flex items-center px-[20px] gap-4 ${
                activeLink === link
                  ? 'bg-[#F5F3FF] text-[#4F35F3]'
                  : 'bg-white text-[#65676D]'
              } font-sf-pro text-[18px] font-[600] leading-[21.48px] text-left border-none cursor-pointer transition-all ease-in-out duration-300`}
            >
              <img
                src={linkIcons[link]}
                alt={`${link} Icon`}
                className="w-[24px] h-[24px] mr-[16px]"
                style={{
                  filter: activeLink === link
                    ? 'invert(43%) sepia(84%) saturate(6638%) hue-rotate(192deg) brightness(95%) contrast(93%)'
                    : 'none'
                }}
              />
              {link}
            </button>
          </li>
        ))}
      <ThemeToggle />
      </ul>

    </div>
  );
};

export default Sidebar;
