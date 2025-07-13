import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { 
  ArrowLeftIcon,
  CalendarIcon,
  ClockIcon,
  UserIcon,
  BriefcaseIcon,
  ClipboardListIcon,
  SaveIcon,
  TrashIcon
} from '@heroicons/react/outline';
import ConfirmModal from '../components/ConfirmModal';

function EditAppointment() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    paciente: '',
    email: '',
    telefono: '',
    fecha: '',
    hora: '09:00',
    motivo: '',
    doctor: 'Dra. García',
    notas: '',
    estado: 'pendiente'
  });
  const [loading, setLoading] = useState(true);
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  // Cargar datos de la cita
  useEffect(() => {
    const fetchAppointment = async () => {
      try {
        // Simulación de datos de API
        const data = {
          id,
          paciente: "Juan Pérez",
          email: "juan.perez@example.com",
          telefono: "+52 55 1234 5678",
          fecha: "2023-11-15",
          hora: "14:30",
          motivo: "Consulta general por dolor de cabeza persistente",
          doctor: "Dra. García",
          notas: "El paciente reporta alergia a la penicilina",
          estado: "pendiente"
        };
        
        setFormData(data);
      } catch (error) {
        console.error("Error al cargar cita:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAppointment();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Cita actualizada:', formData);
    // Aquí iría la lógica para actualizar en la API
    navigate(`/citas/${id}`);
  };

  const handleDelete = () => {
    console.log('Eliminar cita:', id);
    // Aquí iría la lógica para eliminar en la API
    navigate('/citas');
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-6">
      <div className="flex justify-between items-center mb-6">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center text-blue-600 hover:text-blue-800"
        >
          <ArrowLeftIcon className="h-5 w-5 mr-1" />
          Volver
        </button>
        <h1 className="text-2xl font-bold text-gray-800">Editar Cita #{id}</h1>
        <button
          onClick={() => setShowDeleteModal(true)}
          className="flex items-center px-3 py-1 bg-red-600 text-white hover:bg-red-700 rounded-md text-sm"
        >
          <TrashIcon className="h-4 w-4 mr-1" />
          Eliminar
        </button>
      </div>

      <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="px-6 py-4 bg-blue-100">
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-medium text-gray-800">Información de la Cita</h2>
            <select
              name="estado"
              value={formData.estado}
              onChange={handleChange}
              className="px-3 py-1 border border-gray-300 rounded-md shadow-sm text-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="pendiente">Pendiente</option>
              <option value="confirmada">Confirmada</option>
              <option value="completada">Completada</option>
              <option value="cancelada">Cancelada</option>
            </select>
          </div>
        </div>

        <div className="px-6 py-4 grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Campo Paciente */}
          <div className="col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              <UserIcon className="h-5 w-5 inline mr-1 text-gray-500" />
              Paciente *
            </label>
            <input
              type="text"
              name="paciente"
              value={formData.paciente}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          {/* Campos de contacto */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Teléfono
            </label>
            <input
              type="tel"
              name="telefono"
              value={formData.telefono}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          {/* Fecha y Hora */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              <CalendarIcon className="h-5 w-5 inline mr-1 text-gray-500" />
              Fecha *
            </label>
            <input
              type="date"
              name="fecha"
              value={formData.fecha}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              <ClockIcon className="h-5 w-5 inline mr-1 text-gray-500" />
              Hora *
            </label>
            <select
              name="hora"
              value={formData.hora}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            >
              {Array.from({ length: 10 }, (_, i) => {
                const hour = 9 + i;
                return [
                  `${hour}:00`,
                  `${hour}:30`
                ];
              }).flat().map(time => (
                <option key={time} value={time}>{time}</option>
              ))}
            </select>
          </div>

          {/* Doctor */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              <BriefcaseIcon className="h-5 w-5 inline mr-1 text-gray-500" />
              Doctor *
            </label>
            <select
              name="doctor"
              value={formData.doctor}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="Dra. García">Dra. García (Cardiología)</option>
              <option value="Dr. Martínez">Dr. Martínez (Pediatría)</option>
              <option value="Dra. López">Dra. López (Dermatología)</option>
            </select>
          </div>

          {/* Motivo */}
          <div className="col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              <ClipboardListIcon className="h-5 w-5 inline mr-1 text-gray-500" />
              Motivo de consulta *
            </label>
            <textarea
              name="motivo"
              value={formData.motivo}
              onChange={handleChange}
              required
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          {/* Notas */}
          <div className="col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Notas adicionales
            </label>
            <textarea
              name="notas"
              value={formData.notas}
              onChange={handleChange}
              rows={2}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </div>

        <div className="px-6 py-4 bg-gray-50 flex justify-end space-x-3">
          <button
            type="button"
            onClick={() => setShowCancelModal(true)}
            className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Cancelar
          </button>
          <button
            type="submit"
            className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 flex items-center"
          >
            <SaveIcon className="h-4 w-4 mr-2" />
            Guardar Cambios
          </button>
        </div>
      </form>

      <ConfirmModal
        isOpen={showCancelModal}
        onClose={() => setShowCancelModal(false)}
        onConfirm={() => navigate(`/citas/${id}`)}
        title="Descartar cambios"
        message="¿Estás seguro de que deseas cancelar? Se perderán todos los cambios no guardados."
        confirmText="Sí, descartar"
        cancelText="No, continuar"
        danger
      />

      <ConfirmModal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onConfirm={handleDelete}
        title="Eliminar cita"
        message="¿Estás seguro de que deseas eliminar esta cita permanentemente?"
        confirmText="Sí, eliminar"
        cancelText="No, conservar"
        danger
      />
    </div>
  );
}

export default EditAppointment;