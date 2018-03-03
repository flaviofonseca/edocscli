import { Component, Inject, ViewEncapsulation } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import {
  CustomPesquisaComunicatorService
} from '../../../arquitetura/custom-components/custom-pesquisa/custom-pesquisa-comunicator.service';
import { CustomPesquisaGeneric } from '../../../arquitetura/custom-components/custom-pesquisa/custom-pesquisa-generic';
import { DisplayColumnsGrid } from '../../../arquitetura/custom-components/custom-grid/display-columns-grid';

@Component({
  selector: 'app-pesquisa-pregao-credenciamento-fornecedor',
  templateUrl: './pesquisa-pregao-credenciamento-fornecedor.component.html',
  styleUrls: ['./pesquisa-pregao-credenciamento-fornecedor.component.css'],
  encapsulation: ViewEncapsulation.None,
  providers: [CustomPesquisaComunicatorService]
})
export class PesquisaPregaoCredenciamentoFornecedorComponent extends CustomPesquisaGeneric {

  constructor(public dialogRef: MatDialogRef<PesquisaPregaoCredenciamentoFornecedorComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              @Inject(CustomPesquisaComunicatorService)
              public customPesquisaComunicatorService: CustomPesquisaComunicatorService) {

    super();
  }

  getCustomPesquisaComunicatorService(): CustomPesquisaComunicatorService {
    return this.customPesquisaComunicatorService;
  }


  getDisplayColumnsGrid(): DisplayColumnsGrid[] {
    return [];
  }
}
