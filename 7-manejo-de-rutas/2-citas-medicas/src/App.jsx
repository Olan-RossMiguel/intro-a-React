import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Suspense } from 'react';
import Home from './pages/Home';
import Appointments from './pages/Appointments';
import AppointmentDetails from './pages/AppointmentDetails';
import NewAppointment from './pages/NewAppointment';
import EditAppointment from './pages/EditAppointment';
import NotFound from './pages/NotFound';
import Navbar from './components/Navbar';  

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow p-4 sm:p-6">
          <Suspense fallback={
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>
          }>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/citas" element={<Appointments />} />
              <Route path="/citas/nueva" element={<NewAppointment />} />
              <Route path="/citas/:id" element={<AppointmentDetails />} />
              <Route path="/citas/:id/editar" element={<EditAppointment />} />
              <Route path="/home" element={<Navigate to="/" replace />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </main>
        <footer className="bg-gray-800 text-white p-4 text-center">
          © {new Date().getFullYear()} Sistema de Gestión Médica
        </footer>
      </div>
    </BrowserRouter>
  );
}

export default App;