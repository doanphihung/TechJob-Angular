import { Component, OnInit } from '@angular/core';
import {CurrentUser} from "../../../share/models/current-user";
import {Router} from "@angular/router";
import {CurrentUserService} from "../../../share/services/current-user.service";
import {AuthService} from "../../../share/services/auth.service";
import jwtDecode from "jwt-decode";

@Component({
  selector: 'app-master',
  templateUrl: './master.component.html',
  styleUrls: ['./master.component.css']
})
export class MasterComponent implements OnInit {
  tokenDecode: any;
  admin!: CurrentUser;
  token: any;
  constructor(private router: Router,
              private currentUserService: CurrentUserService,
              private authService: AuthService) { }

  ngOnInit(): void {
    this.token = localStorage.getItem('token');
    if (this.token) {
      this.tokenDecode = jwtDecode(this.token);
      this.currentUserService.getCurrentUser(this.tokenDecode.user_id).subscribe(res => {
        this.admin = res;
      });
    }
  }

}
