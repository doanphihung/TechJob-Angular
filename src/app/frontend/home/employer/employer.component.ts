import {Component, OnInit} from '@angular/core';
import {EmployerService} from "../../../share/services/employer.service";

@Component({
  selector: 'app-employer',
  templateUrl: './employer.component.html',
  styleUrls: ['./employer.component.css']
})
export class EmployerComponent implements OnInit {

  employers: any;

  constructor(private employerService: EmployerService) {
  }

  ngOnInit(): void {
    this.getAllCompany();
  }

  getAllCompany() {
    this.employerService.getAllEmployer().subscribe((res) => {
      this.employers = res;
    });
  }

}
