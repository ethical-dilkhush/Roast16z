import React from 'react';
import { useChat } from '../contexts/ChatContext';

const TopNavigation = () => {
  const { toggleSidebar } = useChat();
  return (
    <div className="fixed md:relative top-0 md:top-auto left-0 md:left-auto right-0 md:right-auto z-30 md:z-auto bg-black border-b border-gray-700/50 p-4 transition-colors duration-300">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          {/* Mobile Hamburger Menu */}
          <button 
            onClick={toggleSidebar}
            className="md:hidden p-2 text-white hover:bg-gray-800 rounded-lg transition-colors duration-200"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth="2" 
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
          <div className="w-8 h-8 rounded-full overflow-hidden border-2 border-blue-500">
            <img 
              src="/roast.jpeg" 
              alt="Roast16z AI" 
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex items-center">
            <h1 className="text-xl font-bold text-gray-100 instrument-serif-regular leading-none">
              Roast16z
            </h1>
          </div>
        </div>
        <div className="flex items-center space-x-3">
          <a 
            href="https://x.com/roast16z" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-gray-300 hover:text-white transition-colors duration-200"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
            </svg>
          </a>
          <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
          <span className="text-sm text-gray-300 dark:text-gray-300 instrument-serif-regular">Online</span>
        </div>
      </div>
    </div>
  );
};

export default TopNavigation;

