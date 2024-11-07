require('dotenv').config();
const express = require('express');
const jwt = require('jsonwebtoken');
const axios = require('axios');
const cors = require('cors');
const generateToken = require('./Generate_token');

const app = express();
const PORT = 5000;

// Clave secreta
const SECRET_KEY = process.env.SECRET_KEY;

if (!SECRET_KEY) {
  console.error('Error: SECRET_KEY no definida. Verifica tu archivo .env');
  process.exit(1);
}

// Middleware para habilitar CORS.
app.use(cors());

// Middleware para procesar JSON.
app.use(express.json());

// Endpoint para generar un token
app.post('/generate-token', (req, res) => {
  const entity = req.body.entity || 'cliente';
  const token = jwt.sign({ entity }, SECRET_KEY, { expiresIn: '1d' });
  res.json({ token });
});

// Middleware para validar JWT.
const validateJwt = (req, res, next) => {
  const authHeader = req.header('Authorization');
  if (!authHeader) {
    return res.status(401).send('Token requerido');
  }

  const token = authHeader.split(' ')[1];
  if (!token) {
    return res.status(401).send('Token requerido');
  }

  try {
    const decoded = jwt.verify(token, SECRET_KEY);
    req.entity = decoded.entity;
    next();
  } catch (error) {
    console.error('Error al verificar el token:', error.message);
    return res.status(401).send('Token inválido');
  }
};

// Endpoint para refrescar el token.
app.post('/refresh-token', validateJwt, (req, res) => {
  try {
    const newToken = jwt.sign({ entity: req.entity }, SECRET_KEY, { expiresIn: '1h' });
    res.json({ token: newToken });
  } catch (error) {
    console.error('Error al refrescar el token:', error);
    res.status(500).send('Error al refrescar el token');
  }
});

// Endpoint protegido para obtener reservas del microservicio de reservas
app.get('/reservas', validateJwt, async (req, res) => {
  try {
    const response = await axios.get('http://localhost:4000/reservas');
    res.json(response.data);
  } catch (error) {
    console.error('Error al obtener reservas desde el microservicio:', error.message);
    res.status(500).send('Error al obtener reservas desde el microservicio');
  }
});

// Endpoint protegido para obtener el stock del microservicio de stock
app.get('/stock', validateJwt, async (req, res) => {
  try {
    const response = await axios.get('http://localhost:4001/stock');
    res.json(response.data);
  } catch (error) {
    console.error('Error al obtener stock desde el microservicio:', error.message);
    res.status(500).send('Error al obtener stock desde el microservicio');
  }
});

// Inicializar el API Gateway
app.listen(PORT, () => {
  console.log(`API Gateway ejecutándose en el puerto http://localhost:${PORT}`);
});
