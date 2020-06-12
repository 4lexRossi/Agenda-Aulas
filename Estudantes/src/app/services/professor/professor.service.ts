import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Login, Professor } from 'src/app/Shared/professor.interfaces';

const options = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class ProfessorService {

  constructor(private http: HttpClient) { }

  fazerLogin(login: Login) {
    return this.http.post<Login>(`${environment.apiUrl}/login`,login,  options)
      .pipe(tap(data => data))
  }

  save(professor: Professor): Observable<any> {

      return this.http.post(`${environment.apiUrl}/professor`, professor, options)
      .pipe(tap(data => { data }))

  }

}
