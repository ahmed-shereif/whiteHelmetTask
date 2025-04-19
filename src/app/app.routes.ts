import { Routes } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';

export const routes: Routes = [

    {
        path: 'login',
        loadChildren: () =>
            import('./features/login/login.module').then(
                (m) => m.LoginModule
            ),
        // canActivate: [loggedinGuard],
    },
    {
        path: '',
        component: LayoutComponent,
        children: [
            // { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
            // {
            //     path: 'dashboard',
            //     loadChildren: () =>
            //       import('./feature-modules/dashboard/dashboard.module').then(
            //         (m) => m.DashboardModule
            //       ),
            //     canActivate: [authGuard],
            //   },
        ],
    }
];
