"use client"

import { useState, useEffect, useRef, useMemo } from "react"
import { Rocket, Fuel, Globe, MapPin, Zap } from "lucide-react"
import Planetas from "./components/Planetas"



export default function PanelDeControl() {
  const [distancia, setDistancia] = useState(0)
  const [combustible, setCombustible] = useState(100)
  const [estadoNave, setEstadoNave] = useState("En órbita")
  const [planetasVisitados, setPlanetasVisitados] = useState([])
  const [isLanding, setIsLanding] = useState(false)
  const [logs, setLogs] = useState([]) 
  const [sistemaApagado, setSistemaApagado] = useState(false) 


  const timerRef = useRef(null)
  const planetNames = ["Planet X", "Kepler-442b", "Mars", "Europa", "Titan", "Proxima Centauri b", "TRAPPIST-1e"]

  const mensajeEstado = useMemo(() => {
    return `Estado: ${estadoNave}`
  }, [estadoNave])

 
 useEffect(() => {
  const mensaje = "¡El panel de control está listo!"
  console.log(mensaje)
  setLogs(prev => [...prev, mensaje])

  timerRef.current = setInterval(() => {
    setDistancia(prev => prev + 10)
    setCombustible(prev => Math.max(0, prev - 5))
  }, 1000)

  return () => {
    if (timerRef.current) {
      clearInterval(timerRef.current)
    }
  }
}, [])

useEffect(() => {
  if (combustible === 0 && !sistemaApagado) {
    const mensaje = "El panel de control se ha apagado."
    console.log(mensaje)
    setLogs(prev => [...prev, mensaje])
    setSistemaApagado(true)
    setEstadoNave("Sistema apagado")
  }
}, [combustible, sistemaApagado])


 useEffect(() => {
  if (combustible > 0) {
    const mensaje = "¡Combustible actualizado!"
    console.log(mensaje)
    setLogs(prev => [...prev, mensaje])
  }
}, [combustible])

  const handleLanding = () => {
    if (isLanding || combustible <= 0) return

    setIsLanding(true)
    setEstadoNave("Aterrizando")

    setTimeout(() => {
      const randomPlanet = planetNames[Math.floor(Math.random() * planetNames.length)]
      setPlanetasVisitados(prev => [...prev, randomPlanet])
      setEstadoNave("Aterrizado")
      setIsLanding(false)

      setTimeout(() => {
        setEstadoNave("En órbita")
      }, 3000)
    }, 2000)
  }

  const getStatusColor = () => {
    switch (estadoNave) {
      case "En órbita": return "text-blue-400 bg-blue-400/20 border-blue-400/50"
      case "Aterrizando": return "text-yellow-400 bg-yellow-400/20 border-yellow-400/50"
      case "Aterrizado": return "text-green-400 bg-green-400/20 border-green-400/50"
      default: return "text-gray-400 bg-gray-400/20 border-gray-400/50"
    }
  }

  const getFuelColor = () => {
    if (combustible > 60) return "text-green-400"
    if (combustible > 30) return "text-yellow-400"
    return "text-red-400"
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-6">
      <div className="fixed bottom-4 left-4 bg-black/80 text-green-400 p-4 rounded-lg max-h-40 overflow-y-auto text-xs w-64">
        <h3 className="font-bold mb-2">Registro del sistema:</h3>
        <ul className="space-y-1">
          {logs.map((log, index) => (
            <li key={index} className="font-mono">• {log}</li>
          ))}
        </ul>
      </div>
      <div className="fixed inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-purple-900/20 via-slate-900 to-black pointer-events-none" />
      <div className="fixed inset-0 pointer-events-none" style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fillRule='evenodd'%3E%3Cg fill='%239C92AC' fillOpacity='0.1'%3E%3Ccircle cx='30' cy='30' r='1'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")" }} />

      <div className="relative max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent mb-4">
            🚀 Panel de Control
          </h1>
          <div className="h-1 w-32 mx-auto bg-gradient-to-r from-cyan-400 to-purple-400 rounded-full animate-pulse" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {/* Tarjeta de Distancia */}
          <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-6 hover:border-cyan-400/50 transition-all duration-300 group">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-cyan-400/20 rounded-lg group-hover:bg-cyan-400/30 transition-colors">
                  <MapPin className="w-6 h-6 text-cyan-400" />
                </div>
                <h3 className="text-xl font-semibold text-white">Distancia</h3>
              </div>
            </div>
            <div className="text-3xl font-bold text-cyan-400 mb-2">{distancia.toLocaleString()} km</div>
            <div className="h-2 bg-slate-700 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full transition-all duration-1000"
                style={{ width: `${Math.min(100, (distancia / 1000) * 100)}%` }}
              />
            </div>
          </div>

          <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-6 hover:border-yellow-400/50 transition-all duration-300 group">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-yellow-400/20 rounded-lg group-hover:bg-yellow-400/30 transition-colors">
                  <Fuel className="w-6 h-6 text-yellow-400" />
                </div>
                <h3 className="text-xl font-semibold text-white">Combustible</h3>
              </div>
              {combustible <= 20 && <Zap className="w-5 h-5 text-red-400 animate-pulse" />}
            </div>
            <div className={`text-3xl font-bold mb-2 ${getFuelColor()}`}>{combustible}%</div>
            <div className="h-2 bg-slate-700 rounded-full overflow-hidden">
              <div
                className={`h-full rounded-full transition-all duration-1000 ${
                  combustible > 60 ? "bg-gradient-to-r from-green-400 to-emerald-500" :
                  combustible > 30 ? "bg-gradient-to-r from-yellow-400 to-orange-500" :
                  "bg-gradient-to-r from-red-400 to-red-600"
                }`}
                style={{ width: `${combustible}%` }}
              />
            </div>
          </div>

          <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-6 hover:border-purple-400/50 transition-all duration-300 group md:col-span-2 lg:col-span-1">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-purple-400/20 rounded-lg group-hover:bg-purple-400/30 transition-colors">
                <Rocket className="w-6 h-6 text-purple-400" />
              </div>
              <h3 className="text-xl font-semibold text-white">Estado de la Nave</h3>
            </div>
            <div className={`inline-flex items-center px-4 py-2 rounded-full border text-sm font-medium ${getStatusColor()}`}>
              <div className="w-2 h-2 rounded-full bg-current mr-2 animate-pulse" />
              {mensajeEstado} 
            </div>
          </div>
        </div>

        <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-6 mb-8 hover:border-green-400/50 transition-all duration-300">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-green-400/20 rounded-lg">
              <Globe className="w-6 h-6 text-green-400" />
            </div>
            <h3 className="text-xl font-semibold text-white">Planetas Visitados</h3>
            <span className="bg-green-400/20 text-green-400 px-2 py-1 rounded-full text-sm font-medium">
              {planetasVisitados.length}
            </span>
          </div>

          {planetasVisitados.length === 0 ? (
            <div className="text-gray-400 text-center py-8">No hay planetas visitados aún</div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
              {planetasVisitados.map((planet, index) => (
                <Planetas
                  key={index}
                  nombre={planet}
                  className="animate-fadeIn"
                  style={{ animationDelay: `${index * 0.1}s` }}
                />
              ))}
            </div>
          )}
        </div>

        <div className="text-center">
          <button
            onClick={handleLanding}
            disabled={isLanding || combustible <= 0}
            className={`
              relative px-8 py-4 text-lg font-bold rounded-2xl transition-all duration-300 transform
              ${
                isLanding || combustible <= 0
                  ? "bg-gray-600 text-gray-400 cursor-not-allowed"
                  : "bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:from-purple-600 hover:to-pink-600 hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/25"
              }
            `}
          >
            {isLanding && (
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl animate-pulse" />
            )}
            <span className="relative flex items-center gap-2">
              {isLanding ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Aterrizando...
                </>
              ) : combustible <= 0 ? (
                "Sin Combustible"
              ) : (
                <>
                  <Rocket className="w-5 h-5" />
                  Aterrizar
                </>
              )}
            </span>
          </button>
        </div>

        {combustible <= 10 && combustible > 0 && (
          <div className="fixed top-4 right-4 bg-red-500/90 backdrop-blur-sm border border-red-400 rounded-lg p-4 animate-pulse">
            <div className="flex items-center gap-2 text-white font-bold">
              <Zap className="w-5 h-5" />
              ¡ADVERTENCIA DE COMBUSTIBLE BAJO!
            </div>
          </div>
        )}

        {combustible === 0 && (
          <div className="fixed top-4 right-4 bg-red-600/90 backdrop-blur-sm border border-red-500 rounded-lg p-4 animate-bounce">
            <div className="flex items-center gap-2 text-white font-bold">
              <Zap className="w-5 h-5" />
              ¡COMBUSTIBLE AGOTADO!
            </div>
          </div>
        )}
      </div>
      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.5s ease-out forwards;
        }
      `}</style>
    </div>
  )
}




