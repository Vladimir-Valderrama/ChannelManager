const express = require('express');
const cors = require('cors');
const axios = require('axios');
const app = express();
const PORT = 4000;

// Habilitar CORS para todas las rutas
app.use(cors());

app.get('/reservas', async (req, res) => {
    try {
    const response = await axios.get('http://chelenko-data.sa-east-1.elasticbeanstalk.com/api/reservations');
    res.status(200).json(response.data);
    } catch (error) {
    console.error('Error al obtener las reservas:', error);
    res.status(500).send('Error al obtener las reservas');
    }
});

app.listen(PORT, () => {
    console.log(`Microservicio de reservas ejecutándose en el puerto http://localhost:${PORT}`);
});
