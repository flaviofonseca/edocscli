'use strict'

module.exports = function (dep) {
    let cmd = {}
    let caminhoView = 'C:/prodata/sig/sig/WebContent/app/views/'
    cmd.command = 'create <casoUso> tipo <tipo>'
    cmd.desc = 'Criar arquivos arquitetura edocs -t: <casoUso> tabela tipo -c -p -s '
    cmd.builder = {
        tabela: {
            alias: 't',
            describe: 'Cria arquivo "Tabela" ',
            demand: false
        },
        pesquisa: {
            alias: 'p',
            describe: 'Cria files "Pesquisa" ',
            demand: false
        },
        cadastro: {
            alias: 'c',
            describe: 'Cria files "Cadastro" ',
            demand: false
        },
        service: {
            alias: 's',
            describe: 'Cria files "Service" ',
            demand: false
        },
        tipo: {
            alias: 'tipo',
            describe: 'Cria files "Java or Front" ',
            demand: false
        }
    }
    cmd.handler = function (argv) {
        const {casoUso, tabela, pesquisa, cadastro, service, tipo} = argv
        const {join, shell, fs, mkdirp, log} = dep
        const folderSrc = join(__dirname, '../scaffolding/create')
        let folderDst = ''

        let files = fs.readdirSync(join(__dirname, '../scaffolding/create'))

        let nomeTabela = tabela

        try {
            if (!tipo) {
                throw new Error('Tipo não definido no comando')
            } else {
                if (tipo !== 'java' && tipo !== 'front') {
                    throw new Error('Tipo não reconhecido. opcoes "java" ou "front" ')
                }
            }

            if (tipo === 'java') {
                folderDst = join(process.cwd(), casoUso.replace('-', ''))
                criarArquivosJava(fs, casoUso, folderDst, nomeTabela, log)
            } else {
                folderDst = join(process.cwd(), casoUso)
                criarArquivosFront(fs, casoUso, folderDst, nomeTabela, log)
            }
        } catch (err) {
            log.debug(err, 'error')
        }
        // shell.cp('-Rf', folderSrc, folderDst)
    }
    return cmd
}

