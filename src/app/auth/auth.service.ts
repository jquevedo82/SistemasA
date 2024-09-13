import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, Observable, tap, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { TokenService } from '../services/token.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = environment.authURL; // Cambia esto a la URL de tu API
  private authTokenKey = environment.authTokenKey;
  private currentUserSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);

  constructor(private http: HttpClient, private router: Router, private tokenservice: TokenService) { }

  login(username: string, password: string): Observable<any> {
    console.log(`${this.apiUrl}/login`);
    return this.http.post<any>(`${this.apiUrl}/login`, { username, password }).pipe(
      tap(response => {
        localStorage.setItem(this.authTokenKey, response.data);
        this.tokenservice.setToken(response.data,username)
        this.currentUserSubject.next(username); // Opcional: manejar el usuario actual
      }),
      catchError(error => {
        console.log("Error durante la solicitud de login:", error); // Detalle del error
        return this.handleError(error);
      })
    );
  }

  isAuthenticated(): boolean {
    if (this.getToken() && this.getToken() !== 'undefined') {
      return true;
    }

    return false;
  }
  // Método para refrescar el token
  refreshToken(): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/refresh-token`, {
      token: localStorage.getItem(this.authTokenKey)
    }).pipe(
      tap(response => {
        localStorage.setItem(this.authTokenKey, response.token);
      }),
      catchError(this.handleError)
    );
  }
  logout(): void {
    localStorage.removeItem(this.authTokenKey);
    this.currentUserSubject.next(null);
    this.router.navigate(['/login']);
  }
  // Manejo de errores
  private handleError(error: any): Observable<never> {
    console.error('An error occurred:', error);
    return throwError(error);
  }

  // Método para obtener el token actual
  getToken(): string | null | undefined {
    return localStorage.getItem(this.authTokenKey);
  }
  tokenExpired(token: any): boolean {
    if (!this.isAuthenticated()) {
      return true;
    }
    console.log(token);
    const payload = token.split('.')[1];
    const values = atob(payload);
    const valuesJson = JSON.parse(values);
    const currentTime = Date.now();
    //console.log(valuesJson,currentTime);
    if (valuesJson.exp * 1000 < currentTime) return true;
    return false; // Devuelve true si el token está vencido, de lo contrario, false
  }
  // Método para obtener el usuario actual
  getCurrentUser(): Observable<any> {
    return this.currentUserSubject.asObservable();
  }
}
