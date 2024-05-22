import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ViewTaskComponent } from './view-task/view-task.component';
import { AdminLayoutComponent } from './admin-layout/admin-layout.component';
import { UserManagementComponent } from './user-management/user-management.component';
import { ViewProjectsComponent } from './view-projects/view-projects.component';
import { DashboardComponent } from './dashboard/dashboard.component';

const routes: Routes = [
  {
    path: '',
    component: AdminLayoutComponent,
    children: [
      {path:'dashboard',component:DashboardComponent},
      { path: 'view-task', component: ViewTaskComponent},
      { path: 'users', component: UserManagementComponent},
      { path: 'view-projects', component: ViewProjectsComponent },
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' }
    ]
    
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
