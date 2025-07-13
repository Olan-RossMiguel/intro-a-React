import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ArrowLeftIcon,
  CalendarIcon,
  ClockIcon,
  UserIcon,
  BriefcaseIcon,
  ClipboardListIcon
} from '@heroicons/react/outline';
import ConfirmModal from '../components/ConfirmModal';

function NewAppointment() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    paciente: '',
    email: '',
    telefono: '',
    fecha: '',
    hora: '09:00',
    motivo: '',
    doctor: 'Dra. García',
    notas: ''
  });
  const [showCancelModal, setShowCancelModal] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Nueva cita creada:', formData);
    navigate('/citas');
  };

  const handleCancel = () => {
    if (formData.paciente || formData.motivo) {
      setShowCancelModal(true);
    } else {
      navigate('/citas');
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-6">
      <div className="flex justify-between items-center mb-6">
        <button
          onClick={handleCancel}
          className="flex items-center text-blue-600 hover:text-blue-800"
        >
          <ArrowLeftIcon className="h-5 w-5 mr-1" />
          Volver
        </button>
        <h1 className="text-2xl font-bold text-gray-800">Nueva Cita</h1>
        <div className="w-24"></div> {/* Espacio para alinear */}
      </div>

      <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="px-6 py-4 bg-blue-100">
          <h2 className="text-lg font-medium text-gray-800">Información de la Cita</h2>
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
              min={new Date().toISOString().split('T')[0]}
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
            onClick={handleCancel}
            className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Cancelar
          </button>
          <button
            type="submit"
            className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Guardar Cita
          </button>
        </div>
      </form>

      <ConfirmModal
        isOpen={showCancelModal}
        onClose={() => setShowCancelModal(false)}
        onConfirm={() => navigate('/citas')}
        title="Descartar cambios"
        message="¿Estás seguro de que deseas cancelar? Se perderán todos los datos ingresados."
        confirmText="Sí, descartar"
        cancelText="No, continuar"
        danger
      />
    </div>
  );
}

export default NewAppointment;