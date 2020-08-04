import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NgxPaginationModule } from 'ngx-pagination';
import { ChartsModule } from 'ng2-charts';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BsDropdownModule} from 'ngx-bootstrap/dropdown';
import { ModalModule } from 'ngx-bootstrap/modal';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { AccountComponent } from './account/account.component';
import { HistoryComponent } from './history/history.component';
import { AboutMeComponent } from './aboutMe/aboutMe.component';
import { SystemCtrlComponent } from './systemCtrl/systemCtrl.component';
import { AdminPanelComponent } from './admin/admin-panel/admin-panel.component';
import { UserManagementComponent } from './admin/user-management/user-management.component';
import { RolesPanelComponent } from './admin/admin-panel/roles-panel/roles-panel.component';
import { AtWorkPanelComponent } from './admin/admin-panel/at-work-panel/at-work-panel.component';
import { WrkHisPanelComponent } from './admin/admin-panel/wrk-his-panel/wrk-his-panel.component';

import { DatePipe } from '@angular/common';

import { AuthService } from '../app/_service/auth.service';
import { AdminService } from './_service/admin.service';

import { ErrorInterseptorProvider } from './_service/error.interseptor';
import { JwtInterceptorProvider } from './_service/jwt.interceptor';

import { appRoutes } from './routes';

import { HasRoleDirective } from './_directives/hasRole.directive';


@NgModule({
   declarations: [
      AppComponent,
      LoginComponent,
      HomeComponent,
      AccountComponent,
      HistoryComponent,
      AboutMeComponent,
      SystemCtrlComponent,
      AdminPanelComponent,
      HasRoleDirective,
      UserManagementComponent,
      RolesPanelComponent,
      AtWorkPanelComponent,
      WrkHisPanelComponent
   ],
   imports: [
      BrowserModule,
      AppRoutingModule,
      HttpClientModule,
      FormsModule,
      ReactiveFormsModule,
      BsDropdownModule.forRoot(),
      BrowserAnimationsModule,
      RouterModule.forRoot(appRoutes),
      ModalModule.forRoot(),
      NgbModule,
      Ng2SearchPipeModule,
      ChartsModule,
     NgxPaginationModule
      
      
   ],
   providers: [
      AuthService,
      ErrorInterseptorProvider,
      AdminService,
      JwtInterceptorProvider,
      DatePipe
   ],
   bootstrap: [
      AppComponent
   ]
})
export class AppModule { }
