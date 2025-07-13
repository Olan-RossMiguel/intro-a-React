"use client"

export default function InputNumber({ value, onChange, disabled }) {
  return (
    <input
      type="number"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      disabled={disabled}
      min={1}
      max={100}
      className="
        w-full
        px-4
        py-3
        rounded-lg
        border
        border-gray-600
        bg-slate-800
        text-white
        placeholder-gray-400
        focus:outline-none
        focus:ring-2
        focus:ring-cyan-400
        disabled:opacity-50
      "
      placeholder="Ingresa un número del 1 al 100"
    />
  )
}
