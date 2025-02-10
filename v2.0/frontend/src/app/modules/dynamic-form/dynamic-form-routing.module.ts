import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DynamicFormComponent } from './dynamic-form/dynamic-form.component';
import { AuthGuard } from 'src/app/core/guards/auth/auth.guard';


const routes: Routes = [
  { path: '', component: DynamicFormComponent, canActivate: [AuthGuard] }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DynamicFormRoutingModule { }
