import {Component, OnInit} from '@angular/core';
import {EmployerService} from "../../../share/services/employer.service";
import {ActivatedRoute, Router} from "@angular/router";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {CityService} from "../../../share/services/city.service";
import {CategoryService} from "../../../share/services/category.service";
import {ToastrService} from "ngx-toastr";
import {JobService} from "../../../share/services/job.service";
import {City} from "../../../share/models/city";
import {Category} from "../../../share/models/category";
import {Employer} from "../../../share/models/employer";

@Component({
  selector: 'app-employer-edit-job',
  templateUrl: './employer-edit-job.component.html',
  styleUrls: ['./employer-edit-job.component.css']
})
export class EmployerEditJobComponent implements OnInit {
  cities!: City[];
  categories!: Category[];
  formEditJob!: FormGroup;
  employer!: Employer;

  constructor(private jobService: JobService,
              private router: Router,
              private formBuilder: FormBuilder,
              private activeRoute: ActivatedRoute,
              private cityService: CityService,
              private categoryService: CategoryService,
              private toastr: ToastrService,) {
  }

  ngOnInit(): void {
    this.formEditJob = this.formBuilder.group({
      title: ['', Validators.required],
      language: ['', Validators.required],
      category_id: ['', Validators.required],
      position: ['', Validators.required],
      description: ['', Validators.required],
      experience: [''],
      from_salary: ['', Validators.required],
      to_salary: ['', Validators.required],
      upto: [''],
      city_id: ['', Validators.required],
      expire: [''],
      type_of_job: ['', Validators.required],
      status:[''],
    })
    this.findJobById();
    this.getAllCity();
    this.getAllCategory();
  }

  get f() {
    return  this.formEditJob.controls;
  }

  findJobById() {
    let id = this.activeRoute.snapshot.paramMap.get('id');
    this.jobService.findJobById(id).subscribe((res) => {
      this.formEditJob.patchValue(res.job);
      this.employer = res.company;
      console.log(this.employer)
    });
  }

  getAllCity() {
    this.cityService.getAll().subscribe((res) => {
      this.cities = res.cities;
    });
  }

  getAllCategory() {
    this.categoryService.getAllCategory().subscribe((res) => {
      this.categories = res;
    });
  }

  submitEditJob() {
    let data = this.formEditJob?.value;
    console.log(data)
    let id = this.activeRoute.snapshot.paramMap.get('id');
    this.jobService.updateJob(data, id).subscribe((res) => {
      this.toastr.success(res.message);
    }, (error) => {
      this.toastr.error(error.error.message);
    });
  }

}
