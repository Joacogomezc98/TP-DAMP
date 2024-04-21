const express = require('express')
const pool = require('../../mysql-connector')

const routerDispositivo = express.Router()
//Obtener todos los dispositivos
routerDispositivo.get('/', (req, res) => {
    pool.query(`SELECT * from Dispositivos`, (err, rsp) => {
        if (err === null) {
            res.status(200).send(JSON.stringify(rsp));
        } else {
            console.log("err", err);
            res.status(404).send(err);
        }
    });
})

//Obtener dispositivo a traves de Id
routerDispositivo.get('/:deviceId', (req, res) => {
    pool.query(`SELECT * from Dispositivos WHERE dispositivoId=${req.params.deviceId}`, (err, rsp) => {
        if (err === null) {
            res.status(200).send(JSON.stringify(rsp[0]));
        } else {
            console.log("err", err);
            res.status(404).send(err);
        }
    });
})

module.exports = routerDispositivo