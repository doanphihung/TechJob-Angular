import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Job} from 'src/app/share/models/job';
import {JobService} from 'src/app/share/services/job.service';
import {Employer} from "../../../share/models/employer";
import jwtDecode from "jwt-decode";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MailService} from "../../../share/services/mail.service";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-job-details',
  templateUrl: './job-details.component.html',
  styleUrls: ['./job-details.component.css']
})
export class JobDetailsComponent implements OnInit {
  job!: Job;
  id!: number;
  company!: Employer;
  user_role: number = 3;
  token!: any
  tokenDecode!: any;
  formForwardMail!: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private jobService: JobService,
    private fb: FormBuilder,
    private activeRoute: ActivatedRoute,
    private mailService: MailService,
    private toastr: ToastrService) {
  }

  get f() {
    return  this.formForwardMail.controls;
  }

  ngOnInit(): void {
    this.formForwardMail = this.fb.group({
      email: ['', [Validators.required, Validators.email]]
    });

    this.token = localStorage.getItem('token');
    if (this.token) {
      this.tokenDecode = jwtDecode(this.token);
      this.user_role = this.tokenDecode.user_role;
    }
    this.getJobPost();
  }

  getJobPost() {
    this.jobService.findJobById(this.route.snapshot.params['id']).subscribe(res => {
      this.job = res.job;
      this.company = res.company;
    });
  }

  forwardMail() {
    let id = this.activeRoute.snapshot.paramMap.get('id');
    let data = this.formForwardMail.value;
    this.mailService.forwardJobMail(data, id).subscribe(res => {
      this.toastr.success(res.message);

    });

  }
}
