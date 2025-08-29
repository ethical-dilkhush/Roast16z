import React, { useState, useRef } from 'react';
import { useChat } from '../contexts/ChatContext';

const MessageInput = () => {
  const [message, setMessage] = useState('');
  const { sendMessage, isLoading } = useChat();
  const textareaRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (message.trim() && !isLoading) {
      sendMessage(message.trim());
      setMessage('');
      if (textareaRef.current) {
        textareaRef.current.style.height = 'auto';
      }
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  const handleChange = (e) => {
    setMessage(e.target.value);
    
    // Auto-resize textarea
    const textarea = e.target;
    textarea.style.height = 'auto';
    textarea.style.height = Math.min(textarea.scrollHeight, 128) + 'px';
  };

  return (
    <div className="bg-black border-t border-gray-700/50 p-4 transition-colors duration-300">
      <form onSubmit={handleSubmit} className="flex items-center space-x-3">
        <div className="flex-1 relative">
          <textarea 
            ref={textareaRef}
            value={message}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            placeholder="Type your message here..." 
            className="w-full bg-gray-700 dark:bg-gray-700 text-gray-100 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-400 rounded-2xl p-4 resize-none max-h-32 min-h-[3rem] focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200 instrument-serif-regular"
            rows={1}
            disabled={isLoading}
          />
        </div>
        <button 
          type="submit"
          disabled={!message.trim() || isLoading}
          className="bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-full transition-all duration-200 hover:animate-glow focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-black disabled:opacity-50 disabled:cursor-not-allowed flex-shrink-0"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"></path>
          </svg>
        </button>

      </form>
    </div>
  );
};

export default MessageInput;

