const TipoComprobante = require('../models/tipoComporbante');

exports.comprobanteCreate = (req, res, next) => {
    //validando la request
    if (!req.body) {
        res.status(400).send({ message: 'Debe llenar todos los campos' });
        return;
    }

    //insertar nuevos valores a la body

    const comprobante = new TipoComprobante({
        id: req.body.id,
        desc: req.body.desc
    })

    //guardar reclamos

    comprobante.save(comprobante).then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Algo ocurrió mientras se realizaba la carga"
        });
    });
}

//actualizar el registro

exports.updateComprobante = (req, res) => {
    if (!req.body) {
        return res.status(400).send({ message: "La colección no puede estar vacía" })
    }

    var comprobanteId = req.params.id
    var update = req.body;

    TipoComprobante.findByIdAndUpdate(comprobanteId, update, (err, comprobanteUpdated) => {
        if (err) {
            res.status(500).send({ message: "Error al actualizar" });
        }

        if (!comprobanteUpdated) {
            return res.status(404).send({ message: 'No exite el timing para actualizar' });
        }

        return res.status(200).send({ comprobante: comprobanteUpdated });
    });
}

// eliminar registro

exports.deleteComprobante = (req, res) => {
    const id = req.params.id;

    TipoComprobante.findByIdAndDelete(id).then(data => {
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
    })
}

exports.findComprobanteById = (req, res) => {
    let comprobanteId = req.params.id;

    if (comprobanteId == null) {
        TipoComprobante.find({}).exec((err, comprobante) => {
            if (err) {
                return res.status(500).send({ message: 'Error al devolver los datos' });
            }

            if (!comprobante) {
                return res.status(404).send({ message: 'No hay timing que mostrar' });
            }

            return res.status(200).send(comprobante);
        })

    } else {
        TipoComprobante.findById(timingId, (err, comprobante) => {
            if (err) {
                return res.status(500).send({ message: 'Error al devolver los datos' });
            }

            if (!comprobante) {
                return res.status(404).send({ message: 'El elemento no existe' });
            }

            return res.status(200).send(comprobante);
        })
    }


}