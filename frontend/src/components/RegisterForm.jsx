import React, { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import {
  FaUser,
  FaIdCard,
  FaEnvelope,
  FaLock,
  FaPhone,
  FaMapMarkerAlt,
  FaCity,
  FaBirthdayCake,
} from "react-icons/fa";
import logo from "../assets/img/login.png";
import bgImage from "../assets/img/bg-login-centro.jpg";

const RegisterForm = () => {
  const [formData, setFormData] = useState({
    document: "",
    tipo_documento: "CEDULA",
    name: "",
    email: "",
    password: "",
    direccion: "",
    fecha_expedicion: "",
    fecha_nacimiento: "",
    ciudad_nacimiento: "",
    telefono: "",
  });

  const navigate = useNavigate();
  const { token } = useAuth();

  useEffect(() => {
    if (token) {
      navigate("/register", { replace: true });
    }
  }, [token, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleUppercaseChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value.toUpperCase(),
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${import.meta.env.VITE_API_URL}/register`, formData);
      Swal.fire({
        title: "Registro exitoso",
        text: "Tu cuenta ha sido creada exitosamente",
        icon: "success",
        confirmButtonText: "Iniciar sesión",
      }).then(() => {
        navigate("/login");
      });
    } catch (error) {
      Swal.fire({
        title: "Error en el registro",
        html: `
          <b>${error.response?.data.message || "Error desconocido"}</b><br>
          <small>${error.response?.data.error || ""}</small>
        `,
        icon: "error",
        confirmButtonText: "Intentar de nuevo",
      });
    }
  };

  return (
    <div
      className="relative min-h-screen w-full flex items-center justify-center bg-no-repeat bg-cover bg-center"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      <div className="relative bg-white border border-gray-200 w-full max-w-[1100px] rounded-lg shadow-md p-5 z-10 backdrop-blur-sm transition-shadow duration-300 hover:shadow-xl">
        <div className="flex flex-col items-center mb-6">
          <img src={logo} alt="Logo" className="h-16 w-auto mb-3" />
          <h2 className="text-xl font-semibold text-gray-700 tracking-wider uppercase">
            Persona Natural
          </h2>
        </div>

        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-2 gap-4"
        >
          {/* Tipo de Documento */}
          <div className="col-span-1">
            <label className="block text-gray-700 text-sm font-medium mb-1">
              Tipo de Documento
            </label>
            <div className="relative">
              <input
                type="text"
                name="tipo_documento"
                value="CEDULA"
                readOnly
                className="w-full px-4 py-2 rounded-md bg-gray-100 border border-gray-300 text-gray-600"
              />
            </div>
          </div>

          {/* Documento */}
          <div className="col-span-1">
            <label className="block text-gray-700 text-sm font-medium mb-1">
              Documento
            </label>
            <div className="relative">
              <FaIdCard className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                name="document"
                value={formData.document}
                onChange={handleChange}
                placeholder="1234567890"
                className="w-full pl-10 px-4 py-2 rounded-md bg-gray-50 border border-gray-300"
                required
              />
            </div>
          </div>

          {/* Nombre */}
          <div className="col-span-1">
            <label className="block text-gray-700 text-sm font-medium mb-1">
              Nombre completo
            </label>
            <div className="relative">
              <FaUser className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleUppercaseChange}
                placeholder="Nombre completo"
                className="w-full pl-10 px-4 py-2 rounded-md bg-gray-50 border border-gray-300"
                required
              />
            </div>
          </div>

          {/* Email */}
          <div className="col-span-1">
            <label className="block text-gray-700 text-sm font-medium mb-1">
              Correo electrónico
            </label>
            <div className="relative">
              <FaEnvelope className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="nombre@correo.com"
                className="w-full pl-10 px-4 py-2 rounded-md bg-gray-50 border border-gray-300"
                required
              />
            </div>
          </div>

          {/* Dirección */}
          <div className="col-span-1">
            <label className="block text-gray-700 text-sm font-medium mb-1">
              Dirección
            </label>
            <div className="relative">
              <FaMapMarkerAlt className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                name="direccion"
                value={formData.direccion}
                onChange={handleUppercaseChange}
                placeholder="Dirección"
                className="w-full pl-10 px-4 py-2 rounded-md bg-gray-50 border border-gray-300"
              />
            </div>
          </div>

          {/* Fecha de expedición */}
          <div className="col-span-1">
            <label className="block text-gray-700 text-sm font-medium mb-1">
              Fecha de expedición
            </label>
            <input
              type="date"
              name="fecha_expedicion"
              value={formData.fecha_expedicion}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-md bg-gray-50 border border-gray-300"
            />
          </div>

          {/* Fecha de nacimiento */}
          <div className="col-span-1">
            <label className="block text-gray-700 text-sm font-medium mb-1">
              Fecha de nacimiento
            </label>
            <input
              type="date"
              name="fecha_nacimiento"
              value={formData.fecha_nacimiento}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-md bg-gray-50 border border-gray-300"
            />
          </div>

          {/* Ciudad de nacimiento */}
          <div className="col-span-1">
            <label className="block text-gray-700 text-sm font-medium mb-1">
              Ciudad de nacimiento
            </label>
            <div className="relative">
              <FaCity className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                name="ciudad_nacimiento"
                value={formData.ciudad_nacimiento}
                onChange={handleUppercaseChange}
                placeholder="Ciudad"
                className="w-full pl-10 px-4 py-2 rounded-md bg-gray-50 border border-gray-300"
              />
            </div>
          </div>

          {/* Teléfono */}
          <div className="col-span-1">
            <label className="block text-gray-700 text-sm font-medium mb-1">
              Teléfono
            </label>
            <div className="relative">
              <FaPhone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                name="telefono"
                value={formData.telefono}
                onChange={handleChange}
                placeholder="Teléfono"
                className="w-full pl-10 px-4 py-2 rounded-md bg-gray-50 border border-gray-300"
              />
            </div>
          </div>

          {/* Password */}
          <div className="col-span-1">
            <label className="block text-gray-700 text-sm font-medium mb-1">
              Contraseña
            </label>
            <div className="relative">
              <FaLock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="••••••••"
                className="w-full pl-10 px-4 py-2 rounded-md bg-gray-50 border border-gray-300"
                required
              />
            </div>
          </div>

          {/* Botón de enviar */}
          <div className="col-span-1 md:col-span-2">
            <button
              type="submit"
              className="w-full py-2 rounded-md text-white font-medium bg-blue-600 hover:bg-blue-700 hover:scale-105 transition-transform duration-200"
            >
              Registrarse
            </button>
          </div>
        </form>

        <p className="mt-6 text-center text-sm text-gray-600">
          ¿Ya tienes una cuenta?{" "}
          <a
            href="/login"
            className="text-blue-600 hover:underline hover:text-blue-800 transition-colors duration-200"
          >
            Inicia sesión
          </a>
        </p>
      </div>
    </div>
  );
};

export default RegisterForm;
