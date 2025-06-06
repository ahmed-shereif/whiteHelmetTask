// src/app/services/base-api.service.ts
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PaginatedResponse } from './models/pagination-response';
import { environment } from 'src/environment/environment.dev';
import { filterParameters } from '@shared/table/dynamic-table.component';
import { ApiResponse } from './models/api-response';


export abstract class BaseApiService<K extends string,T> {

  public serviceUrl!: string;
  public baseUrl = `${environment.apiBaseUrl}/`;

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

  create(data: Partial<T>): Observable<ApiResponse<K,T>> {
    return this.http.post<ApiResponse<K, T>>(this.serviceUrl+'/create', data);
  }

  update(id: number, data: Partial<T>): Observable<ApiResponse<K,T>> {
    return this.http.put<ApiResponse<K,T>>(`${this.serviceUrl}/update`, {...data,id});
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
