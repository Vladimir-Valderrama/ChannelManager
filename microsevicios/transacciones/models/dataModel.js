const mongoose = require('mongoose');

const dataSchema = new mongoose.Schema({
    name: String,
    value: Number,
});

module.exports = mongoose.model('Data', dataSchema);

//define un modelo de datos