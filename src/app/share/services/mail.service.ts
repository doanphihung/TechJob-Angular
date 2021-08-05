import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../../environments/environment";

const API_URL = `${environment.apiUrl}`;
@Injectable({
  providedIn: 'root'
})
export class MailService {

  constructor(private http: HttpClient) { }

  public forwardJobMail(data:any, id: any): Observable<any> {
    return this.http.post(API_URL + `forward/${id}/job`, data);
  }

  public verifyEmail(confirmation_code: any): Observable<any> {
    // @ts-ignore
    return this.http.post(API_URL + `verify-email/${confirmation_code}`);
  }

}
