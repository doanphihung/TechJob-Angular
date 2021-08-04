import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {CityService} from "../../../share/services/city.service";
import {LanguageService} from "../../../share/services/language.service";
import {City} from "../../../share/models/city";
import {Language} from "../../../share/models/language";
import {Subscription} from "rxjs";
import {SearchDataService} from "../../../share/services/search-data.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  // @ts-ignore
  formSearchJob: FormGroup;
  // @ts-ignore
  formSearchCompany: FormGroup;
  cities: City[] = [];
  languages: Language[] = [];

  searchData:any;
  // @ts-ignore
  subscription: Subscription;

  constructor(private cityService: CityService,
              private languageService: LanguageService,
              private formBuilder1: FormBuilder,
              private formBuilder2: FormBuilder,
              private dataSearchService:SearchDataService,
              private router:Router) {
  }

  ngOnInit(): void {

    this.subscription=this.dataSearchService.currentSearchData.subscribe(data=>this.searchData=data)

    this.formSearchJob = this.formBuilder1.group({
      keyword: ['',],
      language: ['',],
      city: ['',]
    })

    this.formSearchCompany = this.formBuilder2.group({
      companyKeyword: ['',],
    })

    this.getAllCity();
    this.getAllLanguage()
  }

  getAllCity() {
    this.cityService.getAll().subscribe(res => {
      this.cities = res.cities;
    })
  }

  getAllLanguage() {
    this.languageService.getAll().subscribe(res=>{
      this.languages=res.languages;
    })
  }

  search(){
    const searchData= this.formSearchJob?.value
    this.dataSearchService.changeSearchData(searchData);
    this.router.navigate(['/page/list'])
  }

}
