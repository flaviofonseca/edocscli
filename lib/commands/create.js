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
        const folderDst = join(process.cwd(), casoUso.replace('-', ''))

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

                    if (tipo === 'java') {
                        criarArquivosJava(fs, casoUso, folderDst, nomeTabela, log)
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
                }
            } catch (err) {
                log.debug(err, 'error')
            }
        })
        // shell.cp('-Rf', folderSrc, folderDst)
    }
    return cmd
}

function criarArquivosJava(fs, casoUso, folderDst, nomeTabela, log) {
    let nameTable = casoUso.replace('-', '_')
    let nameFolder = casoUso.replace('-', '')
    let nomeCasoUso = getNomeDoCasoUso(casoUso)
    let nomeCasoUsoSemEspaco = getNomeDoCasoUso(casoUso).replaceAll(' ', '')
    let nomeArquivo = nomeTabela + '.java'
    let nomeVariavel = getNomeVariavelCasoUso(nomeTabela)
    let conteudo = ''

    criarEntidade()
    criarController()
    criarRepository()
    criarService()

    function criarEntidade() {
        conteudo =
            'package br.com.edocs.app.' + nameFolder + ';\n' +
            '\n' +
            'import javax.persistence.Column;\n' +
            'import javax.persistence.Entity;\n' +
            'import javax.persistence.Table;\n' +
            '\n' +
            'import br.com.edocs.arquitetura.model.Entidade;\n' +
            '\n' +
            '@SuppressWarnings("serial")\n' +
            '@Entity\n' +
            '@Table(name = "' + nameTable + '")\n' +
            'public class ' + nomeTabela + ' extends Entidade {' +
            '}'
        criaArquivo(fs, folderDst, nomeArquivo, conteudo, log)
    }

    function criarController() {
        conteudo =
            'package br.com.edocs.app.' + nameFolder + ';\n' +
            '\n' +
            'import br.com.edocs.arquitetura.controller.GenericControllerImpl;\n' +
            'import org.springframework.beans.factory.annotation.Autowired;\n' +
            'import org.springframework.web.bind.annotation.RequestMapping;\n' +
            'import org.springframework.web.bind.annotation.RestController;\n' +
            '\n' +
            '@RestController\n' +
            '@RequestMapping("' + nomeVariavel + '")\n' +
            'public class ' + nomeTabela + 'Controller extends GenericControllerImpl<' + nomeTabela + '> {\n' +
            '\n' +
            '\tprivate ' + nomeTabela + 'Service ' + nomeVariavel + 'Service;\n' +
            '\t\n' +
            '\t@Autowired\n' +
            '\tpublic ' + nomeTabela + 'Controller(' + nomeTabela + 'Service ' + nomeVariavel + 'Service) {\n' +
            '\t\tsuper();\n' +
            '\t\tthis.' + nomeVariavel + 'Service = ' + nomeVariavel + 'Service;\n' +
            '\t}\n' +
            '\n' +
            '\t@Override\n' +
            '\tpublic ' + nomeTabela + 'Service getGenericService() {\n' +
            '\t\treturn this.' + nomeVariavel + 'Service;\n' +
            '\t}\n' +
            '\n' +
            '}'

        nomeArquivo = nomeTabela + 'Controller.java'
        criaArquivo(fs, folderDst, nomeArquivo, conteudo, log)
    }

    function criarRepository() {
        conteudo =
            'package br.com.edocs.app.' + nameFolder + ';\n' +
            '\n' +
            'import org.springframework.stereotype.Repository;\n' +
            '\n' +
            'import br.com.edocs.arquitetura.repository.GenericJpaRepository;\n' +
            '\n' +
            '@Repository\n' +
            'public interface ' + nomeTabela + 'Repository \n' +
            '        extends GenericJpaRepository<' + nomeTabela + ', Long>, ' + nomeTabela + 'RepositoryQuery {\n' +
            '\n' +
            '}\n'

        nomeArquivo = nomeTabela + 'Repository.java'
        criaArquivo(fs, folderDst, nomeArquivo, conteudo, log)

        conteudo =
            'package br.com.edocs.app.' + nameFolder + ';\n' +
            '\n' +
            'import br.com.edocs.arquitetura.repository.GenericCustomRepository;\n' +
            '\n' +
            'public interface ' + nomeTabela + 'RepositoryQuery extends GenericCustomRepository<' + nomeTabela + '> {\n' +
            '}\n'

        nomeArquivo = nomeTabela + 'RepositoryQuery.java'
        criaArquivo(fs, folderDst, nomeArquivo, conteudo, log)

        conteudo =
            'package br.com.edocs.app.' + nameFolder + ';\n' +
            '\n' +
            'import br.com.edocs.arquitetura.controller.PesquisarGridDTO;\n' +
            'import br.com.edocs.arquitetura.repository.GenericJpaRepositoryImpl;\n' +
            'import org.springframework.beans.factory.annotation.Autowired;\n' +
            'import org.springframework.data.domain.PageImpl;\n' +
            'import org.springframework.data.domain.Pageable;\n' +
            '\n' +
            'import javax.persistence.EntityManager;\n' +
            'import java.util.List;\n' +
            'import java.util.Map;\n' +
            '\n' +
            'public class ' + nomeTabela + 'RepositoryImpl\n' +
            '        extends GenericJpaRepositoryImpl<' + nomeTabela + '>\n' +
            '        implements ' + nomeTabela + 'RepositoryQuery {\n' +
            '\n' +
            '    @Autowired\n' +
            '    private EntityManager entityManager;\n' +
            '\n' +
            '    @Override\n' +
            '    protected EntityManager getEntityManager() {\n' +
            '        return this.entityManager;\n' +
            '    }\n' +
            '\n' +
            '    @Override\n' +
            '    public PageImpl<' + nomeTabela + '> pesquisarPaginado(PesquisarGridDTO pesquisarGridDTO, Pageable pageable) {\n' +
            '\n' +
            '        StringBuilder sqlJoin = new StringBuilder("");\n' +
            '        StringBuilder sqlWhere = new StringBuilder("");\n' +
            '\n' +
            '        return super.pesquisarPaginado(' + nomeTabela + '.class,\n' +
            '                                        sqlJoin,\n' +
            '                                        sqlWhere,\n' +
            '                                        pageable,\n' +
            '                                        "' + nomeTabela.toLowerCase() + '.id as id");\n' +
            '    }\n' +
            '\n' +
            '    @Override\n' +
            '    public List<Map<String, Object>> pesquisarAutoComplete(PesquisarGridDTO pesquisarGridDTO) {\n' +
            '        return super.getListMapAutoComplete(' + nomeTabela + '.class, pesquisarGridDTO);\n' +
            '    }\n' +
            '}\n'

        nomeArquivo = nomeTabela + 'RepositoryImpl.java'
        criaArquivo(fs, folderDst, nomeArquivo, conteudo, log)
    }

    function criarService() {
        conteudo =
            'package br.com.edocs.app.' + nameFolder + ';\n' +
            '\n' +
            'import br.com.edocs.arquitetura.controller.PesquisarGridDTO;\n' +
            'import org.springframework.beans.factory.annotation.Autowired;\n' +
            'import org.springframework.data.domain.PageImpl;\n' +
            'import org.springframework.data.domain.Pageable;\n' +
            'import org.springframework.stereotype.Service;\n' +
            '\n' +
            'import br.com.edocs.arquitetura.service.GenericServiceImpl;\n' +
            '\n' +
            'import java.util.List;\n' +
            'import java.util.Map;\n' +
            '\n' +
            '@Service\n' +
            'public class ' + nomeTabela + 'Service extends GenericServiceImpl<' + nomeTabela + '> {\n' +
            '\n' +
            '\tprivate ' + nomeTabela + 'Repository ' + nomeVariavel + 'Repository;\n' +
            '\t\n' +
            '\t@Autowired\n' +
            '\tpublic ' + nomeTabela + 'Service(' + nomeTabela + 'Repository ' + nomeVariavel + 'Repository) {\n' +
            '\t\tsuper();\n' +
            '\t\tthis.' + nomeVariavel + 'Repository = ' + nomeVariavel + 'Repository;\n' +
            '\t}\n' +
            '\n' +
            '\t@Override\n' +
            '\tprotected ' + nomeTabela + 'Repository getGenericJpaRepository() {\n' +
            '\t\treturn this.' + nomeVariavel + 'Repository;\n' +
            '\t}\n' +
            '\n' +
            '\t@Override\n' +
            '\tpublic PageImpl<' + nomeTabela + '> pesquisarPaginado(PesquisarGridDTO pesquisarGridDTO, Pageable pageable) {\n' +
            '\t\treturn this.' + nomeVariavel + 'Repository.pesquisarPaginado(pesquisarGridDTO, pageable);\n' +
            '\t}\n' +
            '\n' +
            '\t@Override\n' +
            '\tpublic List<Map<String, Object>> pesquisarAutoComplete(PesquisarGridDTO pesquisarGridDTO) {\n' +
            '\t\treturn this.' + nomeVariavel + 'Repository.pesquisarAutoComplete(pesquisarGridDTO);\n' +
            '\t}\n' +
            '}\n'

        nomeArquivo = nomeTabela + 'Service.java'
        criaArquivo(fs, folderDst, nomeArquivo, conteudo, log)
    }

}

