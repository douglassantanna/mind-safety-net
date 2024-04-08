import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthenticationService } from '../services/authentication.service';

export const authGuard: CanActivateFn = (): Observable<boolean> => {
  const authService = inject(AuthenticationService);
  return authService.isLoggedIn;
};
