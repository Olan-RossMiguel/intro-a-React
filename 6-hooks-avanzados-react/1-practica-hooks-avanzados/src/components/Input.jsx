import { useRef, useEffect } from 'react';

export function InputFocus() {

  const inputRef = useRef(null);

  useEffect(() => {

    inputRef.current.focus(); // Enfoca el input al montar el componente

  }, []);

  return <input ref={inputRef} placeholder="Escribe aquí..." />;

}