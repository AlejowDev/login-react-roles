import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

const AdminDashboard = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login", { replace: true });
  };

  useEffect(() => {
    // Evita retroceder con el botón del navegador
    window.history.pushState(null, null, window.location.href);
    const handlePopState = () => {
      window.history.pushState(null, null, window.location.href);
    };
    window.addEventListener("popstate", handlePopState);

    // Limpia el efecto al salir del componente
    return () => {
      window.removeEventListener("popstate", handlePopState);
    };
  }, []);

  return (
    <div>
      <h1>Panel de Administración</h1>
      <p>Contenido exclusivo para administradores.</p>
      <button onClick={handleLogout}>Cerrar sesión</button>
    </div>
  );
};

export default AdminDashboard;
