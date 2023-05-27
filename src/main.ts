import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';

import {Amplify} from 'aws-amplify';
import awsmobile from './aws-exports';
Amplify.configure(awsmobile);

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));

// import { Component } from '@angular/core';
// import { provideRouter, RouterOutlet, Routes } from '@angular/router';
// import { bootstrapApplication } from '@angular/platform-browser';
// import { KmpComponent } from './app/pages/kmp/kmp.component';
// import { authGuard } from './app/core/auth.guard';
// import { BrowserModule } from '@angular/platform-browser';
// import { BrowserAnimationsModule } from '@angular/platform-browser/animations'

// import { Amplify } from 'aws-amplify';
// import awsmobile from './aws-exports';
// Amplify.configure(awsmobile);

// const routes: Routes = [
//   {
//     path: '',
//     component: KmpComponent,
//     children: [
//       {
//         path: '',
//         loadComponent: () => import('./app/pages/kmp/dashboard/dashboard.component').then(c => c.DashboardComponent)
//       }
//     ]
//   },
//   {
//     path: 'auth',
//     children: [
//       {
//         path: '',
//         loadComponent: () => import('./app/pages/authenticate/login/login.component').then(c => c.LoginComponent)
//       }
//     ]
//   },
//   { path: '**', pathMatch: 'full', redirectTo: '' }
// ]

// @Component({
//   selector: 'app-root',
//   standalone: true,
//   imports: [
//     BrowserModule,
//     BrowserAnimationsModule,
//     RouterOutlet
//   ],
//   template: `
//     <router-outlet></router-outlet>
//   `,
// })
// export class App { }

// bootstrapApplication(App, {
//   providers: [provideRouter(routes)],
// }).catch(err => console.error(err));;
