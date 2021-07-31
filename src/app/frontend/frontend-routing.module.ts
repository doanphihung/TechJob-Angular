import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomeComponent} from "./layouts/home/home.component";
import {LoginComponent} from "./layouts/auth/login/login.component";
import {SeekerRegisterComponent} from "./layouts/auth/seeker-register/seeker-register.component";
import {EmployerRegisterComponent} from "./layouts/auth/employer-register/employer-register.component";
import {MainComponent} from "./layouts/main/main.component";
import {PreRegisterComponent} from "./employer-pre-register/pre-register/pre-register.component";
import {EmployerDetailsComponent} from "./employer-manage/employer-details/employer-details.component";
import {EmployerPostJobComponent} from "./employer-manage/employer-post-job/employer-post-job.component";
import {EmployerEditProfileComponent} from "./employer-manage/employer-edit-profile/employer-edit-profile.component";

const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'employer/register',
    component: EmployerRegisterComponent
  },
  {
    path: 'seeker/register',
    component: SeekerRegisterComponent,
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'page',
    component: MainComponent,
    children: [
      {
        path: 'pre-register',
        component: PreRegisterComponent
      }
    ]
  },
  {
    path: 'dashboard',
    component: MainComponent,
    children: [
      {
        path: 'employer/:id/details',
        component: EmployerDetailsComponent
      },
      {
        path: 'employer/:id/edit',
        component: EmployerEditProfileComponent
      },
      {
        path: 'employer/:id/post',
        component: EmployerPostJobComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FrontendRoutingModule { }
