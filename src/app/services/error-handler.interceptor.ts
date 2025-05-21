import {HttpErrorResponse, HttpInterceptorFn} from '@angular/common/http';
import {catchError, throwError} from "rxjs";
import {inject} from "@angular/core";
import {Router} from "@angular/router";
import {MatSnackBar} from "@angular/material/snack-bar";

export const errorHandlerInterceptor: HttpInterceptorFn = (req, next) => {
  const router = inject(Router);
  const snackBar = inject(MatSnackBar);

  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      let userMessage = 'An unexpected error occurred.';

      if (error.error?.error) {
        userMessage = error.error.error; // Our custom backend error message
      } else if (error.status === 0) {
        userMessage = 'Cannot connect to the server.';
      } else if (error.status === 401) {
        userMessage = 'Unauthorized. Please sign in again.';
        router.navigate(['/login']);
      } else if (error.status === 403) {
        userMessage = 'You don’t have permission to perform this action.';
      } else if (error.status === 404) {
        userMessage = 'Requested resource not found.';
      }

      // Optional: show a toast or alert
      snackBar.open(userMessage, '', {
        duration: 3000,
        panelClass: 'error-mode'
      });

      return throwError(() => new Error(userMessage));
    })
  );
};
