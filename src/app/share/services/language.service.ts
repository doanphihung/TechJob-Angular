import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";


const API_URL = `${environment.apiUrl}`;
@Injectable({
  providedIn: 'root'
})
export class LanguageService {

  constructor(private http: HttpClient) { }

  public getAll(): Observable<any> {
    return this.http.get(API_URL + 'languages');
  }
}
