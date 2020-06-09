import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { AlunosComponent } from './alunos/alunos.component';
import { AlunoComponent } from './aluno/aluno.component';
import { AtividadeComponent } from './atividade/atividade.component';
import { AtividadesComponent } from './atividades/atividades.component';
import { HomeComponent } from './home/home.component';
import { TurmaComponent } from './turma/turma.component';
import { TurmasComponent } from './turmas/turmas.component';

@NgModule({
  declarations: [
    AppComponent,
    AlunosComponent,
    AlunoComponent,
    AtividadeComponent,
    AtividadesComponent,
    TurmaComponent,
    TurmasComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
