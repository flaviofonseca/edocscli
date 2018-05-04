import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CadastroDependenteComponent } from './cadastro-dependente/cadastro-dependente.component';
import { ArquiteturaModule } from '../../arquiteturamodule/arquitetura.module';
import { RouterModule, Routes } from '@angular/router';
import { PesquisaDependenteModule } from '../dependente/pesquisa-dependente/pesquisa-dependente.module';

const ROUTES: Routes = [
  {path: '', component: CadastroDependenteComponent}
];

@NgModule({
  imports: [
    CommonModule,
    ArquiteturaModule,
    PesquisaDependenteModule,
    RouterModule.forChild(ROUTES)
  ],
  declarations: [CadastroDependenteComponent]
})
export class DependenteModule {
}
