let { contas, saques, depositos, transferencias } = require('../bancodedados');
const { dataTransacao} = require('../utilidades/funcaoData');

const depositar = (req, res) => {
  const { numero_conta, valor } = req.body;

  const contaDeposito = contas.findIndex((el) => {
    return el.numero === Number(numero_conta);
  })

  contas[contaDeposito].saldo = contas[contaDeposito].saldo + valor;

  depositos.push({
    data: dataTransacao, 
    numero_conta, 
    valor
  });

  return res.status(204).send();
}

const sacar = (req, res) => {
  const { numero_conta, valor } = req.body;
  
  const contaSaque = contas.findIndex((el) => {
    return el.numero === Number(numero_conta);
  })

  contas[contaSaque].saldo = contas[contaSaque].saldo - valor;

  saques.push({
    data: dataTransacao,  
    numero_conta, 
    valor
  });

  return res.status(204).send();
}

const transferir = (req, res) => {
  const { numero_conta_origem, numero_conta_destino, valor } = req.body;

  const contaOrigem = contas.findIndex((el) => {
    return el.numero === Number(numero_conta_origem);
  })

  if(contas[contaOrigem].saldo <= 0 || valor > contas[contaOrigem].saldo){
    return res.status(400).json({ mensagem: "Saldo insuficiente para transferência!" });
  }

  contas[contaOrigem].saldo = contas[contaOrigem].saldo - valor;

  const contaDestino = contas.findIndex((el) => {
    return el.numero === Number(numero_conta_destino);
  });

  contas[contaDestino].saldo = contas[contaDestino].saldo + valor;

  transferencias.push({
    data: dataTransacao,
    numero_conta_origem,
    numero_conta_destino, 
    valor,
  });
  return res.status(204).send();
}


const saldo = (req, res) => {
  const { numero_conta } = req.query;

  const contaEncontrada = contas.find((el) => {
    return el.numero === Number(numero_conta);
  })

  return res.status(200).json({
    saldo: contaEncontrada.saldo
  })
}


const extrato = (req, res) => {
  const { numero_conta } = req.query;

  const depositosEncontrados = depositos.filter((el) => {
    return el.numero_conta === numero_conta;
  })

  const saquesEncontrados = saques.filter((el) => {
    return el.numero_conta === numero_conta;
  })

  const transferenciasEnviadas = transferencias.filter((el) => {
    return el.numero_conta_origem === numero_conta;
  })

  const transferenciasRecebidas = transferencias.filter((el) => {
    return el.numero_conta_destino === numero_conta;
  })

  return res.status(200).json({
    depositos: depositosEncontrados,
    saques: saquesEncontrados,
    transferenciasEnviadas,
    transferenciasRecebidas
  });
}


module.exports = {
  depositar, 
  sacar,
  transferir,
  saldo, 
  extrato,
}