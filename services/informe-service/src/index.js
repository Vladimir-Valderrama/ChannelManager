const express = require('express')
const app = express()
const port = 3010
const mongoose = require('mongoose'); // Conexión a mongodb

// URL de conexión (para localhost)
const uri = "mongodb://localhost:27017/Database";

// Conectar a MongoDB con Mongoose
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Conexión exitosa a MongoDB');
  })
  .catch(err => {
    console.error('Error al conectar con MongoDB:', err);
  });


const itemSchema = new mongoose.Schema({
    name: String,
    description: String
});
  
const Item = mongoose.model('Item', itemSchema); // Crear el modelo de Mongoose


// 1. CREATE - Crear un nuevo item
app.post('/', async (req, res) => {
    try {
      const newItem = new Item(req.body); // req.body debe contener 'name' y 'description'
      await newItem.save();
      res.status(201).send(newItem); // Respuesta con el nuevo item creado
    } catch (err) {
      res.status(400).send({ error: err.message });
    }
});


// 2. READ - Obtener todos los items
app.get('/', async (req, res) => {
    try {
      const items = await Item.find(); // Busca todos los items en la base de datos
      res.status(200).send(items); // Respuesta con la lista de items
    } catch (err) {
      res.status(500).send({ error: err.message });
    }
});



// 2.1 READ - Obtener un item por ID
app.get('/items/:id', async (req, res) => {
    try {
      const item = await Item.findById(req.params.id); // Buscar item por ID
      if (!item) {
        return res.status(404).send({ message: 'Item no encontrado' });
      }
      res.status(200).send(item); // Respuesta con el item encontrado
    } catch (err) {
      res.status(500).send({ error: err.message });
    }
});


// 3. UPDATE - Actualizar un item por ID
app.put('/items/:id', async (req, res) => {
    try {
      const item = await Item.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
      if (!item) {
        return res.status(404).send({ message: 'Item no encontrado' });
      }
      res.status(200).send(item); // Respuesta con el item actualizado
    } catch (err) {
      res.status(400).send({ error: err.message });
    }
});



// 4. DELETE - Eliminar un item por ID
app.delete('/items/:id', async (req, res) => {
    try {
      const item = await Item.findByIdAndDelete(req.params.id);
      if (!item) {
        return res.status(404).send({ message: 'Item no encontrado' });
      }
      res.status(200).send({ message: 'Item eliminado exitosamente' });
    } catch (err) {
      res.status(500).send({ error: err.message });
    }
});

  // Ruta de prueba
  app.get('/', (req, res) => {
    res.send('simi cabo');
  });

app.get('/', (req, res) => {
  res.send('simi cabo')
})

app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
    });
 

 app.get('/', (req, res) => {
    res.send('simi cabo')
})


