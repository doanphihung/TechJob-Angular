import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {IsAdminGuard} from "./share/guards/is-admin.guard";

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./frontend/frontend.module').then(m => m.FrontendModule)
  },
  {
    path: 'admin',
    canActivate: [IsAdminGuard],
    loadChildren: () => import('./backend/backend.module').then(m => m.BackendModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
