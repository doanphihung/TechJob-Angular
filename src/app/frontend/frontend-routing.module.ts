import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomeComponent} from "./layouts/home/home.component";
import {LoginComponent} from "./layouts/auth/login/login.component";
import {SeekerRegisterComponent} from "./layouts/auth/seeker-register/seeker-register.component";
import {EmployerRegisterComponent} from "./layouts/auth/employer-register/employer-register.component";
import {MainComponent} from "./layouts/main/main.component";
import {PreRegisterComponent} from "./employer-pre-register/pre-register/pre-register.component";
import {JobsListComponent} from "./main/jobs-list/jobs-list.component";
import {EmployerDetailsComponent} from "./employer-manage/employer-details/employer-details.component";
import {EmployerPostJobComponent} from "./employer-manage/employer-post-job/employer-post-job.component";
import {EmployerEditProfileComponent} from "./employer-manage/employer-edit-profile/employer-edit-profile.component";
import {EmployerEditJobComponent} from "./employer-manage/employer-edit-job/employer-edit-job.component";
import {SeekerDetailsComponent} from "./seeker-manage/seeker-details/seeker-details.component";
import {JobDetailsComponent} from "./job/job-details/job-details.component";
import {SeekerJobsAppliedComponent} from "./seeker-manage/seeker-jobs-applied/seeker-jobs-applied.component";
import {IsLoggedInGuard} from "../share/guards/is-logged-in.guard";
import {IsSeekerGuard} from "../share/guards/is-seeker.guard";
import {IsEmployerGuard} from "../share/guards/is-employer.guard";

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
    canActivate: [IsLoggedInGuard],
    component: LoginComponent
  },
  {
    path: 'verify-email/:confirmation_code',
    component: LoginComponent
  },
  {
    path: 'page',
    component: MainComponent,
    children: [
      {
        path: 'pre-register',
        component: PreRegisterComponent
      },
      {
        path:'list',
        component:JobsListComponent
      },
      {
        path: 'job/:id/details',
        component: JobDetailsComponent
      }
    ]
  },
  {
    path: 'dashboard',
    component: MainComponent,
    children: [
      {
        path: 'employer/:id/details',
        canActivate: [IsEmployerGuard],
        component: EmployerDetailsComponent
      },
      {
        path: 'employer/:id/edit',
        canActivate: [IsEmployerGuard],
        component: EmployerEditProfileComponent
      },
      {
        path: 'employer/:id/post',
        canActivate: [IsEmployerGuard],
        component: EmployerPostJobComponent
      },
      {
        path: 'employer/edit/:id/job',
        canActivate: [IsEmployerGuard],
        component: EmployerEditJobComponent
      },
      {
        path: 'seeker/:id/details',
        canActivate: [IsSeekerGuard],
        component: SeekerDetailsComponent
      },
      {
        path: 'seeker/:id/jobs-applied',
        canActivate: [IsSeekerGuard],
        component: SeekerJobsAppliedComponent
      },
      {
        path: '**',
        redirectTo: ''
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FrontendRoutingModule { }
