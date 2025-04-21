import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth/auth.guard';
import { DashboardHomeComponent } from './dashboard/dashboard-home/dashboard-home.component';

const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule),
  },
  {
    path: 'dashboard',
    component: DashboardHomeComponent,
    canActivate: [AuthGuard],
    loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule),
  },
  { path: '', redirectTo: '/auth/login', pathMatch: 'full' },
  { path: '**', redirectTo: '/auth/login' }, // O redirigir al componente NotFoundComponent
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}