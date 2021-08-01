import {Component, OnInit} from '@angular/core';
import {EmployerService} from "../../../share/services/employer.service";
import {ActivatedRoute} from "@angular/router";
import {City} from "../../../share/models/city";

@Component({
  selector: 'app-employer-details',
  templateUrl: './employer-details.component.html',
  styleUrls: ['./employer-details.component.css']
})
export class EmployerDetailsComponent implements OnInit {
  cities!: City[];
  currentUser: any;
  jobs_of_currentUser: any;
  file: any;

  constructor(private employerService: EmployerService,
              private activeRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.getCurrentCompany();

  }
  getCurrentCompany() {
    let id = this.activeRoute.snapshot.paramMap.get('id');
    this.employerService.findById(id).subscribe((res) => {
      this.currentUser = res.company;
      console.log(this.currentUser)
      this.jobs_of_currentUser = res.jobs;
    });
  }






  // openDialogEditJob(i: any) {
  //   console.log(this.jobs_of_currentUser[i])
  //   const dialogRef = this.dialog.open(EmployerEditJobComponent, {
  //     width: '500px',
  //     data: this.jobs_of_currentUser[i],
  //   });
  // }
}
