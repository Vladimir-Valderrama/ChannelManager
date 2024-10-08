const express = require('express');
const app = express();
const port = 4003;

//conexion a mongodb
const mongoose = require('mongoose');

// URL de conexión (para localhost)
const uri = "mongodb://localhost:27017/db-piola";

// Conectar a MongoDB con Mongoose
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Conexión exitosa a MongoDB');
  })
  .catch(err => {
    console.error('Error al conectar con MongoDB:', err);
  });



app.get('/get', (req, res) => res.send('Informe Service'));
app.listen(port, () => console.log(`Servidor corriendo en http://localhost:${port}`));

