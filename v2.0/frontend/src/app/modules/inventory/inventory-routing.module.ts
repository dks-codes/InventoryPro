import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { InventoryListComponent } from './inventory-list/inventory-list.component';
import { AuthGuard } from 'src/app/core/guards/auth/auth.guard';
import { InventoryDetailComponent } from './inventory-detail/inventory-detail.component';


const routes: Routes = [
  { path: '', component: InventoryListComponent, canActivate: [AuthGuard] },
  { path: 'details/:id', component: InventoryDetailComponent, canActivate: [AuthGuard] }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InventoryRoutingModule { }
