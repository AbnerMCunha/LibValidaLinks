import fs from 'fs';
//import arq from './../arquivos/texto.md';


async function pegaArquivo( caminho ){
  try{
    const encoding = 'utf-8';
    const texto = await fs.promises.readFile(caminho, encoding);
    return extraiLinks(texto);
  } catch(e){
    console.log("Erro ao ler arquivo: ", e);
  }
}

function extraiLinks(texto){  
  
  const regex = /\[([^[\]]*?)\]\((https?:\/\/[^\s?#.].[^\s]*)\)/gm;   //Definição de uma expressão regular (regex) para encontrar padrões de links no texto: //1. \[(.*?)\] encontra qualquer texto entre colchetes (presumivelmente o texto do link), capturando-o como o primeiro grupo de captura.  //2. \((https?:\/\/[^\s?#.].[^\s]*)\) encontra uma URL dentro de parênteses (presumivelmente o link), capturando-a como o segundo grupo de captura.  //3. g indica que a pesquisa deve ser global, ou seja, não pare após encontrar a primeira correspondência. m faz a pesquisa considerar múltiplas linhas. 
  const extracoesMatchResult = [...texto.matchAll(regex)];            //o matchAll filtra o texto com as expressões regulares e retornar um objeto MatchResult([object RegExp, String Iterator]) que tem mais informações sobre o filtro além do match(). //O operador de espalhamento [...] descompacta as capturas do iterável(que é um array de elementos) retornado e transforma em um array, ou seja uma array de arrays retonado a variavel.
  //console.log(extracoesMatchResult);                                //o resultado da array de objetos MatchResult = [FileList](https://developer.mozilla.org/pt-BR/docs/Web/API/FileList),FileList,https://developer.mozilla.org/pt-BR/docs/Web/API/FileList,[<input>](https://developer.mozilla.org/pt-BR/docs/Web/HTML/Element/Input),<input>,https://developer.mozilla.org/pt-BR/docs/Web/HTML/Element/Input,[DataTransfer](https://developer.mozilla.org/pt-BR/docs/Web/API/DataTransfer),DataTransfer,https://developer.mozilla.org/pt-BR/docs/Web/API/DataTransfer,[HTMLCanvasElement](https://developer.mozilla.org/pt-BR/docs/Web/API/HTMLCanvasElement),HTMLCanvasElement,https://developer.mozilla.org/pt-BR/docs/Web/API/HTMLCanvasElement,[Implementation notes](https://developer.mozilla.org/pt-BR/docs/Web/API/File#implementation_notes),Implementation notes,https://developer.mozilla.org/pt-BR/docs/Web/API/File#implementation_notes,[Teste de retorno 400](https://httpstat.us/404),Teste de retorno 400,https://httpstat.us/404,[gatinho salsicha](http://gatinhosalsicha.com.br/),gatinho salsicha,http://gatinhosalsicha.com.br/  

  const arrayChaveValor = extracoesMatchResult.map( extracao => ( {[extracao[1]] : extracao[2] })  );   //o map retona para cada extracao, um objeto contendo as N chaves e valores das extracoes 
  return arrayChaveValor.length !== 0 ? arrayChaveValor : 'Não há links no Arquivo.'                //Retorna os pares chave e valor a quem chamar a função pegaArquivo()
}

export default pegaArquivo;
