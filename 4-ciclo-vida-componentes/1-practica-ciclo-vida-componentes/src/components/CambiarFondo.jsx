import { useEffect, useState } from "react"
import { UserContext } from "../assets/context/UserContext";


export const CambiarFondo = () => {

    const [count, setCount] = useState(0);   
    // const [context, setContext] = useState(0);   

    

    useEffect(() => {
      document.body.style.background = "#232323"
      document.body.style.color = "white"
    
      return () => {
    document.body.style.background = "lightgray"
      document.body.style.color = "#232323"
      }
    }, [])

    useEffect(() => {

        console.log('El componente se ha renderizado');
    
      }, [count]);


    

  return (
    <div>
      Cambiar Fondo
      <div>

      <p>Contador del usuario: { count }</p>

      <button onClick={() => setCount(count + 1)}>Incrementar</button>

    </div>
    </div>
  )
}

