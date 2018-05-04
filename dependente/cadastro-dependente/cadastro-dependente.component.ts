import { Component, ViewEncapsulation } from '@angular/core';
import { CustomCrudGeneric } from '../../../arquiteturamodule/custom-components/custom-crud/custom-crud-generic';
import { DependenteModel } from '../dependente.model';
import { CustomCrudComunicatorService } from '../../../arquiteturamodule/custom-components/custom-crud/custom-crud-comunicator.service';
import { DependenteService } from '../dependente.service';
import { CustomService } from '../../../arquiteturamodule/service/custom.service';
import { CustomInjectorService } from '../../../arquiteturamodule/service/custom-injector.service';

@Component({
  selector: 'app-cadastro-dependente',
  templateUrl: './cadastro-dependente.component.html',
  styleUrls: ['./cadastro-dependente.component.css'],
  encapsulation: ViewEncapsulation.None,
  providers: [CustomCrudComunicatorService, DependenteService]
})
export class CadastroDependenteComponent extends CustomCrudGeneric<DependenteModel> {

  dependenteModel: DependenteModel = {};
  customService: CustomService<DependenteModel>;

  constructor(private dependenteService: DependenteService,
              private customCrudComunicatorService: CustomCrudComunicatorService,
              private customInjectorService: CustomInjectorService) {
    super();

    this.customService = new CustomService(this.dependenteService);
  }

  onIniciar(): void {
  }

  getCustomCrudComunicatorService(): CustomCrudComunicatorService {
    return this.customCrudComunicatorService;
  }

  getGenericModel(): DependenteModel {
    return this.dependenteModel;
  }

  setGenericModel(value: DependenteModel) {
    this.dependenteModel = value;
  }

  getCustomService(): CustomService<DependenteModel> {
    return this.customService;
  }

  getCustomInjectorService(): CustomInjectorService {
    return this.customInjectorService;
  }
}
