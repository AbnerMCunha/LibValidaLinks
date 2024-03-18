import chalk from 'chalk';      //Importado para Estilizar o que for impresso nos Logs em Execucao.
import fs from 'fs';            //Importado para manipular arquivos.

import pegaArquivo from './index.js';
import listaValidada from './http-validacao.js';

const comandosTerminal = process.argv;  //process.argv retorna um array contendo comandos do terminal.  //1. process é um objeto global que fornece informações e controle sobre o processo em execução. //2. argv é uma propriedade de process que retorna um array contendo os argumentos de linha de comando fornecidos ao executar o script Node.js. 
//(process.argv[0]) retorna o caminho de instalacao do programa Node.   //(process.argv[1]) retorna o caminho do script que foi executado   //Pra cima do terceiro argumento já é opcional: //(process.argv[2]) retorna o caminho do arquivo selecionado para verificação de links //(process.argv[3]) opçao que é "--valida" caso queira verificar se o site esta no ar, se nao, nao checa.

async function processaTexto(argumentosComandosTerminal) {
  const caminho = argumentosComandosTerminal[2];
  const valida = argumentosComandosTerminal[3] === '--valida';

  try {
    fs.lstatSync( caminho );  //retorna objeto Stats com infos sobre o diretorio informado, se nao existir lança uma excecao
  } catch (erro) {
    //fs.lstatSync lança uma exceção se o caminho não existir ou se houver algum erro de permissão. 
    if (erro.code === 'ENOENT') {
      console.log('arquivo ou diretório não existe');
      return;
    }
  }

  //Verifica se foi passado o arquivo ou diretorio, se for diretório, ler todos os arquivos da pasta e enviar para Imprimir os Resultados sobre os links dos arquivos.
  if (fs.lstatSync(caminho).isFile()) {
    const resultado = await pegaArquivo(caminho);
    imprimeLista(valida, resultado);
    
  } else if (fs.lstatSync(caminho).isDirectory()) {

    const arquivos = await fs.promises.readdir(caminho)
    arquivos.forEach(async (nomeDeArquivo) => {

      const lista = await pegaArquivo(`${caminho}/${nomeDeArquivo}`);
      imprimeLista(valida, lista, nomeDeArquivo);
    })

  }
}


//Recebe a opção de validação, os resultados sobre os links dos arquivos, e o nome do arquivo, se 
async function imprimeLista(valida, resultado, identificador = '') {
  if (valida) {
    console.log(
      chalk.yellow('Lista de Links Validadis'),
      chalk.black.bgGreen(identificador),
      await listaValidada(resultado));    
  } else {
    console.log(
      chalk.yellow('Lista de Links'),
      chalk.black.bgGreen(identificador),
      resultado);
  }
}


processaTexto(comandosTerminal);