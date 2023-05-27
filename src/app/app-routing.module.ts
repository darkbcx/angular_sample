import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { KmpComponent } from './pages/kmp/kmp.component';
import { authGuard } from './core/auth.guard';

const routes: Routes = [
  {
    path: 'auth',
    children: [
      {
        path: 'login',
        loadComponent: () => import('./pages/authenticate/login/login.component').then(c => c.LoginComponent)
      },
      { path: '', pathMatch: 'full', redirectTo: 'login' },
    ]
  },
  {
    path: '',
    component: KmpComponent,
    canActivate: [authGuard],
    children: [
      {
        path: '',
        loadComponent: () => import('./pages/kmp/dashboard/dashboard.component').then(c => c.DashboardComponent)
      }
    ]
  },
  { path: '**', pathMatch: 'full', redirectTo: '' }
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
