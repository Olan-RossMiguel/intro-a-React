import React, {
  useReducer,
  useRef,
  useCallback,
  useEffect,
  useState,
} from "react";

import {
  ArrowPathIcon,
  ArrowUturnLeftIcon,
  ArrowUturnRightIcon,
  PlusIcon,
  MinusIcon,
} from "@heroicons/react/24/outline";

const MAX_HISTORY_LENGTH = 50;

const initialState = {
  current: { count: 0 },
  past: [],
  future: [],
  history: [],
};

function reducer(state, action) {
  switch (action.type) {
    case "increment": {
      const value = action.payload;
      const newCount = state.current.count + value;
      const newEntry = `+${value} (Nuevo valor: ${newCount})`;

      const newPast = [...state.past, state.current].slice(-MAX_HISTORY_LENGTH);
      const newHistory = [...state.history, newEntry].slice(
        -MAX_HISTORY_LENGTH
      );

      return {
        past: newPast,
        current: { count: newCount },
        future: [],
        history: newHistory,
      };
    }
    case "decrement": {
      if (state.current.count <= 0) {
        return state;
      }

      const newCount = state.current.count - 1;
      const newEntry = `-1 (Nuevo valor: ${newCount})`;

      const newPast = [...state.past, state.current].slice(-MAX_HISTORY_LENGTH);
      const newHistory = [...state.history, newEntry].slice(
        -MAX_HISTORY_LENGTH
      );

      return {
        past: newPast,
        current: { count: newCount },
        future: [],
        history: newHistory,
      };
    }
    case "reset": {
      return initialState;
    }
    case "undo": {
      if (state.past.length === 0) return state;

      const previous = state.past[state.past.length - 1];
      const newHistory = [...state.history];
      newHistory.pop();

      return {
        past: state.past.slice(0, -1),
        current: previous,
        future: [state.current, ...state.future],
        history: newHistory,
      };
    }
    case "redo": {
      if (state.future.length === 0) return state;

      const next = state.future[0];
      const redoEntry =
        state.history[state.history.length - state.future.length];

      return {
        past: [...state.past, state.current],
        current: next,
        future: state.future.slice(1),
        history: [...state.history, redoEntry],
      };
    }
    case "load": {
      return {
        ...initialState,
        ...action.payload,
        past: action.payload.past || [],
        future: action.payload.future || [],
        history: action.payload.history || [],
      };
    }
    default: {
      return state;
    }
  }
}

