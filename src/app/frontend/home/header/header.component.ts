import {Component, OnInit} from '@angular/core';
import jwtDecode from "jwt-decode";
import {Router} from "@angular/router";
import {CurrentUserService} from "../../../share/services/current-user.service";
import {AuthService} from "../../../share/services/auth.service";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  tokenDecode: any;
  currentUser: any
  user_role: number = 3;
  token: any;

  constructor(private router: Router,
              private currentUserService: CurrentUserService,
              private authService: AuthService,
              private toastr: ToastrService) {
  }

  ngOnInit(): void {
    this.token = localStorage.getItem('token');
    if (this.token) {
      this.tokenDecode = jwtDecode(this.token);
      this.user_role = this.tokenDecode.user_role;
      this.currentUserService.getCurrentUser(this.tokenDecode.user_id).subscribe(res => {
        this.currentUser = res;
      });
    }
  }

  logout() {
    this.authService.logout().subscribe(res => {
      this.toastr.success(res.message);
    });
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }

}
