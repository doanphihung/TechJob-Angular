import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FrontendRoutingModule } from './frontend-routing.module';
import { HomeComponent } from './layouts/home/home.component';
import { HeaderComponent } from './home/header/header.component';
import { FooterComponent } from './home/footer/footer.component';
import { JobHomeComponent } from './home/job-home/job-home.component';
import { EmployerComponent } from './home/employer/employer.component';
import { SearchComponent } from './home/search/search.component';
import {ReactiveFormsModule} from "@angular/forms";
import {MatFormFieldModule} from "@angular/material/form-field";
import { LoginComponent } from './layouts/auth/login/login.component';
import { SeekerRegisterComponent } from './layouts/auth/seeker-register/seeker-register.component';
import { EmployerRegisterComponent } from './layouts/auth/employer-register/employer-register.component';
import { PreRegisterComponent } from './employer-pre-register/pre-register/pre-register.component';
import { NavbarComponent } from './navbar/navbar.component';
import { MainComponent } from './layouts/main/main.component';
import {MatButtonModule} from "@angular/material/button";
import { EmployerDetailsComponent } from './employer-manage/employer-details/employer-details.component';
import {MatCheckboxModule} from "@angular/material/checkbox";
import { EmployerPostJobComponent } from './employer-manage/employer-post-job/employer-post-job.component';
import { EmployerEditProfileComponent } from './employer-manage/employer-edit-profile/employer-edit-profile.component';


@NgModule({
  declarations: [
    HomeComponent,
    HeaderComponent,
    FooterComponent,
    JobHomeComponent,
    EmployerComponent,
    SearchComponent,
    LoginComponent,
    SeekerRegisterComponent,
    EmployerRegisterComponent,
    PreRegisterComponent,
    NavbarComponent,
    MainComponent,
    EmployerDetailsComponent,
    EmployerPostJobComponent,
    EmployerEditProfileComponent
  ],
  imports: [
    CommonModule,
    FrontendRoutingModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatButtonModule,
    MatCheckboxModule
  ]
})
export class FrontendModule { }
