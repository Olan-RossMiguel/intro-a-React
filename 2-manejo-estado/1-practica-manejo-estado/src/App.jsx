import { useState } from "react";



function App() {

  const [usuario, setUsuario] = useState("")
  const [usuarios, setUsuarios] = useState([])

  const agregarUser = (e) => {
    e.preventDeafult()
    setUsuarios( [...usuarios, usuario] )
    console.log("Agregando....")
  }

  return (
    <>
     <form>
      <input 
      type="text"
      value={usuario}
      onChange={ (e) => setUsuario(e.target.value) }
      />
      <button 
      type="submit"
      onClick={agregarUser}
      >Registrar</button>
     </form>
     <ul>
      <li>User 1</li>
      <li>User 2</li>
      <li>User 3</li>
     </ul>

      
    </>
  );
}

export default App;
