const bcrypt = require("bcrypt");
const connection = require("../config/db");

module.exports.register = async (req, res) => {
  const {
    document,
    tipo_documento,
    name,
    email,
    password,
    direccion,
    fecha_expedicion,
    fecha_nacimiento,
    ciudad_nacimiento,
    telefono,
    role = "cliente"
  } = req.body;

  console.log("📥 Datos recibidos en el registro:", req.body);

  try {
    // Encriptar contraseña
    const hashedPassword = await bcrypt.hash(password, 10);

    // Consulta SQL con nuevos campos
    const query = `
      INSERT INTO users (
        document,
        tipo_documento,
        name,
        email,
        password,
        direccion,
        fecha_expedicion,
        fecha_nacimiento,
        ciudad_nacimiento,
        telefono,
        role
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    // Parámetros en el mismo orden
    const values = [
      document,
      tipo_documento,
      name,
      email,
      hashedPassword,
      direccion,
      fecha_expedicion,
      fecha_nacimiento,
      ciudad_nacimiento,
      telefono,
      role
    ];

    connection.query(query, values, (err, result) => {
      if (err) {
        console.error("❌ Error al insertar usuario en BD:", err);

        if (err.code === "ER_DUP_ENTRY") {
          return res.status(400).send({
            message: "El usuario, documento o email ya existe",
            error: err.message,
          });
        }

        return res.status(500).send({
          message: "Error interno al insertar usuario",
          error: err.message,
        });
      }

      console.log("✅ Usuario registrado correctamente:", result);
      res.status(201).send({ message: "Usuario registrado exitosamente" });
    });
  } catch (err) {
    console.error("❌ Error en el bloque catch al encriptar:", err);
    res.status(500).send({
      message: "Error en el servidor al encriptar la contraseña",
      error: err.message,
    });
  }
};
