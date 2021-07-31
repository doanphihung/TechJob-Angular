import {Component, OnInit} from '@angular/core';
import {EmployerService} from "../../../share/services/employer.service";
import {ActivatedRoute, Router} from "@angular/router";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {City} from "../../../share/models/city";
import {CityService} from "../../../share/services/city.service";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-employer-details',
  templateUrl: './employer-details.component.html',
  styleUrls: ['./employer-details.component.css']
})
export class EmployerDetailsComponent implements OnInit {
  cities!: City[];
  currentUser: any;
  file: any;

  constructor(private employerService: EmployerService,
              private activeRoute: ActivatedRoute ) {}

  ngOnInit(): void {
    this.getCurrentCompany();

  }
  getCurrentCompany() {
    let id = this.activeRoute.snapshot.paramMap.get('id');
    this.employerService.findById(id).subscribe((res) => {
      this.currentUser = res;
    });
  }
}
