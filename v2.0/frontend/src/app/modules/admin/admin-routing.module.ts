import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminGuard } from 'src/app/core/guards/admin/admin.guard';
import { ManageUsersComponent } from './manage-users/manage-users.component';


const routes: Routes = [
  { path: '', component: ManageUsersComponent, canActivate: [AdminGuard] }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
