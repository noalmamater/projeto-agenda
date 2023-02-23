const mongoose = require('mongoose');

const HomeSchema = new mongoose.Schema({
    titulo: {type: String, required: true},
    descricao: String
});

const HomeModel = mongoose.model('Data', HomeSchema);

module.exports = HomeModel;