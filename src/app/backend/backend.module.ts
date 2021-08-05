import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BackendRoutingModule } from './backend-routing.module';
import { MasterComponent } from './layouts/master/master.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { CompanyListComponent } from './company/company-list/company-list.component';
import { CompanyUnactiveListComponent } from './company/company-unactive-list/company-unactive-list.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { CityListComponent } from './city/city-list/city-list.component';
import { CityCreateComponent } from './city/city-create/city-create.component';
import { CategoryListComponent } from './category/category-list/category-list.component';
import { CategoryCreateComponent } from './category/category-create/category-create.component';


@NgModule({
  declarations: [

    MasterComponent,
       WelcomeComponent,
       CompanyListComponent,
       CompanyUnactiveListComponent,
       CityListComponent,
       CityCreateComponent,
       CategoryListComponent,
       CategoryCreateComponent
  ],
    imports: [
        CommonModule,
        BackendRoutingModule,
        FormsModule,
        ReactiveFormsModule
        
    ]
})
export class BackendModule { }
