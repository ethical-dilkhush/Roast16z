import React from 'react';

const BackgroundImage = ({ children }) => {
  return (
    <div className="min-h-screen relative bg-gray-900">
      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
};

export default BackgroundImage;
