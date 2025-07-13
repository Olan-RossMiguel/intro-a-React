import React, { useState, useEffect, useMemo } from "react";
import { FaPlus, FaTrash } from "react-icons/fa";
import TimePicker from "react-time-picker";
import "react-time-picker/dist/TimePicker.css";
import "react-clock/dist/Clock.css";

export function App() {
  const [tareas, setTareas] = useState([]);
  const [nuevaTarea, setNuevaTarea] = useState("");
  const [horaMinuto, setHoraMinuto] = useState("00:00");
  const [error, setError] = useState("");

  const calcularTiempoTotal = useMemo(() => {
    return tareas.reduce((total, tarea) => total + tarea.duracion, 0);
  }, [tareas]);

  function formatearTiempo(minutosTotales) {
    const horas = Math.floor(minutosTotales / 60);
    const minutos = minutosTotales % 60;
    if (horas > 0 && minutos > 0) return `${horas} h ${minutos} min`;
    if (horas > 0) return `${horas} h`;
    return `${minutos} min`;
  }

  useEffect(() => {
    const tareasGuardadas = localStorage.getItem("tareas");
    if (tareasGuardadas) {
      setTareas(JSON.parse(tareasGuardadas));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("tareas", JSON.stringify(tareas));
    document.title = `Total: ${formatearTiempo(calcularTiempoTotal)}`;
  }, [tareas, calcularTiempoTotal]);

  const agregarTarea = () => {
    if (nuevaTarea.trim() === "" || !horaMinuto) {
      setError("Completa todos los campos antes de agregar una tarea.");
      return;
    }

    // convertir HH:mm a minutos totales
    const [horas, minutos] = horaMinuto.split(":").map(Number);
    const duracionEnMinutos = horas * 60 + minutos;

    setTareas([...tareas, { nombre: nuevaTarea, duracion: duracionEnMinutos }]);

    setNuevaTarea("");
    setHoraMinuto("00:00");
    setError("");
  };

  const eliminarTarea = (index) => {
    const nuevasTareas = tareas.filter((_, i) => i !== index);
    setTareas(nuevasTareas);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white shadow-lg rounded-lg p-9">
        <h1 className="text-2xl font-bold text-center text-black-800 mb-6">
          Contador de Tareas
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-4">
          <input
            type="text"
            value={nuevaTarea}
            onChange={(e) => setNuevaTarea(e.target.value)}
            placeholder="Nombre de la tarea"
            className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-400"
          />

          <div className="w-full">
            <div className="w-full border border-gray-300 rounded focus-within:ring-2 focus-within:ring-green-400">
              <TimePicker
                onChange={setHoraMinuto}
                value={horaMinuto}
                format="HH:mm"
                disableClock
                clearIcon={null}
                className="w-full py-2 px-4 outline-none"
                clockIcon={null}
              />
            </div>
          </div>

          <button
            onClick={agregarTarea}
            className="w-full bg-green-800 hover:bg-green-700 text-white px-4 py-2 rounded flex items-center justify-center gap-1"
          >
            <FaPlus />
            Agregar
          </button>
        </div>

        {error && <div className="text-red-600 text-sm mb-4">{error}</div>}

        <h2 className="text-lg font-semibold mb-2 text-gray-700">Tareas:</h2>
        <ul className="space-y-2">
          {tareas.map((tarea, index) => (
            <li
              key={index}
              className="flex justify-between items-center px-4 py-2 bg-gray-50 border border-gray-200 rounded"
            >
              <span className="text-gray-800">
                {tarea.nombre}: {formatearTiempo(tarea.duracion)}
              </span>
              <button
                onClick={() => eliminarTarea(index)}
                className="text-red-500 hover:text-red-700"
              >
                <FaTrash />
              </button>
            </li>
          ))}
        </ul>

        <h3 className="mt-4 text-gray-800 font-bold">
          Total de tiempo: {formatearTiempo(calcularTiempoTotal)}
        </h3>
      </div>
    </div>
  );
}
