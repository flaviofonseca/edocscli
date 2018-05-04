import { Injectable } from '@angular/core';
import { GenericService } from '../../arquiteturamodule/service/generic.service';
import { DependenteModel } from './dependente.model';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class DependenteService extends GenericService<DependenteModel> {

  constructor(http: HttpClient) {
    super(http);
  }

  getUrlController(): string {
    return 'dependente';
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
