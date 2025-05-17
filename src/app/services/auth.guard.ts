import {CanActivateFn, Router} from '@angular/router';
import {inject} from "@angular/core";
import {jwtDecode} from 'jwt-decode';

export const authGuard: CanActivateFn = (route, state) => {
  const token = localStorage.getItem('authToken');
  const router = inject(Router);

  if (!token) {
    router.navigate(['/auth/sign-in']);
    return false;
  }

  try {
    const decodedToken: any = jwtDecode(token);
    const currentTime = Date.now() / 1000;

    if (decodedToken.exp && decodedToken.exp > currentTime) {
      return true;
    } else {
      localStorage.removeItem('authToken');
      router.navigate(['/auth/sign-in']);
      return false;
    }
  } catch (error) {
    localStorage.removeItem('authToken');
    router.navigate(['/auth/sign-in']);
    return false;
  }
};
