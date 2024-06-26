import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { ViewTaskComponent } from './view-task/view-task.component';
import { AdminHeaderComponent } from './admin-header/admin-header.component';
import { UserManagementComponent } from './user-management/user-management.component';
import { AdminLayoutComponent } from './admin-layout/admin-layout.component';
import { FormsModule } from '@angular/forms';
import { ViewProjectsComponent } from './view-projects/view-projects.component';
import { ProjectChartComponent } from './project-chart/project-chart.component';
import { NgChartsModule } from 'ng2-charts';
import { DashboardComponent } from './dashboard/dashboard.component';


@NgModule({
  declarations: [
    ViewTaskComponent,
    AdminHeaderComponent,
    UserManagementComponent,
    AdminLayoutComponent,
    ViewProjectsComponent,
    ProjectChartComponent,
    DashboardComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule ,
    FormsModule,
    NgChartsModule
  ],
  exports: [
    UserManagementComponent
  ]
})
export class AdminModule { }
