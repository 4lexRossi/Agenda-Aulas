import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Atividade, BaseResponse } from 'src/app/Shared/atividade.interfaces';

const options = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class AtividadeService {

  constructor(private http: HttpClient) { }


  getActivities(): Observable<BaseResponse<Atividade[]>> {
    return this.http.get<BaseResponse<Atividade[]>>(`${environment.apiUrl}/atividade`, options)
      .pipe(tap(data => data))
  }

  getActivity(id: string): Observable<BaseResponse<Atividade>> {
    return this.http.get<BaseResponse<Atividade>>(`${environment.apiUrl}/atividade/${id}`, options)
      .pipe(tap(data => data))
  }

  save(activity: Atividade): Observable<any> {


    if (activity.id === '') {
      return this.http.post(`${environment.apiUrl}/atividade`, activity, options)
      .pipe(tap(data => { data }))
    } else {
      return this.http.put(`${environment.apiUrl}/atividade`, activity, options)
      .pipe(tap(data => { data }))
    }
  }

  delete(id: string) {
    return this.http.delete(`${environment.apiUrl}/atividade/${id}`, options)

  }


}
