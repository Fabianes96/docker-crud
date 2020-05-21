const mongoose = require ('mongoose');
const schema = mongoose.Schema;

const clientSchema = new schema({
    nombre: String,
    apellido: String,
    email: String
});

module.exports = mongoose.model('clients', clientSchema)