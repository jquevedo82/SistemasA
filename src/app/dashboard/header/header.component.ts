import { Component, Input } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { AuthService } from 'src/app/auth/auth.service';
import { TokenService } from 'src/app/services/token.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  isFullscreen = false;
  unreadMails: number = 0;
  unreadNotifications: number = 0;
  usuario !: string;

  @Input() sidenav!: MatSidenav;
  constructor(private authService: AuthService,private tokenservice: TokenService) {

    this.unreadNotifications=15;
    this.unreadMails = 3;
    this.usuario=this.tokenservice.getDescri();
  }

  toggleFullscreen() {
    const elem = document.documentElement;
    if (!document.fullscreenElement) {
      if (elem.requestFullscreen) {
        elem.requestFullscreen();
      }
      this.isFullscreen = true;
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      }
      this.isFullscreen = false;
    }
  }

  isAuthenticated(): boolean {
    return this.authService.isAuthenticated();
  }

  logout(): void {
    this.authService.logout();
  }

  login(): void {
    // Lógica para redirigir al usuario a la página de inicio de sesión
  }
}