function CounterGame() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [showResetConfirm, setShowResetConfirm] = useState(false);
  const incrementBtnRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    try {
      const savedState = localStorage.getItem("counterGameState");
      if (savedState) {
        const parsedState = JSON.parse(savedState);
        // Validación básica del estado cargado
        if (parsedState && typeof parsedState.current?.count === "number") {
          dispatch({ type: "load", payload: parsedState });
        }
      }
    } catch (error) {
      console.error("Error al cargar el estado:", error);
      localStorage.removeItem("counterGameState");
    }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem("counterGameState", JSON.stringify(state));
    } catch (error) {
      console.error("Error al guardar el estado:", error);
    }
  }, [state]);

  useEffect(() => {
    incrementBtnRef.current?.focus();
  }, []);

  const handleIncrement = useCallback(() => {
    const value = parseInt(inputRef.current.value, 10) || 1;
    if (value < 0) {
      alert("Por favor ingrese un valor positivo");
      return;
    }
    dispatch({ type: "increment", payload: value });
    inputRef.current.value = ""; // Limpiar el input después de incrementar
  }, []);

  const handleDecrement = useCallback(() => {
    dispatch({ type: "decrement" });
  }, []);

  const handleReset = useCallback(() => {
    if (!showResetConfirm) {
      setShowResetConfirm(true);
      return;
    }
    dispatch({ type: "reset" });
    setShowResetConfirm(false);
  }, [showResetConfirm]);

  const handleUndo = useCallback(() => {
    dispatch({ type: "undo" });
  }, []);

  const handleRedo = useCallback(() => {
    dispatch({ type: "redo" });
  }, []);

  const cancelReset = useCallback(() => {
    setShowResetConfirm(false);
  }, []);

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded shadow-lg">
      <h2 className="text-2xl font-bold mb-4 text-center">
        Contador: <span className="text-blue-600">{state.current.count}</span>
      </h2>

      <div className="flex flex-col space-y-4">
        <div className="flex items-center">
          <input
            ref={inputRef}
            type="number"
            placeholder="Valor a sumar (default: 1)"
            min="1"
            className="border border-gray-300 rounded-l px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            onKeyDown={(e) => e.key === "Enter" && handleIncrement()}
          />
          <button
            ref={incrementBtnRef}
            onClick={handleIncrement}
            className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-4 py-2 rounded-r flex items-center"
            aria-label="Incrementar"
          >
            <PlusIcon className="h-5 w-5" />
          </button>
        </div>

        <div className="grid grid-cols-4 gap-2">
          <button
            onClick={handleDecrement}
            className="bg-red-500 hover:bg-red-600 text-white font-semibold px-4 py-2 rounded flex items-center justify-center"
            aria-label="Decrementar"
          >
            <MinusIcon className="h-5 w-5" />
          </button>

          <button
            onClick={handleUndo}
            disabled={state.past.length === 0}
            className={`${
              state.past.length === 0
                ? "bg-gray-300 cursor-not-allowed"
                : "bg-yellow-500 hover:bg-yellow-600"
            } text-white font-semibold px-4 py-2 rounded flex items-center justify-center`}
            aria-label="Deshacer"
          >
            <ArrowUturnLeftIcon className="h-5 w-5" />
          </button>

          <button
            onClick={handleRedo}
            disabled={state.future.length === 0}
            className={`${
              state.future.length === 0
                ? "bg-gray-300 cursor-not-allowed"
                : "bg-green-500 hover:bg-green-600"
            } text-white font-semibold px-4 py-2 rounded flex items-center justify-center`}
            aria-label="Rehacer"
          >
            <ArrowUturnRightIcon className="h-5 w-5" />
          </button>

          <button
            onClick={handleReset}
            className="bg-gray-500 hover:bg-gray-600 text-white font-semibold px-4 py-2 rounded flex items-center justify-center"
            aria-label="Reiniciar"
          >
            <ArrowPathIcon className="h-5 w-5" />
          </button>
        </div>
      </div>

      {showResetConfirm && (
        <div className="mt-4 p-3 bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 rounded">
          <p>¿Estás seguro de querer reiniciar el contador?</p>
          <div className="flex justify-end space-x-2 mt-2">
            <button
              onClick={cancelReset}
              className="px-3 py-1 bg-gray-300 hover:bg-gray-400 rounded"
            >
              Cancelar
            </button>
            <button
              onClick={handleReset}
              className="px-3 py-1 bg-red-500 hover:bg-red-600 text-white rounded"
            >
              Confirmar
            </button>
          </div>
        </div>
      )}

      <div className="mt-6">
        <h3 className="text-lg font-semibold mb-2 flex items-center">
          <span className="bg-blue-100 text-blue-800 p-1 rounded mr-2">
            {state.history.length}
          </span>
          Historial de cambios:
        </h3>
        {state.history.length === 0 ? (
          <p className="text-gray-500 italic">
            No hay historial de cambios aún.
          </p>
        ) : (
          <ul className="border rounded divide-y max-h-60 overflow-y-auto">
            {state.history.map((entry, index) => (
              <li key={index} className="p-2 hover:bg-gray-50">
                {entry.startsWith("+") ? (
                  <span className="text-green-600">{entry}</span>
                ) : (
                  <span className="text-red-600">{entry}</span>
                )}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default CounterGame;
