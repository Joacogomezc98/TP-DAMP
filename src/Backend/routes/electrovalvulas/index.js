const express = require('express')
const pool = require('../../mysql-connector')

const routerElectrovalvulas = express.Router()

//Obtener todas las electrovalvulas
routerElectrovalvulas.get('/', (req, res) => {
    pool.query(`SELECT * from Electrovalvulas`, (err, rsp) => {
        if (err === null) {
            res.status(200).send(JSON.stringify(rsp));
        } else {
            console.log("err", err);
            res.status(404).send(err);
        }
    });
})

module.exports = routerElectrovalvulas