import React from 'react';
import { useNavigate } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';

const ModeratorDashboard = () => {
    const { logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login', { replace: true }); 
    };
    return (
        <div>
            <h1>Panel de Conductor</h1>
            <p>Contenido exclusivo para conductores.</p>
            <button onClick={handleLogout}>Cerrar sesión</button>
        </div>
    );
};

export default ModeratorDashboard;
