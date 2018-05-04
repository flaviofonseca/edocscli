import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PesquisaDependenteComponent } from './pesquisa-dependente.component';
import { ArquiteturaModule } from '../../../arquiteturamodule/arquitetura.module';

@NgModule({
  imports: [
    ArquiteturaModule,
    CommonModule
  ],
  declarations: [PesquisaDependenteComponent],
  entryComponents: [PesquisaDependenteComponent]
})
export class PesquisaDependenteModule {
}
