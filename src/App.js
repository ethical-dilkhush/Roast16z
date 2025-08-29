import React, { useState, useEffect } from 'react';
import { ThemeProvider } from './contexts/ThemeContext';
import { ChatProvider } from './contexts/ChatContext';
import Sidebar from './components/Sidebar';
import TopNavigation from './components/TopNavigation';
import ChatArea from './components/ChatArea';
import MessageInput from './components/MessageInput';
import MobileToggle from './components/MobileToggle';
import BackgroundImage from './components/BackgroundImage';
import VideoBackground from './components/VideoBackground';
import LoadingScreen from './components/LoadingScreen';

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [videoLoaded, setVideoLoaded] = useState(false);

  useEffect(() => {
    // Wait for DOM content to load
    const handleDOMContentLoaded = () => {
      // Check if video is loaded or wait for it
      const video = document.querySelector('video');
      if (video) {
        const handleVideoLoad = () => {
          setVideoLoaded(true);
        };

        if (video.readyState >= 3) {
          // Video is already loaded enough to play
          setVideoLoaded(true);
        } else {
          video.addEventListener('loadeddata', handleVideoLoad);
          video.addEventListener('canplaythrough', handleVideoLoad);
        }
      } else {
        // If no video found, just wait a bit for everything to load
        setTimeout(() => setVideoLoaded(true), 1000);
      }
    };

    // Minimum loading time to show the loading screen
    const minLoadingTime = setTimeout(() => {
      if (videoLoaded) {
        setIsLoading(false);
      }
    }, 2000);

    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', handleDOMContentLoaded);
    } else {
      handleDOMContentLoaded();
    }

    return () => {
      clearTimeout(minLoadingTime);
      document.removeEventListener('DOMContentLoaded', handleDOMContentLoaded);
    };
  }, [videoLoaded]);

  useEffect(() => {
    // Hide loading screen when both conditions are met
    if (videoLoaded) {
      const timer = setTimeout(() => {
        setIsLoading(false);
      }, 500); // Small delay for smooth transition

      return () => clearTimeout(timer);
    }
  }, [videoLoaded]);

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <ThemeProvider>
      <ChatProvider>
        <BackgroundImage>
          <div className="flex h-screen overflow-hidden text-white font-sans transition-colors duration-300">
            <Sidebar />
            
            {/* Main Chat Area with Video Background */}
            <div className="flex-1 flex flex-col transition-colors duration-300 relative overflow-hidden">
              {/* Video Background for Chat Area Only */}
              <VideoBackground />
              
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
          
          <MobileToggle />
        </BackgroundImage>
      </ChatProvider>
    </ThemeProvider>
  );
}

export default App;

