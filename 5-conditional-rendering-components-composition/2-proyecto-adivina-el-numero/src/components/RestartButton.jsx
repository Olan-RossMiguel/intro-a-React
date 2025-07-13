"use client"

export default function RestartButton({ onRestart }) {
  return (
    <button
      onClick={onRestart}
      className="
        mt-6
        bg-gradient-to-r from-purple-500 to-pink-500
        hover:from-purple-600 hover:to-pink-600
        text-white
        font-bold
        py-3
        px-6
        rounded-xl
        transition
        duration-300
        hover:scale-105
      "
    >
      Reiniciar Juego
    </button>
  )
}
