import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from './auth.service';

export const authGuard: CanActivateFn = async (childRoute, state) => {
  const router = inject(Router);
  const authService = inject(AuthService);

  let authOk = true

  try {
    await authService.checkAuth();
  } catch (err) {
    console.log('ERR : ', err);
    authOk = false;
  }

  if (authOk) {
    return true;
  } else {
    return router.createUrlTree(['auth', 'login'])
  }
};
