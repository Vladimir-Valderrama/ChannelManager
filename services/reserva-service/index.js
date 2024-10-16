const express = require('express');
const app = express();
const fs = require('fs');
const path = require('path');
const port = 4002;

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
app.listen(port, () => console.log(`Informe Service corriendo en http://localhost:${port}`));
