const mongoose = require('mongoose');

const tipoComprobante = new mongoose.Schema({
    id: { type: Number },
    desc: { type: String }
});

module.exports = TipoComprobante = mongoose.model('tipoComprobantes', tipoComprobante);