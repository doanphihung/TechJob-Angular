import {Injectable} from '@angular/core';
import {environment} from "../../../environments/environment";
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";

const API_URL = `${environment.apiUrl}`;

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) {
  }

  public employerRegister(data: any): Observable<any> {
    return this.http.post(API_URL + 'employer/register', data);
  }

  public login(user: any): Observable<any> {
    return this.http.post(API_URL + 'login', user);
  }


}
