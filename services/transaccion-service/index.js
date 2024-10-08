const express = require('express');
const app = express();
const port = 4003;

app.get('/prueba', (req, res) => res.send('Informe Service'));
app.listen(port, () => console.log(`Servidor corriendo en http://localhost:${port}`));
