const express = require('express')
const pool = require('../../mysql-connector')

const routerMediciones = express.Router()

//Obtener todas las mediciones
routerMediciones.get('/', (req, res) => {
    pool.query(`SELECT * from Mediciones`, (err, rsp) => {
        if (err === null) {
            res.status(200).send(JSON.stringify(rsp));
        } else {
            console.log("err", err);
            res.status(404).send(err);
        }
    });
})

//Obtener todas las mediciones de un dispositivo por su ID
routerMediciones.get('/:deviceId', (req, res) => {
    pool.query(`SELECT * from Mediciones WHERE dispositivoId = ${req.params.deviceId} ORDER BY fecha DESC`, (err, rsp) => {
        if (err === null) {
            res.status(200).send(JSON.stringify(rsp));
        } else {
            console.log("err", err);
            res.status(404).send(err);
        }
    });
})

//Publicar una medicion de un dispositivo
routerMediciones.post('/', (req, res) => {
    const { dispositivoId, fecha, valor } = req.body;

    // Chequear que los campos esten presentes
    if (!dispositivoId || !fecha || valor === undefined || valor === null) {
        return res.status(400).json({ message: "Missing required fields" });
    }

    const sql = `INSERT INTO Mediciones (valor, fecha, dispositivoId) VALUES ('${valor}', '${fecha}', ${dispositivoId})`;

    pool.query(sql, (err, result) => {
        if (err === null && result.affectedRows > 0) {
            res.status(200).send("measurment added successfully");
        } else {
            console.log("err", err);
            res.status(409).send("Failed to add measurment");
        }
    });
});

module.exports = routerMediciones