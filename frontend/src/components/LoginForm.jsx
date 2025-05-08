import React, { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import logo from "../assets/img/login.png";
import { FaUser, FaLock } from "react-icons/fa";
import bgImage from "../assets/img/bg-login-centro.jpg";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { data } = await axios.post(
        `${import.meta.env.VITE_API_URL}/login`,
        { email, password }
      );
      login(data.token);
      const role = JSON.parse(atob(data.token.split(".")[1])).role;
      switch (role) {
        case "admin":
          navigate("/admin/adminDashboard", { replace: true });
          break;
        case "conductor":
          navigate("/conductor/conductorDashboard", { replace: true });
          break;
        case "proveedor":
          navigate("/proveedor/proveedorDashboard", { replace: true });
          break;
        default:
          navigate("/cliente/clienteDashboard", { replace: true });
      }
    } catch (err) {
      Swal.fire({
        title: "Error en el inicio de sesión",
        text: err.response?.data.message || "Usuario o contraseña incorrectos",
        icon: "error",
        confirmButtonText: "Intentar de nuevo",
        confirmButtonColor: "#2563EB",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="relative min-h-screen w-full flex items-center justify-center bg-no-repeat bg-cover bg-center px-4"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      {/* Contenedor doble: Login y Registro */}
      <div className="relative z-10 flex flex-col lg:flex-row bg-white border border-gray-200 rounded-lg shadow-md max-w-5xl w-full overflow-hidden backdrop-blur-sm">
        {/* LOGIN */}
        <div className="w-full lg:w-1/2 p-8">
          <div className="flex justify-center mb-6">
            <img src={logo} alt="Logo" className="h-16 w-auto" />
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-gray-700 text-sm font-medium mb-1">
                E-mail
              </label>
              <div className="relative">
                <FaUser className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="nombre@correo.com"
                  className="w-full pl-10 px-4 py-2 rounded-md bg-gray-50 border border-gray-300"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-gray-700 text-sm font-medium mb-1">
                Contraseña
              </label>
              <div className="relative">
                <FaLock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-10 px-4 py-2 rounded-md bg-gray-50 border border-gray-300"
                  required
                />
              </div>
            </div>

            <div className="flex items-center justify-between text-sm">
              <label className="inline-flex items-center text-gray-600">
                <input
                  type="checkbox"
                  className="form-checkbox text-blue-600"
                />
                <span className="ml-2">Recordarme</span>
              </label>
            </div>

            <button
              type="submit"
              disabled={loading}
              className={`w-full py-2 rounded-md text-white font-medium transition duration-200 ${
                loading
                  ? "cursor-not-allowed bg-blue-300"
                  : "bg-blue-600 hover:bg-blue-700 hover:scale-105"
              }`}
            >
              {loading ? "Ingresando..." : "Ingresar"}
            </button>
          </form>
        </div>

        {/* LÍNEA DIVISORIA HORIZONTAL EN MÓVIL */}
        <div className="block lg:hidden h-px bg-gray-300 my-2 mx-6"></div>

        {/* LÍNEA DIVISORIA VERTICAL EN ESCRITORIO */}
        <div className="hidden lg:block w-px bg-gray-300"></div>

        {/* REGISTRO */}
        <div className="w-full lg:w-1/2 bg-white p-8 flex flex-col justify-center items-center text-center">
          <h2 className="text-2xl font-semibold mb-4 text-gray-800">
            ¿Aún no estás registrado?
          </h2>
          <p className="text-gray-600 mb-6">
            Elige cómo deseas registrarte y empieza a disfrutar nuestros
            servicios.
          </p>
          <div className="flex flex-col space-y-3 w-full max-w-[250px]">
            <a
              href="/register"
              className="py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-200 font-medium text-center"
            >
              Registro Persona Natural
            </a>
            <a
              href="/registerEmpresa"
              className="py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-200 font-medium text-center"
            >
              Registro Empresa
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
