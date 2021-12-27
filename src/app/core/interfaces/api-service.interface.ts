import { Observable } from "rxjs";

export interface IApiService<T> {
  create(object: Partial<T>): Observable<Partial<T>>;
  update(object: Partial<T>): Observable<Partial<T>>;
  delete(id: number): Observable<number>;
  get(): Observable<Array<Partial<T>>>;
  getById(id: number): Observable<Partial<T>>;
}