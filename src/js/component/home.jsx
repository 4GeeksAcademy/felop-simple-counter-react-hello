

//include images into your bundle
import React, { useState, useEffect } from "react";

//create your first component
const Home = () => {
	const [time, setTime] = useState(0); // Almacena el tiempo inicial
  const [inputTime, setInputTime] = useState(""); // Almacena lo ingresado por el usuario
  const [isRunning, setIsRunning] = useState(false); // Controla el inicio/pausa del contador

  // Efecto para manejar el contador regresivo
  useEffect(() => {
    let timer = null;
    if (isRunning && time > 0) {
      timer = setInterval(() => {
        setTime((prevTime) => prevTime - 1);
      }, 1000);
    } else if (time === 0 && isRunning) {
      setIsRunning(false); // Detener el contador al llegar a 0
    }

    return () => clearInterval(timer); // Limpiar el intervalo
  }, [isRunning, time]);

  // Función para iniciar el contador
  const startCounter = () => {
    if (inputTime && !isNaN(inputTime) && parseInt(inputTime) > 0) {
      setTime(parseInt(inputTime));
      setIsRunning(true);
    }
  };

  // Función para pausar/reanudar
  const togglePause = () => {
    setIsRunning(!isRunning);
  };

  // Función para reiniciar
  const resetCounter = () => {
    setIsRunning(false);
    setTime(0);
    setInputTime("");
  };

  return (
    <div className="text-center mt-5">
      <h1>Contador Regresivo</h1>

      {/* Input para establecer los segundos */}
      <div>
        <input
          type="number"
          placeholder="Segundos"
          value={inputTime}
          onChange={(e) => setInputTime(e.target.value)}
          disabled={isRunning}
        />
        <button onClick={startCounter} disabled={isRunning || inputTime === ""}>
          Iniciar
        </button>
      </div>

      {/* Mostrar el contador */}
      <div className="counter mt-3">
        {time > 0 ? (
          <h2>{time.toString().padStart(4, "0")}</h2>
        ) : (
          <h2 style={{ color: "red" }}>TE PETATEASTE MI COMPA</h2>
        )}
      </div>

      {/* Botones de control */}
      <div className="controls mt-3">
        <button onClick={togglePause} disabled={time === 0}>
          {isRunning ? "Pausar" : "Reanudar"}
        </button>
        <button onClick={resetCounter}>Reiniciar</button>
      </div>
    </div>
  );
};



export default Home;
