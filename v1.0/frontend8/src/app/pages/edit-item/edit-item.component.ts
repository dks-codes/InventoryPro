import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { InventoryService } from 'src/app/services/inventory/inventory.service';

@Component({
  selector: 'app-edit-item',
  templateUrl: './edit-item.component.html',
  styleUrls: ['./edit-item.component.css']
})
export class EditItemComponent implements OnInit {

  editItemForm !: FormGroup;
  categories: string[] = ['Electronics', 'Furniture', 'Groceries', 'Fashion'];
  itemId !: string;

  constructor(
    private builder: FormBuilder,
    private inventoryService: InventoryService,
    private router: Router,
    private route: ActivatedRoute,  //Will provide info about route (basically, itemId)
    private snackBar: MatSnackBar

  ) { }

  ngOnInit(): void {
    this.loadItems();
  }

  loadItems(): void{
    this.itemId = this.route.snapshot.paramMap.get('id');
    
    console.log(this.itemId);

    this.editItemForm = this.builder.group({
      name: ['', Validators.required],
      category: ['', Validators.required],
      quantity: [null, [Validators.required, Validators.min(1)]],
      price: [null, [Validators.required, Validators.min(0)]]
    });

    this.inventoryService.getItem(this.itemId).subscribe(
      (response: any) => {
        if(response && response.item){
          const fetcheditemData = response.item
          this.editItemForm.patchValue(fetcheditemData)
        }
      },
      (error) => {
        console.error("Error fetching item data: ", error);
      }
    )
  }

  onSubmit(): void{
    if(this.editItemForm.valid){
      const updatedItemData = this.editItemForm.value;
      this.inventoryService.updateItem(this.itemId, updatedItemData).subscribe(
        () => {
          // alert("Item Updated Successfully!");
          this.showSnackbar("Item Updated Successfully!",'Close',"success-snackbar")
          this.router.navigate(['/']);
        },
        (error) => {
          this.showSnackbar("Error updating item!",'Close',"error-snackbar")
          console.log("Error updating item: ", error);
        }
      )
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
