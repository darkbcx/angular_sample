import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { KmpComponent } from './pages/kmp/kmp.component';
import { authGuard } from './core';

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
      },
      {
        path: 'todo',
        loadComponent: () => import('./pages/kmp/todo/todo.component').then(c => c.TodoComponent)
      },
      {
        path: 'todo/add',
        loadComponent: () => import('./pages/kmp/todo/todo-add/todo-add.component').then(c => c.TodoAddComponent)
      },
      {
        path: 'todo/edit/:id',
        loadComponent: () => import('./pages/kmp/todo/todo-edit/todo-edit.component').then(c => c.TodoEditComponent)
      },
    ]
  },
  { path: '**', pathMatch: 'full', redirectTo: '' }
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
