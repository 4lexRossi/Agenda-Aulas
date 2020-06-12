import { Component, OnInit, ViewChild, AfterViewInit, OnDestroy } from '@angular/core';
import { DataTableDirective } from 'angular-datatables';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Atividade } from '../Shared/atividade.interfaces';
import { Professor } from '../Shared/professor.interfaces';
import { AtividadeService } from '../services/atividades/atividade.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-atividades',
  templateUrl: './atividades.component.html',
  styleUrls: ['./atividades.component.css',
  '../../dist/css/adminlte.min.css',
  '../../plugins/fontawesome-free/css/all.min.css']
})
export class AtividadesComponent implements OnInit, OnDestroy, AfterViewInit  {

  getProf: string = window.localStorage.getItem('prof');

  professor: Professor = JSON.parse( this.getProf);

  @ViewChild(DataTableDirective, { static: false }) datatableElementAtividade: DataTableDirective;
  isDtInitialized = false;
  dtElementAtividade: DataTableDirective;
  dtOptionsAtividade: DataTables.Settings = {
    pagingType: 'simple_numbers',
    pageLength: 10,
    processing: true,
    language: {
      emptyTable: 'Nenhum registro encontrado',
      info: 'Mostrando de _START_ até _END_ de _TOTAL_ registros',
      infoEmpty: 'Mostrando 0 até 0 de 0 registros',
      infoFiltered: '(Filtrados de _MAX_ registros)',
      infoPostFix: '',
      lengthMenu: '_MENU_ resultados por página',
      loadingRecords: 'Carregando...',
      processing: 'Processando...',
      zeroRecords: 'Nenhum registro encontrado',
      search: 'Pesquisar',
      paginate: {
        next: 'Próximo',
        previous: 'Anterior',
        first: 'Primeiro',
        last: 'Último'
      },
      aria: {
        sortAscending: ': Ordenar colunas de forma ascendente',
        sortDescending: ': Ordenar colunas de forma descendente'
      }
    }
  };
  dtInstanceAtividade: DataTables.Api;
  dtTriggerAtividade = new Subject();

  atividades: Atividade[] = [];

  private ngAtividadesUnsubscribe = new Subject();
  private ngDeleteAtividadesUnsubscribe = new Subject();

  constructor(private router: Router,
    private service: AtividadeService,
    private toastr: ToastrService) { }

  ngOnInit(): void {
    this.search()
  }


  search() {


    this.service.getActivities()
      .pipe(takeUntil(this.ngAtividadesUnsubscribe))
      .subscribe(response => {
        const data = response;
        this.atividades = JSON.parse(JSON.stringify(data))  ;

        this.rerender();

      }, err => {

      });
  }


  Logout()
  {
    window.localStorage.getItem('prof')

    window.localStorage.removeItem('prof');

    this.router.navigateByUrl('/login');
  }

  ngAfterViewInit(): void {
    if(this.professor == undefined)
    {
      this.router.navigateByUrl('/login');
    }
    this.dtTriggerAtividade.next();
  }

  confirmDelete(id: string) {
    const isDeleting = confirm('Você realmente deseja apagar esta atividade ?');
    if (!isDeleting) {
      return;
    }

    this.delete(id);
  }

  private delete(id: string) {


    this.service.delete(id)
      .subscribe(_ => {



      }, err => {

      });

      window.setTimeout(() => {

        this.toastr.success('Atividade excluida com sucesso', 'Atividade');
        this.rerender();
        this.search();
      },800);

  }


  rerender(): void {
    this.datatableElementAtividade.dtInstance.then((dtInstance: DataTables.Api) => {
      //dtInstance.clear();
      // dtInstance.draw();
      dtInstance.destroy();
      this.dtTriggerAtividade.next();


    });
  }

  ngOnDestroy(): void {
    this.dtTriggerAtividade.unsubscribe();
    this.ngAtividadesUnsubscribe.next();
    this.ngAtividadesUnsubscribe.complete();
  }

}