function criaArquivo(fs, folderDst, nomeArquivo, conteudo, log) {
    fs.writeFile(folderDst + '\\' + nomeArquivo, conteudo, {flag: 'ax+'}, function (err) {
        if (err) {
            log.debug(err, 'error')
            return
        }
        log.debug('Arquivo ' + nomeArquivo + ' criado com sucesso!', 'sucess')
    })
}

function createAllFiles(fs, casoUso, folderDst, nomeTabela, log) {
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

function createCadastroHtml(fs, casoUso, folderDst, nomeTabela, log) {

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

function createCadastroJs(fs, casoUso, folderDst, nomeTabela, log) {

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

function createPesquisaHtml(fs, casoUso, folderDst, nomeTabela, log) {
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

function createPesquisaJs(fs, casoUso, folderDst, nomeTabela, log) {
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

function createServiceJs(fs, casoUso, folderDst, nomeTabela, log) {
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

function createArquivoTabela(fs, casoUso, folderDst, nomeTabela, log) {
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

function getNomeDoControllerPeloCasoUso(casoUso) {
    var nomeController = casoUso.toString()
    nomeController = nomeController.replaceAll('-', ' ')
    nomeController = formatarStringCaptalize(nomeController)
    nomeController = nomeController.replaceAll(' ', '')
    nomeController = nomeController + 'Controller'
    return nomeController
}

function getNomeDoCasoUso(casoUso) {
    let nomeCasoUso = casoUso.toString()
    nomeCasoUso = nomeCasoUso.replaceAll('-', ' ')
    nomeCasoUso = formatarStringCaptalize(nomeCasoUso)
    return nomeCasoUso
}

function getNomeVariavelCasoUso(input) {
    return input.charAt(0).toLowerCase() + input.slice(1)
}

function formatarStringCaptalize(input) {
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