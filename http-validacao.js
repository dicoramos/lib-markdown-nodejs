//const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));
const fetch = require('node-fetch');

function manejaErros(erro) {
  throw new Error(erro.message);
}

async function checaStatus(arrayURLs) {
  try {
    const arrayStatus = await Promise
      .all(arrayURLs
        .map(async url => {
          const res = await fetch(url)
          return res.status;
    }))
    return arrayStatus;
  } catch(erro) {
    manejaErros(erro);
  }
}

function geraArrayDeURLs(arrayLinks) {
  return arrayLinks
    .map(objetoLink => Object //invoca a função callback passada por argumento para cada elemento do Array e devolve um novo Array como resultado.
      .values(objetoLink).join());//junta todos os elementos de um array (ou um array-like object) em uma string e retorna esta string.
}

async function validaURLs(arrayLinks) {
  const links = geraArrayDeURLs(arrayLinks);
  const statusLinks = await checaStatus(links);
  //spread operator = operador de espalhamento ...
  const resultados = arrayLinks.map((objeto, indice) => ({
    ...objeto,
    status: statusLinks[indice]
  }))
  return resultados;
}

module.exports = validaURLs;