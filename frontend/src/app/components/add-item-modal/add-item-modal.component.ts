import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import { MatOption } from '@angular/material/core';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelect } from '@angular/material/select';
import { InventoryService } from '../../services/inventory.service';

@Component({
  selector: 'app-add-item-modal',
  imports: [MatDialogModule, MatButtonModule, MatFormField, MatLabel, ReactiveFormsModule, MatOption, MatInputModule,CommonModule, MatSelect],
  standalone: true,
  templateUrl: './add-item-modal.component.html',
  styleUrl: './add-item-modal.component.css'
})

export class AddItemModalComponent {
  inventoryService = inject(InventoryService)
  itemForm: FormGroup;
  categories: string[] = ['Electronics', 'Furniture', 'Groceries', 'Clothing'];

  constructor(
    private builder: FormBuilder,
    private dialogRef: MatDialogRef<AddItemModalComponent>,
    private http: HttpClient
  ) {
    this.itemForm = this.builder.group({
      name: ['', Validators.required],
      category: ['', Validators.required],
      quantity: ['', [Validators.required, Validators.min(1)]],
      price: ['', [Validators.required, Validators.min(0)]],
    });
  }

  onSubmit() {
    if (this.itemForm.valid) {
      const itemData = this.itemForm.value;
      this.inventoryService.addItem(itemData)
        .subscribe((response) => {
          // Handle success response
          console.log("Item added successfully!" + response);
          // this.itemForm.reset();
          this.dialogRef.close('refresh');  // this signals the parent to refresh the data
        }, error => {
          // Handle error response
          console.error(error);
        });
    }
  }

  onCancel() {
    this.dialogRef.close();
  }
}
