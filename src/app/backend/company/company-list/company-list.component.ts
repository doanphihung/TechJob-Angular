import {Component, OnInit} from '@angular/core';
import {Employer} from "../../../share/models/employer";
import {EmployerService} from "../../../share/services/employer.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-company-list',
  templateUrl: './company-list.component.html',
  styleUrls: ['./company-list.component.css']
})
export class CompanyListComponent implements OnInit {

  isChecked!: string;
  totalEmployer: Employer[] = [];

  constructor(private employerService: EmployerService,
              private router: Router) {
  }

  ngOnInit(): void {
    this.getAllCompany();
  }

  getAllCompany() {
    this.employerService.getAllEmployerAdmin().subscribe((res) => {
      this.totalEmployer = res;
      console.log(res);
    });
  }

  changeStatusEmployer(event: any, id: string | undefined) {
    console.log(event.target.checked);
    console.log(id)
    if (event.target.checked) {
      this.employerService.employerActive(id).subscribe((res) => {
        this.getAllCompany();
      });
    } else {
      this.employerService.employerUnActive(id).subscribe((res) => {
        this.getAllCompany();
      });
    }


    // this.router.navigateByUrl('', { skipLocationChange: true }).then(() => {
    //   this.router.navigate(['dashboard/employer/' + id + '/details']);
    // });
  }
}
