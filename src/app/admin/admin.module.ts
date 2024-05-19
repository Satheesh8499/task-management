import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { ViewTaskComponent } from './view-task/view-task.component';


@NgModule({
  declarations: [
    ViewTaskComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule 
  ]
})
export class AdminModule { }
