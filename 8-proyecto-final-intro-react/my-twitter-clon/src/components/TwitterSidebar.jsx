"use client";
import {
  Home,
  Search,
  Bell,
  Mail,
  Sparkles,
  Users,
  User,
  MoreHorizontal,
  MoreVertical,
  Pencil,
  X,
} from "lucide-react";
import { Link } from "react-router-dom";

export function TwitterSidebar() {
  const navItems = [
    { icon: Home, text: "Inicio", url: "/home" },
    { icon: Search, text: "Explorar", url: "#" },
    { icon: Bell, text: "Notificaciones", url: "#" },
    { icon: Mail, text: "Mensajes", url: "#", isActive: true },
    { icon: Sparkles, text: "Grok", url: "#" },
    { icon: Users, text: "Comunidades", url: "#" },
    { icon: User, text: "Perfil", url: "/profile/johndoe" }, // Aquí va tu ruta dinámica
    { icon: MoreHorizontal, text: "Más opciones", url: "#" },
  ];

  return (
    <div className="fixed left-0 top-0 h-screen bg-black flex flex-col justify-between py-4 px-2 lg:w-64 w-20 transition-all duration-300 ease-in-out">
      {/* Sección Superior: Logo y Elementos de Navegación */}
      <div className="flex flex-col items-start gap-2">
        {/* Logo de X */}
        <div className="p-3 rounded-full hover:bg-gray-800 transition-colors cursor-pointer mb-4 lg:ml-2">
         
        </div>

        {/* Elementos de Navegación */}
        {navItems.map((item, index) => (
          <Link
            key={index}
            to={item.url}
            className={`flex items-center gap-4 py-3 px-4 rounded-full transition-colors w-full
      ${
        item.isActive
          ? "bg-gray-900 text-sky-500"
          : "hover:bg-gray-800 text-white"
      }
    `}
          >
            <item.icon className="size-7 flex-shrink-0" />
            <span className="text-xl font-bold hidden lg:block whitespace-nowrap">
              {item.text}
            </span>
          </Link>
        ))}

        {/* Botón "Postear" */}
        <button className="mt-4 w-full bg-sky-500 text-white font-bold rounded-full py-3 transition-colors hover:bg-sky-600">
          <span className="hidden lg:block text-lg">Postear</span>
          <Pencil className="size-7 block lg:hidden mx-auto" />
        </button>
      </div>

      {/* Sección Inferior: Información del Usuario */}
      <div className="flex items-center gap-3 py-2 px-4 rounded-full hover:bg-gray-800 transition-colors cursor-pointer mt-auto">
        <img
          src="https://i.pravatar.cc/100?u=johndoe"
          alt="Avatar de Usuario"
          width={40}
          height={40}
          className="rounded-full size-10 flex-shrink-0"
        />

        <div className="h-screen bg-black ...">

          <span className="font-bold text-white whitespace-nowrap">
            John Doe
          </span>
          <span className="text-gray-500 text-sm whitespace-nowrap">
            @johndoe
          </span>
        </div>
        <MoreVertical className="size-5 text-white ml-auto hidden lg:block" />
      </div>
    </div>
  );
}
