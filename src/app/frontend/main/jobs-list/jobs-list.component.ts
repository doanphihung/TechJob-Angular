import {Component, OnInit} from '@angular/core';
import {Job} from "../../../share/models/job";
import {JobService} from "../../../share/services/job.service";
import {CategoryService} from "../../../share/services/category.service";
import {Category} from "../../../share/models/category";
import {FormBuilder, FormGroup} from "@angular/forms";
import {SearchDataService} from "../../../share/services/search-data.service";
import {Subscription} from "rxjs";
import {CategoryDataService} from "../../../share/services/category-data.service";

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
  formSalary: FormGroup

  searchDataTransfer: any;
  categoryDataTransfer: any;
  // @ts-ignore
  subscription: Subscription;

  constructor(private jobService: JobService,
              private categoryService: CategoryService,
              private formBuider: FormBuilder,
              private dataSearchService: SearchDataService,
              private categoryDataService: CategoryDataService) {

  }

  ngOnInit(): void {
    this.subscription = this.dataSearchService.currentSearchData.subscribe(data => this.searchDataTransfer = data);
    console.log(this.searchDataTransfer)
    this.categoryDataService.currentCategoryData.subscribe(data => this.categoryDataTransfer = data)
    console.log(this.categoryDataTransfer)
    this.getAllCategory();
    this.countJob();
    if (this.searchDataTransfer == null) {
      if (this.categoryDataTransfer == null) {
        this.getJob()
      } else {
        this.searchByCategory(this.categoryDataTransfer)
      }
    } else {
      this.searchTransfer(this.searchDataTransfer)
    }
    this.formSalary = this.formBuider.group({
      from_salary: ['',],
      to_salary: ['',],
    })
  }

  getAllCategory() {
    this.categoryService.getAllCategory().subscribe(res => {
      this.categories = res;
    })
  }

  countJob() {
    this.jobService.getAllJob().subscribe(res => {
        this.totalJob = res.length;
      }
    )
  }

  getJob() {
    this.jobService.getAllJob().subscribe(res => {
        this.jobs = res
      }
    )
  }

  searchTransfer(data: any) {
    if (data.city == "") {
      this.jobService.searchJobWithoutCity(data).subscribe(res => {
        this.jobs = res.jobs
      })
    } else {
      this.jobService.searchJobWithCity(data).subscribe(res => {
        this.jobs = res.jobs
      })
    }
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

  searchByCategory(id: any) {
    this.jobService.searchJobByCategory(id).subscribe(res => {
      this.jobs = res.jobs
    })
  }

  searchByRangeSalary() {
    const salary = this.formSalary?.value;
    this.jobService.searchJobBySalary(salary).subscribe(res => {
      this.jobs = res.jobs
    })
  }


}
