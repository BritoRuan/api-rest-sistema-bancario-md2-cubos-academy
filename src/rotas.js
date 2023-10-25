const express = require('express');
const {validarCamposPreenchidos, verificarCPF, verificarEmail, validarAtualizacaoCPF, validarAtualizacaoEmail, validarDeposito, validarSaque, validarTransferencia, validarConsulta, validacaoDeSenha } = require('./intermediarios/intermediarios');
const { listarContas, criarConta, excluirConta, atualizarConta } = require('./controladores/contas');
const { depositar, sacar, transferir, saldo, extrato } = require('./controladores/transacoes');
const rotas = express();

rotas.get('/contas', validacaoDeSenha, listarContas);
rotas.post('/contas', validarCamposPreenchidos, verificarCPF, verificarEmail, criarConta);
rotas.put('/contas/:numeroConta/usuario', validarCamposPreenchidos, validarAtualizacaoCPF, validarAtualizacaoEmail, atualizarConta);
rotas.delete('/contas/:numeroConta', excluirConta);
rotas.post('/transacoes/depositar', validarDeposito, depositar);
rotas.post('/transacoes/sacar', validarSaque, sacar);
rotas.post('/transacoes/transferir', validarTransferencia, transferir);
rotas.get('/contas/saldo', validarConsulta, saldo);
rotas.get('/contas/extrato', validarConsulta, extrato);

module.exports = rotas;











