import React from 'react';

const Message = ({ message }) => {
  const isUser = message.sender === 'user';

  return (
    <div className={`w-full py-3 px-4`}>
      <div className={`flex items-start gap-3 max-w-4xl mx-auto ${isUser ? 'flex-row-reverse' : ''}`}>
        <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
          isUser 
            ? 'bg-gradient-to-r from-blue-500 to-purple-600' 
            : 'overflow-hidden border-2 border-green-400'
        }`}>
          {isUser ? (
            <span className="text-white font-bold text-xs">You</span>
          ) : (
            <img 
              src="/roast.jpeg" 
              alt="Roast16z AI" 
              className="w-full h-full object-cover"
            />
          )}
        </div>
        <div className={`flex-1 min-w-0 ${isUser ? 'text-right' : 'text-left'}`}>
          <div className={`${isUser ? 'ml-8' : 'mr-8'}`}>
            <p className="whitespace-pre-wrap chat-message instrument-serif-regular text-white text-sm sm:text-base leading-relaxed break-words">
              {message.text}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Message;

