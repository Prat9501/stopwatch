import React, {useState, useRef} from 'react';
import './App.css';

function padTime(time) {
  return time.toString().padStart(2, '0');
}

export default function App() {
  const [title, setTitle] = useState("Let countdown begins!!!");
  const[timeLeft, setTimeLeft] = useState(20);
  const [isRunning, setIsRunning] = useState(false);
  const [isLimit, setIsLimit] = useState(false);
  const interval = useRef(null);

  function startTimer(){
    if (interval.current !== null) return;
    setTitle(`You're going Great!`);
    setIsRunning(true);
    interval.current = setInterval(() => {
      setTimeLeft(timeLeft => {
        if (timeLeft <= 15) {
          setIsLimit(true);
          setTitle(`Time is running out, Be Quick`);
        }
        if (timeLeft >= 1) return timeLeft - 1;
        // resetTimer();
        return 0;
    })}, 1000)
  }

  function stopTimer() {
    if (interval.current === null) return;
    setTitle('Keep it up');
    setIsRunning(false);
    clearInterval(interval.current);
    interval.current = null;
  }

  function resetTimer() {
    setTitle('Ready to go again!');
    clearInterval(interval.current);
    interval.current = null;
    setTimeLeft(25*60);
    setIsRunning(false);
  }

  const hours = padTime(Math.floor(timeLeft/(60*60)));
  const minutes = padTime(Math.floor(timeLeft/60) - (hours*60));
  const seconds = padTime(Math.floor((timeLeft - (hours*3600))-(minutes*60)));


  return (
    <div className="app">
      {isLimit && <img src={require('./images/clock.png')} width='50px'></img>}
      <h2>{title}</h2>

      <div className="timer">
        <span>{hours}</span>
        <span>:</span>
        <span>{minutes}</span>
        <span>:</span>
        <span>{seconds}</span>
      </div>

      <div className="buttons">
        {!isRunning && <button onClick={startTimer}>Start</button>}
        {isRunning && <button onClick={stopTimer}>Stop</button>}
        <button onClick={resetTimer}>Reset</button>
      </div>
    </div>
  );
}
