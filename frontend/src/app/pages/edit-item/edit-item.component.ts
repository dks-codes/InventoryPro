import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatOption, MatOptionModule } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { InventoryService } from '../../services/inventory.service';
import { HeaderComponent } from "../../components/header/header.component";
import ApiResponseItem, { Item } from '../../types/item.type';
import { CommonModule } from '@angular/common';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-edit-item',
  imports: [ReactiveFormsModule, MatInputModule, MatButtonModule, MatSelectModule, HeaderComponent, CommonModule, RouterLink],
  templateUrl: './edit-item.component.html',
  styleUrl: './edit-item.component.css'
})


export class EditItemComponent {
  builder = inject(FormBuilder);
  categories: string[] = ['Electronics', 'Furniture', 'Groceries', 'Clothing'];

  itemForm = this.builder.group({
          name: ['', Validators.required],
          category: ['', Validators.required],
          quantity: [0, [Validators.required, Validators.min(1)]],
          price: [0, [Validators.required, Validators.min(0)]],
    });

    inventoryService = inject(InventoryService);

    router = inject(Router)
    route = inject(ActivatedRoute);
    toaster = inject(ToastrService);

    itemId !: string;
    item !: Item

    ngOnInit(): void {
      this.loadItems();
    }

    loadItems(): void {
      this.itemId = this.route.snapshot.params['id'];
      // console.log('Editing item with ID:', this.itemId);
      
      this.inventoryService.getItem(this.itemId).subscribe( (result: ApiResponseItem) => {
          this.item = result.item;
          // console.log(this.item)

          if (this.item) {
            // console.log(`name: ${this.item.name}`)
            this.itemForm.patchValue({
              name: this.item.name,
              category: this.item.category,
              quantity: this.item.quantity,
              price: this.item.price,
            });
          }
          // console.log(`after: ${this.itemForm.value}`)
        },
        (error) => {
          console.error('Error fetching item:', error);
      }
      )
    }


    updateProduct(){
      if(this.itemForm.invalid){
        this.toaster.error('Please provide all the details!');
        return;
      }

      let formValue = this.itemForm.value || 'Electronics';

      //  or item: Partial<Item> = this.itemForm.value
      let item: Item = {
        _id: this.item._id,  
        createdAt: this.item.createdAt,  
        updatedAt: new Date().toISOString(),  
        name: formValue.name || '',  
        category: formValue.category ,  
        quantity: formValue.quantity != null ? formValue.quantity : 0,  
        price: formValue.price != null ? formValue.price : 0,  
      };

      this.inventoryService.updateItem(this.item._id, item).subscribe((result) => {
        this.router.navigateByUrl('/');
        this.toaster.success("Item updated successfully!!");
      })
    }
}
