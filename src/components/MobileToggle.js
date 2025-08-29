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
      className="fixed top-4 left-4 z-50 md:hidden bg-black text-white p-2 rounded-lg shadow-lg transition-transform duration-200 hover:scale-105"
    >
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path 
          strokeLinecap="round" 
          strokeLinejoin="round" 
          strokeWidth="2" 
          d={sidebarOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
        />
      </svg>
    </button>
  );
};

export default MobileToggle;

