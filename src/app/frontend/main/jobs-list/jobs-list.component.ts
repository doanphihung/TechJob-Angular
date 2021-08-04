import {Component, OnInit} from '@angular/core';
import {CityService} from "../../../share/services/city.service";
import {Job} from "../../../share/models/job";
import {JobService} from "../../../share/services/job.service";
import {CategoryService} from "../../../share/services/category.service";
import {Category} from "../../../share/models/category";
import {FormBuilder, FormGroup} from "@angular/forms";

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
  totalJob: number = 0;
  categories: Category[] = [];
  searchField: any;
  searchCompanyField: any;
  // @ts-ignore
  formSalary:FormGroup

  constructor(private jobService: JobService,
              private categoryService: CategoryService,
              private formBuider:FormBuilder) {
  }

  ngOnInit(): void {
    this.getAllCategory();
    this.countJob()
    this.formSalary=this.formBuider.group({
      from_salary:['',],
      to_salary:['',],
    })
  }

  getAllCategory() {
    this.categoryService.getAllCategory().subscribe(res => {
      this.categories = res;
      console.log(this.categories)
    })
  }

  countJob() {
    this.jobService.getAllJob().subscribe(res => {
      this.totalJob=res.length;
      }
    )
  }

  search($event: any) {
    this.searchField = $event;
    if (this.searchField.city == "") {
      this.jobService.searchJobWithoutCity(this.searchField).subscribe(res => {
        this.jobs = res.jobs
      })
    } else {
      this.jobService.searchJobWithCity(this.searchField).subscribe(res => {
        this.jobs = res.jobs
      })
    }
  }

  searchCompany($event: any) {
    this.searchCompanyField = $event;
    this.jobService.searchJobByCompany(this.searchCompanyField).subscribe(res => {
      this.jobs = res.jobs
    })
  }

  searchByCategory(id:any){
    this.jobService.searchJobByCategory(id).subscribe(res=>{
      this.jobs=res.jobs
    })
  }

  searchByRangeSalary(){
    const salary=this.formSalary?.value;
    this.jobService.searchJobBySalary(salary).subscribe(res=>{
      this.jobs=res.jobs
    })
  }


}
