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
    const data = fs.readFileSync(dbPath, 'utf-8'); // Lee el archivo como texto
    return JSON.parse(data); // Convierte el texto a un objeto de JavaScript
};

// Endpoint para obtener todos las reservas.
app.get('/reservas', async (req, res) => {
    try {
        // Leer los usuarios desde el archivo JSON.
        const data = readData(); // Leer todo el archivo JSON

        // Verifica si el archivo JSON contiene la propiedad "usuarios"
        const usuarios = data.usuarios;

        if (!Array.isArray(usuarios)) {
            throw new Error('Los datos de usuarios no son un array');
        }

        // Extraer todas las reservas de todos los usuarios.
        const reservas = usuarios.reduce((acc, usuario) => {
            return acc.concat(usuario.reservas);
        }, []);

        res.json(reservas);
    } catch (error) {
        console.error('Error al obtener las reservas:', error);
        res.status(500).json({ error: 'Error al obtener las reservas' });
    }
});

// Ruta del microservicio.
app.listen(PORT, () => console.log(`Informe Service corriendo en http://localhost:${PORT}`));

//console.log(readData())
