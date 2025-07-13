import { Link } from 'react-router-dom';
import { 
  CalendarIcon, 
  UserGroupIcon, 
  ClockIcon, 
  DocumentTextIcon 
} from '@heroicons/react/outline';

function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white">
        <div className="max-w-7xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl lg:text-6xl">
            Gestión Inteligente de Citas Médicas
          </h1>
          <p className="mt-6 max-w-3xl mx-auto text-xl text-gray-600">
            Optimiza la administración de tu consultorio con nuestro sistema automatizado que reduce errores y mejora la experiencia de pacientes y doctores.
          </p>
          <div className="mt-10 flex justify-center gap-4">
            <Link
              to="/citas"
              className="px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 md:py-4 md:text-lg md:px-10"
            >
              Ver Citas
            </Link>
            <Link
              to="/citas/nueva"
              className="px-8 py-3 border border-transparent text-base font-medium rounded-md text-blue-700 bg-blue-100 hover:bg-blue-200 md:py-4 md:text-lg md:px-10"
            >
              Agendar Nueva
            </Link>
          </div>
        </div>
      </div>
      <div className="py-16 bg-gray-50 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:text-center">
            <h2 className="text-base text-blue-600 font-semibold tracking-wide uppercase">Características</h2>
            <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
              Una mejor manera de gestionar citas
            </p>
            <p className="mt-4 max-w-2xl text-xl text-gray-600 lg:mx-auto">
              Solucionamos los problemas comunes de los sistemas tradicionales
            </p>
          </div>

          <div className="mt-20">
            <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-4">
              {features.map((feature) => (
                <div key={feature.name} className="pt-6">
                  <div className="flow-root bg-white rounded-lg px-6 pb-8 h-full shadow">
                    <div className="-mt-6">
                      <div className="flex items-center justify-center h-12 w-12 rounded-md bg-blue-500 text-white mx-auto">
                        <feature.icon className="h-6 w-6" aria-hidden="true" />
                      </div>
                      <h3 className="mt-8 text-lg font-medium text-gray-900 text-center">{feature.name}</h3>
                      <p className="mt-5 text-base text-gray-500">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="bg-blue-600">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:py-16 sm:px-6 lg:px-8 lg:py-20">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
              Confiado por profesionales de la salud
            </h2>
            <p className="mt-3 text-xl text-blue-100">
              Nuestro sistema está transformando la manera en que las clínicas gestionan sus citas
            </p>
          </div>
          <div className="mt-10 grid grid-cols-2 gap-8 sm:grid-cols-3">
            {stats.map((stat) => (
              <div key={stat.id} className="pt-6">
                <div className="flow-root bg-blue-700 rounded-lg px-6 pb-8 h-full">
                  <div className="-mt-6">
                    <div className="flex items-center justify-center h-12 w-12 rounded-md bg-white text-blue-600 mx-auto">
                      <stat.icon className="h-6 w-6" aria-hidden="true" />
                    </div>
                    <h3 className="mt-8 text-lg font-medium text-white text-center">
                      <span className="text-3xl font-bold">{stat.value}</span>
                      <span className="block text-blue-200">{stat.label}</span>
                    </h3>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="bg-white">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8 lg:flex lg:items-center lg:justify-between">
          <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
            <span className="block">¿Listo para optimizar tu consultorio?</span>
            <span className="block text-blue-600">Empieza hoy mismo.</span>
          </h2>
          <div className="mt-8 flex lg:mt-0 lg:flex-shrink-0">
            <div className="inline-flex rounded-md shadow">
              <Link
                to="/citas/nueva"
                className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
              >
                Agendar primera cita
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
const features = [
  {
    name: 'Agendamiento Automático',
    description: 'Reduce errores humanos con nuestro sistema de reservas automatizado.',
    icon: CalendarIcon,
  },
  {
    name: 'Gestión de Pacientes',
    description: 'Acceso rápido a historiales médicos y información de contacto.',
    icon: UserGroupIcon,
  },
  {
    name: 'Optimización de Horarios',
    description: 'Maximiza la utilización de tus recursos y reduce tiempos muertos.',
    icon: ClockIcon,
  },
  {
    name: 'Registros Digitales',
    description: 'Olvídate del papel y lleva todo el control de manera digital.',
    icon: DocumentTextIcon,
  },
];

const stats = [
  { id: 1, value: '95%', label: 'Reducción de errores', icon: ClockIcon },
  { id: 2, value: '40%', label: 'Más eficiencia', icon: UserGroupIcon },
  { id: 3, value: '24/7', label: 'Disponibilidad', icon: CalendarIcon },
];

export default Home;