import React, { useEffect, useRef } from 'react';
import { useChat } from '../contexts/ChatContext';
import Message from './Message';

const ChatArea = () => {
  const { messages, isLoading } = useChat();
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  return (
    <div className="flex-1 overflow-y-auto scrollbar-hide">
      <div className="w-full">
        {messages.map((message) => (
          <Message key={message.id} message={message} />
        ))}
        
        {isLoading && (
          <div className="w-full py-3 px-4">
            <div className="flex items-start gap-3 max-w-4xl mx-auto">
              <div className="w-8 h-8 rounded-full overflow-hidden border-2 border-green-400 flex-shrink-0">
                <img 
                  src="/roast.jpeg" 
                  alt="Roast16z AI" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex items-center space-x-1 pt-1">
                <div className="flex space-x-1 items-end">
                  <div className="w-2 h-2 typing-dot"></div>
                  <div className="w-2 h-2 typing-dot"></div>
                  <div className="w-2 h-2 typing-dot"></div>
                </div>
                <span className="text-gray-400 text-sm ml-2 instrument-serif-regular">Roast16z typing...</span>
              </div>
            </div>
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>
    </div>
  );
};

export default ChatArea;

