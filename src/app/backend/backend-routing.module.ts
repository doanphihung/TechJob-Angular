import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {MasterComponent} from "./layouts/master/master.component";
import {WelcomeComponent} from "./welcome/welcome.component";
import {CompanyListComponent} from "./company/company-list/company-list.component";
import { CityCreateComponent } from './city/city-create/city-create.component';
import { CityListComponent } from './city/city-list/city-list.component';
import { CategoryListComponent } from './category/category-list/category-list.component';
import { CategoryCreateComponent } from './category/category-create/category-create.component';

const routes: Routes = [
  {
    path:'',
    component: MasterComponent,
    children: [
      {
        path: '',
        component: WelcomeComponent,
      },
      {
        path: 'company/list',
        component: CompanyListComponent,
      },
      {
        path: 'city/list',
        component: CityListComponent,
      },
      {
        path: 'category/list',
        component: CategoryListComponent,
      },
      {
        path: 'city/create',
        component: CityCreateComponent,
      },
      {
        path: 'category/create',
        component: CategoryCreateComponent,
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BackendRoutingModule { }
