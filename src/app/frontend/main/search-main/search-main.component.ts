import {Component, OnInit} from '@angular/core';
import {CityService} from "../../../share/services/city.service";
import {City} from "../../../share/models/city";
import {LanguageService} from "../../../share/services/language.service";
import {Language} from "../../../share/models/language";
import {FormBuilder, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-search-main',
  templateUrl: './search-main.component.html',
  styleUrls: ['./search-main.component.css']
})
export class SearchMainComponent implements OnInit {

  cities: City[] = [];
  languages: Language[] = [];
  // @ts-ignore
  formSearch:FormGroup

  constructor(private cityService: CityService,
              private languageService: LanguageService,
              private formBuilder:FormBuilder,
  ) {
  }

  ngOnInit(): void {
    this.formSearch= this.formBuilder.group({
      keyword:['',],
      language:['',],
      city:['',]
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
      console.log(this.languages)
    })
  }

  searchJob(){
    const searchField= this.formSearch?.value;
    console.log(searchField);
  }

}
