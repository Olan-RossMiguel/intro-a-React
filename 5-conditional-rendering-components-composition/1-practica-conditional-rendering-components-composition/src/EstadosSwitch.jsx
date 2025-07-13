
import React from 'react'
import { WelcomeMessage } from './components/WelcomeMessage'
import { StatusMessage } from './components/StatusMessage'
import { useState } from 'react'

const App = () => {
  const [status, setStatus] = useState()
  return (
    <>
      {/* <WelcomeMessage isLoggedIn={true}/> */}
      <button onClick={ ()=> setStatus("loading")}>Iniciar Carga</button> 
      <button onClick={ ()=> setStatus("success")}>Forzar Éxito</button> 
      <button onClick={ ()=> setStatus("error")}>Forzar Error</button>
      <StatusMessage status={status}/>

      </>
   
  )
}

export default App
