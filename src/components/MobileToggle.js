import React, { useEffect } from 'react';
import { useChat } from '../contexts/ChatContext';

const MobileToggle = () => {
  const { sidebarOpen, toggleSidebar, setSidebarOpen } = useChat();

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setSidebarOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    handleResize(); // Initial call

    return () => window.removeEventListener('resize', handleResize);
  }, [setSidebarOpen]);

  return (
    <button 
      onClick={toggleSidebar}
      className={`fixed top-4 left-4 z-[60] md:hidden bg-black text-white p-2 rounded-lg shadow-lg transition-all duration-200 hover:scale-105 flex items-center ${
        sidebarOpen ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
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
  );
};

export default MobileToggle;

