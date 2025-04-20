// src/app/services/base-api.service.ts
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PaginatedResponse } from './models/pagination-response';
import { environment } from 'src/environment/environment.dev';


export abstract class BaseApiService<T> {

  public serviceUrl!: string;
  private baseUrl = `${environment.apiBaseUrl}/`;

  constructor(protected http: HttpClient, protected path: string) {
    this.serviceUrl = this.baseUrl + path
  }

  getAll(
    search?: string,
    page: number = 1,
    perPage: number = 10,
    sortColumn?: string,
    sortOrder?: 'asc' | 'desc'
  ): Observable<PaginatedResponse<T>> {
    let params = new HttpParams()
      .set('page', page.toString())
      .set('per_page', perPage.toString());

    if (search) params = params.set('search', search);
    if (sortColumn && sortOrder) {
      params = params.set('sort_column', sortColumn).set('sort_order', sortOrder);
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

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.serviceUrl}/${id}`);
  }
}
