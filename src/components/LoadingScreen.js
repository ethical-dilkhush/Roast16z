import React from 'react';

const LoadingScreen = () => {
  return (
    <div className="fixed inset-0 bg-black flex items-center justify-center z-50">
      <div className="text-center">
        {/* Logo */}
        <div className="mb-8">
          <div className="w-24 h-24 mx-auto rounded-full overflow-hidden border-4 border-blue-500 shadow-lg">
            <img 
              src="/roast.jpeg" 
              alt="Roast16z" 
              className="w-full h-full object-cover"
            />
          </div>
        </div>
        
        {/* Loading Text */}
        <h1 className="text-3xl font-bold text-white mb-6 instrument-serif-regular">
          Roast16z
        </h1>
        
        <p className="text-xl text-gray-300 mb-8 instrument-serif-regular">
          is Loading...
        </p>
        
        {/* Loading Animation */}
        <div className="flex justify-center space-x-2">
          <div className="w-3 h-3 bg-blue-500 rounded-full animate-bounce"></div>
          <div className="w-3 h-3 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
          <div className="w-3 h-3 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
        </div>
        
        {/* Progress Bar */}
        <div className="mt-8 w-64 mx-auto">
          <div className="w-full bg-gray-700 rounded-full h-2">
            <div className="bg-blue-500 h-2 rounded-full animate-pulse" style={{ width: '100%' }}></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoadingScreen;
