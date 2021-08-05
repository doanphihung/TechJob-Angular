import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../../../share/services/auth.service";
import {FormBuilder, FormGroup} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {ToastrService} from "ngx-toastr";
import {MailService} from "../../../../share/services/mail.service";

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
              private toastr: ToastrService,
              private route: ActivatedRoute,
              private mailService: MailService) {
  }


  ngOnInit(): void {
    this.formLogin = this.formBuilder.group({
      email: [''],
      password: ['']
    })

    if (this.router.url.startsWith('/verify-email/')) {
      const confirmation_code = this.route.snapshot.paramMap.get('confirmation_code');
      this.mailService.verifyEmail(confirmation_code).subscribe(res => {
        this.toastr.success(res.message, 'Xác thực Email thành công!');
      }, error => {
        this.toastr.error(error.error.message);
      })
    }
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
