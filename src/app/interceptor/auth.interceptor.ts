import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError, from } from 'rxjs';
import { catchError, switchMap, tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  private refreshingToken = false;
  private pendingRequests: Array<HttpRequest<any>> = [];

  constructor(private authService: AuthService, private router: Router) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = this.authService.getToken();
    let authReq = req;
    if (!this.authService.isAuthenticated()) {
      return next.handle(req);
    }

    if (token) {
      authReq = req.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`
        }
      });
    }

    return next.handle(authReq).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401 && this.authService.tokenExpired(token)) {
          this.refreshingToken = true;

          return this.authService.refreshToken().pipe(
            switchMap((newToken: any) => {
              this.refreshingToken = false;
              localStorage.setItem('authToken', newToken.token);
              // Reintentar las solicitudes pendientes
              const retryRequests = this.pendingRequests.map(pendingReq =>
                next.handle(this.addTokenToRequest(pendingReq, newToken.token))
              );
              this.pendingRequests = [];
              // Reintentar la solicitud actual
              return from(retryRequests).pipe(
                switchMap(() => next.handle(this.addTokenToRequest(req, newToken.token)))
              );
            }),
            catchError((err) => {
              this.refreshingToken = false;
              this.authService.logout();
              this.router.navigate(['/login']);
              return throwError(err);
            })
          );
        // } else if (error.status === 401 && this.refreshingToken) {
        //   // Añadir solicitud a la lista de pendientes si se está renovando el token
        //   return new Observable<HttpEvent<any>>(observer => {
        //     this.pendingRequests.push(req);
        //     observer.next();
        //     observer.complete();
        //   });
        //
        } else {
          return throwError(error);
        }
      })
    );
  }

  private addTokenToRequest(req: HttpRequest<any>, token: string): HttpRequest<any> {
    return req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
  }
}
