import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatPaginator, MatSnackBar, MatSort, MatTableDataSource } from '@angular/material';
import { Router } from '@angular/router';
import { AddModalComponent } from 'src/app/components/add-modal/add-modal.component';
import { DeleteModalComponent } from 'src/app/components/delete-modal/delete-modal.component';
import { FilterModalComponent } from 'src/app/components/filter-modal/filter-modal.component';
import { AuthService } from 'src/app/services/auth/auth.service';
import { InventoryService } from 'src/app/services/inventory/inventory.service';
import { InventoryItem } from 'src/app/types/item.type';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  // inventory: any[] = []
  inventory!: MatTableDataSource<InventoryItem>;
  displayedColumns: string[] = ["serialNo", "name", "category", "quantity", "price", "actions"]

  isAuthenticated = false;

  @ViewChild(MatSort, { static: true }) sort!: MatSort;
  @ViewChild(MatPaginator, { static: true }) pagination!: MatPaginator;
  
  constructor(
    private inventoryService: InventoryService,
    private router: Router,
    private dialog: MatDialog,
    private authService: AuthService,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit() : void {
    this.authService.isAuthenticated$.subscribe((isLoggedIn) => {
      this.isAuthenticated = isLoggedIn;
      console.log(this.isAuthenticated)
      if(this.isAuthenticated) this.loadInventory();
    })
  }


  loadInventory() {
    this.inventoryService.getInventory().subscribe( (data: any) => {
      this.inventory = new MatTableDataSource(data.items);
      this.inventory.sort = this.sort;
      this.inventory.paginator = this.pagination
    },
  (error) => {
    console.error("Error loading inventory:", error);
    this.showSnackbar("Error loading inventory",'Close','error-snackbar');
  })
  }


  /* Add Modal */
  openAddModal(): void{
    const dialogRef = this.dialog.open(AddModalComponent);
    dialogRef.afterClosed().subscribe( (result) => {
      if(result === "refresh"){
        this.showSnackbar("Item added successfully!",'Close','success-snackbar');
        this.loadInventory();
      }
    })
  }

  /* Filter Modal */
  openFilterModal(): void{
    const dialogRef = this.dialog.open(FilterModalComponent);
    dialogRef.afterClosed().subscribe( (filterData) => {
      if(filterData){
        const {name, category, minPrice, maxPrice} = filterData;
        this.inventoryService.filterItems(name, category, minPrice, maxPrice).subscribe(
          (items: any) => {
            this.inventory = new MatTableDataSource(items);
          }
        )
      }
    });
  }
  

  /* Delete Modal */
  openDeleteDialog(itemId: string): void {
    const dialogRef = this.dialog.open(DeleteModalComponent);

    dialogRef.afterClosed().subscribe( response => {
      if(response){
        this.deleteItem(itemId);
      }
    })
  }

  deleteItem(itemId: string): void {
    this.inventoryService.deleteItem(itemId).subscribe(() => {
      this.loadInventory(); // Refresh the list after deletion
      this.showSnackbar("Item deleted successfully!",'Close','success-snackbar');
    }, (error) => {
      console.error('Error deleting item:', error);
      this.showSnackbar("Failed to delete the item. Please try again.",'Close','error-snackbar');
    });
  }


  /* Search */
  applySearch(searchValue: string){
    this.inventory.filter = searchValue.trim().toLowerCase();

    if(this.inventory.paginator){
      this.inventory.paginator.firstPage();
    }
  }

  showSnackbar(message: string, action: string, panelClass: string = ''){
    this.snackBar.open(message, action, {
      duration: 3000,
      verticalPosition: 'top',
      horizontalPosition: 'center',
      panelClass: panelClass
    })
  }
}
