const express = require('express')
const pool = require('../../mysql-connector')

const routerLogs = express.Router()

//Obtener todos los logs de una electrovalvula especifica
routerLogs.get('/:electrovalvulaId', (req, res) => {
    pool.query(`SELECT * from Log_Riegos WHERE electrovalvulaId = ${req.params.electrovalvulaId} ORDER BY fecha DESC`, (err, rsp) => {
        if (err === null) {
            res.status(200).send(JSON.stringify(rsp));
        } else {
            console.log("err", err);
            res.status(404).send(err);
        }
    });
})
//Publicar un log
routerLogs.post('/', (req, res) => {
    const { electrovalvulaId, fecha, apertura } = req.body;

    // Chequear que los campos esten presentes
    if (!electrovalvulaId || !fecha || apertura === undefined || apertura === null) {
        return res.status(400).json({ message: "Missing required fields" });
    }

    const sql = `INSERT INTO Log_Riegos (apertura, fecha, electrovalvulaId) VALUES ('${apertura}', '${fecha}', ${electrovalvulaId})`;

    pool.query(sql, (err, result) => {
        if (err === null && result.affectedRows > 0) {
            res.status(200).send("Log added successfully");
        } else {
            console.log("err", err);
            res.status(409).send("Failed to add log");
        }
    });
});


module.exports = routerLogs