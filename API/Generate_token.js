require('dotenv').config();
const jwt = require('jsonwebtoken');

// Clave secreta que debe ser la misma que usas en el API Gateway.
const SECRET_KEY = process.env.SECRET_KEY;

// Función para generar un token JWT
const generateToken = (entity) => {
    const payload = {
        entity: entity,
    };
    // Duración del token: 1 hora.
    return jwt.sign(payload, SECRET_KEY, { expiresIn: '1d' });
};

// Generar un token para "cliente"
const token = generateToken('cliente');
//console.log('Token generado:', token);

module.exports = generateToken;
