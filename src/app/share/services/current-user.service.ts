import { Injectable } from '@angular/core';
import {environment} from "../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";


const API_URL = `${environment.apiUrl}`;
@Injectable({
  providedIn: 'root'
})
export class CurrentUserService {

  constructor(private http: HttpClient) {}

  getCompanyCurrent(user_id: any): Observable<any> {
    return this.http.get(API_URL + `company/${user_id}/details`);
  }
  getCurrentUser(user_id: any): Observable<any> {
    return this.http.get(API_URL + `current-user/${user_id}/details`);
  }
}
