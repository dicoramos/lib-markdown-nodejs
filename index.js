const chalk = require('chalk');
const fs = require('fs');//biblioteca já existe

function extraiLinks(texto) {
  const regex = /\[([^\]]*)\]\((https?:\/\/[^$#\s].[^\s]*)\)/gm;
  const arrayResultados = [];
  let temp;
  while((temp = regex.exec(texto)) !== null) {
    arrayResultados.push({ [temp[1]]: temp[2] })
  }
  return arrayResultados.length === 0 ? 'não há links' : arrayResultados;//? : = ternário 2 condições(if com 3 operadores)
}

function trataErro(erro) {
  throw new Error(chalk.red(erro.code, 'não há arquivo no caminho'));//lançar
}
//UTILIZANDO PROMISES COM O MÉTODO ASYNC E AWAIT
async function pegaArquivo(caminhoDoArquivo) {//avisa que o retorno é assíncrono 
  const encoding = 'utf-8';
  try {//tentar
    const texto = await fs.promises.readFile(caminhoDoArquivo, encoding)//o que tem que acontecer
    return extraiLinks(texto);
  } catch(erro) {
    trataErro(erro);
  }
}
//UTILIZANDO PROMISES COM O MÉTODO THEN
/*function pegaArquivo(caminhoDoArquivo) {
  const encoding = 'utf-8';
  fs.promises
  .readFile(caminhoDoArquivo, encoding)
  .then((texto) => chalk.green(console.log(texto)))
  .catch((erro)=> trataErro(erro))
}*/
  

module.exports = pegaArquivo;