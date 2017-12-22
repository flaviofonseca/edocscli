'use strict'

module.exports = function (dep) {
  let cmd = {}
  let caminhoView = 'C:/prodata/sig/sig/WebContent/app/views/'
  cmd.command = 'create <casoUso> tipo <tipo>'
  cmd.desc = 'Criar arquivos arquitetura edocs -t: <casoUso> tabela -c -p -s -tipo: <tipo>'
  cmd.builder = {
    tabela: {
      alias: 't',
      describe: 'Create files "Tabela" ',
      demand: false
    },
    pesquisa: {
      alias: 'p',
      describe: 'Create files "Pesquisa" ',
      demand: false
    },
    cadastro: {
      alias: 'c',
      describe: 'Create files "Cadastro" ',
      demand: false
    },
    service: {
      alias: 's',
      describe: 'Create files "Service" ',
      demand: false
    },
    tipo: {
      alias: 'tipo',
      describe: 'Create files "Java or Front" ',
      demand: false
    }
  }
  cmd.handler = function (argv) {
    const {casoUso, tabela, pesquisa, cadastro, service, tipo} = argv
    const {join, shell, fs, mkdirp, log} = dep
    const folderSrc = join(__dirname, '../scaffolding/create')
    const folderDst = join(process.cwd(), 'app/views/' + casoUso)

    let files = fs.readdirSync(join(__dirname, '../scaffolding/create'))

    let nomeTabela = tabela

    // console.log('Caso uso ' + casoUso);
    // console.log('Tabela ' + tabela);
    // console.log('Pesquisa ' + pesquisa);
    // console.log('Cadastro ' + cadastro);
    // console.log('Service ' + service);

    mkdirp(folderDst, function (err) {

      log.debug(tipo)
      try {
        if (!tipo) {
          throw new Error('Tipo não definido no comando')
        } else {
          if (tipo !== 'java' && tipo !== 'front') {
            throw new Error('Tipo não reconhecido. opcoes "java" ou "front" ')
          }
        }
        if (err) {
          log.debug(err, 'error')
        } else {
          if (cadastro) {
            createCadastroHtml(fs, casoUso, folderDst + '/cadastro-' + casoUso, nomeTabela, log)
            createCadastroJs(fs, casoUso, folderDst, nomeTabela, log)
          }
          if (pesquisa) {
            createPesquisaHtml(fs, casoUso, folderDst, nomeTabela, log)
            createPesquisaJs(fs, casoUso, folderDst, nomeTabela, log)
          }
          if (service) {
            createServiceJs(fs, casoUso, folderDst, nomeTabela, log)
          }
          if (!cadastro && !pesquisa && !service) {
            if (nomeTabela) {
              createAllFiles(fs, casoUso, folderDst + '/cadastro-' + casoUso, nomeTabela, log)
            } else {
              throw new Error('Tabela não definida no comando', 'error')
            }
          }
        }
      } catch (err) {
        log.debug(err, 'error')
      }
    })
    // shell.cp('-Rf', folderSrc, folderDst)
  }
  return cmd
}

function createAllFiles (fs, casoUso, folderDst, nomeTabela, log) {
  if (nomeTabela) {
    createCadastroHtml(fs, casoUso, folderDst, nomeTabela, log)
    createCadastroJs(fs, casoUso, folderDst, nomeTabela, log)
    createPesquisaHtml(fs, casoUso, folderDst, nomeTabela, log)
    createPesquisaJs(fs, casoUso, folderDst, nomeTabela, log)
    createServiceJs(fs, casoUso, folderDst, nomeTabela, log)
    createArquivoTabela(fs, casoUso, folderDst, nomeTabela, log)
  } else {

  }
}

