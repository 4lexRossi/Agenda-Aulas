import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { CommonModule } from '@angular/common';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { AlunosComponent } from './alunos/alunos.component';
import { AlunoComponent } from './aluno/aluno.component';
import { AtividadeComponent } from './atividade/atividade.component';
import { AtividadesComponent } from './atividades/atividades.component';
import { HomeComponent } from './home/home.component';
import { TurmaComponent } from './turma/turma.component';
import { TurmasComponent } from './turmas/turmas.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DataTablesModule } from 'angular-datatables';
import { RouterModule } from '@angular/router';
import { ProfessorComponent } from './professor/professor.component';
import { LoginComponent } from './login/login.component';


@NgModule({
  declarations: [
    AppComponent,
    AlunosComponent,
    AlunoComponent,
    AtividadeComponent,
    AtividadesComponent,
    TurmaComponent,
    TurmasComponent,
    HomeComponent,
    ProfessorComponent,
    LoginComponent
  ],
  imports: [
    CommonModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    DataTablesModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserModule,
    AppRoutingModule,
    RouterModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
