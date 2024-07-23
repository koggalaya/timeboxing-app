import React, { useState, useEffect, useRef } from 'react';

const Timebox = ({ title, duration }) => {
  const [remainingTime, setRemainingTime] = useState(duration);
  const [isRunning, setIsRunning] = useState(false);
  const intervalRef = useRef(null);
  const audioRef = useRef(null);


  useEffect(() => {
    // Initialize the audio element once
    audioRef.current = new Audio('/src/assets/alarm.mp3');

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  useEffect(() => {
    if (isRunning) {
      intervalRef.current = setInterval(() => {
        setRemainingTime(prev => {
          if (prev > 0) {
            return prev - 1;
          } else {
            clearInterval(intervalRef.current);
            playAlarm();
            return 0;
          }
        });
      }, 60000); // 1 minute intervals
    } else {
      clearInterval(intervalRef.current);
    }
    return () => clearInterval(intervalRef.current);
  }, [isRunning]);

  const playAlarm = () => {
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
      audioRef.current.play().catch(error => {
        console.error('Failed to play alarm sound:', error);
      });
    }
  };

  const start = () => setIsRunning(true);
  const pause = () => setIsRunning(false);
  const reset = () => {
    setIsRunning(false);
   
    setRemainingTime(duration);
    audioRef.current.pause();
    audioRef.current.currentTime = 0;
  };

  return (
    <div className="bg-gray-800 p-4 rounded-lg shadow-lg bg-opacity-40">
      <h2 className="text-lg font-semibold">{title}</h2>
      <p className="text-4xl">{remainingTime} mins</p>
      <div className="mt-4 flex space-x-2">
        <button onClick={start} className="bg-transparent hover:bg-green-500 text-green-400 font-semibold hover:text-white py-2 px-4 border border-blue-400 hover:border-transparent rounded">Start</button>
        <button onClick={pause} className="bg-transparent hover:bg-yellow-500 text-yellow-400 font-semibold hover:text-white py-2 px-4 border border-blue-400 hover:border-transparent rounded">Pause</button>
        <button onClick={reset} className="bg-transparent hover:bg-red-500 text-red-400 font-semibold hover:text-white py-2 px-4 border border-blue-400 hover:border-transparent rounded">Reset</button>
      </div>
      <div className="mt-2">
        {isRunning ? <span className="text-green-400">Timer is running...</span> : <span className="text-yellow-400">Timer is paused</span>}
      </div>
    
    </div>
  );
};

export default Timebox;