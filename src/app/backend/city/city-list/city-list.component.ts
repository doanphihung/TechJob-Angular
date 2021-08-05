import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { City } from 'src/app/share/models/city';
import { EmployerService } from 'src/app/share/services/employer.service';

@Component({
  selector: 'app-city-list',
  templateUrl: './city-list.component.html',
  styleUrls: ['./city-list.component.css']
})
export class CityListComponent implements OnInit {
  cities: City[] = [];
  constructor(private employerService: EmployerService,
    private router: Router) { }

  ngOnInit(): void {
    this.getAllCity();
  }
  getAllCity() {
    this.employerService.getAllCity().subscribe((res) => {
      this.cities = res.cities;
      // console.log('this.city' , this.cities);
    });
  }
}
