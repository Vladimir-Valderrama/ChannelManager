// stockService.js
const express = require('express');
const cors = require('cors');
const axios = require('axios');
const app = express();
const PORT = 4001;

// Habilitar CORS para todas las rutas
app.use(cors());

// Endpoint para obtener el stock
app.get('/stock', async (req, res) => {
    try {
    // Aquí puedes obtener los datos desde la base de datos directamente o redirigir la solicitud
    // En este caso, simularemos obtener los datos desde un endpoint externo (como el original)
    const response = await axios.get('http://chelenko-data.sa-east-1.elasticbeanstalk.com/api/inventory');
    res.status(200).json(response.data);
    } catch (error) {
    console.error('Error al obtener el stock:', error);
    res.status(500).send('Error al obtener el stock');
    }
});

app.listen(PORT, () => {
    console.log(`Microservicio de stock ejecutándose en el link http://localhost:${PORT}`);
});
