import React, { useEffect } from 'react';

const WelcomeScreen = ({ onComplete }) => {
  useEffect(() => {
    // Auto-complete welcome screen after 2 seconds
    const timer = setTimeout(() => {
      onComplete();
    }, 2000);

    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="text-center">
        <div className="text-6xl font-bold text-white mb-4 animate-pulse">
          AI Agent
        </div>
      </div>
    </div>
  );
};

export default WelcomeScreen;
