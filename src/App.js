import React, { useState, useEffect } from 'react';
import { ThemeProvider } from './contexts/ThemeContext';
import { ChatProvider } from './contexts/ChatContext';
import Sidebar from './components/Sidebar';
import TopNavigation from './components/TopNavigation';
import ChatArea from './components/ChatArea';
import MessageInput from './components/MessageInput';

import BackgroundImage from './components/BackgroundImage';
import VideoBackground from './components/VideoBackground';
import LoadingScreen from './components/LoadingScreen';

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [videoLoaded, setVideoLoaded] = useState(false);

  useEffect(() => {
    // Wait for DOM content to load
    const handleDOMContentLoaded = () => {
      // Set a minimum loading time for smooth UX
      setTimeout(() => {
        if (videoLoaded) {
          setIsLoading(false);
        }
      }, 2000);
    };

    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', handleDOMContentLoaded);
    } else {
      handleDOMContentLoaded();
    }

    return () => {
      document.removeEventListener('DOMContentLoaded', handleDOMContentLoaded);
    };
  }, [videoLoaded]);

  useEffect(() => {
    // Hide loading screen when video is loaded
    if (videoLoaded) {
      const timer = setTimeout(() => {
        setIsLoading(false);
      }, 500); // Small delay for smooth transition

      return () => clearTimeout(timer);
    }
  }, [videoLoaded]);

  // Fallback: Hide loading screen after 5 seconds even if video fails
  useEffect(() => {
    const fallbackTimer = setTimeout(() => {
      setIsLoading(false);
    }, 5000);

    return () => clearTimeout(fallbackTimer);
  }, []);

  return (
    <ThemeProvider>
      <ChatProvider>
        <BackgroundImage>
          {/* Video Background - Always render for preloading */}
          <VideoBackground onVideoLoad={setVideoLoaded} />
          
          {isLoading ? (
            <LoadingScreen />
          ) : (
            <div className="flex h-screen overflow-hidden text-white font-sans transition-colors duration-300">
              <Sidebar />
              
              {/* Main Chat Area with Video Background */}
              <div className="flex-1 flex flex-col transition-colors duration-300 relative overflow-hidden">
                {/* Blurred overlay for better text readability */}
                <div className="absolute inset-0 bg-black/30 backdrop-blur-sm pointer-events-none z-10"></div>
                
                {/* Chat content with higher z-index */}
                <div className="relative z-20 flex flex-col h-full">
                  <TopNavigation />
                  <ChatArea />
                  <MessageInput />
                </div>
              </div>
            </div>
          )}
        </BackgroundImage>
      </ChatProvider>
    </ThemeProvider>
  );
}

export default App;

