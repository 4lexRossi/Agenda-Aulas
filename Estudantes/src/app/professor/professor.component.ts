import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';


import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { Professor } from '../Shared/professor.interfaces';
import { ProfessorService } from '../services/professor/professor.service';

@Component({
  selector: 'app-professor',
  templateUrl: './professor.component.html',
  styleUrls: ['./professor.component.css']
})
export class ProfessorComponent implements OnInit {

  private ngGetAlunoUnsubscribe = new Subject();

  professorForm: FormGroup;

  professor: Professor = {
    id:'',
    nome: '',
    sobreNome: '',
    email: '',
    senha:''
  };

  constructor(private router: Router,
              private professorService: ProfessorService) { }

  ngOnInit(): void {
    this.professorForm = new FormGroup({
      nome: new FormControl(null),
      sobrenome: new FormControl(null),
      email: new FormControl(null),
      senha : new FormControl(null),
      confirmarSenha: new FormControl(null),

    });

  }


  save() {

    const getSenha = this.professorForm.get('senha').value
    const getConfirmar = this.professorForm.get('confirmarSenha').value

    if (getSenha === getConfirmar &&
      (getSenha !== null || getConfirmar !== null))
    {

    this.professor = Object.assign({}, {
      id: '',
      nome: this.professorForm.get('nome').value,
      sobreNome: this.professorForm.get('sobrenome').value,
      email: this.professorForm.get('email').value,
      senha: this.professorForm.get('senha').value,

    });

    this.professorService.save(this.professor)
      .pipe(takeUntil(this.ngGetAlunoUnsubscribe))
      .subscribe(_ => {


      }, err => {
      });

    this.router.navigateByUrl('/login').then(e => {
        if (e) {
          console.log("Navigation is successful!");
        } else {
          console.log("Navigation has failed!");
        }
      });
    }
  }
}
