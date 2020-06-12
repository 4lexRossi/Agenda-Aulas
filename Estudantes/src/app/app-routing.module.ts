import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes, PreloadAllModules } from '@angular/router';
import { AlunosComponent } from './alunos/alunos.component';
import { AlunoComponent } from './aluno/aluno.component';
import { HomeComponent } from './home/home.component';
import { AtividadeComponent } from './atividade/atividade.component';
import { AtividadesComponent } from './atividades/atividades.component';
import { TurmaComponent } from './turma/turma.component';
import { TurmasComponent } from './turmas/turmas.component';
import { LoginComponent } from './login/login.component';
import { ProfessorComponent } from './professor/professor.component';

const routes: Routes = [
  {
    path: 'Home',
    component: HomeComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'professor',
    component: ProfessorComponent
  },
  {
    path: 'atividade',
    component: AtividadeComponent
  },
  {
    path: 'atividade/:id',
    component: AtividadeComponent
  },
  {
    path: 'atividades',
    component: AtividadesComponent
  },
  {
    path: 'alunos',
    component: AlunosComponent
  },
  {
    path: 'aluno',
    component: AlunoComponent
  },
  {
    path: 'aluno/:id',
    component: AlunoComponent
  },
  {
    path: 'turmas',
    component: TurmasComponent
  },
  {
    path: 'turma',
    component: TurmaComponent
  },
  {
    path: '**',
    redirectTo: 'login'
  }
]

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes,
      {
        onSameUrlNavigation: 'reload',
        preloadingStrategy: PreloadAllModules,
        enableTracing: false,
        useHash: true
      })
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
