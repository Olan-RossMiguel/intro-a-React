"use client"

export default function Message({ text, type }) {
  const color =
    type === "success"
      ? "text-green-400"
      : type === "error"
        ? "text-red-400"
        : "text-yellow-400"

  return (
    <p className={`text-xl font-semibold mt-4 ${color}`}>
      {text}
    </p>
  )
}
