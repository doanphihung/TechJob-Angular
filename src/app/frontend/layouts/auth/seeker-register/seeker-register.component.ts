import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {AuthService} from "../../../../share/services/auth.service";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-seeker-register',
  templateUrl: './seeker-register.component.html',
  styleUrls: ['./seeker-register.component.css']
})
export class SeekerRegisterComponent implements OnInit {

  formSeekerRegister!: FormGroup

  constructor(private formBuilder: FormBuilder,
              private router: Router,
              private authService: AuthService,
              private toastr: ToastrService) {
  }

  ngOnInit(): void {
    this.formSeekerRegister = this.formBuilder.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(32)]]
    })
  }

  submitSeekerRegister() {
    let data = this.formSeekerRegister.value;
    console.log(data)
    this.authService.seekerRegister(data).subscribe(res => {
      if (res.status == 1) {
        this.toastr.success(res.message);
        this.router.navigate(['/login']);
      } else if (res.status == 0) {
        this.toastr.error(res.message);
      } else {
        this.toastr.error(res.message);
      }
    }, (error) => {
      this.toastr.error(error.error.message);
    })
  }

}
