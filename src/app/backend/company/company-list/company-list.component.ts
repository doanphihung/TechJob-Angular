import { Component, OnInit } from '@angular/core';
import {JobService} from "../../../share/services/job.service";
import {Employer} from "../../../share/models/employer";
import {EmployerService} from "../../../share/services/employer.service";
@Component({
  selector: 'app-company-list',
  templateUrl: './company-list.component.html',
  styleUrls: ['./company-list.component.css']
})
export class CompanyListComponent implements OnInit {

  totalEmployer: Employer[] = [];
  constructor(private employerService: EmployerService) { }

  ngOnInit(): void {
    this.getAllCompany();
  }
  getAllCompany() {
    this.employerService.getAllEmployer().subscribe((res) => {
      this.totalEmployer = res;
      console.log(res);
    });
  }
}
