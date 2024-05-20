import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { ViewTaskComponent } from './view-task/view-task.component';
import { AdminHeaderComponent } from './admin-header/admin-header.component';
import { UserManagementComponent } from './user-management/user-management.component';
import { AdminLayoutComponent } from './admin-layout/admin-layout.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    ViewTaskComponent,
    AdminHeaderComponent,
    UserManagementComponent,
    AdminLayoutComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule ,
    FormsModule
  ],
  exports: [
    UserManagementComponent
  ]
})
export class AdminModule { }
