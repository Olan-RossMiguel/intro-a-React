import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { 
  ArrowLeftIcon,
  PencilIcon,
  TrashIcon,
  CalendarIcon,
  ClockIcon,
  UserIcon,
  BriefcaseIcon,
  ClipboardListIcon
} from '@heroicons/react/outline';
import Loader from '../components/Loader';
import ErrorMessage from '../components/ErrorMessage';
import ConfirmModal from '../components/ConfirmModal'; 

function AppointmentDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [cita, setCita] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showCancelModal, setShowCancelModal] = useState(false);

  useEffect(() => {
    const fetchCita = async () => {
      try {
        // Simulación de datos más completos
        const data = {
          id,
          paciente: "Juan Pérez",
          email: "juan.perez@example.com",
          telefono: "+52 55 1234 5678",
          fecha: "2023-11-15",
          hora: "14:30",
          duracion: "30 minutos",
          motivo: "Consulta general por dolor de cabeza persistente durante la última semana.",
          doctor: "Dra. García",
          especialidad: "Neurología",
          consultorio: "Consultorio 304",
          estado: "confirmada",
          notas: "El paciente reporta alergia a la penicilina"
        };
        
        setCita(data);
      } catch (err) {
        setError("No se pudo cargar los detalles de la cita");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchCita();
  }, [id]);

  const handleCancelAppointment = () => {
    console.log('Cancelando cita', id);
    // Aquí iría la lógica para cancelar la cita
    setShowCancelModal(false);
    navigate('/citas'); // Redirigir al listado después de cancelar
  };

  if (loading) return <Loader />;
  if (error) return <ErrorMessage message={error} />;
  if (!cita) return <div className="text-center py-10">No se encontró la cita solicitada</div>;

  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-6">
      <div className="flex justify-between items-center mb-6">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center text-blue-600 hover:text-blue-800"
        >
          <ArrowLeftIcon className="h-5 w-5 mr-1" />
          Volver al listado
        </button>
        
        <div className="flex space-x-3">
          <button
            onClick={() => navigate(`/citas/${id}/editar`)}
            className="flex items-center px-4 py-2 bg-blue-600 text-white hover:bg-blue-700 rounded-md"
          >
            <PencilIcon className="h-5 w-5 mr-2" />
            Editar
          </button>
          <button
            onClick={() => setShowCancelModal(true)}
            className="flex items-center px-4 py-2 bg-red-600 text-white hover:bg-red-700 rounded-md"
          >
            <TrashIcon className="h-5 w-5 mr-2" />
            Cancelar
          </button>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        {/* Header con estado */}
        <div className={`px-6 py-4 ${
          cita.estado === 'cancelada' ? 'bg-red-100' :
          cita.estado === 'completada' ? 'bg-green-100' :
          'bg-blue-100'
        }`}>
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold text-gray-800">Cita #{cita.id}</h1>
            <span className={`px-3 py-1 rounded-full text-sm font-medium ${
              cita.estado === 'cancelada' ? 'bg-red-200 text-red-800' :
              cita.estado === 'completada' ? 'bg-green-200 text-green-800' :
              'bg-blue-200 text-blue-800'
            }`}>
              {cita.estado.charAt(0).toUpperCase() + cita.estado.slice(1)}
            </span>
          </div>
        </div>

        {/* Detalles principales */}
        <div className="px-6 py-4 grid grid-cols-1 md:grid-cols-2 gap-6">
          <DetailItem 
            icon={<UserIcon className="h-5 w-5 text-gray-500" />}
            label="Paciente" 
            value={cita.paciente} 
            subvalue={`${cita.email} • ${cita.telefono}`}
          />
          
          <DetailItem 
            icon={<BriefcaseIcon className="h-5 w-5 text-gray-500" />}
            label="Doctor" 
            value={cita.doctor} 
            subvalue={`${cita.especialidad} • ${cita.consultorio}`}
          />
          
          <DetailItem 
            icon={<CalendarIcon className="h-5 w-5 text-gray-500" />}
            label="Fecha y Hora" 
            value={`${cita.fecha} a las ${cita.hora}`} 
            subvalue={`Duración: ${cita.duracion}`}
          />
        </div>

        {/* Motivo y notas */}
        <div className="px-6 py-4 border-t border-gray-200">
          <DetailItem 
            icon={<ClipboardListIcon className="h-5 w-5 text-gray-500" />}
            label="Motivo de la consulta" 
            value={cita.motivo} 
            isFullWidth
          />
          
          {cita.notas && (
            <DetailItem 
              label="Notas adicionales" 
              value={cita.notas} 
              isFullWidth
              className="mt-4"
            />
          )}
        </div>
      </div>

      {/* Modal de confirmación para cancelar */}
      <ConfirmModal
        isOpen={showCancelModal}
        onClose={() => setShowCancelModal(false)}
        onConfirm={handleCancelAppointment}
        title="Cancelar Cita"
        message="¿Estás seguro de que deseas cancelar esta cita?"
        confirmText="Sí, cancelar"
        cancelText="No, volver"
        danger
      />
    </div>
  );
}

// Componente auxiliar mejorado
function DetailItem({ icon, label, value, subvalue, isFullWidth, className = '' }) {
  return (
    <div className={`${isFullWidth ? 'col-span-2' : ''} ${className}`}>
      <div className="flex items-start">
        {icon && <div className="mr-3 mt-1">{icon}</div>}
        <div>
          <span className="text-sm font-medium text-gray-500">{label}</span>
          <p className="mt-1 text-gray-800">{value}</p>
          {subvalue && <p className="mt-1 text-sm text-gray-500">{subvalue}</p>}
        </div>
      </div>
    </div>
  );
}

export default AppointmentDetails;