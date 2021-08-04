import {Component, OnInit} from '@angular/core';
import {EmployerService} from "../../../share/services/employer.service";
import {ActivatedRoute, Router} from "@angular/router";
import {City} from "../../../share/models/city";
import {Employer} from "../../../share/models/employer";
import {Job} from "../../../share/models/job";

@Component({
  selector: 'app-employer-details',
  templateUrl: './employer-details.component.html',
  styleUrls: ['./employer-details.component.css']
})
export class EmployerDetailsComponent implements OnInit {
  cities!: City[];
  currentUser!: Employer;
  jobs_of_currentUser: Job[] = [];
  file: any;

  constructor(private employerService: EmployerService,
              private activeRoute: ActivatedRoute,
              private router: Router) {
  }

  ngOnInit(): void {
    this.getCurrentCompany();

  }

  getCurrentCompany() {
    let id = this.activeRoute.snapshot.paramMap.get('id');
    this.employerService.findById(id).subscribe((res) => {
      this.currentUser = res.company;
      this.jobs_of_currentUser = res.jobs;
      console.log(this.jobs_of_currentUser)
    });
  }
}
