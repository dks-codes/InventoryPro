import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { InventoryService } from 'src/app/services/inventory/inventory.service';

@Component({
  selector: 'app-add-modal',
  templateUrl: './add-modal.component.html',
  styleUrls: ['./add-modal.component.css']
})
export class AddModalComponent implements OnInit {

  categories: string[] = ['Electronics', 'Furniture', 'Groceries', 'Fashion'];
  addItemForm!: FormGroup;

  constructor(
    private inventoryService: InventoryService,
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<AddModalComponent>
  ) {}

  ngOnInit() {
    this.addItemForm = this.fb.group({
      name: ['', Validators.required],
      category: ['', Validators.required],
      quantity: [null, [Validators.required, Validators.min(1)]],
      price: [null, [Validators.required, Validators.min(0)]]
    });
  }

  onSubmit(): void {
    if (this.addItemForm.valid) {
      const itemData = this.addItemForm.value;
      this.inventoryService.addItem(itemData).subscribe(
        (response) => {
          console.log("Item added:", response);
          this.dialogRef.close("refresh"); 
        },
        (error) => {
          console.error("Error adding item:", error);
        }
      );
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}
