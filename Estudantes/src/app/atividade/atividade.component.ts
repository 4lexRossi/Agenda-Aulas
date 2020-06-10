import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';


import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { Atividade } from '../Shared/atividade.interfaces';
import { AtividadeService } from '../services/atividades/atividade.service';

@Component({
  selector: 'app-atividade',
  templateUrl: './atividade.component.html',
  styleUrls: ['./atividade.component.css',
   '../../dist/css/adminlte.min.css',
  '../../plugins/fontawesome-free/css/all.min.css']
})
export class AtividadeComponent implements OnInit {

  private ngGetActivityUnsubscribe = new Subject();

  atividadeForm: FormGroup;

  atividade: Atividade = {
    id: '',
    nome: '',
    descricao: ''

  };

  constructor(private router: Router,
    private route: ActivatedRoute,
    private service: AtividadeService) { }

  ngOnInit(): void {

    this.atividadeForm = new FormGroup({
      nome: new FormControl(null),
      descricao: new FormControl(null)
    });

  }


  getActivity(nome: string) {
    this.service.getActivity(nome)
      .pipe(takeUntil(this.ngGetActivityUnsubscribe))
      .subscribe(response => {
        this.atividade = response.data;

      }, err => {

      });
  }

  save() {


    if (!this.atividade.id) {
      this.atividade = Object.assign({}, {
        id:'',
        nome: this.atividadeForm.get('nome').value,
        descricao: this.atividadeForm.get('descricao').value
      });
    } else {
      this.atividade.nome = this.atividadeForm.get('nome').value;
      this.atividade.descricao =  this.atividadeForm.get('descricao').value;

    }


    this.service.save(this.atividade)
      .pipe(takeUntil(this.ngGetActivityUnsubscribe))
      .subscribe(_ => {

      }, err => {
      });
  }



}
