import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const authGuard: CanActivateFn = async () => {
  const authService = inject(AuthService);
  const router = inject(Router);
  
  if (!(await authService.isAuthenticated())) {
    return router.createUrlTree(['/admin/login']);
  }

  return true;
};
