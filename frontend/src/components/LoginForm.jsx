// src/components/LoginForm.jsx
import React, { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import loginBg from "../assets/img/img-login.jpg";
import logo from "../assets/img/logo.png";

const LoginForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/login`,
        { username, password }
      );
      const { token } = response.data;
      login(token);
      const userRole = JSON.parse(atob(token.split(".")[1])).role;
      if (userRole === "admin")
        navigate("/admin/adminDashboard", { replace: true });
      else if (userRole === "conductor")
        navigate("/conductor/conductorDashboard", { replace: true });
      else if (userRole === "proveedor")
        navigate("/proveedor/proveedorDashboard", { replace: true });
      else navigate("/cliente/clienteDashboard", { replace: true });
    } catch (error) {
      Swal.fire({
        title: "Error en el inicio de sesión",
        text:
          error.response?.data.message || "Usuario o contraseña incorrectos",
        icon: "error",
        confirmButtonText: "Intentar de nuevo",
      });
    }
  };

  return (
    <div
      className="min-h-screen w-full flex items-center justify-center bg-cover bg-center"
      style={{ backgroundImage: `url(${loginBg})` }}
    >
      <div className="bg-white border rounded-xl shadow-lg p-8 w-full max-w-md text-white">
        <div className="mb-6 text-center">
          {/* <img
            src={logo}
            alt="Logo de la compañía"
            className="mx-auto w-24 h-auto sm:w-28 md:w-32 lg:w-36"
          /> */}
          <p className="text-black mt-5">Modulo de ingreso al sistema</p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-black text-sm mb-1">E-mail</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="nombre@company.com"
              className="w-full px-4 py-2 rounded-md bg-gray-800 border border-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div>
            <label className="block text-black text-sm mb-1">Contraseña</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full px-4 py-2 rounded-md bg-gray-800 border border-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div className="flex items-center justify-between text-sm text-gray-400">
            <label className="inline-flex items-center">
              <input type="checkbox" className="form-checkbox text-blue-500" />
              <span className="ml-2 text-black">Recordarme</span>
            </label>
            <a href="#" className="text-blue-400 hover:underline">
              ¿Olvidaste ru contraseña?
            </a>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition-all"
          >
            Ingresar
          </button>
        </form>

        <div className="flex items-center my-4">
          <div className="flex-grow h-px bg-gray-700"></div>

          <div className="flex-grow h-px bg-gray-700"></div>
        </div>

        <div className="mt-6 text-center text-sm text-black">
          No tienes una cuenta?{" "}
          <a href="/register" className="text-blue-400 hover:underline">
            Registrate
          </a>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
