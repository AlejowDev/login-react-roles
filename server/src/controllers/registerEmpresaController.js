const bcrypt = require("bcrypt");
const connection = require("../config/db");

module.exports.registerCompany = async (req, res) => {
  const {
    document,
    tipo_documento = "NIT",
    name,
    representante_legal,
    tipo_sociedad,
    direccion,
    ciudad,
    departamento,
    fecha_constitucion,
    email,
    telefono,
    password,
    role = "empresa",
  } = req.body;

  console.log("📥 Datos recibidos para empresa:", req.body);

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    const query = `
      INSERT INTO users (
        document,
        tipo_documento,
        name,
        representante_legal,
        tipo_sociedad,
        direccion,
        ciudad,
        departamento,
        fecha_constitucion,
        email,
        telefono,
        password,
        role
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    const values = [
      document,
      tipo_documento,
      name,
      representante_legal,
      tipo_sociedad,
      direccion,
      ciudad,
      departamento,
      fecha_constitucion,
      email,
      telefono,
      hashedPassword,
      role,
    ];

    connection.query(query, values, (err, result) => {
      if (err) {
        console.error("❌ Error al registrar empresa:", err);
        if (err.code === "ER_DUP_ENTRY") {
          return res.status(400).send({
            message: "El NIT o correo ya está registrado",
            error: err.message,
          });
        }

        return res.status(500).send({
          message: "Error interno al registrar empresa",
          error: err.message,
        });
      }

      console.log("✅ Empresa registrada correctamente:", result);
      res.status(201).send({ message: "Empresa registrada exitosamente" });
    });
  } catch (err) {
    console.error("❌ Error al encriptar contraseña empresa:", err);
    res.status(500).send({
      message: "Error interno en el servidor",
      error: err.message,
    });
  }
};