function createCadastroHtml (fs, casoUso, folderDst, nomeTabela, log) {

  fs.mkdir(folderDst)
  let nomeArquivo = 'cadastro-' + casoUso + '.component.html'
  let localArquivo = folderDst
  let nomeController = getNomeDoControllerPeloCasoUso(casoUso)
  let nomeCasoUso = getNomeDoCasoUso(casoUso)

  log.debug('Local arquivo e nome : ' + localArquivo)
  //  fs.writeFile(casoUso, data, [options], callback);

  let conteudo =
    '<div ng-controller="Cadastro' + nomeController + ' as vm"> \n' +
    '    <pd-crud titulo="Cadastro de ' + nomeCasoUso + '"  \n' +
    '             service="vm.pdService"  \n' +
    '             on-iniciar="vm.onIniciar()">  \n' +
    '           <pd-crud-body> \n' +
    '               <div class="row"> \n ' +
    '               \n ' +
    '               \n ' +
    '               </div> \n' +
    '          </pd-crud-body> \n' +
    '   </pd-crud> \n' +
    '</div> \n'

  fs.writeFile(localArquivo + '\\' + nomeArquivo, conteudo, {flag: 'ax+'}, function (err) {
    if (err) {
      log.debug(err, 'error')
      return
    }
    log.debug('Arquivo ' + nomeArquivo + ' criado com sucesso!', 'sucess')

  })
}

function createCadastroJs (fs, casoUso, folderDst, nomeTabela, log) {

  let nomeArquivo = 'cadastro-' + casoUso + '-controller.js'
  let localArquivo = folderDst
  let nomeController = getNomeDoControllerPeloCasoUso(casoUso)
  let nomeCasoUso = getNomeDoCasoUso(casoUso)
  let nomeCasoUsoSemEspaco = getNomeDoCasoUso(casoUso).replaceAll(' ', '')

  log.debug('Local arquivo e nome : ' + localArquivo)
  //  fs.writeFile(casoUso, data, [options], callback);

  let conteudo = ''

  fs.writeFile(localArquivo + '\\' + nomeArquivo, conteudo, {flag: 'ax+'}, function (err) {
    if (err) {
      log.debug(err, 'error')
      return
    }
    log.debug('Arquivo ' + nomeArquivo + ' criado com sucesso!', 'sucess')
  })
}

function createPesquisaHtml (fs, casoUso, folderDst, nomeTabela, log) {
  let nomeArquivo = 'pesquisa-' + casoUso + '.html'
  let localArquivo = folderDst
  let nomeController = getNomeDoControllerPeloCasoUso(casoUso)
  let nomeCasoUso = getNomeDoCasoUso(casoUso)
  let nomeCasoUsoSemEspaco = getNomeDoCasoUso(casoUso).replaceAll(' ', '')

  log.debug('Local arquivo e nome : ' + localArquivo)
  //  fs.writeFile(casoUso, data, [options], callback);

  let conteudo =
    '<div ng-controller="Pesquisa' + nomeController + ' as vm">      \n' +
    '    <pd-pesquisa titulo="Pesquisa de ' + nomeCasoUso + '">        \n' +
    '        <pd-pesquisa-filter>                                  \n' +
    '            <div class="row">                                 \n' +
    '                <pd-input-text                                \n' +
    '                        label="Código"                        \n' +
    '                        ng-model="vm.pdService.tabela.XXXX"   \n' +
    '                        colspan="3"                           \n' +
    '                        tipo="long">                          \n' +
    '                </pd-input-text>                              \n' +
    '                <pd-input-text                                \n' +
    '                        label="Descrição"                     \n' +
    '                        ng-model="vm.pdService.tabela.XXXX"   \n' +
    '                        colspan="3"                           \n' +
    '                        tipo="text">                          \n' +
    '                </pd-input-text>                              \n' +
    '            </div>                                            \n' +
    '        </pd-pesquisa-filter>                                 \n' +
    '        <pd-pesquisa-body>                                    \n' +
    '            <pd-grid init="vm.onConfigurarGrid($gridScope)"   \n' +
    '                     colspan="12">                            \n' +
    '            </pd-grid>                                        \n' +
    '        </pd-pesquisa-body>                                   \n' +
    '    </pd-pesquisa>                                            \n' +
    '</div>                                                        \n'

  fs.writeFile(localArquivo + '\\' + nomeArquivo, conteudo, {flag: 'ax+'}, function (err) {
    if (err) {
      log.debug(err, 'error')
      return
    }
    log.debug('Arquivo ' + nomeArquivo + ' criado com sucesso!', 'sucess')
  })
}

