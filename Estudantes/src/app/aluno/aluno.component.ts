import { Component, OnInit, AfterViewInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';


import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { Aluno } from '../Shared/aluno.interfaces';
import { Atividade } from '../Shared/atividade.interfaces';
import { AtividadeService } from '../services/atividades/atividade.service';
import { AlunoService } from '../services/alunos/aluno.service';
import { Professor } from '../Shared/professor.interfaces';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-aluno',
  templateUrl: './aluno.component.html',
  styleUrls: ['./aluno.component.css',
   '../../plugins/fontawesome-free/css/all.min.css',
   '../../dist/css/adminlte.min.css'
  ]
})
export class AlunoComponent implements OnInit, AfterViewInit {

  getProf: string = window.localStorage.getItem('prof');

  professor: Professor = JSON.parse( this.getProf);

  private ngGetAlunoUnsubscribe = new Subject();

  alunoForm: FormGroup;

  atividades: Atividade[] = [];
  atividadesSelecionadas: Atividade[] = [];

  aluno: Aluno = {

  id: "",
  nome: "",
  nomeResponsavel: "",
  dataNascimento: "",
  turma:"",
  sexo: "",
  email: "",
  atividades: []

  };

  constructor(private router: Router,
              private route: ActivatedRoute,
              private ativadeService: AtividadeService,
              private alunoService: AlunoService,
              private toastr: ToastrService
    ) { }

  ngOnInit(): void {

this.search();
  this.alunoForm = new FormGroup({
    nome: new FormControl(null),
    nomeResponsavel: new FormControl(null),
    dataNascimento: new FormControl(null),
    turma: new FormControl(null),
    sexo: new FormControl(null),
    email: new FormControl(null),
    atividades: new FormControl(null)
  });

  const id = this.route.snapshot.params['id'];

  if(id)
  {
    this.getAluno(id)
  }

  }

  ngAfterViewInit() {
    if(this.professor == undefined)
    {
      this.router.navigateByUrl('/login');
    }
  }

  getAluno(id: string) {
    this.alunoService.getAluno(id)
      .subscribe(response => {
         const data = response;
        this.atividadesSelecionadas = data.atividades
        this.aluno = JSON.parse(JSON.stringify(response))
        this.alunoForm.controls['nome'].setValue(this.aluno.nome)
        this.alunoForm.controls['nomeResponsavel'].setValue(this.aluno.nomeResponsavel)
        this.alunoForm.controls['dataNascimento'].setValue(this.aluno.dataNascimento)
        this.alunoForm.controls['turma'].setValue(this.aluno.turma)
        this.alunoForm.controls['sexo'].setValue(this.aluno.sexo)
        this.alunoForm.controls['email'].setValue(this.aluno.email)
        this.alunoForm.controls['descricao'].setValue(this.aluno.email)






      }, err => {

      });


  }

  addAtividades()
  {
   const data = this.alunoForm.get('atividades').value;

    const atividade = this.atividades.find(a => a.id == data)

    this.atividadesSelecionadas.push(atividade);
    this.alunoForm.controls['atividades'].setValue('')
  }

  removeAtividades(item){

    const index = this.atividadesSelecionadas.indexOf(item,0);

    this.atividadesSelecionadas.splice(index, 1);

  }

  Logout()
  {
    window.localStorage.getItem('prof')

    window.localStorage.removeItem('prof');

    this.router.navigateByUrl('/login');
  }




  search() {


    this.ativadeService.getActivities()
      .pipe(takeUntil(this.ngGetAlunoUnsubscribe))
      .subscribe(response => {
        const data = response;
        this.atividades = JSON.parse(JSON.stringify(data))  ;

      }, err => {

      });
  }

  save() {

    if (!this.aluno.id) {
      this.aluno = Object.assign({}, {
        id: "",
        nome: this.alunoForm.get('nome').value,
        nomeResponsavel: this.alunoForm.get('nomeResponsavel').value,
        dataNascimento: this.alunoForm.get('dataNascimento').value,
        turma:this.alunoForm.get('turma').value,
        sexo: this.alunoForm.get('sexo').value,
        email: this.alunoForm.get('email').value,
        atividades: this.atividadesSelecionadas
      });
    } else {
      this.aluno.nome = this.alunoForm.get('nome').value;
      this.aluno.nomeResponsavel = this.alunoForm.get('nomeResponsavel').value;
      this.aluno.dataNascimento = this.alunoForm.get('dataNascimento').value;
      this.aluno.turma = this.alunoForm.get('turma').value;
      this.aluno.sexo = this.alunoForm.get('sexo').value;
      this.aluno.email = this.alunoForm.get('email').value;
      this.aluno.atividades = this.atividadesSelecionadas;

    }


    this.alunoService.save(this.aluno)
      .pipe(takeUntil(this.ngGetAlunoUnsubscribe))
      .subscribe(_ => {


      }, err => {
      });

      this.toastr.success('Aluno cadastrado com sucesso', 'Aluno');
      this.router.navigateByUrl('/alunos').then(e => {
        if (e) {
          console.log("Navigation is successful!");
        } else {
          console.log("Navigation has failed!");
        }
      });
  }


}
