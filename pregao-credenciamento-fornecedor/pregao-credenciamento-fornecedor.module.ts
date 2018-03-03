import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CadastroPregaoCredenciamentoFornecedorComponent } from './cadastro-pregao-credenciamento-fornecedor/cadastro-pregao-credenciamento-fornecedor.component';
import { ArquiteturaModule } from '../../arquitetura/arquitetura.module';
import { RouterModule, Routes } from '@angular/router';
import { PesquisaPregaoCredenciamentoFornecedorModule } from '../pregao-credenciamento-fornecedor/pesquisa-pregao-credenciamento-fornecedor/pesquisa-pregao-credenciamento-fornecedor.module';

const ROUTES: Routes = [
  {path: '', component: CadastroPregaoCredenciamentoFornecedorComponent}
];

@NgModule({
  imports: [
    CommonModule,
    ArquiteturaModule,
    PesquisaPregaoCredenciamentoFornecedorModule,
    RouterModule.forChild(ROUTES)
  ],
  declarations: [CadastroPregaoCredenciamentoFornecedorComponent]
})
export class PregaoCredenciamentoFornecedorModule {
}
