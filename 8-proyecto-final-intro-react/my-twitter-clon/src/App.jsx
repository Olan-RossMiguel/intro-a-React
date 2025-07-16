import { useEffect, useState } from "react";
import { useLocation, Routes, Route } from "react-router-dom";
import { TwitterSidebar } from "./components/TwitterSidebar";
import { TwitterRightSidebar } from "./components/TwitterRightSidebar";
import Home from "./components/Home";
import ProfilePage from "./components/ProfilePage";
import TwitterLoginClone from "./components/TwitterLoginClone";
import ProtectedRoute from "./components/Auth/ProtectedRoute";

export default function App() {
  const location = useLocation();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const auth = localStorage.getItem("isLoggedIn") === "true";
    setIsLoggedIn(auth);
  }, [location.pathname]);

  const isLoginRoute = location.pathname === "/login";

  if (isLoginRoute) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-black text-white">
        <TwitterLoginClone setIsLoggedIn={setIsLoggedIn} />
      </div>
    );
  }

  return (
    <div className="flex bg-black text-white min-h-screen">
      {/* Sidebar izquierdo */}
      {isLoggedIn && (
        <div className="w-20 lg:w-64 shrink-0">
          <TwitterSidebar />
        </div>
      )}

      {/* Contenido principal */}
      <div className="flex-1 flex justify-center">
        <div className="w-full max-w-2xl border-x border-gray-800">
          <Routes>
            <Route path="/home" element={<Home />} />
            <Route
              path="/profile/:username"
              element={
                <ProtectedRoute isAuthenticated={isLoggedIn}>
                  <ProfilePage />
                </ProtectedRoute>
              }
            />
          </Routes>
        </div>

        {/* Sidebar derecho */}
        {isLoggedIn && (
          <div className="hidden xl:block w-[350px] px-4">
            <TwitterRightSidebar />
          </div>
        )}
      </div>
    </div>
  );
}
