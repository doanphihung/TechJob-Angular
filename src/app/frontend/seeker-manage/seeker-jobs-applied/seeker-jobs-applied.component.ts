import {Component, OnInit, ViewChild} from '@angular/core';
import {Job} from "../../../share/models/job";
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {SeekerService} from "../../../share/services/seeker.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-seeker-jobs-applied',
  templateUrl: './seeker-jobs-applied.component.html',
  styleUrls: ['./seeker-jobs-applied.component.css']
})
export class SeekerJobsAppliedComponent implements OnInit {
  jobs: Job[] = [];
  displayedColumns: string[] = ["no", "title", 'language', "salary", "experience", "expire", "position", "action"];
  dataSource = new MatTableDataSource<Job>(this.jobs);
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  constructor(private seekerService: SeekerService,
              private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.getAllJobsApplied();
  }

  getAllJobsApplied() {
    let id = this.route.snapshot.paramMap.get('id');
    this.seekerService.getAllJobsApplied(id).subscribe((res) => {
      this.jobs = res;
      this.dataSource = new MatTableDataSource<Job>(this.jobs);
      // @ts-ignore
      this.dataSource.paginator = this.paginator;
    });
  }

  delete(id: any) {
    console.log(id)
  }
}
