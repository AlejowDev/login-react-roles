import React from 'react';
import { useNavigate } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';

const UserDashboard = () => {
    const { logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login', { replace: true });
    };
    return (
        <div>
            <h1>Panel de Proveedor</h1>
            <p>Contenido para usuarios registrados.</p>
            <button onClick={handleLogout}>Cerrar sesión</button>
        </div>
    );
};

export default UserDashboard;
