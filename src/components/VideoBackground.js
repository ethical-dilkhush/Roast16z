import React, { useEffect, useRef } from 'react';

const VideoBackground = ({ onVideoLoad }) => {
  const videoRef = useRef(null);

  useEffect(() => {
    if (videoRef.current) {
      // Force autoplay with multiple attempts
      const playVideo = () => {
        videoRef.current.play().catch(console.log);
      };

      // Try multiple times
      playVideo();
      setTimeout(playVideo, 100);
      setTimeout(playVideo, 500);
      setTimeout(playVideo, 1000);
      setTimeout(playVideo, 2000);
    }
  }, []);

  return (
    <>
      {/* Video Background - Only for Chat Area */}
      <video
        ref={videoRef}
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        className="absolute inset-0 w-full h-full object-cover"
        style={{ zIndex: -1 }}
        onError={(e) => {
          console.log('Video failed to load, using fallback');
          e.target.style.display = 'none';
        }}
        onLoadedData={() => {
          console.log('Video loaded successfully');
          if (onVideoLoad) {
            onVideoLoad(true);
          }
        }}
        onCanPlay={() => {
          console.log('Video can play, attempting to start');
          if (videoRef.current) {
            videoRef.current.play().catch(console.log);
          }
        }}
      >
        <source 
          src="/background.mp4" 
          type="video/mp4" 
        />
        Your browser does not support the video tag.
      </video>



      {/* Fallback gradient background if video fails */}
      <div 
        className="absolute inset-0 bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900"
        style={{ zIndex: -2 }}
      />


    </>
  );
};

export default VideoBackground;
