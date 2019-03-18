import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { User } from '../models/user.model';
import  config  from '../config';

@Injectable()
export class AuthService {

  constructor(private http: HttpClient) {}

  getToken(): string {
    return localStorage.getItem('token');
  }

  logIn(email: string, password: string): Observable<string> {
    const url = `${config.BASE_URL}/login`;
    return this.http.post(url, {email, password}, {responseType: 'text'})
  }

  signUp(name: string, email: string, password: string): Observable<User> {
    const url = `${config.BASE_URL}/users`;
    return this.http.post<User>(url, {name, email, password});
  }
}