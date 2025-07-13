import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { CalendarIcon, ClockIcon, UserIcon, SearchIcon } from '@heroicons/react/outline';

function Appointments() {
  const [citas, setCitas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('todas'); 


  useEffect(() => {
    const fetchCitas = async () => {
      try {
        const data = [
          {
            id: 1,
            paciente: "María González",
            fecha: "2023-11-15",
            hora: "09:00",
            motivo: "Consulta general",
            estado: "pendiente"
          },
          {
            id: 2,
            paciente: "Carlos Ruiz",
            fecha: "2023-11-15",
            hora: "10:30",
            motivo: "Control postoperatorio",
            estado: "confirmada"
          },
          {
            id: 3,
            paciente: "Ana Mendoza",
            fecha: "2023-11-16",
            hora: "11:00",
            motivo: "Examen de rutina",
            estado: "completada"
          }
        ];
        
        setCitas(data);
      } catch (error) {
        console.error("Error al cargar citas:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCitas();
  }, []);

  // Filtrar citas según búsqueda y filtro
  const filteredCitas = citas.filter(cita => {
    const matchesSearch = cita.paciente.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         cita.motivo.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesFilter = filter === 'todas' || 
                         (filter === 'pendientes' && cita.estado !== 'completada') || 
                         (filter === 'completadas' && cita.estado === 'completada');
    
    return matchesSearch && matchesFilter;
  });

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Gestión de Citas</h1>
        <Link
          to="/citas/nueva"
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center"
        >
          <CalendarIcon className="h-5 w-5 mr-2" />
          Nueva Cita
        </Link>
      </div>

      {/* Filtros y búsqueda */}
      <div className="bg-white p-4 rounded-lg shadow-md mb-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="relative flex-grow">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <SearchIcon className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Buscar por paciente o motivo..."
              className="pl-10 pr-4 py-2 border rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <div className="flex space-x-2">
            <button
              onClick={() => setFilter('todas')}
              className={`px-4 py-2 rounded-lg ${filter === 'todas' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'}`}
            >
              Todas
            </button>
            <button
              onClick={() => setFilter('pendientes')}
              className={`px-4 py-2 rounded-lg ${filter === 'pendientes' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'}`}
            >
              Pendientes
            </button>
            <button
              onClick={() => setFilter('completadas')}
              className={`px-4 py-2 rounded-lg ${filter === 'completadas' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'}`}
            >
              Completadas
            </button>
          </div>
        </div>
      </div>

      {/* Listado de citas */}
      {filteredCitas.length === 0 ? (
        <div className="bg-white p-8 rounded-lg shadow-md text-center">
          <p className="text-gray-600">No se encontraron citas</p>
          <Link
            to="/citas/nueva"
            className="mt-4 inline-block bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
          >
            Agendar Nueva Cita
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredCitas.map((cita) => (
            <div 
              key={cita.id} 
              className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow"
            >
              <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                <div className="mb-4 md:mb-0">
                  <div className="flex items-center">
                    <UserIcon className="h-5 w-5 text-gray-500 mr-2" />
                    <h3 className="text-lg font-semibold text-gray-800">{cita.paciente}</h3>
                  </div>
                  <p className="text-gray-600 ml-7">{cita.motivo}</p>
                </div>
                
                <div className="flex items-center space-x-4">
                  <div className="flex items-center">
                    <CalendarIcon className="h-5 w-5 text-gray-500 mr-2" />
                    <span>{cita.fecha}</span>
                  </div>
                  <div className="flex items-center">
                    <ClockIcon className="h-5 w-5 text-gray-500 mr-2" />
                    <span>{cita.hora}</span>
                  </div>
                  
                  <span className={`px-3 py-1 rounded-full text-sm ${
                    cita.estado === 'completada' 
                      ? 'bg-green-100 text-green-800' 
                      : cita.estado === 'confirmada' 
                        ? 'bg-blue-100 text-blue-800' 
                        : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {cita.estado}
                  </span>
                  
                  <Link
                    to={`/citas/${cita.id}`}
                    className="text-blue-600 hover:text-blue-800 font-medium"
                  >
                    Ver detalles →
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Appointments;