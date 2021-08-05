import {Component, OnInit} from '@angular/core';
import {City} from "../../../share/models/city";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {EmployerService} from "../../../share/services/employer.service";
import {ActivatedRoute, Router} from "@angular/router";
import {CityService} from "../../../share/services/city.service";
import {ToastrService} from "ngx-toastr";
import {CategoryService} from "../../../share/services/category.service";
import {Category} from "../../../share/models/category";
import {Employer} from "../../../share/models/employer";

@Component({
  selector: 'app-employer-post-job',
  templateUrl: './employer-post-job.component.html',
  styleUrls: ['./employer-post-job.component.css']
})
export class EmployerPostJobComponent implements OnInit {
  cities!: City[];
  categories!: Category[];
  employer!: Employer;
  formAddPost!: FormGroup

  constructor(private employerService: EmployerService,
              private router: Router,
              private formBuilder: FormBuilder,
              private activeRoute: ActivatedRoute,
              private cityService: CityService,
              private categoryService: CategoryService,
              private toastr: ToastrService,) {
  }

  ngOnInit(): void {
    this.formAddPost = this.formBuilder.group({
      title: ['', Validators.required],
      language: ['', Validators.required],
      category_id: ['', Validators.required],
      position: ['', Validators.required],
      description: ['', Validators.required],
      experience: ['', Validators.required],
      from_salary: ['', Validators.required],
      to_salary: ['', Validators.required],
      upto: [''],
      city_id: ['', Validators.required],
      expire: ['', Validators. required],
      type_of_job: ['', Validators.required]
    })
    this.findById();
    this.getAllCity();
    this.getAllCategory();
  }

  get f() {
    return  this.formAddPost.controls;
  }

  findById() {
    let id = this.activeRoute.snapshot.paramMap.get('id');
    this.employerService.findById(id).subscribe((res) => {
      this.employer = res.company;
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

  submitPost() {
    let data = this.formAddPost?.value;
    let id = this.activeRoute.snapshot.paramMap.get('id');
    this.employerService.postJob(data, id).subscribe((res) => {
      this.toastr.success(res.message);
      this.router.navigate(['dashboard/employer/' + id + '/details'])
    });
  }

}
