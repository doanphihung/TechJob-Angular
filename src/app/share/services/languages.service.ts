import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {Observable} from "rxjs";

const API_URL = `${environment.apiUrl}`;
@Injectable({
  providedIn: 'root'
})
export class LanguagesService {

  constructor(private http: HttpClient) {}
  public getAllLanguage(): Observable<any> {
    return this.http.get(API_URL + 'languages');
  }

}
