"use client"

import { useEffect } from 'react'

export default function Planetas({ nombre, className, style }) {
  useEffect(() => {
    console.log(`¡El planeta ${nombre} ha aparecido!`)
    
    return () => {
      console.log(`¡El planeta ${nombre} ha desaparecido!`)
    }
  }, [nombre])

  return (
    <div 
      className={`bg-slate-700/50 border border-slate-600/50 rounded-lg p-3 hover:border-green-400/50 transition-all duration-300 ${className}`}
      style={style}
    >
      <div className="flex items-center gap-2">
        <div className="w-3 h-3 rounded-full bg-green-400" />
        <span className="text-white font-medium">{nombre}</span>
      </div>
    </div>
  )
}

