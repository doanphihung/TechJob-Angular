import {Injectable} from '@angular/core';
import {environment} from "../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

const API_URL = `${environment.apiUrl}`;

@Injectable({
  providedIn: 'root'
})
export class EmployerService {

  constructor(private http: HttpClient) {
  }

  public findById(id: any): Observable<any> {
    return this.http.get(API_URL + `company/${id}/details`);
  }

  public update(data:any, id: any): Observable<any> {
    return this.http.post(API_URL + `company/${id}/update`, data);
  }

  public postJob(data:any, id: any): Observable<any> {
    return this.http.post(API_URL + `company/${id}/post`, data);
  }

  public getAllJob(id: any): Observable<any> {
    return this.http.get(API_URL + `company/${id}/list-job`);
  }

  public getAllEmployer(): Observable<any> {
    return this.http.get(API_URL + 'companies');
  }


  //ADMIN
  public getAllEmployerAdmin(): Observable<any> {
    return this.http.get(API_URL + 'admin/companies');
  }
  public employerActive(id: any): Observable<any> {
    return this.http.get(API_URL + `admin/companies/${id}/change-active`)
  }

  public employerUnActive(id: any): Observable<any> {
    return this.http.get(API_URL + `admin/companies/${id}/change-unActive`)
  }
}
