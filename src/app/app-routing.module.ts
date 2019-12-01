import { NgModule } from '@angular/core';
import { Router, Routes, RouterModule } from '@angular/router';

import {LoginComponent} from './components/user/login/login.component';
import {RegisterComponent} from './components/user/register/register.component';
import {ProfileComponent} from './components/user/profile/profile.component';
import {DashboardComponent} from './components/admin/dashboard/dashboard.component';
import {UserListComponent} from './components/admin/user-list/user-list.component';
import {UnathorizedComponent} from './components/error/unathorized/unathorized.component';
import {NotFoundComponent} from './components/error/not-found/not-found.component';
import {AuthGuard} from './guards/auth.guard';
import {Role} from './model/role';
import { EmployeeListComponent } from './components/admin/employee-list/employee-list.component';

const routes: Routes = [
  //Main page
  {path: '', redirectTo: 'login', pathMatch: 'full'},
 
  //User pages
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'profile',
  component: ProfileComponent,
  canActivate: [AuthGuard]
  },

  //admin panel
  {path: 'dashboard',
  component: DashboardComponent,
  canActivate: [AuthGuard],
  data: {roles: [Role.ADMIN]}
  },
  {path: 'user-list',
  component: UserListComponent,
  canActivate: [AuthGuard],
  data: {roles: [Role.ADMIN]}
  },
//   {path: 'product-list',
//   component: ProductListComponent,
//   canActivate: [AuthGuard],
//   data: {roles: [Role.ADMIN]}
//  },
 //employee-list
 {path: 'employee-list',
  component: EmployeeListComponent,
  canActivate: [AuthGuard],
  data: {roles: [Role.ADMIN]}
 },
//  {path: 'transaction-list',
//  component: TransactionListComponent,
//  canActivate: [AuthGuard],
//  data: {roles: [Role.ADMIN]}
// },

  //error pages
  {path: '404', component: NotFoundComponent},
  {path: '401', component: UnathorizedComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
constructor(private router: Router) {
  this.router.errorHandler = (error: any) => {
    this.router.navigate(['/404']);
  }
}
}
