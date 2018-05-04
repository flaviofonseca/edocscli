import { Component, Inject, ViewEncapsulation } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import {
  CustomPesquisaComunicatorService
} from '../../../arquiteturamodule/custom-components/custom-pesquisa/custom-pesquisa-comunicator.service';
import { CustomPesquisaGeneric } from '../../../arquiteturamodule/custom-components/custom-pesquisa/custom-pesquisa-generic';
import { DisplayColumnsGrid } from '../../../arquiteturamodule/custom-components/custom-grid/display-columns-grid';

@Component({
  selector: 'app-pesquisa-dependente',
  templateUrl: './pesquisa-dependente.component.html',
  styleUrls: ['./pesquisa-dependente.component.css'],
  encapsulation: ViewEncapsulation.None,
  providers: [CustomPesquisaComunicatorService]
})
export class PesquisaDependenteComponent extends CustomPesquisaGeneric {

  constructor(public dialogRef: MatDialogRef<PesquisaDependenteComponent>,
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
