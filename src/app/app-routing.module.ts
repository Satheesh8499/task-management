import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './core/auth.guard';
import { LoginComponent } from './core/login/login.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  {
    path: 'admin',
    loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule),
    canActivate: [AuthGuard],
    data: { role: 'admin' }
   },
  // {
  //   path: 'manager',
  //   loadChildren: () => import('./manager/manager.module').then(m => m.ManagerModule),
  //   canActivate: [AuthGuard],
  //   data: { role: 'manager' }
  // },
  // {
  //   path: 'team-member',
  //   loadChildren: () => import('./features/team-member/team-member.module').then(m => m.TeamMemberModule),
  //   canActivate: [AuthGuard],
  //   data: { role: 'team-member' }
  // },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: '**', redirectTo: '/login' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
