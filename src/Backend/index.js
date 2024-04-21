//=======[ Settings, Imports & Data ]==========================================
// IMPORTS
const express = require('express');
const cors = require('cors');
const pool = require('./mysql-connector');

// VARIABLES
const PORT = 3000;
const app = express();
const corsOptions = { origin: "*", optionSucessStatus: 200 };

//Set CORS config
app.use(cors(corsOptions));
// to parse application/json
app.use(express.json());
// to serve static files
app.use(express.static('/home/node/app/static/'));

//=======[ Routers ]==========================================
const routerDispositivo = require('./routes/dispositivos')

const routerElectrovalvulas = require('./routes/electrovalvulas')

const routerMediciones = require('./routes/mediciones')

const routerLogs = require('./routes/logs')

app.use('/dispositivos', routerDispositivo)
app.use('/logs', routerLogs)
app.use('/mediciones', routerMediciones)
app.use('/electrovalvulas', routerElectrovalvulas)

app.listen(PORT, () => {
    console.log("NodeJS API running correctly");
}); 
