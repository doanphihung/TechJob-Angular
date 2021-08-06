import {Injectable} from '@angular/core';
import {environment} from "../../../environments/environment";
import {Observable} from "rxjs";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import jwtDecode from "jwt-decode";
const API_URL = `${environment.apiUrl}`;

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) {}

  public setHeaders() {
    const token = localStorage.getItem('token');
    let headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return {
      headers: headers
    }
  }

  public employerRegister(data: any): Observable<any> {
    return this.http.post(API_URL + 'employer/register', data);
  }

  public seekerRegister(data: any): Observable<any> {
    return this.http.post(API_URL + 'seeker/register', data);
  }

  public login(user: any): Observable<any> {
    return this.http.post(API_URL + 'login', user);
  }

  public logout(): Observable<any> {

    return this.http.post(API_URL + 'logout', null, this.setHeaders());
  }

  public isLoggedIn() {
    return localStorage.getItem('token');
  }

  public isAdmin() {
    let token = localStorage.getItem('token');
    if (token) {
      let tokenDecode = jwtDecode(token);
      // @ts-ignore
      if (tokenDecode.user_role == 0) {
        return true;
      }
    }
    return false;
  }

  public isSeeker() {
    let token = localStorage.getItem('token');
    if (token) {
      let tokenDecode = jwtDecode(token);
      // @ts-ignore
      if (tokenDecode.user_role == 1) {
        return true;
      }
    }
    return false;
  }

  public isEmployer() {
    let token = localStorage.getItem('token');
    if (token) {
      let tokenDecode = jwtDecode(token);
      // @ts-ignore
      if (tokenDecode.user_role == 2) {
        return true;
      }
    }
    return false;
  }

}
