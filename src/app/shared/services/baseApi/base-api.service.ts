// src/app/services/base-api.service.ts
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PaginatedResponse } from './models/pagination-response';
import { environment } from 'src/environment/environment.dev';
import { filterParameters } from '@shared/table/dynamic-table.component';


export abstract class BaseApiService<T> {

  public serviceUrl!: string;
  private baseUrl = `${environment.apiBaseUrl}/`;

  constructor(protected http: HttpClient, protected path: string) {
    this.serviceUrl = this.baseUrl + path
  }

  getAll(param: filterParameters): Observable<PaginatedResponse<T>> {
    let params = new HttpParams()
      .set('page', param.pageIndex.toString())
      .set('per_page', param.perPage.toString());

    if (param.search) params = params.set('search', param.search);
    if (param.sortColumn && param.sortOrder) {
      params = params.set('sort_column', param.sortColumn).set('sort_order', param.sortOrder);
    }

    return this.http.get<PaginatedResponse<T>>(this.serviceUrl, { params });
  }

  getById(id: number): Observable<T> {
    return this.http.get<T>(`${this.serviceUrl}/${id}`);
  }

  create(data: Partial<T>): Observable<T> {
    return this.http.post<T>(this.serviceUrl, data);
  }

  update(id: number, data: Partial<T>): Observable<T> {
    return this.http.put<T>(`${this.serviceUrl}/${id}`, data);
  }

  delete(id: number):any {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const body = { id };

    return this.http.request('DELETE', `${this.serviceUrl}/delete`, {
      headers,
      body
    });
  }
}
