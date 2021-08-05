import {Component, OnInit} from '@angular/core';
import {JobService} from "../../../share/services/job.service";
import jwtDecode from "jwt-decode";
import {CategoryService} from "../../../share/services/category.service";
import {Job} from "../../../share/models/job";
import {Category} from "../../../share/models/category";
import {CategoryDataService} from "../../../share/services/category-data.service";
import {ActivatedRoute, Router} from "@angular/router";
import {FormBuilder} from "@angular/forms";
import {MailService} from "../../../share/services/mail.service";
import {ToastrService} from "ngx-toastr";
import {SeekerService} from "../../../share/services/seeker.service";

@Component({
  selector: 'app-job-home',
  templateUrl: './job-home.component.html',
  styleUrls: ['./job-home.component.css']
})
export class JobHomeComponent implements OnInit {

  jobs: Job[] = [];
  categories: Category[] = [];
  user_role: number = 3;
  token!: any
  tokenDecode!: any
  idCurrentUser!: number;

  constructor(private jobService: JobService,
              private categoryService: CategoryService,
              private categoryDataService: CategoryDataService,
              private router:Router,
              private route: ActivatedRoute,
              private fb: FormBuilder,
              private toastr: ToastrService,
              private seekerService: SeekerService) {
  }

  ngOnInit(): void {
    this.token = localStorage.getItem('token');
    if (this.token) {
      this.tokenDecode = jwtDecode(this.token);
      this.user_role = this.tokenDecode.user_role;
      this.idCurrentUser = this.tokenDecode.user_id;
    }
    this.getFirstFiveJob();
    this.getAllCategory();
  }

  getFirstFiveJob() {
    this.jobService.getFirstFiveJob().subscribe((res) => {
      this.jobs = res;
    });
  }

  getAllCategory() {
    this.categoryService.getAllCategory().subscribe((res) => {
      this.categories = res;
    });
  }

  categorySearch(id: any) {
    this.categoryDataService.changeCategoryData(id);
    this.router.navigate(['/page/list'])
  }

  apply(idJob: any) {
    if (this.idCurrentUser) {
      this.seekerService.apply(this.idCurrentUser, idJob).subscribe( res => {
        if (res.status == 1) {
          this.toastr.success(res.message);
        } else {
          this.toastr.warning(res.message);
        };
      }, error => {this.toastr.error(error.error.message)})
    } else {
      this.toastr.warning('Bạn cần đăng nhập để ứng tuyển công việc!')
    }
  }
}
