import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProjectManagerRoutingModule } from './project-manager-routing.module';
import { HeaderComponent } from './header/header.component';
import { SideBarComponent } from './side-bar/side-bar.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ViewTasksComponent } from './view-tasks/view-tasks.component';
import { CreateTaskComponent } from './create-task/create-task.component';



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
