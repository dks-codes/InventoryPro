import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-delete-item-modal',
  imports: [MatDialogModule, MatButtonModule],
  templateUrl: './delete-item-modal.component.html',
  styleUrl: './delete-item-modal.component.css'
})
export class DeleteItemModalComponent {

  constructor(public dialogRef: MatDialogRef<DeleteItemModalComponent>){}

  // Cancel
  onCancel() : void {
    this.dialogRef.close();
  }

  onConfirm() : void {
    this.dialogRef.close(true);
  }



}
