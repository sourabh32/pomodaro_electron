import React, { useState, useEffect } from 'react';
import ModeTable from './Mode';


import notification from "./assets/notification.mp3"

const modes = [
  {
    title: "Pomodoro",
    minutes: 30,
    background: 'bg-red-400'
  },
  {
    title: "Short Break",
    minutes: 5,
    background: 'bg-[#86A7FC]'
  },
  {
    title: "Long Break",
    minutes: 15,
    background: 'bg-green-400'
  }
];

const App = () => {
  const [completedModes, setCompletedModes] = useState(JSON.parse(localStorage.getItem('completedModes')) || {});
  const [mode, setMode] = useState(modes[0]); // Initialize mode with the first mode
  const [minutes, setMinutes] = useState(mode.minutes);
  const [seconds, setSeconds] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  console.log(completedModes)
  const handleMode = (mode) => {
    setIsRunning(false);
    setMode(mode);
    setMinutes(mode.minutes);
    setSeconds(0);

    // Update completed modes data
    
  };
  const audio = new Audio(notification);
  

  useEffect(() => {
    // Persist completed modes data to local storage
    localStorage.setItem('completedModes', JSON.stringify(completedModes));
  }, [completedModes]);

  useEffect(() => {
    let intervalId;

    if (isRunning) {
      intervalId = setInterval(() => {
        if (seconds === 0) {
          if (minutes === 0) {
            clearInterval(intervalId);
            setIsRunning(false);
            audio.play();
            setCompletedModes(prevModes => ({
              ...prevModes,
              [mode.title]: (prevModes[mode.title] || 0) + 1
            }));
          } else {
            setMinutes((prevMinutes) => prevMinutes - 1);
            setSeconds(59);
          }
        } else {
          setSeconds((prevSeconds) => prevSeconds - 1);
        }
      }, 1000);
    }

    return () => clearInterval(intervalId);
  }, [isRunning, minutes, seconds]);

  const startTimer = () => {
    setIsRunning(true);
  };

  const resetTimer = () => {
    setIsRunning(false);
    setMinutes(mode.minutes); // Reset minutes to the current mode's minutes
    setSeconds(0);
  };

  const formatTime = (time) => {
    return time < 10 ? `0${time}` : time;
  };

  return (
<div className={`w-full ${mode.background} min-h-screen flex items-center justify-center gap-5`}>
      <div className='shadow-sm text-white items-center flex flex-col gap-5 px-20 py-5 mt-20'>
        <div className='flex gap-5'>
          {modes.map((content) => (
            <span key={content.title} className={`px-2 py-1 rounded-md cursor-pointer ${mode.title === content.title && 'border '}`} onClick={() => handleMode(content)}>{content.title}</span>
          ))}
        </div>
        <div className='text-[80px] font-extrabold font-mono'>
          {formatTime(minutes)}:{formatTime(seconds)}
        </div>
        <div className='flex gap-2'>
          <button disabled={isRunning} className='text-bold button-30' onClick={startTimer}>
            Start
          </button>
          <button disabled={!isRunning} className='text-bold button-30' onClick={resetTimer}>Reset</button>
        </div>
        

      </div>
      <ModeTable completedModes={completedModes} />
    </div>

  );
};

export default App;



