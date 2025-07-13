import { useEffect, useState } from "react"



export const Usuarios = () => {

const [usuarios, setUsuarios] = useState([])

useEffect(() => {
//   Llamamda a la API
fetch('https://jsonplaceholder.typicode.com/users')
      .then(response => response.json())
      .then(data => setUsuarios(data))
     

 
}, [])





  return (
    <div>
      <h2>Usuarios</h2>
      <ul>
        {
          usuarios.map ( (item, index) => {
            return (
            < li key={index}>{item.name}</li>
          )
          })
        }
      </ul>
    </div>
  )
}