function criarArquivosJava(fs, casoUso, folderDst, nomeTabela, log) {

    fs.mkdir(folderDst)

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

function criarArquivosFront(fs, casoUso, folderDst, nomeTabela, log) {

    fs.mkdir(folderDst)

    let nameTable = casoUso.replace('-', '_')
    let nameFolder = casoUso.replace('-', '')
    let nomeCasoUso = getNomeDoCasoUso(casoUso)
    let nomeCasoUsoSemEspaco = getNomeDoCasoUso(casoUso).replaceAll(' ', '')
    let nomeArquivo = nomeTabela + '.java'
    let nomeVariavel = getNomeVariavelCasoUso(nomeTabela)
    let conteudo = ''

    criarGenericModel()
    criarModule()
    criarService()
    criarCadastro()
    // criarRepository()
    // criarService()

    function criarGenericModel() {
        conteudo =
            'import {GenericModel} from \'../../arquitetura/model/generic-model\';\n' +
            '\n' +
            'export interface ' + nomeTabela + 'Model extends GenericModel {\n' +
            '}\n'

        nomeArquivo = casoUso + '.model.ts'
        criaArquivo(fs, folderDst, nomeArquivo, conteudo, log)
    }

    function criarModule() {
        conteudo =
            'import { NgModule } from \'@angular/core\';\n' +
            'import { CommonModule } from \'@angular/common\';\n' +
            'import { Cadastro' + nomeTabela + 'Component } from \'./cadastro-' + casoUso + '/cadastro-' + casoUso + '.component\';\n' +
            'import { ArquiteturaModule } from \'../../arquitetura/arquitetura.module\';\n' +
            'import { RouterModule, Routes } from \'@angular/router\';\n' +
            'import { Pesquisa' + nomeTabela + 'Module } from \'../' + casoUso + '/pesquisa-' + casoUso + '/pesquisa-' + casoUso + '.module\';\n' +
            '\n' +
            'const ROUTES: Routes = [\n' +
            '  {path: \'\', component: Cadastro' + nomeTabela + 'Component}\n' +
            '];\n' +
            '\n' +
            '@NgModule({\n' +
            '  imports: [\n' +
            '    CommonModule,\n' +
            '    ArquiteturaModule,\n' +
            '    Pesquisa' + nomeTabela + 'Module,\n' +
            '    RouterModule.forChild(ROUTES)\n' +
            '  ],\n' +
            '  declarations: [Cadastro' + nomeTabela + 'Component]\n' +
            '})\n' +
            'export class ' + nomeTabela + 'Module {\n' +
            '}\n'

        nomeArquivo = casoUso + '.module.ts'
        criaArquivo(fs, folderDst, nomeArquivo, conteudo, log)
    }

    function criarService() {
        conteudo =
            'import { Injectable } from \'@angular/core\';\n' +
            'import { GenericService } from \'../../arquitetura/service/generic.service\';\n' +
            'import { ' + nomeTabela + 'Model } from \'./' + casoUso + '.model\';\n' +
            'import { HttpClient } from \'@angular/common/http\';\n' +
            '\n' +
            '@Injectable()\n' +
            'export class ' + nomeTabela + 'Service extends GenericService<' + nomeTabela + 'Model> {\n' +
            '\n' +
            '  constructor(http: HttpClient) {\n' +
            '    super(http);\n' +
            '  }\n' +
            '\n' +
            '  getUrlController(): string {\n' +
            '    return \'' + nomeVariavel + '\';\n' +
            '  }\n' +
            '\n' +
            '  getCamposPesquisa(): Array<string> {\n' +
            '    return [];\n' +
            '  }\n' +
            '\n' +
            '  getCamposWhere(): Array<string> {\n' +
            '    return [];\n' +
            '  }\n' +
            '\n' +
            '  getCamposAutoComplete(): Array<string> {\n' +
            '    return [];\n' +
            '  }\n' +
            '\n' +
            '  getCamposPopUpAutoComplete(): Array<string> {\n' +
            '    return [];\n' +
            '  }\n' +
            '\n' +
            '  getComponentPesquisa(): any {\n' +
            '    return [];\n' +
            '  }\n' +
            '}\n'

        nomeArquivo = casoUso + '.service.ts'
        criaArquivo(fs, folderDst, nomeArquivo, conteudo, log)
    }

    function criarCadastro() {
        let folderCadastro = folderDst + '/cadastro-' + casoUso
        fs.mkdir(folderCadastro)
        log.debug('Folder ' + folderCadastro + ' criado com sucesso!', 'sucess')

        conteudo =
            'import { Component, ViewEncapsulation } from \'@angular/core\';\n' +
            'import { CustomCrudGeneric } from \'../../../arquitetura/custom-components/custom-crud/custom-crud-generic\';\n' +
            'import { ' + nomeTabela + 'Model } from \'../' + casoUso + '.model\';\n' +
            'import { CustomCrudComunicatorService } from \'../../../arquitetura/custom-components/custom-crud/custom-crud-comunicator.service\';\n' +
            'import { ' + nomeTabela + 'Service } from \'../' + casoUso + '.service\';\n' +
            'import { CustomService } from \'../../../arquitetura/service/custom.service\';\n' +
            'import { CustomInjectorService } from \'../../../arquitetura/service/custom-injector.service\';\n' +
            '\n' +
            '@Component({\n' +
            '  selector: \'app-cadastro-' + casoUso + '\',\n' +
            '  templateUrl: \'./cadastro-' + casoUso + '.component.html\',\n' +
            '  styleUrls: [\'./cadastro-' + casoUso + '.component.css\'],\n' +
            '  encapsulation: ViewEncapsulation.None,\n' +
            '  providers: [CustomCrudComunicatorService, ' + nomeTabela + 'Service]\n' +
            '})\n' +
            'export class Cadastro' + nomeTabela + 'Component extends CustomCrudGeneric<' + nomeTabela + 'Model> {\n' +
            '\n' +
            '  ' + nomeVariavel + 'Model: ' + nomeTabela + 'Model = {};\n' +
            '  customService: CustomService<' + nomeTabela + 'Model>;\n' +
            '\n' +
            '  constructor(private ' + nomeVariavel + 'Service: ' + nomeTabela + 'Service,\n' +
            '              private customCrudComunicatorService: CustomCrudComunicatorService,\n' +
            '              private customInjectorService: CustomInjectorService) {\n' +
            '    super();\n' +
            '\n' +
            '    this.customService = new CustomService(this.' + nomeVariavel + 'Service);\n' +
            '  }\n' +
            '\n' +
            '  onIniciar(): void {\n' +
            '  }\n' +
            '\n' +
            '  getCustomCrudComunicatorService(): CustomCrudComunicatorService {\n' +
            '    return this.customCrudComunicatorService;\n' +
            '  }\n' +
            '\n' +
            '  getGenericModel(): ' + nomeTabela + 'Model {\n' +
            '    return this.' + nomeVariavel + 'Model;\n' +
            '  }\n' +
            '\n' +
            '  setGenericModel(value: ' + nomeTabela + 'Model) {\n' +
            '    this.' + nomeVariavel + 'Model = value;\n' +
            '  }\n' +
            '\n' +
            '  getCustomService(): CustomService<' + nomeTabela + 'Model> {\n' +
            '    return this.customService;\n' +
            '  }\n' +
            '\n' +
            '  getCustomInjectorService(): CustomInjectorService {\n' +
            '    return this.customInjectorService;\n' +
            '  }\n' +
            '}\n'

        nomeArquivo = 'cadastro-' + casoUso + '.component.ts'
        criaArquivo(fs, folderCadastro, nomeArquivo, conteudo, log)

        nomeArquivo = 'cadastro-' + casoUso + '.component.css'
        criaArquivo(fs, folderCadastro, nomeArquivo, '', log)

        conteudo =
            '<app-custom-crud title="Cadastro de ' + nomeCasoUso + '">\n' +
            '   <mat-card-content #crud>\n' +
            '   </mat-card-content>\n' +
            '</app-custom-crud>'
        nomeArquivo = 'cadastro-' + casoUso + '.component.html'
        criaArquivo(fs, folderCadastro, nomeArquivo, conteudo, log)

    }
}


// let conteudo =
//     '<div ng-controller="Pesquisa' + nomeController + ' as vm">      \n' +
//     '    <pd-pesquisa titulo="Pesquisa de ' + nomeCasoUso + '">        \n' +
//     '        <pd-pesquisa-filter>                                  \n' +
//     '            <div class="row">                                 \n' +
//     '                <pd-input-text                                \n' +
//     '                        label="Código"                        \n' +
//     '                        ng-model="vm.pdService.tabela.XXXX"   \n' +
//     '                        colspan="3"                           \n' +
//     '                        tipo="long">                          \n' +
//     '                </pd-input-text>                              \n' +
//     '                <pd-input-text                                \n' +
//     '                        label="Descrição"                     \n' +
//     '                        ng-model="vm.pdService.tabela.XXXX"   \n' +
//     '                        colspan="3"                           \n' +
//     '                        tipo="text">                          \n' +
//     '                </pd-input-text>                              \n' +
//     '            </div>                                            \n' +
//     '        </pd-pesquisa-filter>                                 \n' +
//     '        <pd-pesquisa-body>                                    \n' +
//     '            <pd-grid init="vm.onConfigurarGrid($gridScope)"   \n' +
//     '                     colspan="12">                            \n' +
//     '            </pd-grid>                                        \n' +
//     '        </pd-pesquisa-body>                                   \n' +
//     '    </pd-pesquisa>                                            \n' +
//     '</div>                                                        \n'


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