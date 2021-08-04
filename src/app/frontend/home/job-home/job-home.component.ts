import {Component, OnInit} from '@angular/core';
import {JobService} from "../../../share/services/job.service";
import jwtDecode from "jwt-decode";
import {CategoryService} from "../../../share/services/category.service";
import {Job} from "../../../share/models/job";
import {Category} from "../../../share/models/category";

@Component({
  selector: 'app-job-home',
  templateUrl: './job-home.component.html',
  styleUrls: ['./job-home.component.css']
})
export class JobHomeComponent implements OnInit {

  jobs: Job[] = [];
  categories: Category[] = [] ;
  user_role: number = 3;
  token!: any
  tokenDecode!: any

  constructor(private jobService: JobService,
              private categoryService: CategoryService) {
  }

  ngOnInit(): void {
    this.token = localStorage.getItem('token');
    if (this.token) {
      this.tokenDecode = jwtDecode(this.token);
      this.user_role = this.tokenDecode.user_role;
    }
    this.getAllJob();
    this.getAllCategory();
  }

  getAllJob() {
    this.jobService.getAllJob().subscribe((res) => {

      this.jobs = res;
    });
  }

  getAllCategory() {
    this.categoryService.getAllCategory().subscribe((res) => {
      this.categories = res;
    });
  }
}
