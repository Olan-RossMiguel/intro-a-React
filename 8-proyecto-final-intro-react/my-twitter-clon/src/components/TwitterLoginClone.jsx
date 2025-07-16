"use client";

import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';

export default function TwitterLoginClone() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [contactType, setContactType] = useState("phone");
  const [formData, setFormData] = useState({
    name: "",
    contact: "",
    contactType: "phone",
    month: "",
    day: "",
    year: "",
  });
  const [loginInput, setLoginInput] = useState("");

  const navigate = useNavigate();

  // Check login status on component mount
  useEffect(() => {
    const loginStatus = localStorage.getItem("isLoggedIn");
    if (loginStatus === "true") {
      setIsLoggedIn(true);
    }
  }, []);

  const handleSocialLogin = (provider) => {
    localStorage.setItem("isLoggedIn", "true");
    localStorage.setItem("loginProvider", provider);
    setIsLoggedIn(true);
    setShowLoginModal(false);
    navigate("/home"); 
  };

  const handleCreateAccount = (e) => {
    e.preventDefault();

    // Store user data in localStorage
    const userData = { ...formData, contactType };
    localStorage.setItem("userData", JSON.stringify(userData));
    localStorage.setItem("isLoggedIn", "true");
    localStorage.setItem("loginProvider", "email");

    setShowCreateModal(false);
    setIsLoggedIn(true);

    setFormData({
      name: "",
      contact: "",
      contactType: "phone",
      month: "",
      day: "",
      year: "",
    });
    setContactType("phone");
    navigate("/home"); 
  };

  const handleLogin = (e) => {
    e.preventDefault();


    localStorage.setItem("isLoggedIn", "true");
    localStorage.setItem("loginProvider", "manual");
    localStorage.setItem("loginInput", loginInput);

    setIsLoggedIn(true);
    setShowLoginModal(false);
    setLoginInput("");
    navigate("/home"); 
  };

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("loginProvider");
    localStorage.removeItem("userData");
    localStorage.removeItem("loginInput");
    setIsLoggedIn(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const switchToLogin = () => {
    setShowCreateModal(false)
    setShowLoginModal(true)
  }

  const switchToCreate = () => {
    setShowLoginModal(false)
    setShowCreateModal(true)
  }

  const toggleContactType = () => {
    setContactType(contactType === "phone" ? "email" : "phone")
    setFormData((prev) => ({ ...prev, contact: "" }))
  }

  // Generate options for dropdowns
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ]
  const days = Array.from({ length: 31 }, (_, i) => i + 1)
  const years = Array.from({ length: 100 }, (_, i) => new Date().getFullYear() - i)

  if (isLoggedIn) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center p-4">
        <div className="text-center space-y-6">
          <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto">
            <span className="text-black text-2xl font-bold">Z</span>
          </div>
          <h1 className="text-3xl font-bold">¡Bienvenido!</h1>
          <p className="text-gray-400">Has iniciado sesión exitosamente</p>
          <button
            onClick={handleLogout}
            className="bg-red-600 hover:bg-red-700 text-white font-medium py-3 px-8 rounded-full transition-colors duration-200"
          >
            Cerrar sesión
          </button>
        </div>
      </div>
    )
  }

  return (
    <>
      <div className="min-h-screen bg-black text-white">
        <div className="flex flex-col lg:flex-row min-h-screen">
          {/* Left Side - Logo and Branding */}
          <div className="flex-1 flex items-center justify-center p-8 lg:p-16">
            <div className="w-full max-w-md lg:max-w-none">
              {/* Logo Placeholder */}
              <div className="mb-8 lg:mb-16">
                <div className="w-12 h-12 lg:w-16 lg:h-16 bg-white rounded-full flex items-center justify-center">
                  <span className="text-black text-2xl lg:text-3xl font-bold">Z</span>
                </div>
              </div>

              {/* Main Heading */}
              <div>
                <h1 className="text-4xl lg:text-6xl xl:text-7xl font-bold leading-tight mb-8 lg:mb-12">
                  Lo que está pasando ahora
                </h1>
              </div>
            </div>
          </div>

          {/* Right Side - Login Form */}
          <div className="flex-1 flex items-center justify-center p-8 lg:p-16">
            <div className="w-full max-w-sm">
              <div className="space-y-6">
                <div>
                  <h2 className="text-3xl lg:text-4xl font-bold mb-8">Únete hoy</h2>
                </div>

                <div className="space-y-4">
                  {/* Google Sign In Button */}
                  <button
                    onClick={() => handleSocialLogin("google")}
                    className="w-full h-12 bg-white text-black border border-gray-300 hover:bg-gray-100 font-medium rounded-full transition-colors duration-200 flex items-center justify-center"
                  >
                    <svg className="w-5 h-5 mr-3" viewBox="0 0 24 24">
                      <path
                        fill="currentColor"
                        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                      />
                      <path
                        fill="currentColor"
                        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                      />
                      <path
                        fill="currentColor"
                        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                      />
                      <path
                        fill="currentColor"
                        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                      />
                    </svg>
                    Inicia sesión con Google
                  </button>

                  
                  <button
                    onClick={() => handleSocialLogin("apple")}
                    className="w-full h-12 bg-white text-black border border-gray-300 hover:bg-gray-100 font-medium rounded-full transition-colors duration-200 flex items-center justify-center"
                  >
                    <svg className="w-5 h-5 mr-3" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
                    </svg>
                    Inicia sesión con Apple
                  </button>

                  
                  <div className="relative my-6">
                    <div className="absolute inset-0 flex items-center">
                      <div className="w-full border-t border-gray-700"></div>
                    </div>
                    <div className="relative flex justify-center text-sm">
                      <span className="px-2 bg-black text-gray-500">o</span>
                    </div>
                  </div>

                  
                  <button
                    onClick={() => setShowCreateModal(true)}
                    className="w-full h-12 bg-blue-500 hover:bg-blue-600 text-white font-medium rounded-full transition-colors duration-200"
                  >
                    Crear cuenta
                  </button>

                  
                  <p className="text-xs text-gray-500 leading-relaxed">
                    Al registrarte, aceptas los{" "}
                    <a href="#" className="text-blue-500 hover:underline">
                      Términos de servicio
                    </a>{" "}
                    y la{" "}
                    <a href="#" className="text-blue-500 hover:underline">
                      Política de privacidad
                    </a>
                    , incluida la política de{" "}
                    <a href="#" className="text-blue-500 hover:underline">
                      Uso de cookies
                    </a>
                    .
                  </p>
                </div>

                
                <div className="mt-12">
                  <p className="text-gray-300 font-medium mb-4">¿Ya tienes una cuenta?</p>
                  <button
                    onClick={() => setShowLoginModal(true)}
                    className="w-full h-12 bg-transparent text-blue-500 border border-gray-600 hover:bg-gray-900 font-medium rounded-full transition-colors duration-200"
                  >
                    Iniciar sesión
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      
      {showCreateModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50 animate-in fade-in duration-200">
          <div className="bg-black border border-gray-800 rounded-2xl w-full max-w-md mx-4 animate-in slide-in-from-bottom-4 duration-300">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-800">
              <h3 className="text-xl font-bold text-white">Crear tu cuenta</h3>
              <button
                onClick={() => setShowCreateModal(false)}
                className="text-gray-400 hover:text-white transition-colors"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            
            <form onSubmit={handleCreateAccount} className="p-6 space-y-4">
              {/* Name Input */}
              <div>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  className="w-full h-14 px-4 bg-transparent border border-gray-600 text-white placeholder-gray-500 rounded-md focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none"
                  placeholder="Nombre"
                />
              </div>

              
              <div>
                <input
                  type={contactType === "email" ? "email" : "tel"}
                  name="contact"
                  value={formData.contact}
                  onChange={handleInputChange}
                  required
                  className="w-full h-14 px-4 bg-transparent border border-gray-600 text-white placeholder-gray-500 rounded-md focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none"
                  placeholder={contactType === "phone" ? "Phone" : "Email"}
                />
                <button
                  type="button"
                  onClick={toggleContactType}
                  className="text-blue-500 hover:underline text-sm mt-2"
                >
                  {contactType === "phone" ? "Use email instead" : "Use phone instead"}
                </button>
              </div>

              {/* Date of Birth */}
              <div>
                <p className="text-gray-400 text-sm mb-2">Fecha de nacimiento</p>
                <div className="grid grid-cols-3 gap-3">
                  {/* Month Dropdown */}
                  <div className="relative">
                    <select
                      name="month"
                      value={formData.month}
                      onChange={handleInputChange}
                      required
                      className="w-full h-14 px-4 bg-transparent border border-gray-600 text-white rounded-md focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none appearance-none"
                    >
                      <option value="" className="bg-black">
                        Mes
                      </option>
                      {months.map((month, index) => (
                        <option key={month} value={index + 1} className="bg-black">
                          {month}
                        </option>
                      ))}
                    </select>
                    <svg
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>

                  
                  <div className="relative">
                    <select
                      name="day"
                      value={formData.day}
                      onChange={handleInputChange}
                      required
                      className="w-full h-14 px-4 bg-transparent border border-gray-600 text-white rounded-md focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none appearance-none"
                    >
                      <option value="" className="bg-black">
                        Día
                      </option>
                      {days.map((day) => (
                        <option key={day} value={day} className="bg-black">
                          {day}
                        </option>
                      ))}
                    </select>
                    <svg
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>

                  
                  <div className="relative">
                    <select
                      name="year"
                      value={formData.year}
                      onChange={handleInputChange}
                      required
                      className="w-full h-14 px-4 bg-transparent border border-gray-600 text-white rounded-md focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none appearance-none"
                    >
                      <option value="" className="bg-black">
                        Año
                      </option>
                      {years.map((year) => (
                        <option key={year} value={year} className="bg-black">
                          {year}
                        </option>
                      ))}
                    </select>
                    <svg
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full h-12 bg-blue-500 hover:bg-blue-600 text-white font-medium rounded-full transition-colors duration-200 mt-6"
              >
                Crear cuenta
              </button>

              {/* Already have account link */}
              <div className="text-center mt-4">
                <p className="text-gray-400">
                  ¿Ya tienes una cuenta?{" "}
                  <button type="button" onClick={switchToLogin} className="text-blue-500 hover:underline font-medium">
                    Iniciar sesión
                  </button>
                </p>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Login Modal */}
      {showLoginModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50 animate-in fade-in duration-200">
          <div className="bg-black border border-gray-800 rounded-2xl w-full max-w-md mx-4 animate-in slide-in-from-bottom-4 duration-300">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-800">
              <h3 className="text-xl font-bold text-white">Iniciar sesión</h3>
              <button
                onClick={() => setShowLoginModal(false)}
                className="text-gray-400 hover:text-white transition-colors"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 space-y-4">
              {/* Social Login Buttons */}
              <div className="space-y-3">
                <button
                  onClick={() => handleSocialLogin("google")}
                  className="w-full h-12 bg-white text-black border border-gray-300 hover:bg-gray-100 font-medium rounded-full transition-colors duration-200 flex items-center justify-center"
                >
                  <svg className="w-5 h-5 mr-3" viewBox="0 0 24 24">
                    <path
                      fill="currentColor"
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    />
                    <path
                      fill="currentColor"
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    />
                    <path
                      fill="currentColor"
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                    />
                    <path
                      fill="currentColor"
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    />
                  </svg>
                  Inicia sesión con Google
                </button>

                <button
                  onClick={() => handleSocialLogin("apple")}
                  className="w-full h-12 bg-white text-black border border-gray-300 hover:bg-gray-100 font-medium rounded-full transition-colors duration-200 flex items-center justify-center"
                >
                  <svg className="w-5 h-5 mr-3" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
                  </svg>
                  Inicia sesión con Apple
                </button>
              </div>

              {/* Divider */}
              <div className="relative my-6">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-700"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-black text-gray-500">o</span>
                </div>
              </div>

              {/* Login Form */}
              <form onSubmit={handleLogin} className="space-y-4">
                <input
                  type="text"
                  value={loginInput}
                  onChange={(e) => setLoginInput(e.target.value)}
                  required
                  className="w-full h-14 px-4 bg-transparent border border-gray-600 text-white placeholder-gray-500 rounded-md focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none"
                  placeholder="Phone, email, or username"
                />

                <button
                  type="submit"
                  className="w-full h-12 bg-white text-black hover:bg-gray-200 font-bold rounded-full transition-colors duration-200"
                >
                  Siguiente
                </button>

                <div className="text-center">
                  <a href="#" className="text-blue-500 hover:underline text-sm">
                    ¿Olvidaste tu contraseña?
                  </a>
                </div>
              </form>

              {/* Don't have account */}
              <div className="text-center mt-6 pt-6 border-t border-gray-800">
                <p className="text-gray-400">
                  ¿No tienes una cuenta?{" "}
                  <button onClick={switchToCreate} className="text-blue-500 hover:underline font-medium">
                    Regístrate
                  </button>
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
  
