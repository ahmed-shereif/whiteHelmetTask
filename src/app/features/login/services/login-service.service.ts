import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { LoginResponse } from '../models/loginResponse';
import { LoginRequest } from '../models/loginRequest';
import { environment } from 'src/environment/environment.dev';
import { User } from '../../users/models/user';



@Injectable({
  providedIn: 'root'
})
export class LoginService {
  public userSubject = new BehaviorSubject<any >(null);
  public user$ = this.userSubject.asObservable(); // Expose as Observable
  private loginUrl = `${environment.apiBaseUrl}/login`;

  constructor(private http: HttpClient) { }

  login(loginReq: LoginRequest): Observable<LoginResponse> {

    return this.http.post<LoginResponse>(this.loginUrl, loginReq);
  }

  getCurrentUser(): LoginResponse | null {
    return this.userSubject.value;
  }


  logout(): void {
    this.userSubject.next(null);
    sessionStorage.clear();
  }
}
