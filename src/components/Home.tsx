// src/components/HomePage.tsx

import React from 'react';
import Sidebar from './SideBar';
import MainContent from './Main'; 

const HomePage: React.FC = () => {
  return (
    <div className="flex h-screen">
      {/* Sidebar Component */}
      <div className="w-[276px] h-full py-[40px] px-0 gap-[60px] rounded-tl-[20px] rounded-bl-[20px] bg-white">
        <Sidebar onLinkClick={(link) => console.log(`Clicked on ${link}`)} />
      </div>

      {/* Main Content Component */}
      <div className="flex-grow h-full py-[40px] px-[48px] gap-[32px]">
        <MainContent />
      </div>
    </div>
  );
};

export default HomePage;

