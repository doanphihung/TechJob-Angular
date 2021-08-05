import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { EmployerService } from 'src/app/share/services/employer.service';

@Component({
  selector: 'app-category-create',
  templateUrl: './category-create.component.html',
  styleUrls: ['./category-create.component.css']
})
export class CategoryCreateComponent implements OnInit {
  addCategory = this.fb.group({
    name: ['', [Validators.required]]
  })

  category!: any;
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
    const data = this.addCategory.value;
    this.employerService.addCategory(data).subscribe(() => {
      this.addCategory.reset();
      alert('Tạo thành công');
      this.router.navigate(['/admin/category/add'])
    }, (e: any) => {
      console.log(e);
    });
  }

}
