import { Component, ViewEncapsulation } from '@angular/core';
import { CustomCrudGeneric } from '../../../arquitetura/custom-components/custom-crud/custom-crud-generic';
import { PregaoCredenciamentoFornecedorModel } from '../pregao-credenciamento-fornecedor.model';
import { CustomCrudComunicatorService } from '../../../arquitetura/custom-components/custom-crud/custom-crud-comunicator.service';
import { PregaoCredenciamentoFornecedorService } from '../pregao-credenciamento-fornecedor.service';
import { CustomService } from '../../../arquitetura/service/custom.service';
import { CustomInjectorService } from '../../../arquitetura/service/custom-injector.service';

@Component({
  selector: 'app-cadastro-pregao-credenciamento-fornecedor',
  templateUrl: './cadastro-pregao-credenciamento-fornecedor.component.html',
  styleUrls: ['./cadastro-pregao-credenciamento-fornecedor.component.css'],
  encapsulation: ViewEncapsulation.None,
  providers: [CustomCrudComunicatorService, PregaoCredenciamentoFornecedorService]
})
export class CadastroPregaoCredenciamentoFornecedorComponent extends CustomCrudGeneric<PregaoCredenciamentoFornecedorModel> {

  pregaoCredenciamentoFornecedorModel: PregaoCredenciamentoFornecedorModel = {};
  customService: CustomService<PregaoCredenciamentoFornecedorModel>;

  constructor(private pregaoCredenciamentoFornecedorService: PregaoCredenciamentoFornecedorService,
              private customCrudComunicatorService: CustomCrudComunicatorService,
              private customInjectorService: CustomInjectorService) {
    super();

    this.customService = new CustomService(this.pregaoCredenciamentoFornecedorService);
  }

  onIniciar(): void {
  }

  getCustomCrudComunicatorService(): CustomCrudComunicatorService {
    return this.customCrudComunicatorService;
  }

  getGenericModel(): PregaoCredenciamentoFornecedorModel {
    return this.pregaoCredenciamentoFornecedorModel;
  }

  setGenericModel(value: PregaoCredenciamentoFornecedorModel) {
    this.pregaoCredenciamentoFornecedorModel = value;
  }

  getCustomService(): CustomService<PregaoCredenciamentoFornecedorModel> {
    return this.customService;
  }

  getCustomInjectorService(): CustomInjectorService {
    return this.customInjectorService;
  }
}
