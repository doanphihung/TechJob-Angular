import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {MasterComponent} from "./layouts/master/master.component";
import {WelcomeComponent} from "./welcome/welcome.component";
import {CompanyListComponent} from "./company/company-list/company-list.component";

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
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BackendRoutingModule { }
