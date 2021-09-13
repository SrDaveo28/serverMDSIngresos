const mongoose = require('mongoose');

const egresos = new mongoose.Schema({

    fecha: { type: Date },
    id: { type: Number },
    usuario: { type: String },
    tipo: { type: String },
    nroComprobante: { type: String },
    responsable: { type: String },
    obs: { type: String },
    monto: { type: Number },
    state: { type: String }
});

module.exports = Egresos = mongoose.model('egresos', egresos);