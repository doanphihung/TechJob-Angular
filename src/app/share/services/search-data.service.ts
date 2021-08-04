import { Injectable } from '@angular/core';
import {BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class SearchDataService {

  private searchDataSource=new BehaviorSubject(null);
  currentSearchData= this.searchDataSource.asObservable();

  constructor() { }

  changeSearchData(searchData:any ) {
    this.searchDataSource.next(searchData)
  }
}
