import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {Router} from "@angular/router";
import {AuthService} from "../../../../share/services/auth.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  // @ts-ignore
  formLogin:FormGroup;
  constructor(private formBuilder: FormBuilder,
              private router: Router,
              private authService:AuthService,
  ) {
  }

  ngOnInit(): void {
    this.formLogin= this.formBuilder.group({
      'email':['',],
      'password':['',],
    })
  }

  login(){
    const loginInfor= this.formLogin?.value;

  }

}
