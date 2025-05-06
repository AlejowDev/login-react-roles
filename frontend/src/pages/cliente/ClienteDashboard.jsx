import React from 'react';
import { useNavigate } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';

const ClienteDashboard = () => {
    const { logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login', { replace: true });
    };
    return (
        <div>
            <h1>Panel de Clientes</h1>
            <p>Contenido exclusivo para clientes.</p>
            <button onClick={handleLogout}>Cerrar sesión</button>
        </div>
    );
};

export default ClienteDashboard;
