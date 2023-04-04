const express = require('express')
const app = express()
const routes = require('./src/routes/index.js')
const Connection = require('./src/database/database.js')

const cors = require("cors");
const corsOptions = {
    origin: '*',
    credentials: true,            //access-control-allow-credentials:true
    optionSuccessStatus: 200,
};
app.use(cors(corsOptions))

Connection();
app.use(express.json());
app.use('', routes);

module.exports = app