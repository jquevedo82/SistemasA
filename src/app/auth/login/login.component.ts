import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { ModalComponent } from 'src/app/shared/modal/modal.component';
import { ToastrService, ToastrModule } from 'ngx-toastr';
import { ModalSweetComponent } from 'src/app/shared/modal-sweet/modal-sweet.component';
import { ConfirmModalComponent } from 'src/app/shared/confirm-modal/confirm-modal.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  loginForm: FormGroup;

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router, private dialog: MatDialog, private toastrService: ToastrService,) {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      const { username, password } = this.loginForm.value;
      this.authService.login(username, password).subscribe({
        next: (data) => {
          // Redirige al usuario a la página principal o donde corresponda
          if (!data.data) {
            this.toastrService.error(data.response.message, 'Fail', {
              timeOut: 3000,
              positionClass: 'toast-top-center',
            });
          } else { this.router.navigate(['/dashboard']); }
        },
        error: (err) => {
          this.toastrService.error(err.error.message, 'Fail', {
            timeOut: 3000,
            positionClass: 'toast-top-center',
          });
          console.error('Login error:', err);
        }
      });
    }
  }
  openModal() {
    const dialogRef = this.dialog.open(ModalComponent, {
      width: '300px',           // Puedes ajustar el ancho del modal si lo deseas
      data: {
        message: 'Operation completed successfully!',
        // image: 'assets/img/pagina-de-error.png',
        type: 'error' /* o 'error',*/,
        buttonText: 'Cerrar'  // Personaliza el texto del botón
        // Puedes también pasar una imagen personalizada: image: 'path-to-image'
      },
      disableClose: true
    });
    dialogRef.afterClosed().subscribe(() => {
      console.log('El modal fue cerrado');
    });
  }
  openModalSweet(): void {
    const dialogRef = this.dialog.open(ModalSweetComponent, {
      width: '300px',  // Ajusta el tamaño del modal
      data: {
        title: 'Información',
        message: 'Operación realizada con éxito---',
        // imageUrl: 'https://via.placeholder.com/150', // Imagen opcional
        buttonText: 'Entendido3'
      }
    });

    dialogRef.afterClosed().subscribe(() => {
      console.log('El modal fue cerrado');
    });
  }
  openConfirmModal(): void {
    const dialogRef = this.dialog.open(ConfirmModalComponent, {
      width: '300px',  // Ajusta el tamaño del modal
      data: {
        title: 'Confirmación',
        message: '¿Está seguro de que desea continuar?',
        confirmButtonText: 'Aceptar',
        cancelButtonText: 'Cancelar'
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log('El usuario hizo clic en Aceptar');
        // Realizar acción cuando se confirma
      } else {
        console.log('El usuario hizo clic en Cancelar');
        // Realizar acción cuando se cancela
      }
    });
  }
}
