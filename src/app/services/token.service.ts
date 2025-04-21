import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class TokenService {
  private readonly authTokenKey = environment.authTokenKey;

  constructor() {}

  // Método para guardar el token en localStorage
  setToken(token: string): void {
    localStorage.setItem(this.authTokenKey, token);
  }

  // Método para obtener el token del localStorage
  getToken(): string | null {
    return localStorage.getItem(this.authTokenKey);
  }

  // Comprobar si el usuario está conectado (tiene un token válido)
  isLogged(): boolean {
    const token = this.getToken();
    return !!token && !this.isTokenExpired(); // Verifica que el token exista y no esté vencido
  }

  // Validación de la expiración del token
  isTokenExpired(): boolean {
    const token = this.getToken();
    if (!token) return true;

    const payload = this.decodePayload(token);
    const currentTime = Date.now();

    return payload.exp * 1000 < currentTime; // true si venció, false si es válido
  }

  // Decodificar el payload del token
  private decodePayload(token: string): any {
    const payload = token.split('.')[1];
    const decodedPayload = atob(payload);
    return JSON.parse(decodedPayload);
  }

  // Obtener el nombre de usuario del payload
  getUserName(): string | null {
    const payload = this.decodePayload(this.getToken() || '');
    return payload?.username || null;
  }

  // Obtener el valor de 'descri' del payload
  getDescri(): string | null {
    const payload = this.decodePayload(this.getToken() || '');
    return payload?.descri || null;
  }

  // Obtener los roles del usuario
  getRoles(): string[] {
    const payload = this.decodePayload(this.getToken() || '');
    return payload?.roles || [];
  }

  // Validar si el usuario es administrador
  isAdmin(): boolean {
    const roles = this.getRoles();
    return roles.includes('admin');
  }

  // Limpiar datos del token al cerrar sesión
  clearToken(): void {
    localStorage.removeItem(this.authTokenKey);
  }
}
