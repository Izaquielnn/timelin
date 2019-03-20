import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { User } from '../models/user.model';
import  config  from '../config';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) {}

  getUser(): Observable<User> {
    const url = `${config.BASE_URL}/users/me`;
    return this.http.get(url);
  }

  updateUser(User): Observable<User>{
    const url = `${config.BASE_URL}/users/me`;
    return this.http.put(url, User);
  }
}
