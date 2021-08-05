import {Component, OnInit, Output, EventEmitter, Input} from '@angular/core';
import {CityService} from "../../../share/services/city.service";
import {City} from "../../../share/models/city";
import {LanguageService} from "../../../share/services/language.service";
import {Language} from "../../../share/models/language";
import {FormBuilder, FormGroup} from "@angular/forms";
import {SearchDataService} from "../../../share/services/search-data.service";

@Component({
  selector: 'app-search-main',
  templateUrl: './search-main.component.html',
  styleUrls: ['./search-main.component.css']
})
export class SearchMainComponent implements OnInit {

  cities: City[] = [];
  languages: Language[] = [];
  // @ts-ignore
  formSearch1:FormGroup
  // @ts-ignore
  formSearch2:FormGroup
  @Output() searchField= new EventEmitter;
  @Output() searchCompanyField= new EventEmitter<string>();

  searchDataTransfer: any;

  constructor(private cityService: CityService,
              private languageService: LanguageService,
              private formBuilder1:FormBuilder,
              private formBuilder2:FormBuilder,
              private dataSearchService: SearchDataService,
  ) {
  }

  ngOnInit(): void {
    this.getAllCity();
    this.getAllLanguage()

    this.dataSearchService.currentSearchData.subscribe(data => this.searchDataTransfer = data);

    this.formSearch1= this.formBuilder1.group({
      keyword:['',],
      language:['',],
      city:['',]
    })

    this.formSearch2=this.formBuilder2.group({
      companyKeyword:['',],
    })
    this.updateFormSearch();

  }

  updateFormSearch(){
    if(this.searchDataTransfer){
      this.formSearch1.patchValue(this.searchDataTransfer)
    }
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

  searchJob(){
    const searchField= this.formSearch1?.value;
    this.searchField.emit(searchField);
  }

  searchCompany(){
    const searchCompanyField= this.formSearch2?.value;
    this.searchCompanyField.emit(searchCompanyField);
  }

}
