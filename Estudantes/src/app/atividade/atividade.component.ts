import { Component, OnInit, AfterViewInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';


import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { Atividade } from '../Shared/atividade.interfaces';
import { AtividadeService } from '../services/atividades/atividade.service';
import { Professor } from '../Shared/professor.interfaces';

@Component({
  selector: 'app-atividade',
  templateUrl: './atividade.component.html',
  styleUrls: ['./atividade.component.css',
   '../../dist/css/adminlte.min.css',
  '../../plugins/fontawesome-free/css/all.min.css']
})
export class AtividadeComponent implements OnInit, AfterViewInit {

  getProf: string = window.localStorage.getItem('prof');

  professor: Professor = JSON.parse( this.getProf);

  private ngGetActivityUnsubscribe = new Subject();

  atividadeForm: FormGroup;

  atividade: Atividade = {
    id: '',
    nome: '',
    descricao: ''

  };

  constructor(private router: Router,
    private route: ActivatedRoute,
    private service: AtividadeService,
    private toastr: ToastrService) { }

  ngOnInit(): void {

    this.atividadeForm = new FormGroup({
      nome: new FormControl(null),
      descricao: new FormControl(null)
    });

    const id = this.route.snapshot.params['id'];

    if(id)
    {
      this.getActivity(id)
    }

  }

  ngAfterViewInit() {
    if(this.professor == undefined)
    {
      this.router.navigateByUrl('/login');
    }
  }

  Logout()
  {
    window.localStorage.getItem('prof')

    window.localStorage.removeItem('prof');

    this.router.navigateByUrl('/login');
  }

  getActivity(id: string) {
    this.service.getActivity(id)
      .pipe(takeUntil(this.ngGetActivityUnsubscribe))
      .subscribe(response => {
        const data = response;
        this.atividade = JSON.parse(JSON.stringify(data))

        this.atividadeForm.controls['nome'].setValue(this.atividade.nome)
        this.atividadeForm.controls['descricao'].setValue(this.atividade.descricao)

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

      this.toastr.success( 'Atividade Cadastrada com sucesso','Atividade');
       window.setTimeout(() => {

          this.router.navigateByUrl('/atividades').then(e => {
            if (e) {
              console.log("Navigation is successful!");
            } else {
              console.log("Navigation has failed!");
            }
          });
        },2000);
  }
}

