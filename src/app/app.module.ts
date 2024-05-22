import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { AdminModule } from './admin/admin.module';
import { ViewTaskComponent } from './admin/view-task/view-task.component';
import { AuthService } from './core/auth.service';
import { AuthGuard } from './core/auth.guard';
import { LoginComponent } from './core/login/login.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TeamMemberModule } from './team-member/team-member.module';
import { NgChartsModule} from 'ng2-charts';

@NgModule({ declarations: [
        AppComponent,
        LoginComponent,
    ],
    bootstrap: [AppComponent], imports: [BrowserModule,
        NgbModule,
        AdminModule,
        AppRoutingModule,
        FormsModule,
        ReactiveFormsModule,
        TeamMemberModule,
        NgChartsModule], providers: [AuthService, AuthGuard, provideAnimationsAsync(), provideHttpClient(withInterceptorsFromDi())] })
export class AppModule { }
function provideCharts(arg0: any): import("@angular/core").Provider | import("@angular/core").EnvironmentProviders {
  throw new Error('Function not implemented.');
}

function withDefaultRegisterables(): any {
  throw new Error('Function not implemented.');
}

