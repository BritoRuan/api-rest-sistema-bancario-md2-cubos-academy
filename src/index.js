const express = require('express');
const roteador = require('./rotas.js');

const servidor = express();

servidor.use(express.json());
servidor.use(roteador);

servidor.listen(3000);
