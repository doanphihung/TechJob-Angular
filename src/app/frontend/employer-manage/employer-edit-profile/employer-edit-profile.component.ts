import { Component, OnInit } from '@angular/core';
import {City} from "../../../share/models/city";
import {Language} from "../../../share/models/language";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {EmployerService} from "../../../share/services/employer.service";
import {ActivatedRoute, Router} from "@angular/router";
import {CityService} from "../../../share/services/city.service";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-employer-edit-profile',
  templateUrl: './employer-edit-profile.component.html',
  styleUrls: ['./employer-edit-profile.component.css']
})
export class EmployerEditProfileComponent implements OnInit {

  cities!: City[];
  languages!: Language[];
  employer: any;
  formEditEmployer!: FormGroup
  file: any;

  constructor(private employerService: EmployerService,
              private router: Router,
              private formBuilder: FormBuilder,
              private activeRoute: ActivatedRoute,
              private cityService: CityService,
              private toastr: ToastrService) {
  }

  ngOnInit(): void {
    this.formEditEmployer = this.formBuilder.group({
      name: ['', Validators.required],
      address: ['', Validators.required],
      phone: ['', Validators.required],
      city_id: [''],
      employees: [''],
      description: [''],
      image: [null],
      facebook: [''],
      map_link: ['']
    })
    this.findById();
    this.getAllCity();
  }

  findById() {
    let id = this.activeRoute.snapshot.paramMap.get('id');
    this.employerService.findById(id).subscribe((res) => {
      this.employer = res.company;
      this.formEditEmployer.patchValue(res.company);
      this.formEditEmployer.patchValue({name: res.company.user.name});
    });
  }

  uploadImage(event: any) {
    // @ts-ignore
    const file = (event.target as HTMLInputElement).files[0];
    this.formEditEmployer.patchValue({
      image: file

    });
  }
  submitPost() {

  }

  submitEditEmployer() {
    const formData = new FormData();
    // @ts-ignore
    formData.append("name", this.formEditEmployer.get('name').value);
    // @ts-ignore
    formData.append("image", this.formEditEmployer.get('image').value);
    // @ts-ignore
    formData.append("address", this.formEditEmployer.get('address').value);
    // @ts-ignore
    formData.append("phone", this.formEditEmployer.get('phone').value);
    // @ts-ignore
    formData.append("city_id", this.formEditEmployer.get('city_id').value);
    // @ts-ignore
    formData.append("employees", this.formEditEmployer.get('employees').value);
    // @ts-ignore
    formData.append("description", this.formEditEmployer.get('description').value);
    // @ts-ignore
    formData.append("facebook", this.formEditEmployer.get('facebook').value);
    // @ts-ignore
    formData.append("map_link", this.formEditEmployer.get('map_link').value);
    let id = this.activeRoute.snapshot.paramMap.get('id');
    this.employerService.update(formData, id).subscribe((res) => {
      this.toastr.success(res.message);
      this.router.navigateByUrl('', { skipLocationChange: true }).then(() => {
        this.router.navigate(['dashboard/employer/' + id + '/details']);
      });
    });
  }
  getAllCity() {
    this.cityService.getAll().subscribe((res) => {
      this.cities = res;
    });
  }
}

