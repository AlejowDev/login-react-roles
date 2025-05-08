import React, { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import logo from "../assets/img/login.png";
import bgImage from "../assets/img/bg-login-centro.jpg";

const RegisterCompanyForm = () => {
  const [formData, setFormData] = useState({
    document: "",
    name: "",
    representante_legal: "",
    tipo_sociedad: "",
    direccion: "",
    ciudad: "",
    departamento: "",
    email: "",
    telefono: "",
    fecha_constitucion: "",
    password: "",
    tipo_documento: "NIT",
    role: "empresa",
  });

  const navigate = useNavigate();

  // Campos que deben forzarse a mayúsculas
  const uppercaseFields = [
    "name",
    "representante_legal",
    "tipo_sociedad",
    "direccion",
    "ciudad",
    "departamento",
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: uppercaseFields.includes(name) ? value.toUpperCase() : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${import.meta.env.VITE_API_URL}/registerCompany`, formData);
      Swal.fire({
        title: "Registro exitoso",
        text: "La empresa ha sido registrada correctamente",
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
      className="min-h-screen w-full flex items-center justify-center bg-cover bg-center px-4"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      <div className="bg-white w-full max-w-5xl rounded-lg shadow-md p-8 z-10">
        <div className="flex flex-col items-center mb-6">
          <img src={logo} alt="Logo" className="h-16 mb-3" />
          <h2 className="text-xl font-semibold text-gray-700 uppercase">
            Registro Empresa
          </h2>
        </div>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Campos del formulario */}
          {[
            ["document", "NIT"],
            ["name", "Razón Social"],
            ["representante_legal", "Representante Legal"],
            ["tipo_sociedad", "Tipo de Sociedad"],
            ["direccion", "Dirección"],
            ["ciudad", "Ciudad"],
            ["departamento", "Departamento"],
            ["email", "Correo electrónico"],
            ["telefono", "Teléfono"],
            ["fecha_constitucion", "Fecha de Constitución", "date"],
            ["password", "Contraseña", "password"],
          ].map(([name, label, type = "text"]) => (
            <div key={name} className="col-span-1">
              <label className="block text-gray-700 text-sm font-medium mb-1">
                {label}
              </label>
              <input
                type={type}
                name={name}
                value={formData[name]}
                onChange={handleChange}
                placeholder={label}
                className="w-full px-4 py-2 rounded-md bg-gray-50 border border-gray-300"
                required
              />
            </div>
          ))}

          <div className="col-span-1 md:col-span-2">
            <button
              type="submit"
              className="w-full py-2 rounded-md text-white font-medium bg-blue-600 hover:bg-blue-700 hover:scale-105 transition-transform duration-200"
            >
              Registrar Empresa
            </button>
          </div>
        </form>

        <p className="mt-6 text-center text-sm text-gray-600">
          ¿Ya tienes una cuenta?{" "}
          <a href="/login" className="text-blue-600 hover:underline">
            Inicia sesión
          </a>
        </p>
      </div>
    </div>
  );
};

export default RegisterCompanyForm;
