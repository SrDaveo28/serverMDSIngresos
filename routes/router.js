const express = require('express');
const egresosController = require('../controller/dbEgresos');
const comprobanteController = require('../controller/dbTipoComprobante');

const route = express.Router();


//egresos api
route.post('/egresos', egresosController.createEgresos);
route.put('/egresos/:id', egresosController.updateEgresos);
route.delete('/egresos/:id', egresosController.deleteEgresos);
route.get('/egresos/:id?', egresosController.findEgresosById);
route.put('/egresosState/:id', egresosController.setStateEgreso);

//tipo de comprobantes

route.post('/comprobante', comprobanteController.comprobanteCreate);
route.put('/comprobante/:id', comprobanteController.updateComprobante);
route.delete('/comprobante/:id', comprobanteController.deleteComprobante);
route.get('/comprobante/:id?', comprobanteController.findComprobanteById);

module.exports = route;