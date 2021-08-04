import {Component, OnInit} from '@angular/core';
import {CityService} from "../../../share/services/city.service";
import {Job} from "../../../share/models/job";
import {JobService} from "../../../share/services/job.service";

@Component({
  selector: 'app-jobs-list',
  templateUrl: './jobs-list.component.html',
  styleUrls: ['./jobs-list.component.css']
})
export class JobsListComponent implements OnInit {

  currentPage = 1;
  itemsPerPage = 5;
  maxSize = 5;
  jobs: Job[] = [];
  searchField: any
  searchCompanyField: any

  constructor(private jobService: JobService) {
  }

  ngOnInit(): void {
  }


  search($event: any) {
    this.searchField = $event;
    if(this.searchField.city==""){
      this.jobService.searchJobWithoutCity(this.searchField).subscribe(res=>{
        this.jobs=res.jobs
      })
    }else {
      this.jobService.searchJobWithCity(this.searchField).subscribe(res=>{
        this.jobs=res.jobs
      })
    }
  }
  searchCompany($event:any){
    this.searchCompanyField=$event;
    this.jobService.searchJobByCompany(this.searchCompanyField).subscribe(res=>{
      this.jobs=res.jobs
    })
  }

}
