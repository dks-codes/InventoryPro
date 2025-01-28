import { Component, inject, signal, ViewChild } from '@angular/core';
import { InventoryService } from '../../services/inventory.service';
import { catchError } from 'rxjs';
import { Item } from '../../types/item.type';
import { MatIconModule } from '@angular/material/icon';
import { MatTableDataSource, MatTableModule} from '@angular/material/table';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatButtonModule } from '@angular/material/button';

import {
  MatDialog,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogTitle,
} from '@angular/material/dialog';
import { AddItemModalComponent } from '../../components/add-item-modal/add-item-modal.component';
import { RouterLink } from '@angular/router';
import { HeaderComponent } from '../../components/header/header.component';
import { ToastrService } from 'ngx-toastr';
import { FilterModalComponent } from '../../components/filter-modal/filter-modal.component';
import { DeleteItemModalComponent } from '../../components/delete-item-modal/delete-item-modal.component';



@Component({
  selector: 'app-home',
  imports: [MatIconModule, MatTableModule, MatInputModule, MatFormFieldModule, MatPaginator, MatButtonModule, RouterLink, MatSortModule, HeaderComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  // variable to store items
  // inventoryItems = signal<Array<Item>>([]);  // Signal of type Array-Item --> Initially empty array

  /* dataSoure is a variable here */
  dataSource!:  MatTableDataSource<Item>;   
  inventoryService =  inject(InventoryService);

  toastr = inject(ToastrService);
  
  displayedColumns: string[] = ['serialNo','name', 'category', 'quantity', 'price', 'actions'];

  @ViewChild(MatPaginator) pagination!:MatPaginator;
  @ViewChild(MatSort) sort!:MatSort;

  // Runs function to fetch data from service, when the component is rendered
  ngOnInit(): void {
    this.loadItems();
  }

  /* Gets item from inventory service and loads it on UI */
  loadItems():void {
    this.inventoryService
    .getItemsFromApi()
    .pipe(
      catchError( (err) => {
        console.log(err);
        throw err;
      })
    )
    .subscribe( (response) => {
      //this.inventoryItems.set(response.items);   //variable inventoryItems value updated with api items
      this.initTable(response.items);              // response.items will give an array
    });
  }

  initTable(data: Item[]){
    this.dataSource = new MatTableDataSource(data);
    this.dataSource.paginator = this.pagination;
     this.dataSource.sort = this.sort;
  }


  /* Apply search on data */  
  applySearch(event: Event){
    const searchValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = searchValue.trim().toLowerCase();
    
    if(this.dataSource.paginator){
      this.dataSource.paginator.length = this.dataSource.data.length;
      this.dataSource.paginator.firstPage(); // redirects to first page, if filter is used.
    }
  }


  /* Modal to add item */
  // constructor(private dialogRef: MatDialog){}

  /* Opens dialog box to add data and then refreshes page to show data */
  dialog = inject(MatDialog);
  openAddDialog(){
    const dialogRef = this.dialog.open(AddItemModalComponent);

    dialogRef.afterClosed().subscribe((result) => {
      if (result === 'refresh') {
        this.toastr.success("Item Added Successfully!");
        this.loadItems(); // Reload items if the modal signals a refresh
      }
    });
  }


  /* Delete Item Confrim Dialog Box*/
  openDeleteDialog(itemId: string): void {
    const dialogRef = this.dialog.open(DeleteItemModalComponent);

    dialogRef.afterClosed().subscribe( result => {
      if(result){
        this.deleteItem(itemId);
      }
    })
  }

  deleteItem(itemId: string): void {
      this.inventoryService.deleteItemApi(itemId).subscribe(() => {
        this.loadItems(); // Refresh the list after deletion
        this.toastr.success('Item deleted successfully!');
      }, (error) => {
        console.error('Error deleting item:', error);
        this.toastr.error('Failed to delete the item. Please try again.');
      });
  }



  // Filter component is opened and closed
  openFilterDialog(){
    const dialogRef = this.dialog.open(FilterModalComponent);

    dialogRef.afterClosed().subscribe((filteredData) => {
      if(filteredData){
        this.applyFilters(filteredData);
      }
    })
  }

  applyFilters(filteredData: any){
    const { name, category, minPrice, maxPrice } = filteredData;
    this.inventoryService.filterItems(name, category, minPrice, maxPrice).subscribe((items) => {
      this.dataSource = new MatTableDataSource(items);
    })
  }

}
