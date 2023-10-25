function ajusteData() {
  const data = new Date().toLocaleDateString();
  const hora = new Date().toLocaleTimeString()

  return `${data} ${hora}`
}
let dataTransacao = new Date().toLocaleString().split(',').join('')


module.exports = {
  dataTransacao
}