const express = require('express');
const egresosController = require('../controller/dbEgresos');


const route = express.Router();


//egresos api
route.post('/egresos', egresosController.createEgresos);
route.put('/egresos/:id', egresosController.updateEgresos);
route.delete('/egresos/:id', egresosController.deleteEgresos);
route.get('/egresos/:id?', egresosController.findEgresosById);


module.exports = route;