import { Injectable } from '@angular/core';
import {BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class CategoryDataService {

  private categoryDataSource=new BehaviorSubject(null);
  currentCategoryData= this.categoryDataSource.asObservable();

  constructor() { }

  changeCategoryData(categoryData:any ) {
    this.categoryDataSource.next(categoryData)
  }
}
