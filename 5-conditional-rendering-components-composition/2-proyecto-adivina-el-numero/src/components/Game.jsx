"use client"

import { useState, useEffect } from "react"
import { Rocket } from "lucide-react"
import InputNumber from "./InputNumber"
import Message from "./Message"
import RestartButton from "./RestartButton"

export default function Game() {
  const [randomNumber, setRandomNumber] = useState(null)
  const [userNumber, setUserNumber] = useState("")
  const [message, setMessage] = useState("")
  const [messageType, setMessageType] = useState("info")
  const [isGameOver, setIsGameOver] = useState(false)

  useEffect(() => {
    startNewGame()
  }, [])

  const startNewGame = () => {
    const num = Math.floor(Math.random() * 100) + 1
    setRandomNumber(num)
    setUserNumber("")
    setMessage("")
    setMessageType("info")
    setIsGameOver(false)
    console.log("New random number:", num)
  }

  const handleInputChange = (value) => {
    setUserNumber(value)

    const guess = parseInt(value, 10)
    if (!guess || guess < 1 || guess > 100) {
      setMessage("Ingresa un número del 1 al 100.")
      setMessageType("error")
      return
    }

    if (guess === randomNumber) {
      setMessage("¡Correcto!")
      setMessageType("success")
      setIsGameOver(true)
    } else if (guess < randomNumber) {
      setMessage("El número es mayor.")
      setMessageType("info")
    } else {
      setMessage("El número es menor.")
      setMessageType("info")
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center p-6">
      <div className="max-w-md w-full bg-slate-800/50 backdrop-blur-sm rounded-2xl p-8 border border-slate-700">
        
        
        <div className="flex justify-center mb-6">
          <Rocket className="w-16 h-16 text-yellow-400" />
        </div>

        <h1 className="text-3xl md:text-4xl font-bold text-center text-yellow-400 mb-6">
          🎯 Adivina el número
        </h1>

        <InputNumber
          value={userNumber}
          onChange={handleInputChange}
          disabled={isGameOver}
        />

        {message && <Message text={message} type={messageType} />}

        {isGameOver && (
          <RestartButton onRestart={startNewGame} />
        )}
      </div>
    </div>
  )
}

