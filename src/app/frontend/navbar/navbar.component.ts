import { Component, OnInit } from '@angular/core';
import jwtDecode from "jwt-decode";
import {Router} from "@angular/router";
import {CurrentUserService} from "../../share/services/current-user.service";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  currentUser: any;
  tokenDecode: any;
  user_role: number = 3;
  token:any;
  constructor(private router: Router,
              private currentUserService: CurrentUserService) { }

  ngOnInit(): void {
    this.token = localStorage.getItem('token');
    if (this.token) {
      this.tokenDecode = jwtDecode(this.token);
      this.currentUserService.getCompanyCurrent(this.tokenDecode.user_id).subscribe((res) => {
        this.currentUser = res;
        this.user_role = this.currentUser.user.role;
      });
    }
  }

  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }

}
