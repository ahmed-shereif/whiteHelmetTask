import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BaseApiService } from '@shared/services/baseApi/base-api.service';
import { Attraction } from '../models/attractions';
import { ApiResponse } from '@shared/services/baseApi/models/api-response';
import { Observable } from 'rxjs';
import { environment } from 'src/environment/environment.dev';

@Injectable({
  providedIn: 'root'
})
export class AttractionService extends BaseApiService<'data', Attraction> {
  public url = `${environment.apiBaseUrl}/`;

  constructor(http: HttpClient) {
    super(http, 'attractions');
  }
  override create(data: Partial<Attraction>): Observable<ApiResponse<'data', Attraction>> {
    return this.http.post<ApiResponse<'data', Attraction>>(this.url + 'auth/attractions/create', data);
  }

  override update(id: number, data: Partial<Attraction>): Observable<ApiResponse<'data', Attraction>> {
    return this.http.put<ApiResponse<'data', Attraction>>(`${this.url}auth/attractions/update`, { ...data, id });
  }
}
