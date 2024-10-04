const express = require('express');
const app = express();
const port = 4003;

app.get('/', (req, res) => res.send('Informe Service'));
app.listen(port, () => console.log(`Informe Service running on port ${port}`));
