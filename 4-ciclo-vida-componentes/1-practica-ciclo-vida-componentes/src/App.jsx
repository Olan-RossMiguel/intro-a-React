import React, { useContext } from 'react'
import { UserContext } from './assets/context/UserContext'
import { CambiarFondo } from './components/CambiarFondo'


const App = () => {

  const { user } = useContext(UserContext)

  return (
    <div>
      <h1>Informacion del usuario</h1>
      <ul>
        <li>Nombre: {user.nombre}</li>
        <li>Tema: {user.tema}</li>
        <li>Correo: {user.correo}</li>
      </ul>
      <CambiarFondo/>
    </div>
  )
}

export default App



// import React from 'react'
// import { useState } from 'react'
// import { CambiarFondo } from './components/CambiarFondo'


// const App = () => {



// const [mostrar, setMostrar] = useState(false)


//   return (
//     <div>
//       <button 
//       onClick={() => setMostrar(prev => !prev)}
//       >
//         {mostrar ? "Cambiar fondo" : "Ocultar fondo"}
//         </button>
//       { mostrar && <CambiarFondo /> }
//     </div>
//   )
// }


// export default App


