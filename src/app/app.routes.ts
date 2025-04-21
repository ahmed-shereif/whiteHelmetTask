import { Routes } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';
import { AuthGuard } from './core/auth/guards/auth.guard';
import { NotFoundComponent } from '@shared/not-found/not-found.component';

export const routes: Routes = [

    {
        path: 'login',
        loadChildren: () =>
            import('./features/login/login.module').then(
                (m) => m.LoginModule
            ),
    },
    {
        path: '',
        component: LayoutComponent,
        canActivate: [AuthGuard],
        children: [
            { path: '', redirectTo: '/users', pathMatch: 'full' },
            {
                path: 'users',
                loadChildren: () =>
                    import('./features/users/users.module').then(
                        (m) => m.UsersModule
                    ),
                canActivate: [AuthGuard],
            },
            {
                path: 'attractions',
                loadChildren: () =>
                    import('./features/attraction/attraction.module').then(
                        (m) => m.AttractionModule
                    ),
                canActivate: [AuthGuard],
            },
            { path: '**', component: NotFoundComponent },
        ],
    },
    { path: '**', component: NotFoundComponent },
];
