import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PesquisaPregaoCredenciamentoFornecedorComponent } from './pesquisa-pregao-credenciamento-fornecedor.component';
import { ArquiteturaModule } from '../../../arquitetura/arquitetura.module';

@NgModule({
  imports: [
    ArquiteturaModule,
    CommonModule
  ],
  declarations: [PesquisaPregaoCredenciamentoFornecedorComponent],
  entryComponents: [PesquisaPregaoCredenciamentoFornecedorComponent]
})
export class PesquisaPregaoCredenciamentoFornecedorModule {
}
