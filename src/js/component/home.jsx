import React, { useState, useEffect } from "react";

const Home = () => {
  const [seconds, setSeconds] = useState(0); 
  const [countdown, setCountdown] = useState(0); 
  const [isRunning, setIsRunning] = useState(false); 
  const [isPaused, setIsPaused] = useState(false); 

  const [hasCountdownEnded, setHasCountdownEnded] = useState(false);

  
  const handleStart = () => {
    setCountdown(seconds);
    setIsRunning(true);
    setHasCountdownEnded(false);
  };

 
  const handlePause = () => {
    setIsPaused((prev) => !prev); 
  };

  
  const handleReset = () => {
    setCountdown(0);
    setSeconds(0);
    setIsRunning(false);
    setIsPaused(false);
    setHasCountdownEnded(false);
  };

 
  useEffect(() => {
    let interval = null;

    if (isRunning && !isPaused) {
      interval = setInterval(() => {
        setCountdown((prevCountdown) => {
          if (prevCountdown > 0) {
            return prevCountdown - 1;
          } else {
            clearInterval(interval);
            setIsRunning(false);
            setHasCountdownEnded(true);
            return 0;
          }
        });
      }, 1000);
    } else {
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [isRunning, isPaused]);

  return (
    <div className="text-center">
      <h1>Contador de Segundos</h1>

   
      <input
        type="number"
        placeholder="Ingresa segundos"
        value={seconds}
        onChange={(e) => setSeconds(parseInt(e.target.value) || 0)}
        disabled={isRunning}
      />

      <div style={{ fontSize: "3rem", margin: "20px" }}>
        {hasCountdownEnded ? (
          <span style={{ color: "red", fontWeight: "bold" }}>TE PETATEASTE MI COMPA</span>
        ) : (
          countdown.toString().padStart(4, "0")
        )}
      </div>

      
      <button type="button" class="btn btn-success" onClick={handleStart} disabled={isRunning}>
        Iniciar
      </button>
      <button type="button" class="btn btn-warning" onClick={handlePause} disabled={!isRunning}>
        {isPaused ? "Reanudar" : "Parar"}
      </button>
      <button type="button" class="btn btn-danger" onClick={handleReset}>Reiniciar</button>
    </div>
  );
};

export default Home;
