import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Aluno, BaseResponse } from 'src/app/Shared/aluno.interfaces';

const options = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class AlunoService {

  constructor(private http: HttpClient) { }

  getAlunos(): Observable<BaseResponse<Aluno[]>> {
    return this.http.get<BaseResponse<Aluno[]>>(`${environment.apiUrl}/estudante`, options)
      .pipe(tap(data => data))
  }

  getAluno(id: string) {
    return this.http.get<Aluno>(`${environment.apiUrl}/estudante/${id}`, options)
      .pipe(tap(data => data))
  }

  save(aluno: Aluno): Observable<any> {


    if (aluno.id === '') {
      return this.http.post(`${environment.apiUrl}/estudante`, aluno, options)
      .pipe(tap(data => { data }))
    } else {
      return this.http.put(`${environment.apiUrl}/estudante`, aluno, options)
      .pipe(tap(data => { data }))
    }
  }

  delete(id: string) {
    return this.http.delete(`${environment.apiUrl}/estudante/${id}`, options)

  }
}
