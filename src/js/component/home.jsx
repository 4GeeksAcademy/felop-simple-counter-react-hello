import React, { useState, useEffect } from "react";

const Home = () => {
  const [countdown, setCountdown] = useState(0); 
  const [isPaused, setIsPaused] = useState(false);
  const [isCountdownMode, setIsCountdownMode] = useState(false); 
  const [showBoom, setShowBoom] = useState(false); 
  const [inputValue, setInputValue] = useState(""); 


  useEffect(() => {
    const interval = setInterval(() => {
      if (!isPaused) {
        setShowBoom(false); 

        setCountdown((prev) => {
          if (isCountdownMode) {
            if (prev > 0) {
              return prev - 1;
            } else {
              setShowBoom(true); 
              return 0;
            }
          } else {
            return prev + 1; 
          }
        });
      }
    }, 1000);

    return () => clearInterval(interval); 
  }, [isPaused, isCountdownMode]);

  
  const handlePause = () => {
    setIsPaused((prev) => !prev);
  };

  
  const handleReset = () => {
    setCountdown(0);
    setShowBoom(false); 
    setIsPaused(false);
  };

  
  const toggleMode = () => {
    setIsCountdownMode((prev) => !prev);
    if (!isCountdownMode) {
      setCountdown(0); 
    }
  };


  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  
  const handleSetCountdown = () => {
    const number = parseInt(inputValue, 10);
    if (!isNaN(number) && number >= 0) {
      setCountdown(number);
      setInputValue(""); 
    } else {
      alert("Pone algo principe");
    }
  };

  
  const formattedCountdown = countdown.toString().padStart(4, "0");

  return (
    <div className="text-center">
      <h1>Contador de Segundos</h1>

    
      <div style={{ display: "flex", justifyContent: "center", gap: "10px", fontSize: "3rem" }}>
        {formattedCountdown.split("").map((digit, index) => (
          <div
            key={index}
            style={{
              border: "1px solid black",
              borderRadius: "5px",
              padding: "10px",
              width: "40px",
              textAlign: "center",
              backgroundColor: "#f0f0f0",
            }}
          >
            {digit}
          </div>
        ))}
      </div>

     
      {showBoom && (
        <div style={{ color: "red", marginTop: "20px", fontSize: "5rem" }}>
          TE PETATEASTE MI COMPA
        </div>
      )}

      
      {isCountdownMode && (
        <div style={{ marginTop: "20px" }}>
          <input
            type="number"
            placeholder=""
            value={inputValue}
            onChange={handleInputChange}
            style={{ padding: "5px", marginRight: "10px" }}
          />
          <button type="button" class="btn btn-info" onClick={handleSetCountdown}>T-</button>
        </div>
      )}

    
      <div style={{ marginTop: "20px" }}>
        <button onClick={handlePause}type="button" class="btn btn-success">
          {isPaused ? "Reanudar" : "Pausar"}
        </button>
        <button onClick={handleReset}type="button" class="btn btn-warning" style={{ marginLeft: "10px" }}>
          Reiniciar
        </button>
        <button onClick={toggleMode}type="button" class="btn btn-danger" style={{ marginLeft: "10px" }}>
          {isCountdownMode ? "Cuenta Progresiva" : "Cuenta Regresiva"}
        </button>
      </div>
    </div>
  );
};

export default Home;
 