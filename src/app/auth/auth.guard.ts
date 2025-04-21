import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from './auth.service';
import { TokenService } from '../services/token.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private tokenService: TokenService, private router: Router) {}

  canActivate(): boolean {

    const token = this.tokenService.getToken();

    if (token && token!= undefined) {
      //this.router.navigate(['dashboard']);
      return true; // El usuario está autenticado
    } else {
      //this.router.navigate(['/login']); // Redirigir al login si no está autenticado
      return false;
    }
  }
}
