import { useState, useCallback } from 'react';



export function Padre() {

  const [count, setCount] = useState(0);

  const handleClick = useCallback(() => {

    console.log('Click en el botón');

  }, []);

  return (

    <div>

      <p>Contador: {count}</p>

      <button onClick={() => setCount(count + 1)}>Incrementar</button>

      <Hijo onClick={handleClick} />

    </div>

  );

}

function Hijo({ onClick }) {

  console.log('Hijo renderizado');

  return <button onClick={onClick}>Click</button>;

}