import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-filter-modal',
  templateUrl: './filter-modal.component.html',
  styleUrls: ['./filter-modal.component.css']
})
export class FilterModalComponent implements OnInit {

  filter = {
    name: '',
    category: '',
    minPrice: null,
    maxPrice: null,
  };

  categories: string[] = ['Electronics', 'Furniture', 'Groceries', 'Fashion'];

  constructor(private dialogRef: MatDialogRef<FilterModalComponent>) { }

  ngOnInit() {
  }

  applyFilters(){
    this.dialogRef.close(this.filter); // filter is updated with the data from filter-modal-form
  }

}
