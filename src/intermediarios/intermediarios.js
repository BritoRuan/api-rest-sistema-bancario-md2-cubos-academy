const { contas } = require('../bancodedados');

const validacaoDeSenha = (req, res, next) => {
  const { senha_banco } = req.query;

  if (senha_banco !== 'Cubos123Bank' || !senha_banco) {
    return res.status(401).json({ mensagem: 'A senha esta incorreta ou não foi informada!' });
  }
  next();
}

const verificarCPF = (req, res, next) => {
  const { cpf } = req.body;

  const encontrarCPF = contas.find((el) => {
    return el.usuario.cpf === cpf;
  });

  if (encontrarCPF) {
    return res.status(400).json({ mensagem: 'Já existe uma conta com o cpf ou e-mail informado!' });
  }
  next();
}

const verificarEmail = (req, res, next) => {
  const { email } = req.body;

  const encontrarEmail = contas.find((el) => {
    return el.usuario.email === email;
  })

  if (encontrarEmail) {
    return res.status(400).json({ mensagem: "Já existe uma conta com o cpf ou e-mail informado!" });
  }

  next();
}


const validarConsulta = (req, res, next) => {
  const { numero_conta, senha } = req.query;

  const contaEncontrada = contas.find((el) => {
    return el.numero === Number(numero_conta);
  });

  if (!contaEncontrada || contaEncontrada.usuario.senha !== senha) {
    return res.status(401).json({ mensagem: "O número ou senha da conta estrá incorreto!" });
  }
  next();
}

const validarCamposPreenchidos = (req, res, next) => {
  const { nome, cpf, data_nascimento, telefone, email, senha } = req.body;

  if (!nome || !cpf || !data_nascimento || !telefone || !email || !senha) {
    return res.status(400).json({ mensagem: 'Todos os campos são obrigatorios!' });
  }

  next();
}

const validarDeposito = (req, res, next) => {
  const { numero_conta, valor } = req.body;

  const contaEncontrada = contas.find((el) => {
    return el.numero === Number(numero_conta);
  });

  if (!contaEncontrada) {
    return res.status(400).json({ mensagem: "A Conta não encontrada" });
  };

  if (!numero_conta || !valor) {
    return res.status(400).json({ mensagem: "Todos os campos são obrigatórios!" });
  };

  if (valor <= 0) {
    return res.status(400).json({ mensagem: "O valor para depósito precisar ser maior que zero!" });
  };

  next();
}

const validarSaque = (req, res, next) => {
  const { numero_conta, valor, senha } = req.body;

  const contaEncontrada = contas.find((el) => {
    return el.numero === Number(numero_conta);
  });

  if (!contaEncontrada || contaEncontrada.usuario.senha !== senha) {
    return res.status(401).json({ mensagem: "Os números ou senha da conta estrá incorretos!" });
  };

  if (!numero_conta || !valor || !senha) {
    return res.status(400).json({ mensagem: "Todos os campos são obrigatórios!" });
  };

  if (valor > contaEncontrada.saldo) {
    return res.status(400).json({ mensagem: "Saldo insuficiente para saque!" });
  };
  next();
};

const validarTransferencia = (req, res, next) => {
  const { numero_conta_origem, numero_conta_destino, valor, senha } = req.body;

  const contaEncontradaOrigem = contas.find((el) => {
    return el.numero === Number(numero_conta_origem);
  });

  const contaEncontradaDestino = contas.find((el) => {
    return el.numero === Number(numero_conta_destino);
  });
  if (!contaEncontradaDestino || !contaEncontradaOrigem || contaEncontradaOrigem.usuario.senha !== senha) {
    return res.status(401).json({ mensagem: "A senha ou os números das contas estam incorretos!" });
  };

  if (!numero_conta_origem || !numero_conta_destino || !valor || !senha) {
    return res.status(400).json({ mensagem: "Todos os campos são obrigatórios!" });
  };


  if (numero_conta_destino === numero_conta_origem) {
    return res.status(400).json({ mensagem: "Os números das contas de origem e de destino precisam ser diferentes!" });
  }
  next();
}

const validarAtualizacaoCPF = (req, res, next) => {
  const { cpf } = req.body;
  const { numeroConta } = req.params;

  const encontrarCPF = contas.find((el) => {
    return el.usuario.cpf === cpf && el.numero !== Number(numeroConta);
  });

  if (encontrarCPF) {
    return res.status(400).json({ mensagem: "Já existe uma conta com o cpf ou e-mail informado!" });
  };
  next();
}

const validarAtualizacaoEmail = (req, res, next) => {
  const { email } = req.body;
  const { numeroConta } = req.params;

  const encontrarEmail = contas.find((el) => {
    return el.usuario.email === email && el.numero !== Number(numeroConta);
  });

  if (encontrarEmail) {
    return res.status(400).json({ mensagem: "Já existe uma conta com o cpf ou e-mail informado!" });
  };

  next();
}

module.exports = {
  validacaoDeSenha,
  verificarCPF,
  verificarEmail,
  validarConsulta,
  validarCamposPreenchidos,
  validarDeposito,
  validarSaque,
  validarTransferencia,
  validarAtualizacaoCPF,
  validarAtualizacaoEmail
}