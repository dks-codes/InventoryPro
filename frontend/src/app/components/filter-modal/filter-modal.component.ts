import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormField } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-filter-modal',
  imports: [MatFormField, MatInputModule, MatSelectModule, MatDialogModule, MatSelectModule, FormsModule, CommonModule, MatButtonModule],
  templateUrl: './filter-modal.component.html',
  styleUrl: './filter-modal.component.css'
})


export class FilterModalComponent {

  filter = {
    name: '',
    category: '',
    minPrice: null,
    maxPrice: null,
  };

  categories: string[] = ['Electronics', 'Furniture', 'Groceries', 'Clothing'];

  constructor(private dialogRef: MatDialogRef<FilterModalComponent>) {}

  applyFilters(){
    this.dialogRef.close(this.filter); // filter is updated with the data from filter-modal-form
  }
}
