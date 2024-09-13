import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-modal-sweet',
  templateUrl: './modal-sweet.component.html',
  styleUrls: ['./modal-sweet.component.css']
})
export class ModalSweetComponent {

  constructor(
    public dialogRef: MatDialogRef<ModalSweetComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit(): void {
    this.openSweetAlert();
  }

  openSweetAlert(): void {
    Swal.fire({
      title: this.data.title || 'Información',
      text: this.data.message || 'Operación realizada con éxito',
      imageUrl: this.data.imageUrl || 'assets/img/default-ok.png',  // Imagen opcional
      imageWidth: 100,
      imageHeight: 100,
      imageAlt: 'Imagen',
      confirmButtonText: this.data.buttonText || 'Entendido2',
      allowOutsideClick: false,
      allowEscapeKey: false,
    }).then(() => {
      this.dialogRef.close();  // Cierra el modal después de que el usuario presiona el botón
    });
  }
}
