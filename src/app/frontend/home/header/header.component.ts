import { Component, OnInit } from '@angular/core';
import jwtDecode from "jwt-decode";
import {Router} from "@angular/router";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  userData: any;
  user_role:number = 3;
  token:any;
  constructor(private router:Router) { }

  ngOnInit(): void {
    this.token = localStorage.getItem('token');
    if (this.token) {
      this.userData = jwtDecode(this.token);
      this.user_role = this.userData.user_role;
    }
  }
  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }

}
