import { Component } from '@angular/core';
import { AuthService } from '../../auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-menu',
  template: `
  <button mat-icon-button [matMenuTriggerFor]="menu">
    <mat-icon>account_circle</mat-icon>
  </button>
   <mat-menu #menu="matMenu">
    <ng-container *ngIf="isAuthenticated(); else notLoggedIn">
      <button mat-menu-item (click)="logout()">Logout</button>
    </ng-container>
    <ng-template #notLoggedIn>
      <button mat-menu-item (click)="login()">Login</button>
    </ng-template>
  </mat-menu>
  `
})
export class UserMenuComponent {
  constructor(public authService: AuthService, private router: Router) {}

  logout(): void {
    this.authService.logout();
  }

  login(): void {
    this.router.navigate(['/login']);
  }
  isAuthenticated(): boolean {

    return this.authService.isAuthenticated(); // Usa un método en AuthService
  }
}
