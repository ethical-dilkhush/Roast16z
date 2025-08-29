import React, { useState, useRef, useEffect } from 'react';
import { useChat } from '../contexts/ChatContext';

const MessageInput = () => {
  const [message, setMessage] = useState('');
  const { sendMessage, isLoading } = useChat();
  const textareaRef = useRef(null);
  const containerRef = useRef(null);

  // Handle mobile keyboard visibility
  useEffect(() => {
    const handleResize = () => {
      // Detect if keyboard is open (viewport height change on mobile)
      const viewportHeight = window.visualViewport?.height || window.innerHeight;
      const screenHeight = window.screen.height;
      const keyboardHeight = screenHeight - viewportHeight;
      
      if (keyboardHeight > 100) { // Keyboard is likely open
        // Scroll the input into view after a small delay
        setTimeout(() => {
          if (containerRef.current) {
            containerRef.current.scrollIntoView({
              behavior: 'smooth',
              block: 'end'
            });
          }
        }, 300);
      }
    };

    // Listen for viewport changes (keyboard open/close)
    if (window.visualViewport) {
      window.visualViewport.addEventListener('resize', handleResize);
    } else {
      window.addEventListener('resize', handleResize);
    }

    return () => {
      if (window.visualViewport) {
        window.visualViewport.removeEventListener('resize', handleResize);
      } else {
        window.removeEventListener('resize', handleResize);
      }
    };
  }, []);

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

  const handleFocus = () => {
    // Scroll input into view when focused (mobile keyboard handling)
    setTimeout(() => {
      if (textareaRef.current && containerRef.current) {
        // Scroll to the input area
        containerRef.current.scrollIntoView({
          behavior: 'smooth',
          block: 'end'
        });
        
        // Also ensure the textarea is visible
        textareaRef.current.scrollIntoView({
          behavior: 'smooth',
          block: 'nearest'
        });
      }
    }, 300); // Delay to allow keyboard to open
  };

  return (
    <div 
      ref={containerRef}
      className="fixed md:relative bottom-0 md:bottom-auto left-0 md:left-auto right-0 md:right-auto z-30 md:z-auto bg-black border-t border-gray-700/50 p-4 md:p-3 transition-colors duration-300"
    >
      <form onSubmit={handleSubmit} className="flex items-center space-x-3 md:space-x-2">
        <div className="flex-1 relative">
          <textarea 
            ref={textareaRef}
            value={message}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            onFocus={handleFocus}
            placeholder="Type your message here..." 
            className="w-full bg-gray-700 dark:bg-gray-700 text-gray-100 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-400 rounded-2xl p-4 md:p-3 resize-none max-h-32 md:max-h-24 min-h-[3rem] md:min-h-[2.5rem] focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200 instrument-serif-regular"
            rows={1}
            disabled={isLoading}
            autoComplete="off"
            autoCorrect="off"
            autoCapitalize="off"
            spellCheck="false"
          />
        </div>
        <button 
          type="submit"
          disabled={!message.trim() || isLoading}
          className="bg-blue-600 hover:bg-blue-700 text-white p-3 md:p-2 rounded-full transition-all duration-200 hover:animate-glow focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-black disabled:opacity-50 disabled:cursor-not-allowed flex-shrink-0"
        >
          <svg className="w-4 h-4 md:w-5 md:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"></path>
          </svg>
        </button>

      </form>
    </div>
  );
};

export default MessageInput;

