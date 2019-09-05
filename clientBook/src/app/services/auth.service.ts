import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { map } from 'rxjs/operators';
import { isNullOrUndefined } from 'util';

import { User } from '../models/User';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  URL_API: String = 'http://localhost:3000/api';
  headers: HttpHeaders = new HttpHeaders ({
    "Content-Type": "application/json"
  })

  constructor(
    private http: HttpClient,
  ) {}

  registerUser(user: User){
    return this.http.post<User>(`${this.URL_API}/Users`, user, {headers: this.headers})
      .pipe( map(data => data));
  }

  loginUser(user: User): Observable<any>{
    return this.http.post<User>(`${this.URL_API}/Users/login?include=user`, user, {headers: this.headers})
      .pipe( map(data => data));
  }

  setUser(user: User){
    let user_string = JSON.stringify(user);
    localStorage.setItem('currentUser', user_string)
  }

  setToken(token){
    localStorage.setItem("accessToken", token);
  }

  getToken(){
    return localStorage.getItem("accessToken");
  }

  getCurrentUser(): User{
    let user_string = localStorage.getItem("currentUser");
    if(!isNullOrUndefined (user_string)){
      let user: User = JSON.parse(user_string);
      return user;
    }
    else{
      return null;
    }
  }

  logoutUser(){
    let accessToken = localStorage.getItem('accessToken');
    localStorage.removeItem("accessToken");
    localStorage.removeItem("currentUser");
    return this.http.post(`${this.URL_API}/Users/logout?access_token=${accessToken}`, {headers: this.headers})
  }
}
