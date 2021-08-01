import { Injectable } from '@angular/core';
import {environment} from "../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";


const API_URL = `${environment.apiUrl}`;

@Injectable({
  providedIn: 'root'
})
export class JobService {

  constructor(private http: HttpClient) { }

  public findJobById(id: any): Observable<any> {
    return this.http.get(API_URL + `job/${id}/details`);
  }

  public updateJob(data:any, id: any): Observable<any> {
    return this.http.post(API_URL + `job/${id}/update`, data);
  }
}
