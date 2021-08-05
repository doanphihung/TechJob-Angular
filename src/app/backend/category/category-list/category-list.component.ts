import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Category } from 'src/app/share/models/category';
import { EmployerService } from 'src/app/share/services/employer.service';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.css']
})
export class CategoryListComponent implements OnInit {
  categories: Category[] = [];
  constructor(private employerService: EmployerService,
    private router: Router) { }

  ngOnInit(): void {
    this.getAllCategory();
  }
  getAllCategory() {
    this.employerService.getAllCategory().subscribe((res) => {
      this.categories = res;
      // console.log(res);
    });
  }
}
