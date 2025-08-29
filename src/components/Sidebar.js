import React, { useState } from 'react';
import { useChat } from '../contexts/ChatContext';

const Sidebar = () => {
  const { chats, currentChatId, sidebarOpen, setSidebarOpen, createNewChat, switchChat, renameChat } = useChat();
  const [editingChatId, setEditingChatId] = useState(null);
  const [editTitle, setEditTitle] = useState('');

  const handleRenameClick = (chat) => {
    setEditingChatId(chat.id);
    setEditTitle(chat.title);
  };

  const handleSaveRename = () => {
    if (editTitle.trim() && editingChatId) {
      renameChat(editingChatId, editTitle.trim());
    }
    setEditingChatId(null);
    setEditTitle('');
  };

  const handleCancelRename = () => {
    setEditingChatId(null);
    setEditTitle('');
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSaveRename();
    } else if (e.key === 'Escape') {
      handleCancelRename();
    }
  };

  return (
    <>
      {/* Mobile Overlay */}
      <div 
        className={`fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden transition-opacity duration-300 ${
          sidebarOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setSidebarOpen(false)}
      />
      
      {/* Sidebar */}
      <div className={`w-64 bg-black border-r border-gray-700/50 flex flex-col transition-all duration-300 md:translate-x-0 fixed md:relative z-40 h-full ${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full'
      }`}>
        {/* Sidebar Header */}
        <div className="p-4 border-b border-gray-700 dark:border-gray-700">
          <h2 className="text-lg font-semibold text-gray-200 dark:text-gray-200 instrument-serif-regular ml-12 md:ml-0">Chat History</h2>
        </div>
        
        {/* Chat Sessions */}
        <div className="flex-1 overflow-y-auto scrollbar-hide p-2">
          <div className="space-y-2">
            {chats.map((chat) => (
              <div 
                key={chat.id}
                className={`relative p-3 rounded-lg transition-colors duration-200 ${
                  chat.id === currentChatId 
                    ? 'bg-blue-600/50 text-white' 
                    : 'bg-gray-700/50 hover:bg-gray-600/50 text-gray-200'
                }`}
              >
                <div 
                  onClick={() => switchChat(chat.id)}
                  className="cursor-pointer pr-8"
                >
                  {editingChatId === chat.id ? (
                    <input
                      type="text"
                      value={editTitle}
                      onChange={(e) => setEditTitle(e.target.value)}
                      onKeyDown={handleKeyDown}
                      onBlur={handleSaveRename}
                      className="text-sm bg-gray-600 text-white rounded px-2 py-1 w-full instrument-serif-regular"
                      autoFocus
                    />
                  ) : (
                    <div className="text-sm truncate instrument-serif-regular">{chat.title}</div>
                  )}
                  <div className="text-xs text-gray-400 mt-1 instrument-serif-regular">
                    {chat.updatedAt.toLocaleDateString()}
                  </div>
                </div>
                
                {/* Three-dot menu */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleRenameClick(chat);
                  }}
                  className="absolute top-2 right-2 p-1 hover:bg-gray-600/50 rounded transition-colors duration-200"
                >
                  <svg className="w-4 h-4 text-gray-400 hover:text-gray-200" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"/>
                  </svg>
                </button>
              </div>
            ))}
          </div>
        </div>
        
        {/* Settings */}
        <div className="p-4 border-t border-gray-700 dark:border-gray-700">
          <button 
            onClick={createNewChat}
            className="w-full p-2 text-sm bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors duration-200 text-white font-medium instrument-serif-regular"
          >
            + New Chat
          </button>
        </div>
      </div>
    </>
  );
};

export default Sidebar;

