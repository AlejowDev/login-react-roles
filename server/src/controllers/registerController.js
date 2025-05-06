const bcrypt = require("bcrypt");
const connection = require("../config/db");

module.exports.register = async (req, res) => {
  const { document, name, email, username, password, role = "cliente" } = req.body;

  console.log("📥 Datos recibidos en el registro:", req.body);

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    const query = `
      INSERT INTO users (document, name, email, username, password, role)
      VALUES (?, ?, ?, ?, ?, ?)
    `;

    connection.query(
      query,
      [document, name, email, username, hashedPassword, role],
      (err, result) => {
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
      }
    );
  } catch (err) {
    console.error("❌ Error en el bloque catch al encriptar:", err);
    res.status(500).send({
      message: "Error en el servidor al encriptar la contraseña",
      error: err.message,
    });
  }
};
