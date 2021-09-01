const Egresos = require('../models/egresos');

exports.createEgresos = (req, res, next) => {
    //validando la request de
    if (!req.body) {
        res.status(404).send({ message: 'Debe rellenar todos los campos' })

        return;
    }

    const egreso = new Egresos({
        fecha: req.body.fecha,
        id: req.body.id,
        usuario: req.body.usuario,
        tipo: req.body.tipo,
        nroComprobante: req.body.nroComprobante,
        responsable: req.body.responsable,
        obs: req.body.obs,
        monto: req.body.monto,
        state: req.body.state
    });

    egreso.save(egreso).then(data => {
        console.log(egreso);
        res.send(data);
    }).catch((err) => {
        res.status(500).send({
            message: err.message || "Algo ocurrió mientras se realizaba la carga"
        });
    });
}

exports.updateEgresos = (req, res) => {
    if (!req.body) {
        return res.status(400).send({ message: "La colección no puede estar vacía" })
    }

    var id = req.params.id
    var update = req.body;
    const filter = { id: id };


    Egresos.findOneAndUpdate(filter, update, (err, egresosUpdated) => {
        if (err) {
            res.status(500).send({ message: "Error al actualizar" });
        }

        if (!egresosUpdated) {
            return res.status(404).send({ message: 'No existe el timing para actualizar' });
        }

        return res.status(200).send(egresosUpdated);
    })
}

exports.deleteEgresos = (req, res) => {
    const id = req.params.id;


    Egresos.findByIdAndDelete(id).then(data => {
        if (!data) {
            res.status(400).send({ message: `No podemos eliminar el ${id}` })
        } else {
            res.send({
                message: "se ha eliminado correctamente"
            });
        }
    }).catch(err => {
        res.status(500).send({
            message: `no logramos eliminar el usuario por ${err}`
        })
    });
}

exports.findEgresosById = (req, res) => {
    let id = req.params.id;
    const filter = { id: id };

    if (id == null) {
        Egresos.find({}).exec((err, egresosList) => {
            if (err) {
                return res.status(500).send({ message: 'Error al devolver los datos' });
            }

            if (!egresosList) {
                return res.status(404).send({ message: 'No hay timing que mostrar' });
            }

            return res.status(200).send(egresosList);
        })

    } else {
        Egresos.findOne(filter, (err, egresosList) => {
            if (err) {
                return res.status(500).send({ message: 'Error al devolver los datos' });
            }

            if (!egresosList) {
                return res.status(404).send({ message: 'El elemento no existe' });
            }

            return res.status(200).send(
                egresosList
            );
        });


    }


}