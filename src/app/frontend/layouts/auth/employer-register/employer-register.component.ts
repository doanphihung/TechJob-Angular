import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {City} from "../../../../share/models/city";
import {Router} from "@angular/router";
import {CityService} from "../../../../share/services/city.service";
import {AuthService} from "../../../../share/services/auth.service";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-employer-register',
  templateUrl: './employer-register.component.html',
  styleUrls: ['./employer-register.component.css']
})
export class EmployerRegisterComponent implements OnInit {

  formRegister!: FormGroup
  cities: City[] = [];

  constructor(private formBuilder: FormBuilder,
              private router: Router,
              private cityService: CityService,
              private authService: AuthService,
              private toastr: ToastrService) {
  }

  ngOnInit(): void {
    this.formRegister = this.formBuilder.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(32)]],
      city_id: [''],
      employees: [''],
      map_link: [''],
    });
    this.getAllCity();
  }

  submit() {
    let data = this.formRegister.value;
    this.authService.employerRegister(data).subscribe(res => {
      console.log(res);
      if (res.status == 1) {
        this.toastr.success(res.message);
        this.router.navigate(['/login']);
      } else {
        this.toastr.error(res.message);
      }
    }, (error) => {
        this.toastr.error(error.error.message);
    })
  }

  getAllCity() {
    this.cityService.getAll().subscribe((res) => {
      this.cities = res;
    }, (error) => {
      console.log(error)
    },);
  }

  get name() {
    return this.formRegister?.get('name')
  }

  getErrorMessageName() {
    return 'Tên công ty là bắt buộc!';
  }

  get email() {
    return this.formRegister?.get('email');
  }

  getErrorMessageEmail() {
    if (this.email?.hasError('required')) {
      return 'Trường email không được để trống!';
    }
    return this.email?.hasError('email') ? 'Email không hợp lệ!' : '';
  }

  get password() {
    return this.formRegister?.get('password');
  }

  getErrorMessagePassword() {
    if (this.password?.hasError('required')) {
      return 'Mật khẩu bắt buộc!';
    } else if (this.password?.hasError('minlength')) {
      return 'Mật khẩu phải từ 8 ký tự!'
    }
    return this.password?.hasError('maxlength') ? 'Mật phẩu không được quá 32 ký tụ!' : '';
  }

}
