// team-member.module.ts
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import { ProjectDetailsComponent } from './project-details/project-details.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { TasksComponent } from './tasks/tasks.component';
import { BootstrapDialogComponent } from './bootstrap-dialog/bootstrap-dialog.component';
import { FormsModule } from '@angular/forms';
import { TeamMemberLayoutComponent } from './team-member-layout/team-member-layout.component'; // Import FormsModule
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { NgbModalModule, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TeamMemberRoutingModule } from './team-member-routing.module';


const routes: Routes = [
  
];

@NgModule({
  declarations: [
    HeaderComponent,
    HomeComponent,
    ProjectDetailsComponent,
    SidebarComponent,
    TasksComponent,
    BootstrapDialogComponent,
    TeamMemberLayoutComponent
    ],
    imports: [
      CommonModule,
     TeamMemberRoutingModule,
      HttpClientModule,
      FormsModule,
      NgbModule,
      NgbModalModule,
      CommonModule,
    ],
    providers: [
      provideAnimationsAsync()
    ],
  exports: [
    HeaderComponent,
    SidebarComponent
  ]
})
export class TeamMemberModule { }
