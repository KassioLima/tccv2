import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IApiService } from 'src/app/core/interfaces/api-service.interface';
import { environment } from 'src/environments/environment';

@Injectable()
export class SchedulingTypeService implements IApiService<Object> {

  private readonly API_URL = `${environment.API}/backoffice/schedulingType`;

  constructor(private http: HttpClient) { }

  get(): Observable<Object[]> {
    return this.http.get<Object[]>(this.API_URL);
  }

  getById(id: number): Observable<Object> {
    return this.http.get<Object>(`${this.API_URL}/${id}`);
  }

  create(object: Object) {
    return this.http.post(this.API_URL, object);
  }

  update(object: Object) {
    return this.http.put(this.API_URL, object);
  }

  delete(id: number) {
    return this.http.delete<number>(`${this.API_URL}/${id}`);
  }
}
