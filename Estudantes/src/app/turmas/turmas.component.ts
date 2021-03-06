import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Professor } from '../Shared/professor.interfaces';
import { Router } from '@angular/router';

@Component({
  selector: 'app-turmas',
  templateUrl: './turmas.component.html',
  styleUrls: ['./turmas.component.css',
  '../../dist/css/adminlte.min.css',
  '../../plugins/fontawesome-free/css/all.min.css']
})
export class TurmasComponent implements OnInit, AfterViewInit {

  getProf: string = window.localStorage.getItem('prof');

  professor: Professor = JSON.parse( this.getProf);

  constructor(private router: Router) { }

  ngOnInit(): void {
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

}
