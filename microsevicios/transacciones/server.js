//npm install express mongoose dotenv : instala las dependecias necesarias
//configura Express y el endpoint

const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());

// Datos en memoria
let data = [];
let currentId = 1;

// CREATE: Agregar un nuevo dato
app.post('/api/data', (req, res) => {
    const newData = { id: currentId++, ...req.body };
    data.push(newData);
    res.status(201).json(newData);
});

// READ: Obtener todos los datos
app.get('/api/data', (req, res) => {
    res.json(data);
});

// READ: Obtener un dato por ID
app.get('/api/data/:id', (req, res) => {
    const foundData = data.find(item => item.id === parseInt(req.params.id));
    if (!foundData) return res.status(404).send('Dato no encontrado');
    res.json(foundData);
});

// UPDATE: Actualizar un dato por ID
app.put('/api/data/:id', (req, res) => {
    const foundIndex = data.findIndex(item => item.id === parseInt(req.params.id));
    if (foundIndex === -1) return res.status(404).send('Dato no encontrado');
    data[foundIndex] = { id: parseInt(req.params.id), ...req.body };
    res.json(data[foundIndex]);
});

// DELETE: Eliminar un dato por ID
app.delete('/api/data/:id', (req, res) => {
    const foundIndex = data.findIndex(item => item.id === parseInt(req.params.id));
    if (foundIndex === -1) return res.status(404).send('Dato no encontrado');
    data.splice(foundIndex, 1);
    res.send('Dato eliminado');
});

// Iniciar el servidor
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
