import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {City} from "../../../../share/models/city";
import {Router} from "@angular/router";
import {CityService} from "../../../../share/services/city.service";

@Component({
  selector: 'app-employer-register',
  templateUrl: './employer-register.component.html',
  styleUrls: ['./employer-register.component.css']
})
export class EmployerRegisterComponent implements OnInit {

  formRegister!: FormGroup
  cities: City[] = [];
  constructor(private formBuilder: FormBuilder,
              private router: Router,
              private cityService: CityService) {
  }

  ngOnInit(): void {
    this.formRegister = this.formBuilder.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(32)]],
      city_id: [''],
      employees: [''],
      map_link: [''],
    });
    this.getAllCity();
  }


  public submit() {
    console.log(this.formRegister.value);
  }

  public getAllCity() {
    this.cityService.getAll().subscribe((res) => {
      this.cities = res;
    }, (error) => {console.log(error)},);
  }

  get name() {
    return this.formRegister?.get('name')
  }
  get email() {
    return this.formRegister?.get('email')
  }

}
