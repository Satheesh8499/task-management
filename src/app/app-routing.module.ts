import { NgModule } from '@angular/core';

import { AuthGuard } from './core/auth.guard';
import { LoginComponent } from './core/login/login.component';
import { RouterModule,Routes } from '@angular/router';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  {
    path: 'admin',
    loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule),
    canActivate: [AuthGuard],
    data: { role: 'admin' }
   },
  {
    path: 'manager',
    loadChildren: () => import('./project-manager/project-manager.module').then(m => m.ProjectManagerModule),
    // canActivate: [AuthGuard],
    data: { role: 'manager'}
  },
  {
    path: 'team-member',
    loadChildren: () => import('./team-member/team-member.module').then(m => m.TeamMemberModule),
    //canActivate: [AuthGuard],
    data: { role: 'team-member' }
  },
   { path: '', redirectTo: '/login', pathMatch: 'full' },
  // { path: '**', redirectTo: '/login' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
