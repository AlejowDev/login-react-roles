import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Login from './pages/Login';
import Register from './pages/Register';
import AdminDashboard from './pages/admin/AdminDashboard';
import ConductorDashboard from './pages/conductor/ConductorDashboard';
import ProveedorDashboard from './pages/proveedor/ProveedorDashboard';
import ClienteDashboard from './pages/cliente/clienteDashboard';
import RoleProtectedRoute from './components/RoleProtectedRoute';

const App = () => {
    return (
        <AuthProvider>
            <Router>
                <Routes>
                    <Route path="/" element={<Login />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />

                    <Route
                        path="/admin/adminDashboard"
                        element={
                            <RoleProtectedRoute allowedRoles={['admin']}>
                                <AdminDashboard />
                            </RoleProtectedRoute>
                        }
                    />
                    <Route
                        path="/conductor/conductorDashboard"
                        element={
                            <RoleProtectedRoute allowedRoles={['conductor']}>
                                <ConductorDashboard />
                            </RoleProtectedRoute>
                        }
                    />
                    <Route
                        path="/proveedor/proveedorDashboard"
                        element={
                            <RoleProtectedRoute allowedRoles={['proveedor']}>
                                <ProveedorDashboard />
                            </RoleProtectedRoute>
                        }
                    />
                    <Route
                        path="/cliente/clienteDashboard"
                        element={
                            <RoleProtectedRoute allowedRoles={['cliente']}>
                                <ClienteDashboard />
                            </RoleProtectedRoute>
                        }
                    />
                </Routes>
            </Router>
        </AuthProvider>
    );
};

export default App;
