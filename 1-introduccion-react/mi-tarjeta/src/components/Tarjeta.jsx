import { FaGithub, FaLinkedin } from "react-icons/fa";

export function Tarjeta() {
  const nombre = "Miguel Olán";
  const profesion = "Desarrollador Web";
  const mensaje = "¡Bienvenido a mi tarjeta de presentación!";
  const repositorio = "https://github.com/Olan-RossMiguel";
  const linkedId = "https://www.linkedin.com/in/jesus-miguel-olan-84a195242/";

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="w-full max-w-xs rounded-xl shadow-lg p-6 bg-white text-center border border-gray-200">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">{nombre}</h2>
        <h4 className="text-gray-500 text-sm mb-4">{profesion}</h4>
        <p className="text-gray-700 mb-6">{mensaje}</p>
        
        <div className="flex justify-center gap-4">
          <a
            href={repositorio}
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-600 hover:text-black transition-colors duration-300"
          >
            <FaGithub size={24} />
          </a>
          <a
            href={linkedId}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:text-blue-800 transition-colors duration-300"
          >
            <FaLinkedin size={24} />
          </a>
        </div>
      </div>
    </div>
  );
}

