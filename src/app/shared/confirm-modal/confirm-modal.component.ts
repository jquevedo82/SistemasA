import { Component, Inject } from '@angular/core';
import Swal from 'sweetalert2';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-confirm-modal',
  templateUrl: './confirm-modal.component.html',
})
export class ConfirmModalComponent {
  constructor(
    public dialogRef: MatDialogRef<ConfirmModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit(): void {
    this.openConfirmSwal();
  }

  openConfirmSwal(): void {
    Swal.fire({
      title: this.data.title || 'Confirmación',
      text: this.data.message || '¿Está seguro de que desea continuar?',
      icon: 'question', // Icono de pregunta
      showCancelButton: true, // Muestra el botón de cancelar
      confirmButtonText: this.data.confirmButtonText || 'Aceptar',
      cancelButtonText: this.data.cancelButtonText || 'Cancelar',
      allowOutsideClick: false,
      allowEscapeKey: false,
    }).then((result) => {
      if (result.isConfirmed) {
        this.dialogRef.close(true); // Cierra el modal y retorna true si el usuario hace clic en "Aceptar"
      } else {
        this.dialogRef.close(false); // Cierra el modal y retorna false si el usuario hace clic en "Cancelar"
      }
    });
  }
}
