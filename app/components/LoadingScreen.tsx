import React, { useEffect, useState } from "react";
import loadingGif from "@/app/assets/images/loading.gif";

const funnyStatuses = [
  "Training your AI tutor to understand bad handwriting...",
  "Loading virtual whiteboard markers...",
  "Optimizing your AI's brainpower...",
  "Debugging the space-time continuum...",
  "Downloading knowledge from the universe...",
  "Teaching AI how to take deep breaths...",
  "Summoning the tutor from the digital realm...",
  "Generating 10,000 examples of 'x' in math...",
  "Configuring AI to understand 'I don't get it'...",
  "Charging up neurons... please wait!",
];

interface LoadingScreenProps {
  status?: string;
}

const LoadingScreen: React.FC<LoadingScreenProps> = ({ status }) => {
  const [currentStatus, setCurrentStatus] = useState(
    status || funnyStatuses[0]
  );

  useEffect(() => {
    if (!status) {
      const interval = setInterval(() => {
        setCurrentStatus(
          funnyStatuses[Math.floor(Math.random() * funnyStatuses.length)]
        );
      }, 3000); 
      return () => clearInterval(interval);
    }
  }, [status]);

  return (
    <div className="flex flex-col items-center justify-center h-screen w-screen bg-bgsec text-background">
      <div className="atom">
        <div className="line line-1"></div>
        <div className="line line-2"></div>
        <div className="line line-3"></div>
      </div>
      <p className="w-[72%]"></p>
      <p className="text-xl  font-medium">{currentStatus}</p>
    </div>
  );
};

export default LoadingScreen;
