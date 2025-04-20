import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LoginResponse } from '../models/loginResponse';
import { LoginRequest } from '../models/loginRequest';
import { environment } from 'src/environment/environment.dev';



@Injectable({
  providedIn: 'root'
})
export class LoginServiceService {

  private loginUrl = `${environment.apiBaseUrl}/login`;

  constructor(private http: HttpClient) { }

  login(loginReq: LoginRequest): Observable<LoginResponse> {

    return this.http.post<LoginResponse>(this.loginUrl, loginReq);
  }
}
