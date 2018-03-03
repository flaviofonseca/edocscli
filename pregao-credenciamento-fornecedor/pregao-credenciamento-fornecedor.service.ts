import { Injectable } from '@angular/core';
import { GenericService } from '../../arquitetura/service/generic.service';
import { PregaoCredenciamentoFornecedorModel } from './pregao-credenciamento-fornecedor.model';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class PregaoCredenciamentoFornecedorService extends GenericService<PregaoCredenciamentoFornecedorModel> {

  constructor(http: HttpClient) {
    super(http);
  }

  getUrlController(): string {
    return 'pregaoCredenciamentoFornecedor';
  }

  getCamposPesquisa(): Array<string> {
    return [];
  }

  getCamposWhere(): Array<string> {
    return [];
  }

  getCamposAutoComplete(): Array<string> {
    return [];
  }

  getCamposPopUpAutoComplete(): Array<string> {
    return [];
  }

  getComponentPesquisa(): any {
    return [];
  }
}
