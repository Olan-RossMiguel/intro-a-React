import { useState } from "react";

export const Contador = () => {
  const [contador, setContador] = useState(0);
  const decrement = () => {
    { if (contador > 0) setContador(contador - 1)}
  }
  const reset = () => {
    setContador(0)
  }

  return (
    <>
      <h1>{contador}</h1>
      <button onClick={() => setContador(contador + 1)}>Increment</button>
      <button onClick={ decrement }>Decrement</button>
      <button onClick={ reset }>Reset</button>
    </>
  );
};
