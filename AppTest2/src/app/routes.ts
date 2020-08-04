import { Routes } from '@angular/router';

import { HomeComponent } from '../app/home/home.component';
import { AccountComponent } from '../app/account/account.component';
import { HistoryComponent } from '../app/history/history.component';
import { AuthGuard } from './_guards/auth.guard';
import { AboutMeComponent } from './aboutMe/aboutMe.component';
import { SystemCtrlComponent } from './systemCtrl/systemCtrl.component';
import { AdminPanelComponent } from './admin/admin-panel/admin-panel.component';
import { UserManagementComponent } from './admin/user-management/user-management.component';
import { RolesPanelComponent } from './admin/admin-panel/roles-panel/roles-panel.component';
import { AtWorkPanelComponent } from './admin/admin-panel/at-work-panel/at-work-panel.component';
import { WrkHisPanelComponent } from './admin/admin-panel/wrk-his-panel/wrk-his-panel.component';


export const appRoutes: Routes = [
    { path: '',  component: HomeComponent},
    {
        path: '',
        runGuardsAndResolvers: 'always',
        canActivate: [AuthGuard],
        children: [
            {path: 'account',  component: AccountComponent},
            {path: 'history',  component: HistoryComponent},
            {path: 'aboutMe', component: AboutMeComponent},
            {path: 'systemCtrl', component: SystemCtrlComponent },
            {
                path: 'admin',
                component: AdminPanelComponent,
                data: {role: ['Admin']},
                children: [
                    {
                        path: '',
                        redirectTo: 'user-management',
                        pathMatch: 'full'
                    },
                    {path: 'user-management', component: UserManagementComponent},
                    {path: 'roles-panel', component: RolesPanelComponent},
                    {path: 'at-work-panel', component: AtWorkPanelComponent},
                    {path: 'wrk-his-panel', component: WrkHisPanelComponent}
                ]
            },
            
        ]
    },
    {path: '**', redirectTo: '', pathMatch: 'full'}

];