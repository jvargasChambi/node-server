const { Schema, model } = require('mongoose');

const UsuarioSchema = Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre es obligatorio']
    },
    correo: {
        type: String,
        required: [true, 'El correo es obligat']
    },
    user: {
        type: String,
        required: [true, 'Es requieri el user']
    },
    password: {
        type: String,
        required: [true, 'Contraseña requerida']
    },
    estado: {
        type: Boolean,
        default: true
    }
});

module.exports = model( 'Usuario', UsuarioSchema );