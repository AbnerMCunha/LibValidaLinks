
function extraiLinks (arrayChaveValor) {
  //map extraindo todos links do valor da arrayChaveValor e o Join transformando em string.
  const valorLink = arrayChaveValor.map((objetoLink) => Object.values(objetoLink).join()) ; 
  return valorLink ; 
}

async function checaStatus (listaURLs) {

  //Promise.all é um método estático da classe Promise, que tem arrays de promisses dentro e ele espera que sejam resolvidas antes de serem finalmente retornadas.
  const arrStatus = await Promise
  .all(
    listaURLs.map(async (url) => {
      try {        
        const response = await fetch(url);  //fetch faz uma requisição HTTP, se a requisição for bem-sucedida, o status da resposta é retornado.         
        return response.status  //A propriedade status retorna o código de status HTTP da resposta.   //response.ok: Retorna true ou false SE o código de status da resposta estiver dentro do intervalo 200-299         
      } catch (erro) {                
        return manejaUrl404(erro); //Caso fetch lance uma excessao, redirecionamos a manejaUrl404 pra lidar com o erro.
      }
    })
  )
  return arrStatus; //retorna com as promisses já resolvidas em formato de array de codigos de status 
}

function manejaUrl404 (erro) {
  console.log(erro.cause.code );
  if (erro.cause.code === 'ENOTFOUND') {
    return 'link não encontrado';
  } else {
    return `Link com Erro, Status: ${erro.status}`;
  }
}

//recebe os links de ImprimeLista e retorna com a verificação de Status para cada url.
async function listaValidada (listaDeLinks) {
  const links = extraiLinks(listaDeLinks);
  const status = await checaStatus(links);

  //por a lista estar ordenada, por meio do map é possivel, retornar uma array de objetos que concatenação o objeto chave valor do linca, junto com a propriedade retornando o status do link associado.
  return listaDeLinks.map((objeto, indice) => ({
    ...objeto,
    status: status[indice]
  }))
}

export default listaValidada;
