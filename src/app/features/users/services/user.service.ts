import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BaseApiService } from '@shared/services/baseApi/base-api.service';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService extends BaseApiService<User> {

  constructor(http: HttpClient) {
    super(http, 'api/users');
  }
}
