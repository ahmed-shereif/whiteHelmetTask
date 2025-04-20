import { Inject, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { MonoTypeOperatorFunction, Observable } from 'rxjs';
import { LoginResponse } from '../models/loginResponse';
import { LoginRequest } from '../models/loginRequest';
import { environment } from 'src/environment/environment.dev';



@Injectable({
  providedIn: 'root'
})
export class LoginServiceService {
  pipe(arg0: MonoTypeOperatorFunction<unknown>) {
    throw new Error('Method not implemented.');
  }

  private loginUrl = `${environment.apiBaseUrl}/login`;

  constructor(private http: HttpClient) { }

  login(loginReq: LoginRequest): Observable<LoginResponse> {

    return this.http.post<LoginResponse>(this.loginUrl, loginReq);
  }
}
