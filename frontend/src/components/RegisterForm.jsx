import React, { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const RegisterForm = () => {
  const [formData, setFormData] = useState({
    document: "",
    name: "",
    email: "",
    username: "",
    password: "",
  });
  const navigate = useNavigate();
  const { token } = useAuth(); // Obtén el token del contexto de autenticación

  useEffect(() => {
    // Si ya hay un token, redirige al usuario al Dashboard
    if (token) {
      navigate("/Dashboard", { replace: true });
    }
  }, [token, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/register`,
        formData
      );
      Swal.fire({
        title: "Registro exitoso",
        text: "Tu cuenta ha sido creada exitosamente",
        icon: "success",
        confirmButtonText: "Iniciar sesión",
      }).then(() => {
        navigate("/login");
      });
    } catch (error) {
      console.error("❌ Error completo en el registro:", error); // <--- para inspección técnica

      Swal.fire({
        title: "Error en el registro",
        html: `
                <b>${
                  error.response?.data.message || "Error desconocido"
                }</b><br>
                <small>${error.response?.data.error || ""}</small>
              `,
        icon: "error",
        confirmButtonText: "Intentar de nuevo",
      });
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="document"
        placeholder="Documento"
        value={formData.document}
        onChange={handleChange}
        required
      />
      <input
        type="text"
        name="name"
        placeholder="Nombre"
        value={formData.name}
        onChange={handleChange}
        required
      />
      <input
        type="email"
        name="email"
        placeholder="Correo electrónico"
        value={formData.email}
        onChange={handleChange}
        required
      />
      <input
        type="text"
        name="username"
        placeholder="Nombre de usuario"
        value={formData.username}
        onChange={handleChange}
        required
      />
      <input
        type="password"
        name="password"
        placeholder="Contraseña"
        value={formData.password}
        onChange={handleChange}
        required
      />
      <button type="submit">Registrarse</button>
    </form>
  );
};

export default RegisterForm;
