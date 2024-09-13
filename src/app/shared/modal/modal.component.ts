import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent {
  defaultImage: string = 'assets/img/default-ok.png'; // Imagen predeterminada de OK
  defaultErrorImage: string = 'assets/img/default-error.png'; // Imagen predeterminada de Error

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any, // Recibe datos del componente que lo llama
    public dialogRef: MatDialogRef<ModalComponent>
  ) {}

  closeModal(): void {
    this.dialogRef.close();
  }
}
