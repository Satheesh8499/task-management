import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProjectManagerRoutingModule } from './project-manager-routing.module';
import { AppComponent } from '../app.component';
import { HeaderComponent } from './header/header.component';
import { SideBarComponent } from './side-bar/side-bar.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ViewTasksComponent } from './view-tasks/view-tasks.component';
import { CreateTaskComponent } from './create-task/create-task.component';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { ManagerLayoutComponent } from './manager-layout/manager-layout.component';


@NgModule({
  declarations: [
    HeaderComponent,
    SideBarComponent,
    DashboardComponent,
    ViewTasksComponent,
    CreateTaskComponent,
    ManagerLayoutComponent,
  ],
  imports: [
    ReactiveFormsModule,
    HttpClientModule,
   //  BrowserAnimationsModule,
   CommonModule,
    // MatSnackBarModule,
     ProjectManagerModule
  ],

  providers: [
  
    provideAnimationsAsync()
  ],
  bootstrap: [ProjectManagerModule]
})
export class ProjectManagerModule { }
