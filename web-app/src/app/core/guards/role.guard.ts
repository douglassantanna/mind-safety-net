import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';

export const roleGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthenticationService);
  const roles = route.data['roles'];
  return roles.includes(authService.role);
};