function createPesquisaJs (fs, casoUso, folderDst, nomeTabela, log) {
  let nomeArquivo = 'pesquisa-' + casoUso + '-controller.js'
  let localArquivo = folderDst
  let nomeController = getNomeDoControllerPeloCasoUso(casoUso)
  let nomeCasoUso = getNomeDoCasoUso(casoUso)
  let nomeCasoUsoSemEspaco = getNomeDoCasoUso(casoUso).replaceAll(' ', '')

  log.debug('Local arquivo e nome : ' + localArquivo)
  //  fs.writeFile(casoUso, data, [options], callback);

  let conteudo = ''

  fs.writeFile(localArquivo + '\\' + nomeArquivo, conteudo, {flag: 'ax+'}, function (err) {
    if (err) {
      log.debug(err, 'error')
      return
    }
    log.debug('Arquivo ' + nomeArquivo + ' criado com sucesso!', 'sucess')
  })
}

function createServiceJs (fs, casoUso, folderDst, nomeTabela, log) {
  var nomeArquivo = casoUso + '-service.js'
  var localArquivo = folderDst
  var nomeController = getNomeDoControllerPeloCasoUso(casoUso)
  var nomeCasoUso = getNomeDoCasoUso(casoUso)
  var nomeCasoUsoSemEspaco = getNomeDoCasoUso(casoUso).replaceAll(' ', '')

  log.debug('Local arquivo e nome : ' + localArquivo)
  //  fs.writeFile(casoUso, data, [options], callback);

  let conteudo = ''

  fs.writeFile(localArquivo + '\\' + nomeArquivo, conteudo, {flag: 'ax+'}, function (err) {
    if (err) {
      log.debug(err, 'error')
      return
    }
    log.debug('Arquivo ' + nomeArquivo + ' criado com sucesso!', 'sucess')
  })
}

function createArquivoTabela (fs, casoUso, folderDst, nomeTabela, log) {
  let nomeArquivo = nomeTabela
  let localArquivo = folderDst

  log.debug('Local arquivo e nome : ' + localArquivo)
  //  fs.writeFile(casoUso, data, [options], callback);
  let conteudo = ''

  fs.writeFile(localArquivo + '\\' + nomeArquivo, conteudo, {flag: 'ax+'}, function (err) {
    if (err) {
      log.debug(err, 'error')
      return
    }
    log.debug('Arquivo ' + nomeArquivo + ' criado com sucesso!', 'sucess')
  })
}

function getNomeDoControllerPeloCasoUso (casoUso) {
  var nomeController = casoUso.toString()
  nomeController = nomeController.replaceAll('-', ' ')
  nomeController = formatarStringCaptalize(nomeController)
  nomeController = nomeController.replaceAll(' ', '')
  nomeController = nomeController + 'Controller'
  return nomeController
}

function getNomeDoCasoUso (casoUso) {
  var nomeCasoUso = casoUso.toString()
  nomeCasoUso = nomeCasoUso.replaceAll('-', ' ')
  nomeCasoUso = formatarStringCaptalize(nomeCasoUso)
  return nomeCasoUso
}

function formatarStringCaptalize (input) {
  var separator = ' '
  var format = format || 'all'
  if (!input) {
    return input
  }
  separator = separator || ' '
  if (format === 'first') {
    // Capitalize the first letter of a sentence
    var output = input.charAt(0).toUpperCase() + input.slice(1).toLowerCase()
    if (separator === ' ') {
      return output
    } else {
      return output.split(separator).join(' ')
    }
  } else {
    return input.split(separator).map(function (word) {
      if (word.length === 2 && format === 'team') {
        // Uppercase team abbreviations like FC, CD, SD
        return word.toUpperCase()
      } else {
        return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
      }
    }).join(' ')
  }
}