const { Schema, model } = require('mongoose');

const SalaSchema = Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre es obligatorio']
    },
    user: {
        type: String,
        required: [true, 'Es requieri el user']
    },
    txtDiagram: {
        type: String,
        default : `<mxGraphModel dx="667" dy="662" grid="1" gridSize="10" guides="1" tooltips="1" connect="1" arrows="1" fold="1" page="1" pageScale="1" pageWidth="826" pageHeight="1169" background="#ffffff"><root><mxCell id="0"/><mxCell id="1" parent="0"/></root></mxGraphModel>`

    },
    estado: {
        type: Boolean,
        default: true
    }
});

module.exports = model( 'Sala', SalaSchema );