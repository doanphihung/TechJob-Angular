import {Component, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {EmployerService} from "../../../share/services/employer.service";
import {Job} from "../../../share/models/job";
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";

@Component({
  selector: 'app-employer-list-job',
  templateUrl: './employer-list-job.component.html',
  styleUrls: ['./employer-list-job.component.css']
})
export class EmployerListJobComponent implements OnInit {
  countJob!: string;
  jobs: Job[] = [];
  displayedColumns: string[] = ["STT", "Tiêu đề", "Ngôn ngữ", "Chuyên ngành", "Mức lương", "Upto", "Vị trí",  "Yêu cầu kinh nghiệm", "Nơi làm việc", "Trạng thái", "Hết hạn", "Thông tin", "Hình thức"];
  dataSource = new MatTableDataSource<Job>(this.jobs);
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private activeRoute: ActivatedRoute,
              private employerService: EmployerService ) { }

  ngOnInit(): void {
    this.getAllJob()
  }

  getAllJob() {
    let id = this.activeRoute.snapshot.paramMap.get('id');
    this.employerService.getAllJob(id).subscribe((res) => {
      this.jobs = res;
      this.countJob = res.length;
      this.dataSource = new MatTableDataSource<Job>(this.jobs);
      // @ts-ignore
      this.dataSource.paginator = this.paginator;
    });
  }

}
