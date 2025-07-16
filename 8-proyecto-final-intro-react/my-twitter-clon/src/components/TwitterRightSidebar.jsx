import { Search, BadgeCheck, MoreVertical } from "lucide-react";

export function TwitterRightSidebar() {
  return (
    <div className="hidden lg:block w-[350px] p-4 space-y-4 bg-black text-white">
      {/* Caja de búsqueda */}
      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-neutral-500" />
        <input
          type="text"
          placeholder="Buscar"
          className="w-full py-2 pl-12 pr-4 rounded-full bg-neutral-900 border border-neutral-800 focus:outline-none focus:ring-1 focus:ring-blue-400 text-white placeholder-neutral-500"
        />
      </div>

      {/* Sección: Personas relevantes */}
      <div className="bg-neutral-900 rounded-xl p-4 space-y-4">
        <h2 className="text-xl font-bold">Personas relevantes</h2>
        <div className="space-y-4">
          {/* Persona 1 */}
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-3">
              <img
                src="https://i.pravatar.cc/100?u=alex"
                alt="Avatar de usuario"
                className="w-10 h-10 rounded-full"
              />

              <div className="flex flex-col">
                <div className="flex items-center gap-1">
                  <span className="font-bold text-white">
                    Alexander Inspira IA
                  </span>
                  <BadgeCheck className="h-4 w-4 text-blue-400" />
                </div>
                <span className="text-neutral-500 text-sm">@Alex_Inspira</span>
              </div>
            </div>
            <button className="bg-white text-black font-bold py-1.5 px-4 rounded-full hover:bg-neutral-200 transition-colors">
              Seguir
            </button>
          </div>
          <p className="text-white text-sm">
            Entusiasta de la IA y la tecnología. Comparto insights y novedades.
            🚀🤖
          </p>
        </div>
      </div>

      {/* Sección: Qué está pasando */}
      <div className="bg-neutral-900 rounded-xl p-4 space-y-4">
        <h2 className="text-xl font-bold">Qué está pasando</h2>
        <div className="space-y-2">
          {/* Tendencia 1 (Resaltada) */}
          <div className="flex items-center justify-between p-2 -mx-2 rounded-lg bg-neutral-800">
            <div className="flex flex-col">
              <span className="text-neutral-500 text-xs">
                Tendencia en México
              </span>
              <span className="font-bold text-white">PROTEJAN A TONA</span>
              <span className="text-neutral-500 text-xs">
                12.5K publicaciones
              </span>
            </div>
            <button className="p-2 rounded-full hover:bg-neutral-700 transition-colors">
              <MoreVertical className="h-5 w-5 text-neutral-500" />
            </button>
          </div>

          {/* Tendencia 2 */}
          <div className="flex items-center justify-between p-2 -mx-2 rounded-lg hover:bg-neutral-800 transition-colors">
            <div className="flex flex-col">
              <span className="text-neutral-500 text-xs">
                Tendencia en México
              </span>
              <span className="font-bold text-white">
                #InteligenciaArtificial
              </span>
              <span className="text-neutral-500 text-xs">
                8.2K publicaciones
              </span>
            </div>
            <button className="p-2 rounded-full hover:bg-neutral-700 transition-colors">
              <MoreVertical className="h-5 w-5 text-neutral-500" />
            </button>
          </div>

          {/* Tendencia 3 */}
          <div className="flex items-center justify-between p-2 -mx-2 rounded-lg hover:bg-neutral-800 transition-colors">
            <div className="flex flex-col">
              <span className="text-neutral-500 text-xs">
                Deportes · Tendencia
              </span>
              <span className="font-bold text-white">#LigaMX</span>
              <span className="text-neutral-500 text-xs">
                25K publicaciones
              </span>
            </div>
            <button className="p-2 rounded-full hover:bg-neutral-700 transition-colors">
              <MoreVertical className="h-5 w-5 text-neutral-500" />
            </button>
          </div>

          {/* Tendencia 4 */}
          <div className="flex items-center justify-between p-2 -mx-2 rounded-lg hover:bg-neutral-800 transition-colors">
            <div className="flex flex-col">
              <span className="text-neutral-500 text-xs">
                Tendencia en México
              </span>
              <span className="font-bold text-white">
                #ViernesDeGanarSeguidores
              </span>
              <span className="text-neutral-500 text-xs">
                5.1K publicaciones
              </span>
            </div>
            <button className="p-2 rounded-full hover:bg-neutral-700 transition-colors">
              <MoreVertical className="h-5 w-5 text-neutral-500" />
            </button>
          </div>
        </div>
        <a href="#" className="block text-blue-400 hover:underline text-sm">
          Mostrar más
        </a>
      </div>
    </div>
  );
}
