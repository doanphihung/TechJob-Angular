import {Component, OnInit} from '@angular/core';
import jwtDecode from "jwt-decode";
import {Router} from "@angular/router";
import {CurrentUserService} from "../../../share/services/current-user.service";
import {CurrentUser} from "../../../share/models/current-user";
import {Employer} from "../../../share/models/employer";
import {ToastrService} from "ngx-toastr";
import {AuthService} from "../../../share/services/auth.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  tokenDecode: any;
  currentUser!: CurrentUser;
  company!: Employer;
  user_role: number = 3;
  token: any;

  constructor(private router: Router,
              private currentUserService: CurrentUserService,
              private toastr: ToastrService,
              private authService: AuthService) {
  }

  ngOnInit(): void {
    this.token = localStorage.getItem('token');
    if (this.token) {
      this.tokenDecode = jwtDecode(this.token);
      this.user_role = this.tokenDecode.user_role;
      this.currentUserService.getCurrentUser(this.tokenDecode.user_id).subscribe(res => {
        this.currentUser = res?.currentUser;
        this.company = res?.company;
      });
    }
  }

  navigatePostJob() {
    if (this.company.status) {
      this.router.navigate(['/dashboard/employer/' + this.company?.user_id + '/post']);
    } else {
      this.toastr.error('Tài khoản chưa được xác nhận!', 'Đăng tin tuyển dụng')
    }
  }

  logout() {
    this.authService.logout().subscribe(res => {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
    });
  }
}
