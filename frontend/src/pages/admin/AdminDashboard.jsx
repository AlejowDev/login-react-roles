import React from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

const AdminDashboard = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login", { replace: true });
  };
  return (
    <div>
      <h1>Panel de Administración</h1>
      <p>Contenido exclusivo para administradores.</p>
      <button onClick={handleLogout}>Cerrar sesión</button>
    </div>
  );
};

export default AdminDashboard;
