import {Injectable} from '@angular/core';
import {environment} from "../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";


const API_URL = `${environment.apiUrl}`;

@Injectable({
  providedIn: 'root'
})
export class JobService {

  constructor(private http: HttpClient) {
  }

  public findJobById(id: any): Observable<any> {
    return this.http.get(API_URL + `job/${id}/details`);
  }

  public updateJob(data: any, id: any): Observable<any> {
    return this.http.post(API_URL + `job/${id}/update`, data);
  }

  public getAllJob(): Observable<any> {
    return this.http.get(API_URL + 'jobs');
  }

  public getFirstFiveJob(): Observable<any> {
    return this.http.get(API_URL + 'jobs/5');
  }

  public searchJobWithoutCity(data: any): Observable<any> {
    return this.http.post(API_URL + 'jobs/search-without-city', data)
  }

  public searchJobWithCity(data: any): Observable<any> {
    return this.http.post(API_URL + 'jobs/search-with-city', data)
  }

  public searchJobByCompany(data: any): Observable<any> {
    return this.http.post(API_URL + 'jobs/search-by-company', data)
  }

  public searchJobByCategory(id: any): Observable<any> {
    return this.http.get(API_URL + `jobs/${id}/search-by-category`);
  }

  public searchJobBySalary(data: any): Observable<any> {
    return this.http.post(API_URL + 'jobs/search-by-salary', data)
  }
}
