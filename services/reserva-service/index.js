const express = require('express');
const app = express();
const fs = require('fs');
const path = require('path');
const cors = require('cors');

const PORT = process.env.PORT || 4002;

// Permitir solicitudes de cualquier lado.
app.use(cors());

// Middleware para el manejo de json.
app.use(express.json());

// Ruta del archivo json (base de datos).
const dbPath = path.join(__dirname, '..', '..', 'backend', 'database-prueba.json');

// Funcion para leer la base de datos de json.
const readData = () => {
    const data = fs.readFileSync(dbPath);
    return JSON.parse(data);
}

// Endpoint para obtener todos las reservas.
app.get('/reservas', (req, res) => {
    const data = readData();
    res.json(data.RESERVATIONS);
});

// Ruta del microservicio.
app.listen(PORT, () => console.log(`Informe Service corriendo en http://localhost:${PORT}`));
