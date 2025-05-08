const express = require('express');
const router = express.Router();

const { ping } = require('../controllers/pingController');
const { login } = require('../controllers/loginController');
const { register, registerCompany } = require('../controllers/registerController'); // 👈 Añadimos registerCompany

// Ping de prueba
router.get('/ping', ping);

// Login para todos los roles
router.post('/login', login);

// Registro de persona natural
router.post('/register', register);

// Registro de empresa

router.post('/registerCompany', registerCompany);

module.exports = router;
