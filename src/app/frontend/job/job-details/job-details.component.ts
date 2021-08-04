import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Job } from 'src/app/share/models/job';
import { JobService } from 'src/app/share/services/job.service';

@Component({
  selector: 'app-job-details',
  templateUrl: './job-details.component.html',
  styleUrls: ['./job-details.component.css']
})
export class JobDetailsComponent implements OnInit {
  job!: Job;
  id!: number;
  company:any;
  
  constructor(
    private route: ActivatedRoute,
    private jobService: JobService,
  ) { }

  ngOnInit(): void {
    this.getJobPost();
  }
  getJobPost() {
    this.jobService.findJobById(this.route.snapshot.params['id']).subscribe(res => {
      console.log(res);
      this.job = res.job;
      this.company=res.company;
    });
  }
}
