import { useState } from "react"
import { FaPlus, FaTrash } from "react-icons/fa"

export function ListaCompras() {
  const [productos, setProductos] = useState([])
  const [nuevoProducto, setNuevoProducto] = useState("")

  const agregarProducto = () => {
    if (nuevoProducto.trim() !== "") {
      setProductos([...productos, nuevoProducto])
      setNuevoProducto("")
    }
  }

  const eliminarProducto = (index) => {
    const nuevaLista = productos.filter((_, i) => i !== index)
    setProductos(nuevaLista)
  }

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white shadow-md rounded-lg p-6">
        <h2 className="text-2xl font-bold mb-4 text-center text-gray-800">
          🛒 Lista de Compras
        </h2>

        <div className="flex mb-4 gap-2">
          <input
            type="text"
            placeholder="Añadir producto"
            value={nuevoProducto}
            onChange={(e) => setNuevoProducto(e.target.value)}
            className="flex-grow px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-400 outline-none"
          />
          <button
            onClick={agregarProducto}
            className="bg-green-900 hover:bg-green-800 text-white px-4 py-2 rounded-lg flex items-center gap-1"

          >
            <FaPlus />
            Agregar
          </button>
        </div>

        <ul className="space-y-2">
          {productos.map((producto, index) => (
            <li
              key={index}
              className="flex justify-between items-center bg-gray-50 px-4 py-2 rounded-lg border border-gray-200"
            >
              <span className="text-gray-800">{producto}</span>
              <button
                onClick={() => eliminarProducto(index)}
                className="text-red-500 hover:text-red-700 transition"
                title="Eliminar"
              >
                <FaTrash />
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}


