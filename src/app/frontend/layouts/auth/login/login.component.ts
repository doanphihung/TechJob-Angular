import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../../../share/services/auth.service";
import {FormBuilder, FormGroup} from "@angular/forms";
import {Router} from "@angular/router";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  formLogin!: FormGroup
  alert!: string;

  constructor(private formBuilder: FormBuilder,
              private authService: AuthService,
              private router: Router,
              private toastr: ToastrService) {
  }


  ngOnInit(): void {
    this.formLogin = this.formBuilder.group({
      email: [''],
      password: ['']
    })
  }

  submit() {
    let user = this.formLogin.value;
    this.authService.login(user).subscribe(res => {
      if (res.status == 1) {
        localStorage.setItem('token', res.token);
        this.toastr.success(res.message, 'Đăng nhập thành công!');
        if (res.role == 1 || res.role == 2) {
          this.router.navigate(['']);
        } else {
          this.router.navigate(['/admin']);
        }
      } else {
        this.alert = res.message;
      }
    }, error => {
      this.toastr.error('Đăng nhập không thành công!')
    })
  }

}
