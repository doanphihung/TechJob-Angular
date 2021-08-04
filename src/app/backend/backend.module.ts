import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BackendRoutingModule } from './backend-routing.module';
import { MasterComponent } from './layouts/master/master.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { CompanyListComponent } from './company/company-list/company-list.component';
import { CompanyUnactiveListComponent } from './company/company-unactive-list/company-unactive-list.component';


@NgModule({
  declarations: [
  
    MasterComponent,
       WelcomeComponent,
       CompanyListComponent,
       CompanyUnactiveListComponent
  ],
  imports: [
    CommonModule,
    BackendRoutingModule
  ]
})
export class BackendModule { }
