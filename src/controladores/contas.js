let { contas } = require('../bancodedados');
let contaCriada = 1;

const listarContas = (req, res) => {
  return res.status(200).json(contas);
}

const criarConta = (req, res) => {
  const { nome, cpf, data_nascimento, telefone, email, senha } = req.body;

  const cadastro = {
    numero: contaCriada,
    saldo: 0,
    usuario: {
      nome,
      cpf,
      data_nascimento,
      telefone,
      email,
      senha
    }
  }

  contas.push(cadastro);
  contaCriada++;

  return res.status(204).send();
}

const atualizarConta = (req, res) => {
  const { nome, cpf, data_nascimento, telefone, email, senha } = req.body;
  const { numeroConta } = req.params;

  const contaEncontrada = contas.find((el) => {
    return el.numero === Number(numeroConta);
  })

  if (!contaEncontrada) {
    return res.status(400).json({ mensagem: "A conta não foi encontrada" });
  }

  const contaParaAtualizar = contas.findIndex((el) => {
    return el.numero === Number(numeroConta);
  })
  let novosDadosAlteradosPeloUsuario;

  if (contaEncontrada) {
    novosDadosAlteradosPeloUsuario = {
      numero: contas[contaParaAtualizar].numero,
      saldo: contas[contaParaAtualizar].saldo,
      usuario: {
        nome: nome,
        cpf: cpf,
        data_nascimento: data_nascimento,
        telefone: telefone,
        email: email,
        senha: senha
      }
    };

    const listaAtualizada = contas.splice(contaParaAtualizar, 1, novosDadosAlteradosPeloUsuario);
    return res.status(204).send();
  }
}

const excluirConta = (req, res) => {
  const { numeroConta } = req.params;

  const contaEncontrada = contas.find((el) => {
    return el.numero === Number(numeroConta);
  })

  if (!contaEncontrada) {
    return res.status(400).json({ mensagem: 'A Conta foi não encontrada' });
  }

  if (contaEncontrada.saldo !== 0) {
    return res.status(403).json({ mensagem: 'A conta só pode ser removida se o saldo for zero!' });
  }

  contas = contas.filter((conta) => {
    return conta.numero !== Number(numeroConta);
  })
  return res.status(200).send();
}

module.exports = {
  listarContas,
  criarConta,
  atualizarConta,
  excluirConta
}