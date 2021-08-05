import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {Observable} from "rxjs";


const API_URL = `${environment.apiUrl}`;
@Injectable({
  providedIn: 'root'
})
export class SeekerService {

  constructor(private http: HttpClient) { }

  public getCurrentSeeker(id: any): Observable<any> {
    return this.http.get(API_URL + `seeker/${id}/details`);
  }

  public updateSeeker(data:any, id: any): Observable<any> {
    return this.http.post(API_URL + `seeker/${id}/update`, data);
  }

  public apply(idSeeker: any, idJob: any): Observable<any> {
    return this.http.get(API_URL + `${idSeeker}/seeker/${idJob}/job`);
  }
  public getAllJobsApplied(id: any): Observable<any> {
    return this.http.get(API_URL + `seeker/${id}/jobs-applied`);
  }

}
