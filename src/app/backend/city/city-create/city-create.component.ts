import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { EmployerService } from 'src/app/share/services/employer.service';

@Component({
  selector: 'app-city-create',
  templateUrl: './city-create.component.html',
  styleUrls: ['./city-create.component.css']
})
export class CityCreateComponent implements OnInit {
  addCity = this.fb.group({
    name: ['', [Validators.required]]
  })

  city!: any;
  id!: any;
  constructor(
    private fb: FormBuilder,
    private employerService: EmployerService,
    private router: Router,
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
  }
  submit() {
    const data = this.addCity.value;
    this.employerService.createCity(data).subscribe(() => {
      this.addCity.reset();
      this.router.navigate(['/admin/city/list'])
    }, (e: any) => {
      console.log(e);
    });
  }
}
