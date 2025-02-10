import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InventoryRoutingModule } from './inventory-routing.module';
import { InventoryDetailComponent } from './inventory-detail/inventory-detail.component';
import { InventoryListComponent } from './inventory-list/inventory-list.component';


@NgModule({
  declarations: [InventoryDetailComponent, InventoryListComponent],
  imports: [
    CommonModule,
    InventoryRoutingModule
  ],
  exports: [InventoryDetailComponent, InventoryListComponent]
})
export class InventoryModule { }
